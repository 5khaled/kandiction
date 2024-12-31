import { IconType } from "./iconTypes";

export function SkipStrokeIcon({
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
      <path d="M3.5 3.9716C3.5 3.56491 3.95968 3.32835 4.29062 3.56473L9.93039 7.59313C10.2096 7.79254 10.2096 8.20746 9.93039 8.40687L4.29062 12.4353C3.95969 12.6717 3.5 12.4351 3.5 12.0284V3.9716Z" />
      <rect x="10.5" y="3.5" width="2" height="9" rx="0.5" />
    </svg>
  );
}
