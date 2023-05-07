import { Menu } from "antd";
import { useEffect, useState } from "react";
import { FaUserFriends,FaProjectDiagram } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { BsFillCartCheckFill } from "react-icons/bs";
import { MdDashboard } from "react-icons/md";
function SideMenu() {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState("/");

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);

  const navigate = useNavigate();
  return (
    <div className="SideMenu">
      <Menu
        className="SideMenuVertical"
        mode="vertical"
        onClick={(item) => {
          //item.key
          navigate(item.key);
        }}
        selectedKeys={[selectedKeys]}
        items={[
          {
            label: "Dashbaord",
          icon: <MdDashboard size={20}/>,
            key: "/dashboard",
          },
          {
            label: "Manage Customers",
            key: "/customers",
            icon: <FaUserFriends size={20} />,
          },
          {
            label: "Manage Products",
            key: "/products",
            icon: < FaProjectDiagram size={20}/>,
          }
          ,
          {
            label: "Manage Orders",
            key: "/orders",
            icon: < BsFillCartCheckFill size={20}/>,
          },
        ]}
      ></Menu>
    </div>
  );
}
export default SideMenu;
