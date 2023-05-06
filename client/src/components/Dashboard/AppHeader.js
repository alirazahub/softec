import { BellFilled, LogoutOutlined, MailOutlined } from "@ant-design/icons";
import { Badge, Drawer, Image, List, Space, Typography, Dropdown,notification, Modal } from "antd";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
const url = "http://localhost:5000/api/v1/users";

function AppHeader() {
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();

  // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies(["userToken"]);
  const [whoLogedIn, setWhoLogedIn] = useState("");

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };
  const handleDeleteConfirm = async () => {
    removeCookie("userToken");
    notification.success({
      message: 'Logout Success',
      description: 'You have successfully loggedout',
    });
    navigate('/');
    window.location.reload();
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  const items = [
    {
      label: '1st menu item',
      key: '1',
      icon: <UserOutlined />,
    },
    {
      label: '2nd menu item',
      key: '2',
      icon: <UserOutlined />,
    },
    {
      label: '3rd menu item',
      key: '3',
      icon: <UserOutlined />,
      danger: true,
    },
    {
      label: '4rd menu item',
      key: '4',
      icon: <UserOutlined />,
      danger: true,
      disabled: true,
    },
  ];
  const menuProps = {
    items,
  };
  return (
    <div className="AppHeader">
      <div className="logoAdmin">
        G A M I N G <span> T I T A N S</span>
      </div>
      <Space>
        <LogoutOutlined onClick={handleDeleteClick} style={{ fontSize: 24, cursor: "pointer" }} />
        <Dropdown.Button menu={menuProps} placement="bottom" icon={<UserOutlined />}/>
      </Space>
      <Modal
        visible={showDeleteModal}
        title="Confirm Logout"
        onOk={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      >
        <p>Are you sure you want to Logout?</p>
      </Modal>
    </div>
  );
}
export default AppHeader;
