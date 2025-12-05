import { useEffect, useState } from "react";
import Axios from "../../../../API/Axios";
import { LatestSale } from "../../../../API/Api";
import { Container } from "react-bootstrap";
import SkeletonShow from "../../../Skeleton/SkeletonShow";
import SaleProduct from "./SaleProducts";

export default function LatestSaleProduct() {
  const [Products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Axios.get(`${LatestSale}`)
      .then((res) => {
        setProducts(res.data);
      })
      .finally(() => setLoading(false));
  }, []);
  console.log(Products);
  const showProduct = Products.map((Pro) => (
    <div className="col-lg-3 col-md-6 col-12">
      <SaleProduct
        title={Pro.title}
        description={Pro.description}
        img={Pro.images[0].image}
        sale
        price={Pro.price}
        discount={Pro.discount}
        id={Pro.id}
        rating={Pro.rating}
      />
    </div>
  ));
  return (
    <Container className="mt-3">
      <h1 className="display-2 fw-bold  text-primary">Latest Sale Products</h1>
      <div className="d-flex align-align-items-stretch justify-content-center flex-wrap mt-5 row-gap-2 mb-5">
        {loading ? (
          <SkeletonShow
            length="5"
            height="400px"
            classes="col-lg-3 col-md-6 col-12"
          ></SkeletonShow>
        ) : (
          showProduct
        )}
      </div>
    </Container>
  );
}
