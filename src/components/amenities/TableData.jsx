import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Switch, Modal, Button } from "antd";

import {
  useGetAmenitiesQuery,
  useUpdateAmenitiesDataMutation,
  useDeleteAmentiesMutation,
} from "../../features/amenitiesApi/amenitiesApi";

const TableData = () => {
  const { data } = useGetAmenitiesQuery();
  const [updateData] = useUpdateAmenitiesDataMutation();
  const [deleteData] = useDeleteAmentiesMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [existError, setExistError] = useState(false);
  const [state, setState] = useState("");
  const [newPropertyType, setNewPropertyType] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;
  const [confirmDeleteModalVisible, setConfirmDeleteModalVisible] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  console.log(data);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };




  const handleEdit = (item) => {
    setState(item);
    setNewPropertyType(item.amenities);
    setIsModalOpen(true);
    setNewEmail(item.email);
    //setNewPhone(item.phone);
    setExistError(false);
  };

  const handleSave = async () => {
    try {
      const propertyExists = data.data.some(
        (p) => p.amenities === newPropertyType && p._id !== state._id
      );

      if (propertyExists) {
        setExistError(true);
        return;
      }

      const updatedProperty = {
        _id: state._id,
        amenities: newPropertyType,
        email: newEmail,
        //phone: newPhone,
      };

      await updateData(updatedProperty);
      setState("");
      setNewPropertyType("");
      setNewEmail("");
      //setNewPhone("");
      setIsModalOpen(false);
    } catch (error) {
      console.log(error.status);
      if (error.status === 409) {
        setExistError(true);
        setIsModalOpen(true);
      }
    }
  };

  const handleDelete = async (_id) => {
    try {
      await deleteData({ _id });
      setConfirmDeleteModalVisible(false);
      // Modal.success({
      //   title: "Success",
      //   content: "Amenity deleted successfully",
      // });
      
    } catch (error) {
      console.error("Error:", error);
    }
  };



  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showDeleteConfirm = (_id) => {
    setItemToDelete(_id);
    setConfirmDeleteModalVisible(true);
  };

  const handleDeleteConfirm = () => {
    handleDelete(itemToDelete);
    setConfirmDeleteModalVisible(false);
  };

  const handleDeleteCancel = () => {
    setConfirmDeleteModalVisible(false);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data?.data?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data?.data?.length / itemsPerPage);

  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li key={i} className={`${currentPage === i ? "active" : ""}`}>
          <button className="page-link" onClick={() => setCurrentPage(i)}>
            {i}
          </button>
        </li>
      );
    }
    return pageNumbers;
  };

  const theadContent = ["ID", "Amenities", "Email", "Action"];
  const tbodyContent = currentItems?.map((item, index) => (
    <tr key={item._id}>
      <td>{indexOfFirstItem + index + 1}</td>
      <td>{item.amenities}</td>
      <td>{item.email}</td>
      {/* <td>{item.phone}</td> */}
      <td>
        <ul className="view_edit_delete_list mb0">
          {/* Edit Button */}
          {/* <li className="list-inline-item">
            <button
              className="btn btn-link iconcolor"
              data-toggle="tooltip"
              data-placement="top"
              title="Edit"
              onClick={() => handleEdit(item)}
              style={{ padding: 0, border: "none", background: "none" }}
            >
              <span
                className="flaticon-edit"
                style={{
                  borderRadius: "5px",
                  marginTop: "2%",
                  fontSize: "110%",
                  cursor: "pointer",
                }}
              ></span>
            </button>
          </li> */}
          {/* End Edit Button */}
          <Button type="primary" onClick={() => handleEdit(item)} style={{marginLeft:'-8%',marginRight:'18%', background: "linear-gradient(90deg, #36626D 0%, #578D9A 100%)"}}>
        Edit
      </Button>
     
          {/* Delete Button */}
          {/* <li
            className="list-inline-item"
            data-toggle="tooltip"
            data-placement="top"
            title="Delete"
            onClick={() => handleDelete(item._id)}
          >
            <div className="iconcolor">
              <Switch
                checked={item.isActive}
                style={{
                  background: item.isActive
                    ? "linear-gradient(90deg, #36626D 0%, #578D9A 100%)"
                    : "",
                }}
              />
            </div>
          </li> */}

      <Button type="primary" onClick={() =>  showDeleteConfirm(item._id)} style={{marginLeft:'-8%',marginRight:'4%', background: "linear-gradient(90deg, #36626D 0%, #578D9A 100%)"}}>
        Delete
      </Button>

       

          {/* End Delete Button */}
        </ul>
      </td>
    </tr>
  ));

  return (
    <>
      <Modal
        title="Edit Amenities Type"
        open={isModalOpen}
        onOk={handleSave}
        onCancel={handleCancel}
        style={{ top: "30%", left: "10%" }}
        okButtonProps={{
          style: {
            background: "linear-gradient(90deg, #36626D 0%, #578D9A 100%)",
          },
        }}
      >
        <form>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              value={newPropertyType}
              onChange={(e) => setNewPropertyType(e.target.value)}
            />
            {existError && (
              <span style={{ color: "red", marginTop: "5px" }}>
                Amenities already exists
              </span>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label" style={{fontWeight:'500'}}>
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
          </div>

          {/* <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Phone
            </label>
            <input
              type="number"
              className="form-control"
              id="phone"
              value={newPhone}
              onChange={(e) => setNewPhone(e.target.value)}
            />
          </div> */}
          
        </form>
      </Modal>
      
      <Modal
        title="Confirm Delete"
        visible={confirmDeleteModalVisible}
        onOk={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        okText="Yes"
        cancelText="No"
        okButtonProps={{
          style: {
            background: "linear-gradient(90deg, #36626D 0%, #578D9A 100%)",
          },
        }}
      >
        <p>Are you sure you want to delete this amenity?</p>
      </Modal>

      <table className="table">
        <thead className="thead-light">
          <tr>
            {theadContent.map((value, i) => (
              <th key={i}>{value}</th>
            ))}
          </tr>
        </thead>
        <tbody>{tbodyContent}</tbody>
      </table>
      <li
        className="pagination"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          //background: "linear-gradient(90deg, #36626D 0%, #578D9A 100%)",
        }}
      >
        {renderPagination()}
      </li>
    </>
  );
};

export default TableData;
