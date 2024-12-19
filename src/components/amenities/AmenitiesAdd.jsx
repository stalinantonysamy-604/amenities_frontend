import React, { useState, useEffect } from "react";
import { useAddAmenitiesMutation, } from "../../features/amenitiesApi/amenitiesApi";
import { Button, Modal, message } from 'antd';

const AmenitiesAdd = () => {
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showError, setShowError] = useState(false);
  const [existError, setExistError] = useState(false);
  const [previousTitle, setPreviousTitle] = useState("");


  const [createPropertyData, isLoading, isError] = useAddAmenitiesMutation();


  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (isError) {
  //   return <div>Error...</div>;
  // }


  useEffect(() => {
    if (isModalOpen) {

      setTitle("");
      setEmail("");
      //setPhone("");
      setShowError(false);
    }
  }, [isModalOpen]);


  // New Property Add 

  const handleSave = async () => {

    if (!title.trim()) {
      setShowError(true);
      return;
    }

    console.log("Title:", title);
    console.log("Previous Title:", previousTitle);

    // if (title === previousTitle) {
    //   message.warning('Property type already exists.');
    //   return;
    // }

    try {

      const newData =
      {
        amenities: title,
        email,
        //phone,

      };

      setIsModalOpen(false);
      setExistError(false);
      setEmail("");
      //setPhone("");
      const response = await createPropertyData(newData).unwrap();

      setTitle("");
      setPreviousTitle(title);

      console.log("ree", response)

    } catch (error) {

      if (error.status === 409) {
        setExistError(true);
        //message.warning(error.data.message);
        setIsModalOpen(true);

      }
    }
  };


  const showModal = () => {
    setIsModalOpen(true);

  };
  // const handleOk = () => {
  //   setIsModalOpen(false);
  // };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // const servicesData = {

  //   message: "Staycia Property added successfully!",
  //   data: [
  //         { 
  //           id: 1, 
  //           title: "Apartment",

  //         },

  //         { 
  //           id: 2, 
  //           title: "Bungalow",

  //         },



  //   ]
  // }



  return (
    <div>
      {/* <button
        type="button"
        className="btn btn-primary btn-lg"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        style={{ borderRadius: "5px", marginTop: "2%", fontSize: "110%" }}
      >
        Property Add
      </button> */}

      <Button type="primary" onClick={showModal} size="large"
        style={{ marginTop: '2%', background: 'linear-gradient(90deg, #36626D 0%, #578D9A 100%)' }}>

        Amenities Add

      </Button>


      {/* <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Property Type
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="recipient-name"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} 
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSave} 
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div> */}

      <Modal title="Amenities Type" open={isModalOpen} onOk={handleSave} onCancel={handleCancel} style={{ top: '30%', left: '10%' }}
        okButtonProps={{ style: { background: 'linear-gradient(90deg, #36626D 0%, #578D9A 100%)' } }}

      >
        <form>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="recipient-name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter Amenities Type"
            />
            {showError && !title && <span style={{ color: 'red', marginTop: '5px' }}>Enter Amenities Type</span>}
            {existError && <span style={{ color: 'red', marginTop: '5px' }}>Amenities type already exists</span>}

          </div>

          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
            />
            {showError && !email && <span style={{ color: 'red', marginTop: '5px' }}>Enter a valid email</span>}
          </div>

          {/* <div className="mb-3">
            <input
              type="number"
              className="form-control"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter Phone"
            />
            {showError && !phone && <span style={{ color: 'red', marginTop: '5px' }}>Enter a valid Phone</span>}
          </div> */}

        </form>
      </Modal>

    </div>
  );
};

export default AmenitiesAdd;
