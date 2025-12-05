import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import { Alert } from "react-bootstrap";
import { baseURL, REGISTER } from "../../API/Api";
import "../../index.css";
import "../../Css/components/form.css";
import Loading from "../../components/loading/Loading";
import Cookies from "universal-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useNavigate } from "react-router-dom";

export default function Register() {
  // states
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  //navigation
  const navigate = useNavigate();
  // loading
  const [loading, setLoading] = useState(false);
  //focus
  const focus = useRef("");
  useEffect(() => {
    focus.current.focus();
  }, []);
  // cookies
  const cookie = new Cookies();
  // err
  const [err, setErr] = useState("");
  // handel change form
  function handelChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // handel submit
  async function handelSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${baseURL}/${REGISTER}`, form);
      setLoading(false);
      console.log(res);
      const token = res.data.token;
      cookie.set("e-commerce", token);
      navigate("/dashboard");
      // window.location.pathname("/dashboard/users");
    } catch (err) {
      setLoading(false);
      if (err.response && err.response.status === 422) {
        setErr("Email is already been taken");
      } else {
        console.log(err);
        setErr("Internal server err");
      }
    }
  }

  return (
    <>
      {loading && <Loading></Loading>}
      <div className="register d-flex justify-content-center align-items-center">
        <div className="container col-12 d-flex justify-content-center align-items-center">
          <div className="row col-12">
            <Form
              className="form d-flex flex-column gap-2 h-100"
              onSubmit={handelSubmit}
            >
              <h1 className="my-4">Register Now</h1>
              <div className="mb-3 fform-control w-50">
                <input
                  ref={focus}
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handelChange}
                  placeholder="Enter Your Name.."
                  required
                ></input>
                <label htmlFor="name">name:</label>
              </div>
              <div className="mb-3 fform-control w-50">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handelChange}
                  placeholder="Enter Your Email.."
                  required
                ></input>
                <label htmlFor="email">Email:</label>
              </div>
              <div className="mb-3 fform-control w-50">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handelChange}
                  placeholder="Enter Your password.."
                  minLength="8"
                  required
                ></input>
                <label htmlFor="password">Password:</label>
              </div>
              <div className="col-5">
                <button className="btn  btn-dark  w-50 m-auto d-flex justify-content-center align-items-center">
                  Submit
                </button>
              </div>
              <div className="col-5 d-flex justify-content-center align-items-center">
                <a
                  className="btn  btn-primary  m-auto d-flex justify-content-center align-items-center"
                  href="http://127.0.0.1:8000/login-google"
                >
                  <FontAwesomeIcon icon={faGoogle} className=" m-1" /> Sign in
                  with Google
                </a>
              </div>
              <div className=" col-5 d-flex justify-content-center align-items-center">
                {err !== "" && (
                  <Alert className=" alert alert-danger w-75 d-flex justify-content-center align-items-left">
                    {err}
                  </Alert>
                )}
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
