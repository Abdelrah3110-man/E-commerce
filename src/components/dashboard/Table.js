import {
  faPenToSquare,
  faTrashCan,
  faUserPen,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Axios from "../../API/Axios";
import PaginatedItems from "./Pagination/Pagination";
import { useEffect, useState } from "react";
import TransformDate from "../../helpers/TransformDate";

export default function TableShow(props) {
  const currentUser = props.currentUser || false;

  const [search, setSearch] = useState("");
  const [Date, setDate] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const filteredDataByDate = props.data.filter(
    (item) => TransformDate(item.created_at) === Date
  );

  const filteredSearchByDate = filteredDataByDate.filter(
    (item) => TransformDate(item.created_at) === Date
  );
  const showWhichData =
    Date.length !== 0
      ? search.length > 0
        ? filteredSearchByDate
        : filteredDataByDate
      : search.length > 0
      ? filteredData
      : props.data;
  async function getSearchData() {
    try {
      const res = await Axios.post(
        `${props.searchLink}/search?title=${search}`
      );
      setFilteredData(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setSearchLoading(false);
    }
  }

  useEffect(() => {
    const delay = setTimeout(() => {
      search.length > 0 ? getSearchData() : setSearchLoading(false);
    }, 600);

    return () => clearTimeout(delay);
  }, [search]);

  //header show
  const headerShow = props.header.map((item) => <th>{item.name}</th>);
  //body show
  const dataShow = showWhichData.map((item, key) => (
    <tr key={key} className="">
      <td className="text-center py-3">{item.id}</td>
      {props.header.map((item2, key2) => (
        <td key={key2} className="py-3 ">
          {item2.key === "image" ? (
            <img src={item[item2.key]} width={"60px"} alt=""></img>
          ) : item2.key === "images" ? (
            <div className="d-flex justify-content-start align-items-center gap-2 flex-wrap">
              {item[item2.key].map((img) => (
                <img width="50px" src={img.image} alt=""></img>
              ))}
            </div>
          ) : item2.key === "created_at" || item2.key === "updated_at" ? (
            TransformDate(item[item2.key])
          ) : item[item2.key] === "1995" ? (
            "admin"
          ) : item[item2.key] === "2001" ? (
            "User"
          ) : item[item2.key] === "1996" ? (
            "Writer"
          ) : item[item2.key] === "1999" ? (
            "Product Manger"
          ) : (
            item[item2.key]
          )}
          {currentUser && item[item2.key] === currentUser.name && " (You)"}
        </td>
      ))}
      <td>
        <div className="d-flex align-items-center gap-3 py-2  justify-content-center ">
          <Link to={`${item.id}`}>
            <FontAwesomeIcon
              icon={faPenToSquare}
              fontSize={"21px"}
              style={{
                color: currentUser && item.id === currentUser.id ? "gray" : "",
              }}
            />
          </Link>
          <FontAwesomeIcon
            icon={faTrashCan}
            fontSize={"21px"}
            color="red"
            onClick={() => {
              if (!currentUser || item.id !== currentUser.id)
                props.delete(item.id);
            }}
            cursor={"pointer"}
            style={{ color: item.id === currentUser.id ? "gray" : "red" }}
          />
        </div>
      </td>
    </tr>
  ));
  return (
    <>
      <div className="col-3">
        <Form.Control
          type="search"
          className="my-3"
          aria-label="input example"
          placeholder="search"
          onChange={(e) => {
            setSearch(e.target.value);
            setSearchLoading(true);
          }}
        ></Form.Control>
      </div>
      <div className="col-5">
        <Form.Control
          type="date"
          className="my-3"
          aria-label="input example"
          placeholder="search"
          onChange={(e) => {
            setDate(e.target.value);
          }}
        ></Form.Control>
      </div>
      <Table striped bordered hover>
        <thead className="  text-capitalize table-dark">
          <tr className=" border-0 ">
            <th className="text-center" style={{ borderTopLeftRadius: "10px" }}>
              id
            </th>
            {headerShow}
            <th
              className="text-center"
              style={{ borderTopRightRadius: "10px" }}
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {props.loading ? (
            <tr>
              <td colSpan={12} className=" text-center  ">
                "Loading....."
              </td>
            </tr>
          ) : searchLoading ? (
            <tr>
              <td colSpan={12} className=" text-center  ">
                "Searching....."
              </td>
            </tr>
          ) : (
            dataShow
          )}
        </tbody>
      </Table>
      <div className="d-flex align-items-center justify-content-end flex-wrap gap-2">
        <div className="my-0">
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => props.setLimit(e.target.value)}
          >
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </Form.Select>
        </div>
        <PaginatedItems
          setPage={props.setPage}
          itemsPerPage={props.limit}
          data={props.data}
          total={props.total}
        ></PaginatedItems>
      </div>
    </>
  );
}
