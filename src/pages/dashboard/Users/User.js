import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Axios from "../../../API/Axios";
import { USER } from "../../../API/Api";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../../components/loading/Loading";
export default function User() {
  const navigate = useNavigate();
  const [disable, setDisable] = useState(true);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({ name: "", email: "", role: "" });
  //id
  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    Axios.get(`${USER}/${id}`)
      .then(
        (data) =>
          setUser({
            ...user,
            name: data.data.name,
            email: data.data.email,
            role: data.data.role,
          }),
        setLoading(false)
      )
      .then(() => setDisable(false))
      .catch(() => {
        navigate("/dashboard/user/page/404", { replace: true });
      });
  }, []);
  //handel on submit
  async function handelSubmit(e) {
    setLoading(true);
    e.preventDefault();

    try {
      const res = await Axios.post(`${USER}/edit/${id}`, {
        name: user.name,
        email: user.email,
        role: user.role,
      });
      navigate("/dashboard/users", { replace: true });
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }
  return (
    <div className="bg-white w-100 mx-2 p-3">
      <h1>Edit User</h1>
      <Form onSubmit={handelSubmit} className="my-4">
        {loading && <Loading />}
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="name"
            value={user.name}
            required
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="name@example.com"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
          <Form.Label>Role</Form.Label>
          <Form.Select
            value={user.role}
            onChange={(e) => setUser({ ...user, role: e.target.value })}
          >
            <option disabled value="">
              Select Role
            </option>
            <option value="1995">Admin</option>
            <option value="2001">User</option>
            <option value="1996">Writer</option>
          </Form.Select>
        </Form.Group>
        <button disabled={disable} className="btn btn-primary">
          Save
        </button>
      </Form>
    </div>
  );
}
