import { useEffect, useState } from "react";
import Axios from "../../../../API/Axios";
import { TopRated } from "../../../../API/Api";
import { Container } from "react-bootstrap";

import SkeletonShow from "../../../Skeleton/SkeletonShow";
import TopRatedProduct from "./TopRatedProduct";

export default function ShowTopProduct() {
  const [Products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Axios.get(`${TopRated}`)
      .then((res) => {
        setProducts(res.data);
      })
      .finally(() => setLoading(false));
  }, []);
  console.log(Products);
  const showProduct = Products.map((Pro) => (
    <TopRatedProduct
      title={Pro.title}
      description={Pro.description}
      img={Pro.images[0].image}
      sale
      price={Pro.price}
      discount={Pro.discount}
      rating={Pro.rating}
      id={Pro.id}
    />
  ));
  return (
    <Container className="mt-4  mb-5  col-lg-6 col-md-12 col-12 ">
      <div className="col-lg-11 col-md-12 col-12 border rounded  border-primary p-5">
        <h1 className="display-4 fw-bold text-center  text-primary ">
          Top Rated
        </h1>
        <div className="d-flex align-items-stretch justify-content-center flex-wrap mt-5 row-gap-2 mb-5">
          {loading ? (
            <SkeletonShow
              length="5"
              height="150px"
              width="450px"
              classes="col-lg-12 col-md-12 col-12"
            ></SkeletonShow>
          ) : (
            showProduct
          )}
        </div>
      </div>
    </Container>
  );
}
