import {
  CATEGORIES,
  baseURL,
  USER,
  USERS,
  CATEGORY,
  PRODUCTS,
  PRODUCT,
} from "../../../API/Api";
import { useState, useEffect } from "react";
import Axios from "../../../API/Axios";
import { Link } from "react-router-dom";
import TableShow from "../../../components/dashboard/Table";
export default function Products() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState();

  const header = [
    {
      key: "images",
      name: "Images",
    },
    {
      key: "title",
      name: "Title",
    },
    {
      key: "description",
      name: "Description",
    },
    {
      key: "price",
      name: "Price",
    },
    {
      key: "rating",
      name: "Rating",
    },
  ];
  // users
  useEffect(() => {
    Axios.get(`/${PRODUCTS}?limit=${limit}&page=${page}`)
      .then((data) => {
        setProducts(data.data.data);
        setTotal(data.data.total);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [limit, page]);
  //handel Delete
  async function handelDelete(id) {
    try {
      const res = await Axios.delete(`${PRODUCT}/${id}`);
      setProducts((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className=" bg-white p-2 w-100">
      <div className="d-flex align-content-center justify-content-between">
        <h1>Products Page</h1>
        <Link className="btn btn-success m-2 " to="/dashboard/product/add">
          Add product
        </Link>
      </div>
      <TableShow
        header={header}
        data={products}
        delete={handelDelete}
        setPage={setPage}
        page={page}
        limit={limit}
        setLimit={setLimit}
        loading={loading}
        total={total}
        search="title"
        searchLink={PRODUCTS}
      ></TableShow>
    </div>
  );
}
