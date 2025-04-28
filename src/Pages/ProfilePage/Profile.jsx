import React, { useRef, useState } from 'react'
import profilePic from "../../Images/profile.jpeg"
import { Eye, EyeOff } from 'lucide-react'
import LogOut from '../../Components/Profile/LogOut'
import { auth } from '../../Firebase/Firebase'
import { useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'


function Profile() {
  const [showPassword, setShowPassword] = useState(false)
  const [editProfile, setEditProfile] = useState(false)
  const [userData, setUserData] = useState({
    username:"Selvedin",
    email:"sele@gmail.com",
    password:"1234565",
    confirmPassword:"123456",
    image: profilePic
  })
  const fileInputRef = useRef(null)
  const [error, setError] = useState("")
  const navigate = useNavigate();

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

  return (
    <div className='border-1 h-full p-8 flex flex-col'>
       <picture className='relative w-32 h-32'>
          <img
            src={userData.image} 
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
            <p>{userData.username}
            </p>}
          </div>
          <div className='flex gap-2'>
            <p className='font-semibold'>Email:</p>
            {editProfile ? 
            <input 
            onChange={handleChange}
            name='email'
            type='text'
            value={userData.email}
            /> 
            : 
            <p>{userData.email}</p>}
          </div>
          <div className='flex gap-2 items-center'>
            <p className='font-semibold'>Password:</p>
           {editProfile ? (
            <div> 
            <input 
            onChange={handleChange}
            name='password'
            value={userData.password}
            type={showPassword ? "text" : "password"} 
            />
            <button
            onClick={() => setShowPassword(prev => !prev)}
            className='ml-2'
            aria-label="Toggle Password Visibility"
            >
              {showPassword ? <Eye className='cursor-pointer' size={20} /> : <EyeOff className='cursor-pointer' size={20}/>}
            </button></div>
          ) 
           : 
           (
           <div>  
            <input 
            type={showPassword ? "text" : "password"} 
            className='outline-none'
            readOnly
            value={userData.password}
            />
            <button
            onClick={() => setShowPassword(prev => !prev)}
            className='ml-2'
            aria-label="Toggle Password Visibility"
            >
              {showPassword ? <Eye className='cursor-pointer' size={20} /> : <EyeOff className='cursor-pointer' size={20}/>}
            </button></div>
          )}
          </div>
        </div> 
        <div className='w-full justify-between flex mt-auto self-start'>
            {editProfile ?  
          <button 
          onClick={() => setEditProfile(false)}
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



