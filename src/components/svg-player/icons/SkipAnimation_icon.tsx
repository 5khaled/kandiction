import { IconType } from "./iconTypes";

export function SkipAnimationIcon({
  direction = "forward",
  size = 32,
  opacity = 1,
  color = "white"
}: IconType) {
  return (
    <svg
      viewBox="0 0 16 16"
      width={size}
      height={size}
      fill={color}
      opacity={opacity}
      className={`${direction === "backward" && "rotate-180"}`}
    >
      <path d="M0 3.9716C0 3.56491 0.459685 3.32835 0.790619 3.56473L6.43039 7.59313C6.70956 7.79254 6.70956 8.20746 6.43039 8.40687L0.790619 12.4353C0.459685 12.6717 0 12.4351 0 12.0284V3.9716Z" />
      <path d="M7 3.9716C7 3.56491 7.45968 3.32835 7.79062 3.56473L13.4304 7.59313C13.7096 7.79254 13.7096 8.20746 13.4304 8.40687L7.79062 12.4353C7.45969 12.6717 7 12.4351 7 12.0284V3.9716Z" />
      <rect x="14" y="3.5" width="2" height="9" rx="0.5" />
    </svg>
  );
}
