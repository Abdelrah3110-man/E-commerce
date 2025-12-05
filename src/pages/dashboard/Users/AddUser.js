import { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import Axios from "../../../API/Axios";
import { USER } from "../../../API/Api";
import { useNavigate } from "react-router-dom";
import Loading from "../../../components/loading/Loading";
export default function AddUser() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
  });
  //focus
  const focus = useRef("");
  useEffect(() => {
    focus.current.focus();
  }, []);

  //handel on submit
  async function handelSubmit(e) {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await Axios.post(`${USER}/add`, {
        name: user.name,
        email: user.email,
        password: user.password,
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
            ref={focus}
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
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
          <Form.Label>password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="********"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
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
            <option value="1999">Product Manger</option>
          </Form.Select>
        </Form.Group>
        <button
          className="btn btn-primary"
          disabled={
            user.name.length > 1 &&
            user.email.length > 1 &&
            user.password.length >= 8 &&
            user.role !== ""
              ? false
              : true
          }
        >
          Save
        </button>
      </Form>
    </div>
  );
}
