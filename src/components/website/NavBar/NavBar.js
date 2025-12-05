import {
  faCartShopping,
  faCircleUser,
  faXmark,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from "../../../API/Axios";
import { useContext, useEffect, useState } from "react";
import { Button, Container, Form, Modal } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { CART, CATEGORIES } from "../../../API/Api";
import StringSlice from "../../../helpers/StringSlice";
import SkeletonShow from "../../Skeleton/SkeletonShow";
import { Cart } from "../../../Context/CartChangerContext";
import PlusMinusBtn from "../Btns/PlusMinusBtn";

export default function NavBar() {
  const [cat, setCat] = useState([]);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const { isChanged } = useContext(Cart);
  const { id } = useParams();
  const [count, setCount] = useState(0);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    Axios.get(`${CATEGORIES}`)
      .then((data) => {
        setCat(data.data.slice(-8));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const getProducts = JSON.parse(localStorage.getItem("product")) || [];
    setProducts(getProducts);
  }, [isChanged]);

  const handelDelete = (id) => {
    const filterProducts = products.filter((product) => product.id !== id);
    setProducts(filterProducts);
    localStorage.setItem("product", JSON.stringify(filterProducts));
  };

  const changeCount = (id, btnCount) => {
    const getProducts = JSON.parse(localStorage.getItem("product")) || [];
    const findProduct = getProducts.find((product) => product.id === id);
    findProduct.count = btnCount;
    localStorage.setItem("product", JSON.stringify(getProducts));
  };

  const productShow = products?.map((product, key) => (
    <div className="mb-4 position-relative" key={key}>
      <div className="d-flex align-items-start gap-2 flex-wrap">
        <div
          onClick={() => handelDelete(product.id)}
          className=" position-absolute top-0 end-0 rounded-circle bg-danger d-flex align-items-center justify-content-center text-white"
          style={{ width: "20px", height: "20px", cursor: "pointer" }}
        >
          <FontAwesomeIcon icon={faXmark} width="10px"></FontAwesomeIcon>
        </div>
        <img
          src={product.images[0].image}
          height={"80px"}
          style={{ objectFit: "cover" }}
          className="rounded col-sm-3 col-12"
          alt="img"
        ></img>
        <div className="col-cm-6 col-12">
          <h6>{product.title}</h6>
          <p className="m-0 text-truncate">{product.description}</p>
          <div className="d-flex align-items-center gap-3">
            <h5 className="m-0 text-Primary">${product.discount}</h5>
            <h6
              className="m-0"
              style={{ color: "gray", textDecoration: "line-through" }}
            >
              ${product.price}
            </h6>
          </div>
        </div>
        <PlusMinusBtn
          setCount={setCount}
          count={product.count || 1}
          changeCount={changeCount}
          id={product.id}
        ></PlusMinusBtn>
      </div>
    </div>
  ));

  const showCat = cat.map((category) => (
    <Link>
      <h6 className="m-0 text-primary">{StringSlice(category.title, 12)}</h6>
    </Link>
  ));
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>{productShow}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Check Out
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="py-3  border-3 border-bottom border-primary">
        <Container>
          <div className=" d-flex  align-items-center justify-content-between flex-wrap">
            <Link className="col-3" to={"/"}>
              <h3>E-Commerce</h3>
            </Link>
            <div className="col-12 col-md-6 order-md-2 order-3 mt-md-0 mt-3 position-relative">
              <Form.Control
                type="search"
                className="py-3 rounded-2  rounded-end-4 "
                placeholder="Search Product"
              ></Form.Control>
              <h3 className="btn btn-primary position-absolute  rounded-end-4 rounded-start-0 top-0 end-0 h-100 line-height m-0 rounded d-flex align-items-center justify-content-center">
                Search
              </h3>
            </div>
            <div className="col-3 d-flex align-items-center justify-content-end gap-4 order-md-3 order-1">
              <div onClick={handleShow}>
                <Link>
                  <FontAwesomeIcon
                    icon={faCartShopping}
                    style={{ cursor: "pointer" }}
                    className="fa-2x"
                  />
                </Link>
              </div>
              <Link to={"/Profile"}>
                <FontAwesomeIcon
                  icon={faCircleUser}
                  className="fa-2x"
                  color="gray"
                />
              </Link>
            </div>
          </div>
          <div className="mt-3">
            <div className=" d-flex align-items-center justify-content-between gap-1 flex-wrap ">
              {loading ? (
                <>
                  <SkeletonShow
                    length="9"
                    height="20px"
                    width="70px"
                    classes="col-lg-1 col-md-6 col-12"
                  ></SkeletonShow>
                </>
              ) : (
                <>
                  {showCat}
                  <Link to={"/categories"} className="text-primary">
                    Show all
                  </Link>
                </>
              )}
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
