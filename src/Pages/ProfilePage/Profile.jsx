import React, { useEffect, useRef, useState } from 'react'
import profilePic from "../../Images/profile.jpeg"
import { Eye, EyeOff } from 'lucide-react'
import LogOut from '../../Components/Profile/LogOut'
import { auth, updateDoc } from '../../Firebase/Firebase'
import { useNavigate } from 'react-router-dom'
import { signOut, updateProfile } from 'firebase/auth'
import { useAuth } from '../../Contexts/AuthContext'
import { useUser } from '../../Contexts/UserContext'


function Profile() {
  const [editProfile, setEditProfile] = useState(false)
  const fileInputRef = useRef(null)
  const [error, setError] = useState("")
  const navigate = useNavigate();
  const { user } = useAuth();
  const { userDocRef, userData, setUserData } = useUser();


  useEffect(() => {
    if (user) {
      console.log(userData)
      setUserData((prev) => ({
        ...prev,
        username: user.displayName || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  const handleImageClick = () => {
    fileInputRef.current.click()
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const localURL = URL.createObjectURL(file);
      setUserData((prevUser) => ({
        ...prevUser,
        image: localURL
      }))
    }
  };

  const handleChange = (e) => {
    const {name, value} = e.target
    setUserData((prevUser) => ({
      ...prevUser,
      [name] : value,
    }))
  }

  const handleLogout = async () => {
    try {
        await signOut(auth);
        navigate("/auth");
    } catch (err) {
        setError("Failed to logout!");
    }
};

const handleEdit = async () => {
  try {
    // 1. Update the Firebase user profile
    await updateProfile(user, { displayName: userData.username });

    // 2. Update the Firestore document if needed
    if (userDocRef) {
      await updateDoc(userDocRef, {
        username: userData.username,
      });
    }

    // 5. Update local state (optional, to reflect changes in Profile page)
    setUserData((prev) => ({
      ...prev,
      username: auth.currentUser.displayName,
    }));

    // 6. Cleanup UI
    setEditProfile(false);
    setError("");
  } catch (err) {
    setError("Failed to edit profile!");
    console.error(err);
  }
};
  return (
    <div className='border-1 h-full p-8 flex flex-col'>
       <picture className='relative w-32 h-32'>
          <img
            src={profilePic} 
            alt="Profile Picture" 
            className={`absolute w-32 h-32 rounded-2xl hover:bg `}
            
          />
          <div 
          onClick={editProfile ? handleImageClick : null} 
          className={`bg-black opacity-50 rounded-2xl text-white font-semibold absolute w-full h-full flex flex-col text-center justify-center ${editProfile ? "cursor-pointer" : ""}  ${editProfile ? "block" : "hidden"}`}>Change image</div>
        </picture>
        <input 
        type="file"
        accept='image/*'
        onChange={handleImageChange}
        ref={fileInputRef}
        className='hidden'
        />
        <div className='flex flex-col gap-4 mt-4'>
          <div className='flex gap-2'>
            <p className='font-semibold'>Username:</p>
            {editProfile ? 
            <input 
            onChange={handleChange}
            name='username'
            type='text'
            value={userData.username}
            /> 
            : 
            <p>{userData?.username || user?.displayName || "No username"}</p>
            }
          </div>
          <div className='flex gap-2'>
            <p className='font-semibold'>Email:</p>
            <p>{user.email}</p>
          </div>
          <button 
            className="self-start cursor-pointer bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition-colors duration-200"
          >
            Change Password
          </button>
        </div> 
        <div className='w-full justify-between flex mt-auto self-start'>
            {editProfile ?  
          <button 
          onClick={() => handleEdit()}
          className="cursor-pointer bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
            Save Changes
          </button>
          : 
          <button 
          
          onClick={() => setEditProfile(true)}
          className="cursor-pointer mt-auto self-start bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 ">
            Edit Profile
          </button>  }
          <LogOut handleLogout={handleLogout} />
        </div>
        
    </div>
  )
}

export default Profile



