import { useEffect, useRef } from "react";
import throttle from "lodash/throttle";

/**
 * A React hook that provides advanced scroll event handling with customizable thresholds and behaviors.
 *
 * This hook monitors scroll events and triggers callbacks based on scroll direction, distance, and idle states.
 * It's particularly useful for implementing features like navbar hiding/showing, infinite scroll, or
 * scroll-based animations with fine-grained control over when actions are triggered.
 *
 * @param options - Configuration object for scroll behavior
 * @param options.scrollTarget - The DOM element or window to monitor for scroll events.
 *   Pass a specific HTMLElement to monitor scrolling within that container, or leave undefined for window scrolling.
 *   @default window
 * @param options.startThreshold - Minimum scroll position (in pixels) before any scroll logic is applied.
 *   Useful for ignoring small scrolls at the top of the page.
 *   @default 0
 * @param options.gapThreshold - Minimum scroll distance (in pixels) required to trigger scroll callbacks.
 *   Prevents excessive callback firing on small scroll movements.
 *   @default 15
 * @param options.upThreshold - Maximum scroll position (in pixels) where upward scroll callbacks are allowed.
 *   When set, onScrollUp will only fire when currentScrollY <= upThreshold. Useful for showing navbars
 *   only when near the top of the page.
 *   @default undefined (no limit)
 * @param options.idleTimeout - Time in milliseconds to wait before triggering the idle callback.
 *   The idle callback fires when scrolling stops for this duration.
 *   @default 1500
 * @param options.onScrollDown - Callback fired when scrolling down past the gap threshold.
 *   Common use cases: hide navigation bars, trigger "load more" actions.
 * @param options.onScrollUp - Callback fired when scrolling up past the gap threshold.
 *   Common use cases: show navigation bars, reveal hidden UI elements.
 * @param options.onIdle - Callback fired when scrolling stops for the specified idle timeout duration.
 *   Common use cases: show tooltips, save scroll position, trigger analytics events.
 *
 * @example
 * // Basic navbar hide/show behavior
 * useScrollHandler({
 *   onScrollDown: () => setNavbarVisible(false),
 *   onScrollUp: () => setNavbarVisible(true),
 *   gapThreshold: 10,
 *   upThreshold: 100 // Only show navbar when near top
 * });
 *
 * @example
 * // Scroll-based animations
 * useScrollHandler({
 *   startThreshold: 200,
 *   onScrollDown: () => setAnimationDirection('down'),
 *   onScrollUp: () => setAnimationDirection('up'),
 *   gapThreshold: 5
 * });
 */

interface ScrollHandlerOptions {
  /** The DOM element or window to monitor for scroll events @default window */
  scrollTarget?: HTMLElement | Window;
  /** Minimum scroll position before any logic is applied @default 0 */
  startThreshold?: number;
  /** Minimum scroll distance to trigger callbacks @default 15 */
  gapThreshold?: number;
  /** Maximum scroll position where onScrollUp can fire @default undefined */
  upThreshold?: number;
  /** Idle timeout in milliseconds @default 1500 */
  idleTimeout?: number;
  /** Callback fired when scrolling down */
  onScrollDown?: () => void;
  /** Callback fired when scrolling up */
  onScrollUp?: () => void;
  /** Callback fired when scrolling stops */
  onIdle?: () => void;
}

function useScrollHandler({
  scrollTarget = window,
  startThreshold = 0,
  gapThreshold = 15,
  upThreshold,
  idleTimeout = 1500,
  onScrollDown = () => {},
  onScrollUp = () => {},
  onIdle = () => {},
}: ScrollHandlerOptions = {}) {
  const scrollYPos = useRef(0);
  const previousScrollY = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = throttle(() => {
      const currentScrollY = Math.round(
        scrollTarget instanceof Window
          ? window.scrollY
          : (scrollTarget as HTMLElement).scrollTop,
      );

      scrollYPos.current = currentScrollY;

      // Only apply scroll logic if we've scrolled past the start threshold
      if (currentScrollY >= startThreshold) {
        // Scroll Down Detection
        if (currentScrollY > previousScrollY.current) {
          // Fire callback if this is the first scroll or we've moved enough distance
          if (
            previousScrollY.current === 0 ||
            currentScrollY - previousScrollY.current > gapThreshold
          ) {
            onScrollDown();
          }
        }
        // Scroll Up Detection
        else if (currentScrollY < previousScrollY.current) {
          // Fire callback if we're at top or moved enough distance
          if (
            currentScrollY === 0 ||
            previousScrollY.current - currentScrollY > gapThreshold
          ) {
            // Respect upThreshold limit if set
            if (!upThreshold || currentScrollY <= upThreshold) {
              onScrollUp();
            }
          }
        }
      }

      // Idle Detection - reset timer on every scroll
      if (idleTimeout) {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
          onIdle();
        }, idleTimeout);
      }

      previousScrollY.current = currentScrollY;
    }, 10); // Throttle to max 100 calls/second (every 10ms)

    scrollTarget.addEventListener("scroll", handleScroll);

    return () => {
      scrollTarget.removeEventListener("scroll", handleScroll);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      handleScroll.cancel(); // Cancel any pending throttled calls
    };
  }, [
    scrollTarget,
    startThreshold,
    gapThreshold,
    upThreshold,
    idleTimeout,
    onScrollDown,
    onScrollUp,
    onIdle,
  ]);
}

export default useScrollHandler;
