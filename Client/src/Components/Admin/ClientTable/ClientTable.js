import { API_URL } from "config/endpoints";
import "./ClientTable.css";
import { get, remove } from 'config/index';
import React, { useEffect, useState } from 'react'
import Modal from "Components/Modal";
import ClientCreateEdit from "./ClientCreateEdit";

function ClientTable() {
  const [ClientDetails, setClientDetails] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [clientId, setClientId] = React.useState('');
  const fetchClientDetails = async () => {
    try {
      let response = await get(API_URL.CLIENT_LIST);
      if (response) {
        setClientDetails(response);
      }
    } catch (e) {
      console.log('error', e.message);
    }
  }

  useEffect(() => {
    fetchClientDetails()
  }, []);


  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setClientId('');
  };


  const handleDelete = async (userId) => {
    let response = await remove(`${API_URL.DELETE_CLIENT}/${userId}`,);
    if (response) {
      fetchClientDetails();
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  const handleModalEdit = (clientId) => {
    setClientId(clientId);
    handleModalOpen();
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', padding: '30px' }}>
        <button className="btn btn-primary mx-2" onClick={handleModalOpen}>CREATE</button>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <table style={{ marginTop: "10px", width: "95%" }}>
          <thead>
            <tr>
              <th>SL.NO</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>PHONE</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {ClientDetails?.map((user, index) => (
              < tr >
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                  <button className="btn btn-primary mx-2" onClick={() => handleModalEdit(user._id)}>UPDATE</button>
                  <button className="btn btn-danger mx-2" onClick={() => handleDelete(user._id)}>DELETE</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Modal for create and edit */}
        <Modal isOpen={modalOpen} handleClose={handleModalClose}>
          <ClientCreateEdit handleModalClose={handleModalClose} fetchClientDetails={fetchClientDetails} ClientDetails={ClientDetails} clientId={clientId} />
        </Modal>
      </div>
    </div>
  )
}

export default ClientTable
