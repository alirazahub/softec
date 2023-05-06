import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Layout, Modal, notification } from 'antd';
const url = ""
const AllUsers = () => {
  // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies(['userToken']);
  const [users, setUsers] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [updateUser, setUpdateUser] = useState()
  const [fName, setFName] = useState()
  const [lName, setLName] = useState()
  const [email, setEmail] = useState()

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {

    await axios.delete(`${url}/api/users/delete/${deleteId}`, {
      headers: {
        'userToken': cookies.userToken
      }
    })
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
    await axios.get(`${url}/api/users/user/${id}`, {
      headers: {
        'userToken': cookies.userToken
      }
    }).then(res => {
      setUpdateUser(res.data.user)
      setFName(res.data.user.firstName)
      setLName(res.data.user.lastName)
      setEmail(res.data.user.email)
    })

    setShowEditModal(true);
  };
  const handleUpdate = async () => { 
    await axios.put(`${url}/api/users/edit/${updateUser._id}`, {
      firstName: fName,
      lastName: lName,
      email: email
    }, {
      headers: {
        'userToken': cookies.userToken
      }
    })
      .then(res => {
        notification.success({
          message: 'Success',
          description: res.data.message,
        });
      })
      .catch(err => {
        console.log(err)
      })
    setShowEditModal(false);
  }
  const handleEditCancel = () => {
    setShowEditModal(false);
  };
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get(`${url}/api/users/all`, {
        headers: {
          'userToken': cookies.userToken
        }
      })
      setUsers(response.data.users)
    }
    fetchUsers()
  }, [users])

  return (
    <Layout>
      <div className='text-center fw-bold my-3' style={{ fontSize: '40px' }}>Users</div>
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">firstName</th>
            <th scope="col">lastName</th>
            <th scope="col">Email</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <th scope="row">{index + 1}</th>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td><Button
                icon={<EditOutlined />}
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
        title="Updating the User"
        onOk={handleUpdate}
        onCancel={handleEditCancel}
      >

        <div>
          <div className="mb-3">
            <label for="firstName" className="form-label">First Name</label>
            <input type="text" className="form-control" id="firstName" onChange={(e)=>{setFName(e.target.value)}} value={fName} />
          </div>
          <div className="mb-3">
            <label for="firstName" className="form-label">Last Name</label>
            <input type="text" className="form-control" id="firstName" onChange={(e)=>{setLName(e.target.value)}} value={lName} />
          </div>
          <div className="mb-3">
            <label for="firstName" className="form-label">Email</label>
            <input type="text" className="form-control" id="firstName" onChange={(e)=>{setEmail(e.target.value)}} value={email} />
          </div>
        </div>
      </Modal>
    </Layout>
  )
}

export default AllUsers
