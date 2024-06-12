import { BsGlobe } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";
import { ImLinkedin } from "react-icons/im";
import { RiTwitterXFill } from "react-icons/ri";
import logo from "../../assets/logo.png";

export default function Footer() {
  return (
    <footer className="flex max-sm:flex-col max-sm:gap-8 max-sm:pt-8 justify-between bg-white_ish px-10 pb-32 pt-20 max-md:text-[0.75rem] max-lg:text-[0.875rem]">
      <div>
        <img className="max-lg:w-60 max-md:w-52 w-72" src={logo} />
        <span className="text-ash_2 font-semibold text-[0.875rem] max-lg:text-[0.75rem] max-md:text-[0.5rem]">
          &copy; 2024 Learn3Play. All Rights Reserved.
        </span>
      </div>
      <div className="flex flex-col gap-4 capitalize">
        <div>
          <span className="font-bold">Community</span>
        </div>
        <ul className="flex flex-col gap-2">
          <li>Blog</li>
          <li>Forum</li>
          <li>Community</li>
        </ul>
      </div>
      <div className="flex flex-col gap-4 capitalize">
        <div>
          <span className="font-bold">resources</span>
        </div>
        <ul className="flex flex-col gap-2">
          <li>help center</li>
          <li>partners</li>
          <li>suggestions</li>
          <li>twitter</li>
        </ul>
      </div>
      <div className="flex flex-col gap-4 capitalize">
        <div>
          <span className="font-bold">company</span>
        </div>
        <ul className="flex flex-col gap-2">
          <li>Terms & condition</li>
          <li>Privacy policy</li>
          <li>disclaimer</li>
          <li>content request</li>
          <li>feedback</li>
          <li>support</li>
        </ul>
      </div>
      <div className="flex flex-col gap-2 max-lg:pr-6 max-md:pr-2 pr-20">
        <div className="flex gap-3">
          <button>
            <GrInstagram />
          </button>
          <button>
            <RiTwitterXFill />
          </button>
          <button>
            <FaFacebook />
          </button>
          <button>
            <ImLinkedin />
          </button>
        </div>
        <div className="flex gap-3">
          <span className="flex my-auto">
            <BsGlobe />
          </span>
          <span className="flex my-auto">English</span>
        </div>
      </div>
    </footer>
  );
}
