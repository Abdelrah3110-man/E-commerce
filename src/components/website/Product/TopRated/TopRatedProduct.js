import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faStar as solid,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStart } from "@fortawesome/free-regular-svg-icons";
import StringSlice from "../../../../helpers/StringSlice";
import { NavLink } from "react-router-dom";

export default function TopRatedProduct(props) {
  const roundStars = Math.round(props.rating);
  const stars = Math.min(roundStars, 5);
  const showGoldStars = Array.from({ length: stars }).map((_, index) => (
    <FontAwesomeIcon icon={solid} color="gold" key={index}></FontAwesomeIcon>
  ));
  const showEmptyStars = Array.from({ length: 5 - stars }).map((_, index) => (
    <FontAwesomeIcon
      icon={regularStart}
      color="gray"
      key={index}
    ></FontAwesomeIcon>
  ));
  return (
    <NavLink to={`/product/${props.id}`} className="col-lg-11 col-md-6 col-12 ">
      <div className=" border rounded p-3 ">
        <div className=" border-bottom pb-3">
          <div className="row">
            <div className="d-flex  align-items-start  justify-content-between">
              <div>
                <p style={{ color: "gray" }} className=" text-truncate">
                  {StringSlice(props.title, 35)}
                </p>
                <p>{StringSlice(props.description, 15)}</p>
              </div>
              <div>
                <div className="px-5 py-1">
                  <img src={props.img} className="img-fluid  "></img>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between mt-2">
          <div>
            {showGoldStars}
            {showEmptyStars}

            <div className="d-flex align-items-center gap-3">
              <h5 className="m-0 text-primary">{props.discount}$</h5>
              <h6
                className="m-0 "
                style={{ color: "gray", textDecoration: "line-through" }}
              >
                {props.price}$
              </h6>
            </div>
          </div>
          <div className="border p-2 rounded">
            <FontAwesomeIcon icon={faCartShopping}></FontAwesomeIcon>
          </div>
        </div>
      </div>
    </NavLink>
  );
}
