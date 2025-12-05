// import axios from "axios";
// import { useEffect } from "react";
// import { baseURL, GOOGLE_CALL_BACK } from "../API/Api";
// import { useLocation } from "react-router-dom";
// import Cookies from "universal-cookie";
// export default function GoogleCallBack() {
//   const cookie = new Cookies();
//   const location = useLocation();
//   useEffect(() => {
//     async function googleCall() {
//       try {
//         const res = await axios.get(
//           `${baseURL}/${GOOGLE_CALL_BACK}${location.search}`
//         );
//         const token = res.data.access_token;
//         cookie.set("e-commerce", token);
//         console.log(res);
//       } catch (err) {
//         console.log(err);
//       }
//     }
//     googleCall();
//   }, []);
//   return <h1>test</h1>;
// }
import axios from "axios";
import { useEffect, useState } from "react";
import { baseURL, GOOGLE_CALL_BACK } from "../../API/Api";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import Loading from "../../components/loading/Loading";

export default function GoogleCallBack() {
  const cookie = new Cookies();
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function googleCall() {
      try {
        const res = await axios.get(
          `${baseURL}/${GOOGLE_CALL_BACK}${location.search}`,
          {
            headers: {
              // Authorization: `Bearer ${cookie.get("e-commerce")}`,
            },
          }
        );
        const token = res.data.access_token;
        if (token) {
          cookie.set("e-commerce", token, {
            path: "/",
            // secure: true,
            // httpOnly: false,
          });
          console.clear();
          navigate("/dashboard");
          // window.location.pathname = "/dashboard";
          // window.location.reload();
        } else {
          throw new Error("لا يوجد رمز وصول في الرد");
        }
      } catch (err) {
        console.error("خطأ Axios:", err.response?.data || err.message);
        setError(
          err.response?.status === 401 ? "فشل المصادقة" : "خطأ في الخادم"
        );
      } finally {
        setLoading(false);
      }
    }
    if (location.search) googleCall();
  }, [location.search, navigate]);

  if (error) return <h1>Err: {error}</h1>;
  return (
    <>
      {loading && <Loading></Loading>}
      {/* <h1>done</h1> */}
    </>
  );
}
