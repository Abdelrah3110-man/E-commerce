import { Link } from "react-router-dom";
import "./403";
export default function Err403({ role }) {
  return (
    <div className=" container">
      <div className=" row d-flex justify-content-center align-content-center m-4">
        <div data-Content={404} className="  display-1  text-danger  m-auto">
          403 - ACCESS DENIED
        </div>
        <div className=" h1">
          Oops , You don't have permission yo access this page
          <Link
            to={role === "1996" ? "/dashboard/writer" : "/"}
            className=" d-block text-center btn btn-danger mt-5"
          >
            {role === "1996" ? "Go to Writer Page" : "Go To Home Page"}
          </Link>
        </div>
      </div>
    </div>
  );
}
