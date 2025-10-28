/**
 * useSVGAnimation.tsx
 *
 * Handwriting-stroke animation system for SVG path data. The zustand store keeps
 * every timeline datum (metas, refs, timeouts) so UI layers can subscribe to
 * `currentUnit`, `totalUnits`, or `pathsFinished` without the hook re-running.
 *
 * Typical usage flow:
 *   1. `SvgCanvas` mounts an SVG into the provided container and calls
 *      `useSVGAnimationStore.getState().setSvgContainer(div)`.
 *   2. Page calls `Seek(container, 0)` once to compute metadata and hide strokes.
 *   3. `PlayAnimation(container, { animationDelay, drawDuration })` starts a
 *      fresh CSS stroke-dashoffset animation (per-path timing identical to the
 *      legacy Remix implementation).
 *   4. While the user drags a slider, call `PauseAnimation()`, repeatedly `Seek`
 *      with the new unit value, then `ResumeAnimation(container)` on pointer up.
 */

import { useCallback, useEffect } from "react";
import type { RefObject } from "react";
import { create } from "zustand";

type TransitionTiming =
  | "ease"
  | "linear"
  | "ease-in"
  | "ease-out"
  | "ease-in-out";

interface AnimationOptions {
  animationDelay?: number;
  drawDuration?: number;
  minStrokeDuration?: number;
  transitionTiming?: TransitionTiming;
}

interface NormalizedAnimationOptions {
  animationDelay: number;
  drawDuration: number;
  minStrokeDuration: number;
  transitionTiming: TransitionTiming;
}

interface PathMeta {
  path: SVGPathElement;
  length: number;
  unitStart: number;
  unitEnd: number;
  duration: number;
  msStart: number;
  msEnd: number;
  index: number;
}

interface SVGAnimationStore {
  SvgContainer: RefObject<HTMLDivElement | null>;
  isAnimating: boolean;
  isAnimatingRef: RefObject<boolean>;
  strokesOrderVisible: boolean;
  strokesOrderVisibleRef: RefObject<boolean>;
  timeoutIDs: NodeJS.Timeout[];
  pathMetas?: PathMeta[];
  totalUnits: number;
  totalMs: number;
  currentUnit: number;
  pathsFinished: boolean[];
  rafHandleRef: RefObject<number | null>;
  startTimeRef: RefObject<number | null>;
  pausedAtMsRef: RefObject<number | null>;
  animationDelayRef: RefObject<number>;
  lastOptionsRef: RefObject<NormalizedAnimationOptions>;

  setSvgContainer: (ref: HTMLDivElement) => void;
  setIsAnimating: (state: boolean) => void;
  toggleStrokesOrderVisible: () => void;
  addTimeoutId: (id: NodeJS.Timeout) => void;
  clearTimeouts: () => void;
  setPathMetas?: (metas: PathMeta[]) => void;
  setTotalUnits?: (units: number) => void;
  setTotalMs?: (ms: number) => void;
  setCurrentUnit?: (unit: number) => void;
  setPathsFinished?: (finished: boolean[]) => void;

  PlayAnimation?: (
    SVG: HTMLDivElement,
    opts?: Partial<AnimationOptions>,
  ) => void;
  PauseAnimation?: () => void;
  ResumeAnimation?: (SVG: HTMLDivElement) => void;
  Seek?: (SVG: HTMLDivElement, unit: number) => void;
  SeekToUnit?: (SVG: HTMLDivElement, unit: number) => void;
  CancelAnimation?: (SVG: HTMLDivElement) => void;
}

const DEFAULT_OPTIONS: NormalizedAnimationOptions = {
  animationDelay: 0,
  drawDuration: 1500,
  minStrokeDuration: 500,
  transitionTiming: "ease",
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const arraysEqual = (a: boolean[], b: boolean[]) =>
  a.length === b.length && a.every((val, idx) => val === b[idx]);

const normalizeOptions = (
  overrides?: Partial<AnimationOptions>,
): NormalizedAnimationOptions => ({
  animationDelay: overrides?.animationDelay ?? DEFAULT_OPTIONS.animationDelay,
  drawDuration: overrides?.drawDuration ?? DEFAULT_OPTIONS.drawDuration,
  minStrokeDuration:
    overrides?.minStrokeDuration ?? DEFAULT_OPTIONS.minStrokeDuration,
  transitionTiming:
    overrides?.transitionTiming ?? DEFAULT_OPTIONS.transitionTiming,
});

export const useSVGAnimationStore = create<SVGAnimationStore>((set, get) => ({
  SvgContainer: { current: null },
  isAnimating: false,
  isAnimatingRef: { current: false },
  strokesOrderVisible: true,
  strokesOrderVisibleRef: { current: true },
  timeoutIDs: [],
  pathMetas: undefined,
  totalUnits: 0,
  totalMs: 0,
  currentUnit: 0,
  pathsFinished: [],
  rafHandleRef: { current: null },
  startTimeRef: { current: null },
  pausedAtMsRef: { current: null },
  animationDelayRef: { current: DEFAULT_OPTIONS.animationDelay },
  lastOptionsRef: { current: DEFAULT_OPTIONS },

  setSvgContainer: (ref) => {
    const store = get();
    store.SvgContainer.current = ref;
    // Trigger a state update to notify subscribers that container changed
    set({ SvgContainer: { current: ref } });
  },

  setIsAnimating: (state) => {
    set({ isAnimating: state });
    get().isAnimatingRef.current = state;
  },

  toggleStrokesOrderVisible: () => {
    const visible = !get().strokesOrderVisible;
    set({ strokesOrderVisible: visible });
    get().strokesOrderVisibleRef.current = visible;
  },

  addTimeoutId: (id) => {
    get().timeoutIDs.push(id);
  },

  clearTimeouts: () => {
    const { timeoutIDs } = get();
    timeoutIDs.forEach((t) => clearTimeout(t));
    timeoutIDs.length = 0;
  },

  setPathMetas: (metas) => set({ pathMetas: metas }),
  setTotalUnits: (units) => set({ totalUnits: units }),
  setTotalMs: (ms) => set({ totalMs: ms }),
  setCurrentUnit: (unit) => set({ currentUnit: unit }),
  setPathsFinished: (finished) => set({ pathsFinished: finished }),

  PlayAnimation: undefined,
  PauseAnimation: undefined,
  ResumeAnimation: undefined,
  Seek: undefined,
  SeekToUnit: undefined,
  CancelAnimation: undefined,
}));

const ensureMetas = (
  SVG: HTMLDivElement,
  options: NormalizedAnimationOptions,
): PathMeta[] => {
  const store = useSVGAnimationStore.getState();
  if (store.pathMetas && store.pathMetas.length > 0) {
    return store.pathMetas;
  }
  return computePathMetas(SVG, options);
};

const computePathMetas = (
  SVG: HTMLDivElement,
  options: NormalizedAnimationOptions,
): PathMeta[] => {
  const store = useSVGAnimationStore.getState();
  const paths = SVG.querySelectorAll<SVGPathElement>("path");

  const lengths: number[] = [];
  paths.forEach((path) => lengths.push(path.getTotalLength()));

  const metas: PathMeta[] = [];
  let cumulativeUnits = 0;
  let cumulativeMs = 0;

  lengths.forEach((length, index) => {
    const path = paths[index];
    const duration = Math.max(
      options.minStrokeDuration,
      (length / 100) * options.drawDuration,
    );

    metas.push({
      path,
      length,
      unitStart: cumulativeUnits,
      unitEnd: cumulativeUnits + length,
      duration,
      msStart: cumulativeMs,
      msEnd: cumulativeMs + duration,
      index,
    });

    cumulativeUnits += length;
    cumulativeMs += duration;
  });

  const totalTimeline = cumulativeMs + options.animationDelay;

  metas.forEach((meta) => {
    meta.path.style.transition = "none";
    meta.path.style.strokeDasharray = `${meta.length}`;
    meta.path.style.strokeDashoffset = `${meta.length}`;
  });

  SVG.querySelectorAll<SVGTextElement>("text").forEach((text) => {
    text.style.opacity = "0.25";
  });

  store.animationDelayRef.current = options.animationDelay;
  store.lastOptionsRef.current = options;
  store.startTimeRef.current = null;
  store.pausedAtMsRef.current = 0;
  store.setPathMetas?.(metas);
  store.setTotalUnits?.(cumulativeUnits);
  store.setTotalMs?.(totalTimeline);
  store.setCurrentUnit?.(0);
  store.setPathsFinished?.(Array(metas.length).fill(false));

  return metas;
};

const unitToMs = (unit: number): number => {
  const store = useSVGAnimationStore.getState();
  const metas = store.pathMetas;
  if (!metas || metas.length === 0) return 0;

  const clampedUnit = clamp(unit, 0, store.totalUnits);

  for (const meta of metas) {
    if (clampedUnit <= meta.unitStart) {
      return store.animationDelayRef.current + meta.msStart;
    }
    if (clampedUnit < meta.unitEnd) {
      const localProgress = (clampedUnit - meta.unitStart) / meta.length;
      return (
        store.animationDelayRef.current +
        meta.msStart +
        localProgress * meta.duration
      );
    }
  }

  const last = metas[metas.length - 1];
  return store.animationDelayRef.current + last.msEnd;
};

const msToUnit = (ms: number): number => {
  const store = useSVGAnimationStore.getState();
  const metas = store.pathMetas;
  if (!metas || metas.length === 0) return 0;

  const animationDelay = store.animationDelayRef.current;
  if (ms <= animationDelay) return 0;

  for (const meta of metas) {
    const absoluteStart = animationDelay + meta.msStart;
    const absoluteEnd = animationDelay + meta.msEnd;
    if (ms <= absoluteStart) return meta.unitStart;
    if (ms >= absoluteEnd) {
      continue;
    }
    const progress = (ms - absoluteStart) / (absoluteEnd - absoluteStart);
    return meta.unitStart + progress * meta.length;
  }

  return metas[metas.length - 1].unitEnd;
};

const renderAtMs = (
  SVG: HTMLDivElement,
  ms: number,
  options?: { applyDash?: boolean; applyTexts?: boolean },
) => {
  const store = useSVGAnimationStore.getState();
  const metas = store.pathMetas;
  if (!metas || metas.length === 0) return;

  const applyDash = options?.applyDash ?? true;
  const applyTexts = options?.applyTexts ?? true;
  const animationDelay = store.animationDelayRef.current;
  const clampedMs = clamp(ms, 0, store.totalMs);

  metas.forEach((meta) => {
    const absoluteStart = animationDelay + meta.msStart;
    const absoluteEnd = animationDelay + meta.msEnd;
    let progress = 0;
    if (clampedMs <= absoluteStart) progress = 0;
    else if (clampedMs >= absoluteEnd) progress = 1;
    else progress = (clampedMs - absoluteStart) / (absoluteEnd - absoluteStart);

    if (applyDash) {
      const offset = meta.length * (1 - progress);
      meta.path.style.transition = "none";
      meta.path.style.strokeDasharray = `${meta.length}`;
      meta.path.style.strokeDashoffset = `${offset}`;

      // Update gradient position to follow the drawing progress
      const gradientId = meta.path
        .getAttribute("stroke")
        ?.match(/url\(#(.+)\)/)?.[1];
      if (gradientId) {
        const gradient = SVG.querySelector(
          `#${gradientId}`,
        ) as SVGLinearGradientElement;
        if (gradient) {
          // Get path bounding box to set gradient coordinates
          const bbox = meta.path.getBBox();
          const pathStart = { x: bbox.x, y: bbox.y };
          const pathEnd = { x: bbox.x + bbox.width, y: bbox.y + bbox.height };

          // Calculate gradient position based on progress
          // The gradient should move along with the stroke being drawn
          const currentX = pathStart.x + (pathEnd.x - pathStart.x) * progress;
          const currentY = pathStart.y + (pathEnd.y - pathStart.y) * progress;

          // Set gradient to end at the current drawing position
          gradient.setAttribute("x1", `${pathStart.x}`);
          gradient.setAttribute("y1", `${pathStart.y}`);
          gradient.setAttribute("x2", `${currentX}`);
          gradient.setAttribute("y2", `${currentY}`);
        }
      }
    }
  });

  if (applyTexts) {
    const texts = SVG.querySelectorAll<SVGTextElement>("text");
    texts.forEach((text, index) => {
      const meta = metas[index];
      if (!meta) return;
      const absoluteStart = animationDelay + meta.msStart;
      text.style.opacity = clampedMs >= absoluteStart + 1 ? "1" : "0.25";
    });
  }

  const currentUnit = msToUnit(clampedMs);
  store.setCurrentUnit?.(currentUnit);
  store.pausedAtMsRef.current = clampedMs;

  const pathsFinished = metas.map(
    (meta) => clampedMs >= animationDelay + meta.msEnd - 0.5,
  );
  if (!arraysEqual(pathsFinished, store.pathsFinished)) {
    store.setPathsFinished?.(pathsFinished);
  }
};

const cancelProgressLoop = () => {
  const store = useSVGAnimationStore.getState();
  const handle = store.rafHandleRef.current;
  if (handle !== null) {
    cancelAnimationFrame(handle);
    store.rafHandleRef.current = null;
  }
};

const startProgressLoop = (SVG: HTMLDivElement) => {
  cancelProgressLoop();
  const store = useSVGAnimationStore.getState();

  const step = (timestamp: number) => {
    const currentStore = useSVGAnimationStore.getState();
    if (currentStore.startTimeRef.current === null) {
      currentStore.startTimeRef.current = timestamp;
    }

    const elapsed = clamp(
      timestamp - (currentStore.startTimeRef.current ?? timestamp),
      0,
      currentStore.totalMs,
    );

    renderAtMs(SVG, elapsed, { applyDash: false, applyTexts: true });

    if (elapsed >= currentStore.totalMs) {
      cancelProgressLoop();
      return;
    }

    currentStore.rafHandleRef.current = requestAnimationFrame(step);
  };

  store.rafHandleRef.current = requestAnimationFrame(step);
};

const scheduleFinalTimeout = (offsetMs: number) => {
  const store = useSVGAnimationStore.getState();
  const remaining = clamp(store.totalMs - offsetMs, 0, store.totalMs);

  const timeoutId = setTimeout(() => {
    cancelProgressLoop();
    store.setIsAnimating(false);
    store.startTimeRef.current = null;
    store.pausedAtMsRef.current = store.totalMs;
    store.setCurrentUnit?.(store.totalUnits);
    const completed = Array(store.pathMetas?.length ?? 0).fill(true);
    store.setPathsFinished?.(completed);

    store.pathMetas?.forEach((meta) => {
      meta.path.style.transition = "none";
      meta.path.style.strokeDasharray = `${meta.length}`;
      meta.path.style.strokeDashoffset = "0";
    });

    const container = store.SvgContainer.current;
    if (container) {
      container.querySelectorAll<SVGTextElement>("text").forEach((text) => {
        text.style.opacity = "1";
      });
    }

    store.timeoutIDs.length = 0;
  }, remaining) as unknown as NodeJS.Timeout;

  store.addTimeoutId(timeoutId);
};

const prepareCSSAnimation = (
  metas: PathMeta[],
  options: NormalizedAnimationOptions,
) => {
  const animationDelay = options.animationDelay;
  metas.forEach((meta) => {
    const path = meta.path;
    path.style.transition = "";
    path.style.transitionProperty = "stroke-dashoffset";
    path.style.transitionTimingFunction = options.transitionTiming;
    path.style.transitionDuration = `${meta.duration}ms`;
    path.style.transitionDelay = `${animationDelay + meta.msStart}ms`;
  });

  // Two RAFs ensure previous style changes flush before we set to 0.
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      metas.forEach((meta) => {
        meta.path.style.strokeDashoffset = "0";
      });
    });
  });
};

export function useSVGAnimation() {
  const setIsAnimating = useSVGAnimationStore((state) => state.setIsAnimating);

  const toggleStrokesOrderVisible = useSVGAnimationStore(
    (state) => state.toggleStrokesOrderVisible,
  );
  const strokesOrderVisibleRef = useSVGAnimationStore(
    (state) => state.strokesOrderVisibleRef,
  );

  useEffect(() => {
    return () => {
      cancelProgressLoop();
      const store = useSVGAnimationStore.getState();
      store.clearTimeouts();
      store.setIsAnimating(false);
    };
  }, []);

  const PlayAnimation = useCallback(
    (SVG: HTMLDivElement, opts?: Partial<AnimationOptions>) => {
      if (!SVG) return;
      const store = useSVGAnimationStore.getState();
      const options = normalizeOptions(opts);

      cancelProgressLoop();
      store.clearTimeouts();

      const metas = computePathMetas(SVG, options);

      // Force a layout flush to ensure initial hidden state is applied
      requestAnimationFrame(() => {
        // Double RAF to ensure styles are fully computed
        requestAnimationFrame(() => {
          prepareCSSAnimation(metas, options);

          store.startTimeRef.current = null;
          store.pausedAtMsRef.current = 0;
          setIsAnimating(true);

          startProgressLoop(SVG);
          scheduleFinalTimeout(0);
        });
      });
    },
    [setIsAnimating],
  );

  const PauseAnimation = useCallback(() => {
    const store = useSVGAnimationStore.getState();
    const container = store.SvgContainer.current;
    if (!container) return;

    if (!store.isAnimatingRef.current) return;

    const now = performance.now();
    const startTime = store.startTimeRef.current ?? now;
    const elapsed = clamp(now - startTime, 0, store.totalMs);

    cancelProgressLoop();
    store.clearTimeouts();
    store.startTimeRef.current = null;
    renderAtMs(container, elapsed, { applyDash: true, applyTexts: true });

    store.pausedAtMsRef.current = elapsed;
    setIsAnimating(false);
  }, [setIsAnimating]);

  const resumeFromMs = (
    elapsedMs: number,
    options: NormalizedAnimationOptions,
    metas: PathMeta[],
  ) => {
    const store = useSVGAnimationStore.getState();
    const animationDelay = store.animationDelayRef.current;

    metas.forEach((meta) => {
      const path = meta.path;
      const absoluteStart = animationDelay + meta.msStart;
      const absoluteEnd = animationDelay + meta.msEnd;

      if (elapsedMs >= absoluteEnd) {
        path.style.transition = "none";
        path.style.strokeDasharray = `${meta.length}`;
        path.style.strokeDashoffset = "0";
        return;
      }

      path.style.transition = "";
      path.style.strokeDasharray = `${meta.length}`;
      path.style.transitionProperty = "stroke-dashoffset";
      path.style.transitionTimingFunction = options.transitionTiming;

      if (elapsedMs <= absoluteStart) {
        const delay = absoluteStart - elapsedMs;
        path.style.strokeDashoffset = `${meta.length}`;
        path.style.transitionDuration = `${meta.duration}ms`;
        path.style.transitionDelay = `${delay}ms`;
      } else {
        const progress =
          (elapsedMs - absoluteStart) / (absoluteEnd - absoluteStart);
        const remaining = Math.max(absoluteEnd - elapsedMs, 0);
        const currentOffset = meta.length * (1 - progress);
        path.style.transitionDuration = `${remaining}ms`;
        path.style.transitionDelay = "0ms";
        path.style.strokeDashoffset = `${currentOffset}`;
      }
    });

    requestAnimationFrame(() => {
      metas.forEach((meta) => {
        const absoluteEnd = animationDelay + meta.msEnd;
        if (elapsedMs < absoluteEnd) {
          meta.path.style.strokeDashoffset = "0";
        }
      });
    });
  };

  const ResumeAnimation = useCallback(
    (SVG: HTMLDivElement) => {
      if (!SVG) return;
      const store = useSVGAnimationStore.getState();
      const options = store.lastOptionsRef.current ?? DEFAULT_OPTIONS;

      const metas = ensureMetas(SVG, options);
      if (metas.length === 0) return;

      const pausedMs =
        store.pausedAtMsRef.current ?? unitToMs(store.currentUnit);
      store.clearTimeouts();
      resumeFromMs(pausedMs, options, metas);

      store.startTimeRef.current = performance.now() - pausedMs;
      setIsAnimating(true);
      startProgressLoop(SVG);
      scheduleFinalTimeout(pausedMs);
      store.pausedAtMsRef.current = null;
    },
    [setIsAnimating],
  );

  const Seek = useCallback(
    (SVG: HTMLDivElement, unit: number) => {
      if (!SVG) return;
      const store = useSVGAnimationStore.getState();
      const options = store.lastOptionsRef.current ?? DEFAULT_OPTIONS;

      cancelProgressLoop();
      store.clearTimeouts();
      setIsAnimating(false);

      const metas = ensureMetas(SVG, options);
      if (metas.length === 0) return;

      const ms = unitToMs(unit);
      renderAtMs(SVG, ms, { applyDash: true, applyTexts: true });
      store.startTimeRef.current = null;
      store.pausedAtMsRef.current = ms;
    },
    [setIsAnimating],
  );

  const CancelAnimation = useCallback(
    (SVG: HTMLDivElement) => {
      if (!SVG) return;
      const store = useSVGAnimationStore.getState();
      cancelProgressLoop();
      store.clearTimeouts();
      store.startTimeRef.current = null;

      const metas = store.pathMetas;
      metas?.forEach((meta) => {
        meta.path.style.transition = "none";
        meta.path.style.strokeDasharray = `${meta.length}`;
        meta.path.style.strokeDashoffset = "0";
      });

      SVG.querySelectorAll<SVGTextElement>("text").forEach((text) => {
        text.style.opacity = "1";
      });

      store.setPathsFinished?.(Array(metas?.length ?? 0).fill(true));
      store.setCurrentUnit?.(store.totalUnits);
      setIsAnimating(false);
      store.pausedAtMsRef.current = store.totalMs;
    },
    [setIsAnimating],
  );

  useEffect(() => {
    useSVGAnimationStore.setState({
      PlayAnimation,
      PauseAnimation,
      ResumeAnimation,
      Seek,
      SeekToUnit: Seek,
      CancelAnimation,
    });

    return () => {
      useSVGAnimationStore.setState({
        PlayAnimation: undefined,
        PauseAnimation: undefined,
        ResumeAnimation: undefined,
        Seek: undefined,
        SeekToUnit: undefined,
        CancelAnimation: undefined,
      });
    };
  }, [PlayAnimation, PauseAnimation, ResumeAnimation, Seek, CancelAnimation]);

  const ToggleStrokesOrder = useCallback(
    (SVG: HTMLDivElement) => {
      if (!SVG) return;
      const texts = SVG.querySelectorAll<SVGTextElement>("text");
      const currentlyVisible = strokesOrderVisibleRef.current;
      toggleStrokesOrderVisible();

      requestAnimationFrame(() => {
        texts.forEach((text) => {
          text.style.display = currentlyVisible ? "none" : "block";
        });
      });
    },
    [strokesOrderVisibleRef, toggleStrokesOrderVisible],
  );

  return {
    PlayAnimation,
    PauseAnimation,
    ResumeAnimation,
    Seek,
    SeekToUnit: Seek,
    CancelAnimation,
    ToggleStrokesOrder,
  };
}
