import { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import Axios from "../../../API/Axios";
import { CATEGORY, USER } from "../../../API/Api";
import { useNavigate } from "react-router-dom";
import Loading from "../../../components/loading/Loading";
export default function AddCategory() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  //focus
  const focus = useRef("");
  useEffect(() => {
    focus.current.focus();
  }, []);
  //handel on submit
  async function handelSubmit(e) {
    setLoading(true);
    e.preventDefault();
    const form = new FormData();
    form.append("title", title);
    form.append("image", image);
    try {
      const res = await Axios.post(`${CATEGORY}/add`, form);
      navigate("/dashboard/categories", { replace: true });
    } catch (err) {
      setLoading(false);
      console.log(err);
      console.log(err.response.data);
    }
  }
  return (
    <div className="bg-white w-100 mx-2 p-3">
      <h1>Add Category</h1>
      <Form onSubmit={handelSubmit} className="my-4">
        {loading && <Loading />}
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Title</Form.Label>
          <Form.Control
            ref={focus}
            type="text"
            placeholder="Title"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3 " controlId="image">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="file"
            required
            onChange={(e) => setImage(e.target.files[0])}
          ></Form.Control>
        </Form.Group>
        <button
          className="btn btn-primary"
          disabled={title.length > 1 ? false : true}
        >
          Save
        </button>
      </Form>
    </div>
  );
}
