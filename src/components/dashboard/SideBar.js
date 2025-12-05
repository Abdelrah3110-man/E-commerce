import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./bars.css";
// import { faPlus, faUsers } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { Menu } from "../../Context/MenuContext";
import { useContext, useEffect, useState } from "react";
import { WindowSize } from "../../Context/WindowContext";
import Axios from "../../API/Axios";
import { USER } from "../../API/Api";
import { links } from "./NavLinks";
export default function SideBar() {
  const menu = useContext(Menu);
  const windowContext = useContext(WindowSize);
  const windowSize = windowContext.windowSize;
  // console.log(windowSize);
  const isOpen = menu.isOpen;
  // console.log(isOpen);
  const [User, setUser] = useState("");
  //current user
  useEffect(() => {
    Axios.get(`${USER}`)
      .then((res) => setUser(res.data))
      .catch(() => (window.location.pathname = "./login"));
  }, []);
  // console.log(links);
  return (
    <>
      <div
        className=" position-fixed  h-100 w-100 "
        style={{
          top: "70px",
          left: 0,
          backgroundColor: "rgba(0,0,0,0.2)",
          display: isOpen && windowSize < 768 ? "block" : "none",
        }}
      ></div>
      <div
        className="side-bar pt-3 "
        style={{
          left: windowSize < "768" ? (isOpen ? 0 : "-100%") : 0,
          width: isOpen ? "240px" : "fit-content",
          position: windowSize < 768 ? "fixed" : "sticky",
        }}
      >
        {links.map(
          (link, key) =>
            link.role.includes(User.role) && (
              <NavLink
                key={key}
                to={link.path}
                className={
                  "d-flex align-items-center gap-2 side-bar-link py-3 px-2 m-1"
                }
                style={{
                  padding: isOpen ? "10px 8px 10px 15px" : "10px 4px",
                }}
              >
                <FontAwesomeIcon icon={link.icon} />
                <p
                  className="m-0"
                  style={{ display: isOpen ? "block" : "none" }}
                >
                  {link.name}
                </p>
              </NavLink>
            )
        )}
      </div>
    </>
  );
}
