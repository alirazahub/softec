import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useCookies } from "react-cookie";
import { Layout, Row, Col, Card, Select, Form, Button } from 'antd';
import { BarChartOutlined } from '@ant-design/icons';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './adminDashboard.css';
const url = ""
const { Option } = Select;
const { Content } = Layout;
//function that return the month name
const getMonthName = (monthNumber) => {
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October",
    "November", "December"];
  return monthNames[monthNumber - 1];
}
const AdminDashbaord = () => {
  const [whoLogedIn, setWhoLogedIn] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(["userToken"]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [usersJoined, setUsersJoined] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [data, setData] = useState([]);


  useEffect(() => {
    axios.get(`${url}/api/users/profile`, {
      headers: {
        'userToken': cookies.userToken
      }
    }).then(res => {
      setWhoLogedIn(res.data.roleName)
    }
    ).catch(err => {
      // console.log(err);
    }
    )
    const getAllUsers = async () => {
      const res = await axios.get(`${url}/api/dashboard/totalUsers`)
      setTotalUsers(res.data)
    }
    getAllUsers();

    const getUsersJoined = async () => {
      const month = Date().split(' ')[1];
      const year = Date().split(' ')[3];
      const res = await axios.get(`${url}/api/dashboard/usersJoined/${month}/${year}`)
      setUsersJoined(res.data)
    }
    getUsersJoined();

    const chartData = async () => {
      const res = await axios.get(`${url}/api/dashboard/chartData`)
      setData(res.data);
    }
    chartData();
  }, [totalUsers, usersJoined, data]);
  // const data = [
  //   { month: 'January', users: 50 },
  //   { month: 'February', users: 80 },
  //   { month: 'March', users: 100 },
  //   { month: 'April', users: 120 },
  //   { month: 'May', users: 150 },
  //   { month: 'June', users: 180 },
  //   { month: 'July', users: 200 },
  //   { month: 'August', users: 220 },
  //   { month: 'September', users: 250 },
  //   { month: 'October', users: 280 },
  //   { month: 'November', users: 300 },
  //   { month: 'December', users: 330 }
  // ];

  return (
    <Layout className="dashboard-layout">
      <Content className="dashboard-content">
        <div className="dashboard-container">
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12} lg={12}>
              <Card className="dashboard-card">
                <div className="dashboard-card-content" style={{ marginBottom: 9 }}>
                  <div className="dashboard-card-icon">
                    <BarChartOutlined />
                  </div>
                  <div className="dashboard-card-text">
                    <p className="dashboard-card-title">Total Users</p>
                    <p className="dashboard-card-value">{totalUsers}</p>
                  </div>
                </div>
              </Card>
            </Col>
            <Col xs={24} md={12} lg={12}>
              <Card className="dashboard-card">
                <div className="dashboard-card-content">
                  <div className="dashboard-card-icon">
                    <BarChartOutlined />
                  </div>
                  <div className="dashboard-card-text">
                    <p className="dashboard-card-title">Users Joined This Month</p>
                    <div className="dashboard-card-dropdowns">
                      {/* <Form.Item
                        name="Month">
                        <Select
                          value={selectedMonth}
                          onChange={selectedMonth => setSelectedMonth(selectedMonth)}
                          defaultValue={Date().split(' ')[1]}
                          style={{ width: 150, marginRight: 8 }}
                        >
                          <Option value="01">January</Option>
                          <Option value="02">February</Option>
                          <Option value="03">March</Option>
                          <Option value="04">April</Option>
                          <Option value="05">May</Option>
                          <Option value="06">June</Option>
                          <Option value="07">July</Option>
                          <Option value="08">August</Option>
                          <Option value="09">September</Option>
                          <Option value="10">October</Option>
                          <Option value="11">November</Option>
                          <Option value="12">December</Option>
                        </Select>
                      </Form.Item>
                      <Form.Item
                        name="Year">
                        <Select
                          value={selectedYear}
                          onChange={selectedYear => setSelectedYear(selectedYear)}
                          defaultValue={Date().split(' ')[3]}
                          style={{ width: 150 }}
                        >
                          <Option value="2021">2021</Option>
                          <Option value="2022">2022</Option>
                          <Option value="2023">2023</Option>
                        </Select>
                      </Form.Item>
                      <Form.Item>
                        <Button
                          type="primary"
                          onClick={()=>handleUsersJoined()}
                        >
                          Search
                        </Button>
                      </Form.Item> */}
                    </div>
                    {usersJoined !== 0 && <p className="dashboard-card-value">{usersJoined}</p>}
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Card className="dashboard-card mt-3">
                <div className="dashboard-card-content">
                  <div className="dashboard-card-title">Users Joined by Month</div>
                  <BarChart width={600} height={300} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="users" fill="#8884d8" />
                  </BarChart>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  )
}

export default AdminDashbaord
