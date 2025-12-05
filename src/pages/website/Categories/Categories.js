import { useEffect, useState } from "react";
import Axios from "../../../API/Axios";
import { CATEGORIES } from "../../../API/Api";
import NavBar from "../../../components/website/NavBar/NavBar";
import { Container } from "react-bootstrap";
import StringSlice from "../../../helpers/StringSlice";
import Skeleton from "react-loading-skeleton";
import SkeletonShow from "../../../components/Skeleton/SkeletonShow";

export default function WebsiteCategories() {
  const [cat, setCat] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get(`${CATEGORIES}`)
      .then((data) => {
        setCat(data.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, []);

  const showCat = cat.map((item) => (
    <div className="col-lg-2 col-md-6 col-12 bg-transparent border-0 ">
      <div className="m-1 bg-white border d-flex align-items-center justify-content-start gap-2 rounded py-2 h-100">
        <img className="mx-3" width="50px" src={item.image}></img>
        <p className="m-0">
          <h6 className="m-0">{StringSlice(item.title, 15)}</h6>
        </p>
      </div>
    </div>
  ));
  return (
    <>
      <div className="  bg-secondary py-5">
        <Container>
          <div className=" d-flex align-align-items-stretch justify-content-center flex-wrap row-gap-2">
            {loading ? (
              <>
                <SkeletonShow
                  length="50"
                  height="70px"
                  baseColor="white"
                  classes="col-lg-2 col-md-6 col-12"
                ></SkeletonShow>
              </>
            ) : (
              showCat
            )}
          </div>
        </Container>
      </div>
    </>
  );
}
