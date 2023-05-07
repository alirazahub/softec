import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Layout, Modal, notification } from 'antd';
import { url } from '../../../key';
import { Badge } from 'react-bootstrap';
import { FaExchangeAlt } from 'react-icons/fa';


function calculateAge(dateOfBirth) {
  const [day, month, year] = dateOfBirth.split("/");
  const birthDate = new Date(year, month - 1, day);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}



const AllUsers = () => {
  // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies(['userToken']);
  const [users, setUsers] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [updateCustomer, setUpdateCustomer] = useState()
  const [name, setName] = useState()
  const [gender, setGender] = useState()
  const [email, setEmail] = useState()
  const [dob, setDob] = useState()

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {

    await axios.delete(`${url}/api/customer/deleteCustomer/${deleteId}`)
      .then(res => {
        notification.success({
          message: 'Success',
          description: res.data.message,
        });
      })
      .catch(err => {
        console.log(err)
      })
    setShowDeleteModal(false);
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };
  const handleEditClick = async (id) => {

    await axios.put(`${url}/api/customer/updateStatus/${id}`)
      .then(res => {
        notification.success({
          message: 'Success',
          description: res.data.message,
        });
      })
      .catch(err => {
        console.log(err)
      })

  };

  const handleEditCancel = () => {
    setShowEditModal(false);
  };
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get(`${url}/api/customer/getCustomers`)
      setUsers(response.data.customers)
    }
    fetchUsers()
  }, [users])

  return (
    <Layout>
      <div className='text-center fw-bold my-3' style={{ fontSize: '40px' }}>Customers</div>
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Gender</th>
            <th scope="col">age</th>
            <th scope="col">Status</th>
            <th scope="col">Chanage Status</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <th scope="row">{index + 1}</th>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.gender}</td>
              <td>{calculateAge(user.dateOfBirth)}</td>
              <td>
                <Badge bg={user.status=="active" ? (`success`) : (`danger`)}>
                  {user.status}
                </Badge>
              </td>
              <td><Button
                icon={<FaExchangeAlt size={25} />}
                onClick={() => { handleEditClick(user._id) }}
              /></td>
              <td><Button
                type="primary"
                icon={<DeleteOutlined />}
                onClick={() => { handleDeleteClick(user._id) }}
              /></td>

            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        visible={showDeleteModal}
        title="Confirm Delete"
        onOk={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      >
        <p>Are you sure you want to delete?</p>
      </Modal>
      <Modal
        visible={showEditModal}
        title="Updating the Customer"
        onOk={handleEditCancel}
        onCancel={handleEditCancel}
      >
        <div>
          <div className="mb-3">
            <label for="firstName" className="form-label">Name</label>
            <input type="text" className="form-control" id="firstName" onChange={(e) => { setName(e.target.value) }} value={name} />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" onChange={(e) => { email(e.target.value) }} value={email} />
          </div>
          <div className="mb-3">
            <label for="firstName" className="form-label">Email</label>
            <input type="text" className="form-control" id="firstName" onChange={(e) => { setEmail(e.target.value) }} value={email} />
          </div>
        </div>
      </Modal>
    </Layout>
  )
}

export default AllUsers
