import { IconType } from "./iconTypes";

export function PauseIcon({
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
      <rect x="5" y="3.5" width="2" height="9" rx="0.5" />
      <rect x="9" y="3.5" width="2" height="9" rx="0.5" />
    </svg>
  );
}
