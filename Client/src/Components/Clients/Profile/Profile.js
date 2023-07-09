import React, { useEffect, useState } from 'react'
import "./Profile.css";
import { get } from 'config/index';
import { API_URL } from 'config/endpoints';
import { post } from 'config/index';
import { userAPI } from 'Constants/API';

function Profile() {
  const [profileDetails, setProfileDetails] = useState(null);

  const [selectedImage, setSelectedImage] = useState(null);

  const fetchProfileDetails = async () => {
    try {
      let response = await get(API_URL.PROFILE_LIST);
      if (response) {
        setProfileDetails(response);
      }
    } catch (e) {
      console.log('error', e.message);
    }
  }

  const handleImageUpload = async () => {
    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      await post(API_URL.PROFILE_IMAGE_EDIT, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then((response) => {
        if (response && response.message && response.data) {
          setProfileDetails(response.data)
        }
      });
    } catch (error) {
      // Handle error
      console.error('Error uploading image:', error);
    }
  };

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  useEffect(() => {
    fetchProfileDetails()
  }, []);


  return (
    <div className='outer'>
      <div className="image-container">
        <img src={`${userAPI}${profileDetails?.image}?${Date.now()}`} width="50%" alt="" />
        <input type="file" onChange={handleImageChange} />
        <button onClick={handleImageUpload}>Upload Image</button>
        {/* <span className="edit-icon"><i className="fas fa-edit"></i></span> */}
      </div>
      <h1><i className="fa-solid fa-user"></i> : {profileDetails?.name}</h1>
      <h1><i className="fa-solid fa-envelope"></i> : {profileDetails?.email}</h1>
      <h1><i className="fa-solid fa-phone"></i> : {profileDetails?.phone}</h1>
    </div>


  )
}

export default Profile
