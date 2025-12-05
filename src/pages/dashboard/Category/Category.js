import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Axios from "../../../API/Axios";
import { CATEGORY, USER } from "../../../API/Api";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../../components/loading/Loading";
export default function Category() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [disable, setDisable] = useState(true);
  const [loading, setLoading] = useState(false);
  //id
  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    Axios.get(`${CATEGORY}/${id}`)
      .then((data) => {
        setTitle(data.data.title);
        setLoading(false);
      })
      .then(() => setDisable(false))
      .catch(() => {
        navigate("/dashboard/categories/page/404", { replace: true });
      });
  }, []);
  //handel on submit
  async function handelSubmit(e) {
    setLoading(true);
    e.preventDefault();
    const form = new FormData();
    form.append("title", title);
    form.append("image", image);
    try {
      const res = await Axios.post(`${CATEGORY}/edit/${id}`, form);
      navigate("/dashboard/categories", { replace: true });
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }
  return (
    <div className="bg-white w-100 mx-2 p-3">
      <h1>Edit Category</h1>
      <Form onSubmit={handelSubmit} className="my-4">
        {loading && <Loading />}
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label> Title</Form.Label>
          <Form.Control
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
            // required
            onChange={(e) => setImage(e.target.files[0])}
          ></Form.Control>
        </Form.Group>
        <button disabled={disable} className="btn btn-primary">
          Save
        </button>
      </Form>
    </div>
  );
}
