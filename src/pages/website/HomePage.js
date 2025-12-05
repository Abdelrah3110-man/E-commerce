import "./Home.css";
import Product from "../../components/website/Product/SaleProducts/SaleProducts";
import Landing from "../../components/website/Landing/Landing";
import LatestSaleProduct from "../../components/website/Product/SaleProducts/LatestSaleProduct";
import BeforeTopRated from "../../components/website/BeforeTopRated/BeforeTopRated";
import ShowTopProduct from "../../components/website/Product/TopRated/ShowTopRated";
import ShowLatestProduct from "../../components/website/Product/LatestProducts/ShowLatestProducts";

export default function HomePage() {
  return (
    <div>
      <Landing></Landing>
      <LatestSaleProduct></LatestSaleProduct>
      <BeforeTopRated></BeforeTopRated>
      <div className=" d-flex flex-wrap m-5 align-items-center justify-content-center">
        <ShowTopProduct></ShowTopProduct>
        <ShowLatestProduct></ShowLatestProduct>
      </div>
    </div>
  );
}
