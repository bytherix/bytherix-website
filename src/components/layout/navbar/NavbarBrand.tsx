import { Link } from "react-router-dom";

import bytherixEmblem from "../../../assets/logo.png";

import {
  BRAND,
  TECHNOLOGY,
  getBrandColor,
} from "./constants/navbar.constants";

interface NavbarBrandProps {
  docked: boolean;
  onLogoClick: (
    event: React.MouseEvent<HTMLAnchorElement>,
  ) => void;
}

const NavbarBrand = ({
  docked,
  onLogoClick,
}: NavbarBrandProps) => {
  if (!docked) return null;

  return (
    <div className="relative z-20 flex shrink-0 items-center gap-2.5">
      <Link
        to="/"
        onClick={onLogoClick}
        aria-label="Go to Home"
        className="block h-9 w-9 shrink-0 overflow-hidden rounded-full border border-white/20 bg-[#050814] sm:h-10 sm:w-10 lg:h-11 lg:w-11"
      >
        <img
          src={bytherixEmblem}
          alt=""
          className="block h-full w-full object-cover"
        />
      </Link>

      <div className="flex flex-col items-start">
        <div className="flex font-['Inter'] text-[1.08rem] font-bold leading-none tracking-wide">
          {BRAND.split("").map((char, index) => (
            <span key={`brand-${index}`} className={getBrandColor(index)}>
              {char}
            </span>
          ))}
        </div>
        <span className="mt-[3px] font-['Inter'] text-[0.46rem] font-medium uppercase leading-none tracking-[0.14em] text-white">
          {TECHNOLOGY}
        </span>
      </div>
    </div>
  );
};

export default NavbarBrand;