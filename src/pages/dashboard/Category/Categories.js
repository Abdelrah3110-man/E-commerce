import { CATEGORIES, baseURL, USER, USERS, CATEGORY } from "../../../API/Api";
import { useState, useEffect } from "react";
import Axios from "../../../API/Axios";
import { data, Link } from "react-router-dom";
import TableShow from "../../../components/dashboard/Table";
import PaginatedItems from "../../../components/dashboard/Pagination/Pagination";
export default function Categories() {
  const [cat, setCat] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [total, setTotal] = useState();
  const [loading, setLoading] = useState(false);
  const header = [
    {
      key: "title",
      name: "Title",
    },
    {
      key: "image",
      name: "Image",
    },
    {
      key: "created_at",
      name: "Created",
    },
    {
      key: "updated_at",
      name: "Updated",
    },
  ];
  // categories
  useEffect(() => {
    setLoading(true);
    Axios.get(`/${CATEGORIES}?limit=${limit}&page=${page}`)
      .then((data) => {
        setCat(data.data.data);
        setTotal(data.data.total);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [limit, page]);
  //handel Delete
  async function handelDelete(id) {
    try {
      const res = await Axios.delete(`${CATEGORY}/${id}`);
      setCat((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className=" bg-white p-2 w-100">
      <div className="d-flex align-content-center justify-content-between my-3">
        <h1>Categories Page</h1>
        <Link className="btn btn-success m-2 " to="/dashboard/category/add">
          Add Category
        </Link>
      </div>
      <TableShow
        header={header}
        data={cat}
        delete={handelDelete}
        limit={limit}
        page={page}
        setPage={setPage}
        setLimit={setLimit}
        loading={loading}
        total={total}
        search="title"
        searchLink={CATEGORY}
      ></TableShow>
    </div>
  );
}
