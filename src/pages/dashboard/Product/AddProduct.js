import { useEffect, useRef, useState } from "react";
import { Button, Form, ProgressBar } from "react-bootstrap";
import Axios from "../../../API/Axios";
import { CATEGORIES, PRODUCT } from "../../../API/Api";
import { useNavigate } from "react-router-dom";
import Loading from "../../../components/loading/Loading";
import { faFileArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function AddProduct() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [Uploading, setUploading] = useState([]);
  const [id, setId] = useState();

  const [form, setForm] = useState({
    category: "",
    title: "",
    description: "",
    price: "",
    discount: "",
    About: "",
  });
  const fakeForm = {
    category: null,
    title: "null",
    description: "null",
    price: 404,
    discount: 0,
    About: "null",
    stoke: 0,
  };
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  //ref
  const focus = useRef("");
  useEffect(() => {
    focus.current.focus();
  }, []);

  const openImage = useRef(null);
  function handelOpenImages() {
    openImage.current.click();
  }
  const imgIds = useRef([]);
  console.log(imgIds);

  const progress = useRef([]);

  // console.log(progress);

  // categories
  useEffect(() => {
    Axios.get(`/${CATEGORIES}`)
      .then((data) => setCategories(data.data))
      .catch((err) => console.log(err));
  }, []);

  //handel on edit
  async function handelEdit(e) {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await Axios.post(`${PRODUCT}/edit/${id}`, form);
      navigate("/dashboard/products", { replace: true });
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }
  // handel first fake submit
  async function handelFormSubmit() {
    try {
      const res = await Axios.post(`${PRODUCT}/add`, fakeForm);
      setId(res.data.id);
    } catch (err) {
      console.log(err);
    }
  }

  //handelChange
  function handelChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSent(true);
    if (sent !== true) {
      handelFormSubmit();
    }
  }
  //handel delete image
  async function handelImageDelete(id, img) {
    const findId = imgIds.current[id];
    try {
      const res = await Axios.delete(`product-img/${findId}`);
      console.log(res);
      setImages((prev) => prev.filter((images) => images !== img));
      imgIds.current = imgIds.current.filter((i) => i !== findId);
    } catch (err) {
      console.log(err);
    }
  }
  // handel image change
  // async function handelImages(e) {
  //   setImages((prev) => [...prev, ...e.target.files]);
  //   const imagesAsFiles = e.target.files;
  //   const data = new FormData();
  //   for (let i = 0; i < imagesAsFiles.length; i++) {
  //     data.append("image", imagesAsFiles[i]);
  //     data.append("product_id", id);
  //     try {
  //       const res = await Axios.post(`/product-img/add`, data, {
  //         onUploadProgress: (progressEvent) => {
  //           const { loaded, total } = progressEvent;
  //           const percent = Math.floor((loaded * 100) / total);
  //           setUploading(...loading, Math.floor((loaded * 100) / total));
  //           progress.current[i].now = percent;
  //         },
  //       });
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  // }
  // handel image change
  async function handelImages(e) {
    const imagesAsFiles = e.target.files;
    setImages((prev) => [...prev, ...imagesAsFiles]);
    setUploading((prev) => [
      ...prev,
      ...Array.from(imagesAsFiles).map(() => 0),
    ]);

    const startIndex = Uploading.length;

    try {
      for (let i = 0; i < imagesAsFiles.length; i++) {
        const data = new FormData();
        data.append("image", imagesAsFiles[i]);
        data.append("product_id", id);

        const res = await Axios.post(`/product-img/add`, data, {
          onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            const percent = Math.floor((loaded * 100) / total);

            setUploading((prev) => {
              const copy = [...prev];
              copy[startIndex + i] = percent;
              return copy;
            });
          },
        });
        console.log(res);
        imgIds.current[i + startIndex] = res.data.id;
      }
    } catch (err) {
      console.log(err);
    }
  }

  // mapping on cat options
  const showCategories = categories.map((item, key) => (
    <option value={item.id} key={key}>
      {item.title}
    </option>
  ));

  const imagesShow = images.map((img, key) => (
    <div className=" border p-2 w-100">
      <div className="d-flex  align-items-center justify-content-between">
        <div className="d-flex align-items-center justify-content-start gap-2">
          <img src={URL.createObjectURL(img)} width={"80px"}></img>
          <div>
            <p className="mb-1 ">{img.name}</p>
            <p>
              {img.size / 1024 < 900
                ? (img.size / 1024).toFixed(2) + "KB"
                : (img.size / (1024 * 1024)).toFixed(2) + "MB"}
            </p>
          </div>
        </div>
        <Button variant="danger" onClick={() => handelImageDelete(key, img)}>
          Delete
        </Button>
      </div>
      <ProgressBar
        // ref={(e) => (progress.current[key] = e)}
        // now={Uploading[key]}
        // label={`${Uploading[key]}%`}
        // striped={Uploading[key] >= 100 ? false : true}
        // className="my-2"
        // variant="success"
        now={Uploading[key] || 0}
        label={`${Uploading[key] || 0}%`}
        striped={Uploading[key] < 100}
        className="my-2"
        variant="success"
      ></ProgressBar>
    </div>
  ));
  return (
    <div className="bg-white w-100 mx-2 p-3">
      <h1>Add product</h1>
      <Form className="my-4" onSubmit={handelEdit}>
        {loading && <Loading />}
        <Form.Group className="mb-3" controlId="category">
          <Form.Label>category</Form.Label>
          <Form.Select
            ref={focus}
            placeholder="Title"
            value={form.category}
            name="category"
            onChange={handelChange}
          >
            <option disabled value="">
              select category
            </option>
            {showCategories}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="Title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            disabled={!sent}
            placeholder="Title"
            value={form.title}
            required
            name="title"
            onChange={handelChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="Description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="description"
            value={form.description}
            required
            name="description"
            onChange={handelChange}
            disabled={!sent}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="price">
          <Form.Label>price</Form.Label>
          <Form.Control
            type="text"
            placeholder="price"
            value={form.price}
            required
            onChange={handelChange}
            name="price"
            disabled={!sent}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="discount">
          <Form.Label>discount</Form.Label>
          <Form.Control
            type="text"
            disabled={!sent}
            placeholder="discount"
            value={form.discount}
            required
            name="discount"
            onChange={handelChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="about">
          <Form.Label>about</Form.Label>
          <Form.Control
            type="text"
            disabled={!sent}
            placeholder="About"
            value={form.About}
            name="About"
            required
            onChange={handelChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="about">
          <Form.Label>stoke</Form.Label>
          <Form.Control
            type="text"
            disabled={!sent}
            placeholder="stock"
            value={form.stock}
            name="stock"
            required
            onChange={handelChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="about">
          <Form.Label>Images</Form.Label>
          <Form.Control
            hidden
            disabled={!sent}
            multiple
            type="file"
            ref={openImage}
            onChange={handelImages}
          />
        </Form.Group>
        <div
          onClick={handelOpenImages}
          className="d-flex align-content-center justify-content-center border-black border w-100 flex-column py-3 mb-3 rounded  gap-3 "
          style={{
            cursor: "pointer",
            color: !sent ? "gray" : "",
            opacity: !sent ? 0.5 : 1,
            pointerEvents: !sent ? "none" : "auto",
          }}
        >
          <FontAwesomeIcon
            icon={faFileArrowUp}
            className=" display-2 m-auto pt-4"
          />
          <p className=" h5  text-center">Upload images</p>
        </div>
        <div className="d-flex align-items-start flex-column gap-2 mb-1 mt-1">
          {imagesShow}
        </div>
        <button
          className="btn btn-primary mt-3"
          disabled={form.title.length > 1 ? false : true}
        >
          Save
        </button>
      </Form>
    </div>
  );
}
