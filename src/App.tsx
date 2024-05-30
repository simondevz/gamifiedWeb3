import { Outlet } from "react-router-dom";
import "./App.css";
import Footer from "./components/utils/footer";
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/all";
import gsap from "gsap";

// GSAP - Register plugins
gsap.registerPlugin(useGSAP, Draggable);

function App() {
  return (
    <>
      {/* <NavBar /> */}
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
