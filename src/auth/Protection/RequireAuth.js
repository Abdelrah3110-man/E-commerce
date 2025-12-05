// import axios from "axios";
// import { useEffect, useState } from "react";
// import { Outlet, replace, useNavigate } from "react-router-dom";
// import Cookies from "universal-cookie";
// import { baseURL, USER } from "../API/Api";
// import Loading from "../components/loading/Loading";
// export default function RequireAuth() {
//   //token and cookie
//   const navigate = useNavigate();
//   const cookie = new Cookies();
//   const token = cookie.get("e-commerce");
//   //user
//   const [user, setUser] = useState("");
//   useEffect(() => {
//     axios
//       .get(`${baseURL}/${USER}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((data) => console.log(data.data))
//       .catch(() => navigate("/", { replace: true }));
//   }, []);
//   return token ? (
//     user === "" ? (
//       <Loading />
//     ) : (
//       <Outlet />
//     )
//   ) : (
//     navigate("/login", { replace: true })
//   );
// }
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom"; // أزل replace إذا لم يكن مستخدمًا
import Cookies from "universal-cookie";
import { USER } from "../../API/Api";
import Loading from "../../components/loading/Loading";
import Axios from "../../API/Axios";
import Err403 from "../Errors/403";

export default function RequireAuth({ allowedRole }) {
  // token and cookie
  const navigate = useNavigate();
  const cookie = new Cookies();
  const token = cookie.get("e-commerce");

  // user
  const [user, setUser] = useState(""); // يمكن تغييرها إلى null إذا كانت البيانات كائنًا
  // console.log(user);
  // loading state لتحسين التجربة
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // إذا لم يكن توكن موجودًا، توجه مباشرة إلى /login
    if (!token) {
      navigate("/login", { replace: true });
      return;
    }
    // إذا كان توكن موجودًا، جرب جلب البيانات
    Axios.get(`${USER}`)
      .then((data) => {
        // console.log(data.data); // يمكن إزالتها إذا لم تعد مطلوبة
        setUser(data.data); // تحديث حالة user بالبيانات
        setLoading(false); // إيقاف التحميل
      })
      .catch((err) => {
        console.error("Error fetching user:", err); // طباعة الخطأ للديباجينج
        // إزالة التوكن إذا كان غير صالح
        cookie.remove("e-commerce");
        // توجه إلى /login بدلاً من /
        navigate("/login", { replace: true });
        setLoading(false);
      });
  }, []); // أضف dependencies لتجنب تحذيرات

  // إذا كان التحميل جاريًا، أظهر Loading
  if (loading) {
    return <Loading />;
  }

  return user ? (
    allowedRole.includes(user.role) ? (
      <Outlet />
    ) : (
      <Err403 role={user.role} />
    )
  ) : null; // أو يمكن إضافة تحقق إضافي هنا
}
