import { BellFilled, LogoutOutlined, MailOutlined } from "@ant-design/icons";
import { Badge, Drawer, Image, List, Space, Typography, notification, Modal } from "antd";
import { useEffect, useState } from "react";
import logo from "../../images/Logo.jpg";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
  return (
    <div className="AppHeader">
      <Image
        width={40}
        src={logo}
      ></Image>
      <Typography.Title>Admin Dashboard</Typography.Title>
      <Space>
        <LogoutOutlined onClick={handleDeleteClick} style={{ fontSize: 24, cursor: "pointer" }} />
      </Space>
      <Modal
        visible={showDeleteModal}
        title="Confirm Logout"
        onOk={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      >
        <p>Are you sure you want to Logout?</p>
      </Modal>
      {/* <Drawer
        title="Comments"
        open={commentsOpen}
        onClose={() => {
          setCommentsOpen(false);
        }}
        maskClosable
      >
        <List
          dataSource={comments}
          renderItem={(item) => {
            return <List.Item>{item.body}</List.Item>;
          }}
        ></List>
      </Drawer> */}
      {/* <Drawer
        title="Notifications"
        open={notificationsOpen}
        onClose={() => {
          setNotificationsOpen(false);
        }}
        maskClosable
      >
        <List
          dataSource={orders}
          renderItem={(item) => {
            return (
              <List.Item>
                <Typography.Text strong>{item.title}</Typography.Text> has been
                ordered!
              </List.Item>
            );
          }}
        ></List>
      </Drawer> */}
    </div>
  );
}
export default AppHeader;
