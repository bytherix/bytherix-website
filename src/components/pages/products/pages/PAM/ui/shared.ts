/**
 * Single import point for the shared One For All UI primitives.
 *
 * PAM deliberately reuses the existing SectionHeading / GlassCard /
 * StaggerGrid / Pill components (rather than copying them) so both product
 * pages stay visually identical. If the shared primitives are ever moved,
 * update the paths here and nothing else.
 */
export { default as SectionHeading } from "../../one-for-all/ui/SectionHeading";
export { default as GlassCard } from "../../one-for-all/ui/GlassCard";
export { default as StaggerGrid } from "../../one-for-all/ui/StaggerGrid";
export { default as Pill } from "../../one-for-all/ui/Pill";
