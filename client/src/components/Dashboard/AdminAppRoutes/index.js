import { Route, Routes } from "react-router-dom";
import AdminDashboard from "../AdminDashbaord";
import AllUsers from "../AllCustomers";
import AllOrders from "../AllOrders";
import AllProducts from "../AllProducts";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/dashboard" element={<AdminDashboard />}></Route>
      <Route path="/customers" element={<AllUsers />}></Route>
      <Route path="/products" element={<AllProducts />}></Route>
      <Route path="/orders" element={<AllOrders />}></Route>
    </Routes>
  );
}
export default AppRoutes;
