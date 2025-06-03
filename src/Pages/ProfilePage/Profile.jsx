import React, { useEffect, useRef, useState } from 'react'
import profilePic from "../../Images/profile.jpeg"
import { Eye, EyeOff, StickyNote, CheckCircle, Clock, AlarmClockOff, Activity } from 'lucide-react'
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
      setUserData((prev) => ({
        ...prev,
        username: user.displayName || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  const handleImageClick = () => fileInputRef.current.click()

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
    const { name, value } = e.target
    setUserData((prevUser) => ({
      ...prevUser,
      [name]: value,
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
      await updateProfile(user, { displayName: userData.username });
      if (userDocRef) {
        await updateDoc(userDocRef, {
          username: userData.username,
        });
      }
      setUserData((prev) => ({
        ...prev,
        username: auth.currentUser.displayName,
      }));
      setEditProfile(false);
      setError("");
    } catch (err) {
      setError("Failed to edit profile!");
      console.error(err);
    }
  };

  const stats = [
    {
      label: "Created",
      value: 42,
      icon: <StickyNote className="w-6 h-6 text-blue-500" />,
      bg: "bg-blue-100 dark:bg-blue-900"
    },
    {
      label: "Completed",
      value: 30,
      icon: <CheckCircle className="w-6 h-6 text-green-500" />,
      bg: "bg-green-100 dark:bg-green-900"
    },
    {
      label: "Pending",
      value: 8,
      icon: <Clock className="w-6 h-6 text-yellow-500" />,
      bg: "bg-yellow-100 dark:bg-yellow-900"
    },
    {
      label: "Expired",
      value: 4,
      icon: <AlarmClockOff className="w-6 h-6 text-red-500" />,
      bg: "bg-red-100 dark:bg-red-900"
    }
  ];

  const activity = [
    { id: 1, text: "Created task: 'Finish design system'", time: "2h ago" },
    { id: 2, text: "Marked task 'Update resume' as completed", time: "5h ago" },
    { id: 3, text: "Added new task: 'Read Firebase docs'", time: "Yesterday" },
    { id: 4, text: "Missed deadline for 'Client feedback'", time: "2 days ago" },
  ];

  return (
    <div className="w-full h-full rounded-2xl p-6 md:p-10 bg-primary dark:bg-primary-dark text-gray-800 dark:text-gray-100">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
        <div className="flex items-center gap-6">
          <picture className='relative w-32 h-32'>
          <img
            src={profilePic} 
            alt="Profile Picture" 
            className={`absolute w-32 h-32 rounded-2xl hover:bg `}
          />
          <div 
            onClick={editProfile ? handleImageClick : null} 
            className={`bg-black opacity-50 rounded-2xl text-white font-semibold absolute w-full h-full flex flex-col text-center justify-center ${editProfile ? "cursor-pointer" : ""}  ${editProfile ? "block" : "hidden"}`}>
            Change image
          </div>
        </picture>

          <div>
            <div className="mb-2 text-xl font-semibold">
              {editProfile ? (
                <input
                  name="username"
                  value={userData.username}
                  onChange={handleChange}
                  className="px-2 py-1 rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600"
                />
              ) : (
                <span>{userData?.username || user?.displayName || "No username"}</span>
              )}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">📧 {user.email}</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          {editProfile ? (
            <button
              onClick={handleEdit}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
            >
              Save Changes
            </button>
          ) : (
            <button
              onClick={() => setEditProfile(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Edit Profile
            </button>
          )}
          <LogOut handleLogout={handleLogout} />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className={`p-6 rounded-xl shadow-md flex items-center justify-between ${stat.bg}`}
          >
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</div>
              <div className="text-2xl font-bold text-gray-800 dark:text-white">{stat.value}</div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-2 rounded-full shadow">{stat.icon}</div>
          </div>
        ))}
      </div>

      {/* Activity Feed */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5" /> Recent Activity
        </h2>
        <ul className="space-y-4">
          {activity.map((item) => (
            <li key={item.id} className="flex justify-between items-start border-b border-gray-200 dark:border-gray-700 pb-2">
              <span>{item.text}</span>
              <span className="text-sm text-gray-400">{item.time}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Profile;
