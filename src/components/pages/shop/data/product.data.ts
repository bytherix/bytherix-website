import oneForAllImage from "../../../../assets/products/one for all.jpeg";
import pemImage from "../../../../assets/products/pam.jpeg";
import schoolImage from "../../../../assets/shop/school.jpeg";

export type ProductCategory = "digital" | "software";

export interface ProductItem {
  id: string;
  name: string;
  shortName: string;
  description: string;
  category: ProductCategory;
  label: string;
  action: string;
  href: string;
  accent: "blue" | "red" | "green";
  tags: string[];
  image: string;
}

export const digitalProducts: ProductItem[] = [
  {
    id: "pam",
    name: "PAM",
    shortName: "PAM",
    description:
      "A focused digital product experience designed to simplify modern workflows and everyday operations.",
    category: "digital",
    label: "Digital Product",
    action: "Explore PAM",
    href: "/products/PAM",
    accent: "blue",
    tags: ["Digital", "Workflow", "Product"],
    image: pemImage,
  },
  
   {
    id: "student-management",
    name: "Student Management System",
    shortName: "SMS",
    description:
      "A structured digital system designed to simplify student management, academic workflows, and administration.",
    category: "digital",
    label: "Digital Product",
    action: "Explore System",
    href: "#",
    accent: "green",
    tags: ["Education", "Management", "System"],
    image: schoolImage,
  },
];

export const softwareProducts: ProductItem[] = [
  {
    id: "one-for-all",
    name: "One For All",
    shortName: "OFA",
    description:
      "A connected management ecosystem that brings people, operations, workflows, and information into one platform.",
    category: "software",
    label: "Featured Product",
    action: "Explore One For All",
    href: "/products/one-for-all",
    accent: "blue",
    tags: ["Management", "Platform", "Software"],
    image: oneForAllImage,
  },
];

export const allProducts = [...digitalProducts, ...softwareProducts];
