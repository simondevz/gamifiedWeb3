import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import ConnectBtn from "./connectButton";

export default function NavBar({
  showConnect,
  home,
}: {
  showConnect?: boolean;
  home?: boolean;
}) {
  return (
    <nav
      className={
        (home ? " " : "drop-shadow-lg bg-white ") +
        " flex justify-between px-8 py-4"
      }
    >
      <div className="flex w-full">
        <img className="h-8" src={logo} alt="Site logo" />
      </div>
      <div
        className={
          (home ? "text-white " : "text-black ") + "flex gap-8 my-auto"
        }
      >
        <NavLink className={"flex text-nowrap"} to={"#"}>
          Home
        </NavLink>
        <NavLink className={"flex text-nowrap"} to={"#"}>
          Our Games
        </NavLink>
        <NavLink className={"flex text-nowrap"} to={"#"}>
          About us
        </NavLink>
        <NavLink className={"flex text-nowrap"} to={"#"}>
          Contact
        </NavLink>
        <NavLink className={"flex text-nowrap"} to={"#"}>
          Support
        </NavLink>
      </div>
      <div className="flex w-full">
        <div className={(showConnect ? "flex " : "hidden ") + ""}>
          <ConnectBtn />
        </div>
      </div>
    </nav>
  );
}
