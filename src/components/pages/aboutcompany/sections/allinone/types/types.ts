export interface ServiceCardProps {
  id: number | string;
  icon: string;
  title: string;
  description: string;
  tags: string[];
  linkUrl: string;
  highlightWords?: string[];
}
