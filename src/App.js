import "./App.css";
import HomePage from "./pages/website/HomePage";
import { Route, Routes } from "react-router-dom";
import Login from "./auth/AuthOperations/Login";
import Register from "./auth/AuthOperations/Register";
import Users from "./pages/dashboard/Users/Users";
import GoogleCallBack from "./auth/AuthOperations/GoogleCallBack";
import Dashboard from "./pages/dashboard/Dashboard";
import RequireAuth from "./auth/Protection/RequireAuth";
import User from "./pages/dashboard/Users/User";
import AddUser from "./pages/dashboard/Users/AddUser";
import Writer from "./pages/dashboard/Writer";
import Err404 from "./auth/Errors/404";
import RequireBack from "./auth/Protection/RequireBack";
import Categories from "./pages/dashboard/Category/Categories";
import AddCategories from "./pages/dashboard/Category/AddCategory";
import Category from "./pages/dashboard/Category/Category";
import Products from "./pages/dashboard/Product/Products";
import AddProduct from "./pages/dashboard/Product/AddProduct";
import Product from "./pages/dashboard/Product/Product";
import WebsiteCategories from "./pages/website/Categories/Categories";
import WebsiteNav from "./pages/website/WebsiteNav";
import SingleProduct from "./pages/website/SingleProduct/SingleProduct";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* public Routes */}
        <Route element={<WebsiteNav></WebsiteNav>}>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route
            path="/categories"
            element={<WebsiteCategories></WebsiteCategories>}
          ></Route>
          <Route
            path="/product/:id"
            element={<SingleProduct></SingleProduct>}
          ></Route>
        </Route>
        <Route element={<RequireBack></RequireBack>}>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
        </Route>
        <Route path="/users" element={<Users></Users>}></Route>
        <Route
          path="/auth/google/callback"
          element={<GoogleCallBack></GoogleCallBack>}
        ></Route>
        <Route path="/*" element={<Err404></Err404>}></Route>
        {/* protected Routes */}
        <Route element={<RequireAuth allowedRole={["1995", "1996", "1999"]} />}>
          <Route path="/dashboard" element={<Dashboard></Dashboard>}>
            <Route element={<RequireAuth allowedRole={["1995"]}></RequireAuth>}>
              <Route path="users" element={<Users></Users>}></Route>
              <Route path="users/:id" element={<User></User>}></Route>
              <Route path="user/add" element={<AddUser></AddUser>}></Route>
            </Route>
            {/* <Route
              element={
                <RequireAuth allowedRole={["1996", "1995"]}></RequireAuth>
              }
            >
              <Route path="writer" element={<Writer></Writer>}></Route>
            </Route> */}
            <Route
              element={
                <RequireAuth allowedRole={["1996", "1995"]}></RequireAuth>
              }
            >
              {/* categories */}
              <Route path="categories" element={<Categories />} />
              <Route path="categories/:id" element={<Category />} />
              <Route path="category/add" element={<AddCategories />} />
              {/* products */}
              <Route path="products" element={<Products />} />
              <Route path="products/:id" element={<Product />} />
              <Route path="product/add" element={<AddProduct />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
