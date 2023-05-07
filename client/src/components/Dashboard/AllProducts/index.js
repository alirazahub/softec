import { Avatar, Rate, Space, Table, Typography, notification } from "antd";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { url } from "../../../key";
import axios from "axios";
import { Modal, Button } from 'antd'
import "./modal.css"


function Orders() {
  //eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies(["adminToken"]);

  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [stock, setStock] = useState(0);
  const [description, setDescription] = useState('');
  const [marketPrice, setmarketPrice] = useState('');
  const [costPrice, setCostPrice] = useState(0);
  const [minimumAge, setMinimumAge] = useState(0);
  const [inventoryType, setInventoryType] = useState('gaming');
  const [image, setImage] = useState(null);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleStockChange = (event) => {
    setStock(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handlemarketPriceChange = (event) => {
    setmarketPrice(event.target.value);
  };

  const handleCostPriceChange = (event) => {
    setCostPrice(event.target.value);
  };

  const handleMinimumAgeChange = (event) => {
    setMinimumAge(event.target.value);
  };

  const handleInventoryTypeChange = (event) => {
    setInventoryType(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    convertBase64(file)
      .then((result) => {
        setImage(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    const values = {
      title: title,
      stock: stock,
      description: description,
      marketPrice: marketPrice,
      sellingPrice: costPrice,
      minimumAge: minimumAge,
      inventory: inventoryType,
      image: image
    }
    try {
      axios.post(`${url}/api/product/addproduct`, values)
        .then(res => {
          notification.success({
            title: 'Success!',
            description: 'Product Added Successfully',
            placement: 'bottomRight'
          })
        })
      setOpen(false);
    }
    catch (err) {
      notification.error({
        title: 'Error!',
        description: 'Product Not Added',
        placement: 'bottomRight'
      })
    }

  };

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const res = await axios.get(`${url}/api/product/getAllProductsOnly`);
      setLoading(false);
      setDataSource(res.data);
    };
    getProducts();
  }, [dataSource]);
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result)
      }
      fileReader.onerror = (error) => {
        reject(error)
      }
    })
  }
  return (
    <Space size={20} direction="vertical">
      <div className="text-center fw-bold" style={{ fontSize: 25 }}>Products</div>
      <Button type="primary" onClick={() => setOpen(true)}>
        Add New Product
      </Button>
      <Table
        dataSource={dataSource}
        columns={[
          {
            title: "Title",
            dataIndex: "title",
            key: "title",
            render: (text) => <a>{text}</a>,
          },
          {
            title: "Market Price",
            dataIndex: "marketPrice",
            key: "marketPrice",
          },
          {
            title: "Selling Price",
            dataIndex: "sellingPrice",
            key: "sellingPrice",
          },
          {
            title: "Stock",
            dataIndex: "stock",
            key: "stock",
          },
          {
            title: "Inventory",
            dataIndex: "inventory",
            key: "inventory",
          }, {
            title: "Minimum Age",
            dataIndex: "minimumAge",
            key: "minimumAge",
          },
          {
            title: "Action",
            key: "action",
            render: (text, record) => (
              <Space size="middle">
                <Button type="primary">Edit</Button>
                <Button type="primary" danger>
                  Delete
                </Button>
              </Space>
            ),
          }
        ]}
      />

      <Modal
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        <div className="d-flex justify-content-center">

          <div className="addProcCom">
            <h2>Add Product</h2>
            <form onSubmit={handleSubmit} className="addprocform">
              <div className="inputfield">
                <label htmlFor="title-input">Title:</label>
                <input id="title-input" type="text" value={title} onChange={handleTitleChange} required />
              </div>

              <div className="inputfield">
                <label htmlFor="description-input">Description:</label>
                <textarea id="description-input" value={description} onChange={handleDescriptionChange} required />
              </div>

              <div className="otherfield">

                <div className="inputfield">
                  <label htmlFor="costprice-input">Selling Price:</label>
                  <input id="costprice-input" type="text" value={costPrice} onChange={handleCostPriceChange} required />
                </div>
                <div className="inputfield">
                  <label htmlFor="marketPrice-input">Market Price:</label>
                  <input id="marketPrice-input" type="text" value={marketPrice} onChange={handlemarketPriceChange} required />
                </div>
              </div>
              <div className="otherfield">
                <div className="inputfield">
                  <label htmlFor="minimumage-input">Minimum Age:</label>
                  <input id="minimumage-input" type="number" value={minimumAge} onChange={handleMinimumAgeChange} required />
                </div>
                <div className="inputfield">
                  <label htmlFor="stock-input">Stock:</label>
                  <input id="stock-input" type="number" value={stock} onChange={handleStockChange} min={1} required />
                </div>
              </div>
              <div className="inputfield">
                <label htmlFor="inventorytype-input">Inventory Type:</label>
                <select id="inventorytype-input" value={inventoryType} onChange={handleInventoryTypeChange} required>
                  <option value="gaming">Gaming</option>
                  <option value="video games">Video Games</option>
                  <option value="others">Others</option>
                </select>
              </div>

              <div className="inputfield">
                <label htmlFor="image-input">Image:</label>
                <input id="image-input" type="file" accept="image/*" onChange={handleImageChange} required />
              </div>

              <button type="submit">Submit</button>
            </form>

          </div>

        </div>
      </Modal>
    </Space>
  );
}
export default Orders;
