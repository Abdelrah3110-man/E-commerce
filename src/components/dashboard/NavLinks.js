import {
  faCartShopping,
  faPlus,
  faTruckFast,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

export const links = [
  {
    name: "Users",
    icon: faUsers,
    path: "users",
    role: "1995",
  },
  {
    name: "Add User",
    icon: faPlus,
    path: "/dashboard/user/add",
    role: "1995",
  },
  {
    name: "Categories",
    icon: faCartShopping,
    path: "/dashboard/categories",
    role: ["1995", "1999"],
  },
  {
    name: "Add Category",
    icon: faPlus,
    path: "/dashboard/category/add",
    role: ["1995", "1999"],
  },
  {
    name: "Products",
    icon: faTruckFast,
    path: "/dashboard/products",
    role: ["1995", "1999"],
  },
  {
    name: "Add Product",
    icon: faPlus,
    path: "/dashboard/Product/add",
    role: ["1995", "1999"],
  },
];
