import { LOGOUT } from "../../API/Api";
import Cookies from "universal-cookie";
import { Axios } from "../../API/Axios";
import { useNavigate } from "react-router-dom";
// const cookie = new Cookies(); f
// const token = cookie.get("e-commerce");
const cookie = new Cookies();
const navigate = useNavigate();
export default function Logout() {
  async function handelLogout() {
    try {
      const res = await Axios.get(`/${LOGOUT}`);
      navigate("/login", { replace: true });
      cookie.remove("e-commerce");
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <button className="btn btn-primary" onClick={handelLogout}>
      Logout
    </button>
  );
}
