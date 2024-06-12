import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import ConnectBtn from "./connectButton";
import { IoMenu } from "react-icons/io5";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useRef, useState } from "react";

export default function NavBar({
  showConnect,
  home,
}: {
  showConnect?: boolean;
  home?: boolean;
}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLDivElement>(null);
  const open = Boolean(anchorEl);
  const anchorRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (anchorRef.current) setAnchorEl(anchorRef.current);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <nav
      className={
        (home
          ? " "
          : "drop-shadow-lg bg-white max-md:bg-red-500 max-sm:bg-blue-500 max-xs:bg-green-500 max-2xs:bg-yellow-500 max-lg:bg-cyan-950") +
        " flex justify-between px-8 max-md:px-4 py-4 "
      }
    >
      <div className="flex w-full">
        <img className="h-8 max-md:h-6" src={logo} alt="Site logo" />
      </div>
      <div
        className={
          (home ? "text-white " : "text-black ") +
          "flex gap-8  max-lg:gap-4 my-auto max-md:text-[0.875rem]  max-sm:hidden"
        }
      >
        <NavLink className={"flex text-nowrap"} to={"/"}>
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
      <div className="flex flex-row-reverse w-full  max-sm:hidden">
        <div className={(showConnect ? "flex " : "hidden ") + ""}>
          <ConnectBtn />
        </div>
      </div>

      {/* Menu for mobile screens */}
      <div
        ref={anchorRef}
        className={
          "hidden max-sm:flex " +
          (open ? " h-0 w-[10rem] justify-start " : " justify-end")
        }
      >
        <button className={open ? "hidden " : "flex "} onClick={handleClick}>
          <IoMenu size={"2rem"} />
        </button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem
            sx={{
              width: "8rem",
            }}
            onClick={handleClose}
          >
            <NavLink className={"flex text-nowrap"} to={"#"}>
              Home
            </NavLink>
          </MenuItem>
          <MenuItem
            sx={{
              width: "8rem",
            }}
            onClick={handleClose}
          >
            <NavLink className={"flex text-nowrap"} to={"#"}>
              Our Games
            </NavLink>
          </MenuItem>
          <MenuItem
            sx={{
              width: "8rem",
            }}
            onClick={handleClose}
          >
            <NavLink className={"flex text-nowrap"} to={"#"}>
              About us
            </NavLink>
          </MenuItem>
          <MenuItem
            sx={{
              width: "8rem",
            }}
            onClick={handleClose}
          >
            <NavLink className={"flex text-nowrap"} to={"#"}>
              Contact
            </NavLink>
          </MenuItem>
          <MenuItem
            sx={{
              width: "8rem",
            }}
            onClick={handleClose}
          >
            <NavLink className={"flex text-nowrap"} to={"#"}>
              Support
            </NavLink>
          </MenuItem>
        </Menu>
      </div>
    </nav>
  );
}
