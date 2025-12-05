import { Outlet } from "react-router-dom";
import NavBar from "../../components/website/NavBar/NavBar";

export default function WebsiteNav() {
  return (
    <>
      <NavBar></NavBar>
      <Outlet></Outlet>
    </>
  );
}
