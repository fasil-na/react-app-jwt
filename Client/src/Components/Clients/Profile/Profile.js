import React from 'react'
import "./Profile.css";
import { get } from 'config/index';
import { API_URL } from 'config/endpoints';

function Profile() {
  const [profileDetails, setProfileDetails] = React.useState(null);
  React.useEffect(() => {
    const fetchProfileDetails = async () => {
      try {
        let response = await get(API_URL.PROFILE_LIST);
        console.log('response', response);
        if (response) {
          setProfileDetails(response);
        }
      } catch (e) {
        console.log('error', e.message);
      }
    }

    fetchProfileDetails()
  }, [])
  return (
    <div className='outer'>

      <h1>name</h1>
      <p>{profileDetails?.name}</p>
      <h1> <i class="fa-solid fa-envelope"></i>Email</h1>
      <p>{profileDetails?.email}</p>
      <i class="fa-solid fa-phone">  Phone  </i>
      <p>{profileDetails?.phone}</p>
    </div>
  )
}

export default Profile
