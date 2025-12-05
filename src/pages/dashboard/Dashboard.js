import { Outlet } from "react-router-dom";
import SideBar from "../../components/dashboard/SideBar";
import TopBar from "../../components/dashboard/TopBar";
import "./dashboard.css";
export default function Dashboard() {
  return (
    <div className=" position-relative">
      <TopBar></TopBar>
      <div
        className="d-flex gap-1 h-100 "
        style={{
          marginTop: "70px",
        }}
      >
        <SideBar></SideBar>
        <Outlet></Outlet>
      </div>
    </div>
  );
}
