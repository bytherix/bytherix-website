import { CircleHelp, type LucideIcon } from "lucide-react";

export type FeatureIconValue =
  | { kind: "component"; component: LucideIcon }
  | { kind: "image"; src: string };

interface FeatureIconProps {
  type?: FeatureIconValue;
  color: string;
}

export default function FeatureIcon({
  type,
  color,
}: FeatureIconProps) {
  const icon = type ?? { kind: "component", component: CircleHelp };
  const className = "h-4 w-4 sm:h-5 sm:w-5";

  if (icon.kind === "image") {
    return (
      <img
        src={icon.src}
        alt=""
        aria-hidden="true"
        className={className}
      />
    );
  }

  const Icon = icon.component;

  return (
    <Icon
      className={className}
      style={{ color }}
      strokeWidth={1.8}
    />
  );
}