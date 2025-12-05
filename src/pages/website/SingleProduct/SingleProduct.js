import { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import ImageGallery from "react-image-gallery";
import { useParams } from "react-router-dom";
import Axios from "../../../API/Axios";
import { CART, PRODUCT, PRODUCTS } from "../../../API/Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faStar as solid,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStart } from "@fortawesome/free-regular-svg-icons";
import Skeleton from "react-loading-skeleton";
import { Cart } from "../../../Context/CartChangerContext";
import PlusMinusBtn from "../../../components/website/Btns/PlusMinusBtn";
export default function SingleProduct() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(5);
  const [productImages, setProductImages] = useState([]);
  const { id } = useParams();
  const { setIsChanged } = useContext(Cart);

  const roundStars = Math.round(product.rating);
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
  useEffect(() => {
    Axios.get(`${PRODUCT}/${id}`)
      .then((res) => {
        setProductImages(
          res.data[0].images.map((img) => {
            return { original: img.image, thumbnail: img.image };
          })
        );
        setProduct(res.data[0]);
        console.log(res.data);
      })
      .finally(() => setLoading(false));
  }, []);
  const checkStock = async () => {
    try {
      const getItems = JSON.parse(localStorage.getItem("product")) || [];
      const productCount = getItems.filter((item) => item.id == id)?.[0]?.count;
      await Axios.post(`${CART}/check`, {
        product_id: id,
        count: count + (productCount ? productCount : 0),
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const handelSave = async () => {
    const check = await checkStock();
    if (check) {
      const getItems = JSON.parse(localStorage.getItem("product")) || [];
      const productExist = getItems.findIndex((pro) => pro.id == id);
      if (productExist !== -1) {
        if (getItems[productExist].count) {
          getItems[productExist].count += count;
        } else {
          getItems[productExist].count = count;
        }
      } else {
        if (count > 1) {
          product.count = count;
        }
        getItems.push(product);
      }
      localStorage.setItem("product", JSON.stringify(getItems));
      setIsChanged((prev) => !prev);
    }
  };

  return (
    <Container className="mt-5">
      <div className=" d-flex align-items-start  flex-wrap row-gap-5">
        {loading ? (
          <>
            <div className="col-lg-4 col-md-6 col-12">
              <Skeleton
                length="1"
                height="250px"
                // width="320px"
                classes="col-12 "
              ></Skeleton>
              {""}
              <div className=" col-12 d-flex gap-1 mt-1">
                <Skeleton
                  length="1"
                  height="100px"
                  width="120px"
                  classes="col-4 "
                ></Skeleton>
                <Skeleton
                  length="1"
                  height="100px"
                  width="120px"
                  classes="col-4 "
                ></Skeleton>
                <Skeleton
                  length="1"
                  height="100px"
                  width="120px"
                  classes="col-4 "
                ></Skeleton>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-12 ms-2 ">
              <Skeleton length="1" height="30px" classes="col-8"></Skeleton>
              <Skeleton length="1" height="100px" classes="col-8"></Skeleton>
              <div className="d-flex align-items-start justify-content-between mt-4">
                <Skeleton
                  length="1"
                  height="30px"
                  width="100px"
                  classes="col-8"
                ></Skeleton>
                <Skeleton
                  length="1"
                  height="30px"
                  width="100px"
                  classes="col-8"
                ></Skeleton>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="col-lg-4 col-md-6 col-12">
              <ImageGallery items={productImages} />
            </div>

            <div className="col-lg-8 col-md-6 col-12">
              <div className="ms-5">
                <h2 className="fw-bold my-2">{product.title}</h2>
                <div className=" text-muted my-2">{product.About}</div>
                <h5 className="text-dark">{product.description}</h5>
                <div className="d-flex align-items-center justify-content-between mt-3">
                  <div>
                    {showGoldStars}
                    {showEmptyStars}
                    <div className="d-flex align-items-center gap-3">
                      <h5 className="m-0 text-primary">{product.discount}$</h5>
                      <h6
                        className="m-0 "
                        style={{
                          color: "gray",
                          textDecoration: "line-through",
                        }}
                      >
                        {product.price}$
                      </h6>
                      {product.stock === 0 ? (
                        <p className="text-danger m-0">
                          this Product is unavilable
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-4">
                    <PlusMinusBtn
                      setCount={(data) => setCount(data)}
                    ></PlusMinusBtn>
                    <div onClick={handelSave} className="border p-2 rounded">
                      <FontAwesomeIcon
                        icon={faCartShopping}
                        style={{ cursor: "pointer" }}
                      ></FontAwesomeIcon>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Container>
  );
}
