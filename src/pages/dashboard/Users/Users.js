import { useEffect, useState } from "react";
import { USER, USERS } from "../../../API/Api";
import Axios from "../../../API/Axios";
import { Link } from "react-router-dom";
import TableShow from "../../../components/dashboard/Table";
export default function Users() {
  const [users, setUsers] = useState([]);
  const [delUser, setDelUser] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState();

  //current user
  useEffect(() => {
    Axios.get(`${USER}`).then((res) => setCurrentUser(res.data));
  }, []);
  // users
  useEffect(() => {
    Axios.get(`/${USERS}?limit=${limit}&page=${page}`)
      .then((data) => {
        setUsers(data.data.data);
        setTotal(data.data.total);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [delUser, limit, page]);

  const header = [
    {
      key: "name",
      name: "Username",
    },
    {
      key: "email",
      name: "Email",
    },
    {
      key: "role",
      name: "Role",
    },
  ];
  //handel Delete
  async function handelDelete(id) {
    try {
      const res = await Axios.delete(`${USER}/${id}`);
      setUsers((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className=" bg-white p-2 w-100  shadow-sm">
      <div className="d-flex align-content-center justify-content-between">
        <h1>Users Page</h1>
        <Link className="btn btn-primary m-2 " to="/dashboard/user/add">
          Add user
        </Link>
      </div>
      <TableShow
        header={header}
        data={users}
        delete={handelDelete}
        currentUser={currentUser}
        setPage={setPage}
        page={page}
        limit={limit}
        setLimit={setLimit}
        loading={loading}
        total={total}
        search="name"
        searchLink={USER}
      ></TableShow>
    </div>
  );
}
