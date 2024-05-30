import { BsGlobe } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";
import { ImLinkedin } from "react-icons/im";
import { RiTwitterXFill } from "react-icons/ri";
import logo from "../../assets/logo.png";

export default function Footer() {
  return (
    <footer className="flex justify-between bg-white_ish px-10 pb-32 pt-20">
      <div>
        <img className="w-72" src={logo} />
        <span className="text-ash_2 font-semibold text-[0.875rem]">
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
      <div className="flex flex-col gap-2 pr-20">
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
