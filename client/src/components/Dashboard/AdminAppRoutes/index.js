import { Route, Routes } from "react-router-dom";
import AdminDashboard from "../AdminDashbaord";
import AllUsers from "../AllUsers";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/admin-dashboard" element={<AdminDashboard />}></Route>
      <Route path="/users" element={<AllUsers />}></Route>
    </Routes>
  );
}
export default AppRoutes;
