import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu } from "../../Context/MenuContext";
import { useContext, useEffect, useState } from "react";
import Axios from "../../API/Axios";
import { LOGOUT, USER } from "../../API/Api";
import { Dropdown, DropdownButton } from "react-bootstrap";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
const cookie = new Cookies();
export default function TopBar() {
  const menu = useContext(Menu);
  const setIsOpen = menu.setIsOpen;
  const [name, setName] = useState();
  useEffect(() => {
    Axios.get(`${USER}`)
      .then((data) => setName(data.data.name))
      .catch((err) => console.log(err));
  }, []);

  const navigate = useNavigate();
  async function handelLogout() {
    try {
      const res = await Axios.get(`/${LOGOUT}`);
      cookie.remove("e-commerce", { path: "/" });
      navigate("/login", { replace: true });
      // window.location.pathname = "/login";
      // console.log(res);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="top-bar ">
      <div className="d-flex justify-content-between align-items-between h-100">
        <div className=" d-flex align-items-center gap-3">
          <h3>E-Commerce</h3>
          <FontAwesomeIcon
            onClick={() => setIsOpen((prev) => !prev)}
            icon={faBars}
            cursor={PointerEvent}
            className="bars"
          />
        </div>
        <div className="m-3">
          <DropdownButton
            id="dropdown-basic-button"
            variant="dark"
            title={
              <>
                <FontAwesomeIcon icon={faUser} /> {name}
              </>
            }
          >
            <Dropdown.Item onClick={handelLogout}>Logout</Dropdown.Item>
          </DropdownButton>
        </div>
      </div>
    </div>
  );
}
