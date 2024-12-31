import { IconType } from "./iconTypes";

export function PlayIcon({
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
    >
      <path d="M5 3.9716C5 3.56491 5.45968 3.32835 5.79062 3.56473L11.4304 7.59313C11.7096 7.79254 11.7096 8.20746 11.4304 8.40687L5.79062 12.4353C5.45969 12.6717 5 12.4351 5 12.0284V3.9716Z" />
    </svg>
  );
}
