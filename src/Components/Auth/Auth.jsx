import React, { useState } from 'react'
import { auth, db} from "../../Firebase/Firebase"
import {  createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth"
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Auth() {
  const [isLogin, setIsLogin] = useState(false)
  const [formData, setFormData] = useState({
    username:"",
    email:"",
    password:"",
    confirmPassword:"",
  })
  const [error, setError] = useState("")
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value} = e.target;
    setFormData({...formData, [name]: value})
  }

  const handleSignup = async () => {
    if(formData.password !== formData.confirmPassword){
      setError("Passwords do not match")
      return
    } try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password)
      const user = userCredential.user

      await updateProfile(user, {displayName: formData.username})

      await setDoc(doc(db, "users", user.uid), {
        username: formData.username,
        email: formData.email
      })

      setError("");
      navigate("/");
    } catch (err){
      console.log("Signup Error:", err)
      setError(err.message)
    }
  }

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password)
      const user = userCredential.user

      const userDoc = await getDoc(doc(db, "users", user.uid))
      if(userDoc.exists()) {
        setError("")
        navigate("/")
      }
    } catch {

    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(isLogin){
      handleLogin()
    } else {
      handleSignup()
    }
    
  }

  return (
    <>
        <div className='bg-primary dark:bg-primary-dark w-full min-h-screen flex flex-col items-center justify-center'>
          <div className='border-accent bg-primary-darker border-2 rounded-2xl p-8 max-w-md'>
            <form 
             onSubmit={handleSubmit}
            className='flex flex-col gap-4'
            >
              {error}
               <h1 className='text-center font-bold text-2xl text-primary-dark dark:text-primary'>{isLogin ? "Login" : "SignUp"}</h1>
                {!isLogin &&
                  <div
                  className='w-full'
                  >
                      <label className='font-semibold' htmlFor="username">Username:</label>
                      <input 
                      placeholder='e.g. john_doe99"'
                      type="text"
                      name='username' 
                      onChange={handleInputChange}
                      className='border-accent border-2 focus:ring-1 focus:shadow-2xl focus:ring-accent outline-none rounded-md px-3 py-2 w-full bg-white'
                      />
                  </div> 
                }
                
                <div
                className='w-full'
                >
                    <label className='font-semibold' htmlFor="email">Email:</label>
                    <input 
                    placeholder='e.g. johndoe@gmail.com'
                    type="email"
                    name='email'
                    onChange={handleInputChange} 
                    className='border-accent border-2 focus:ring-1 focus:shadow-2xl focus:ring-accent outline-none rounded-md px-3 py-2 w-full bg-white'
                    />
                </div> 
                <div
                className='w-full'
                >
                    <label className='font-semibold' htmlFor="password">Password:</label>
                    <input 
                    placeholder='At least 6 characters, use numbers & symbols'
                    type="password"
                    name='password' 
                    onChange={handleInputChange}
                    className='border-accent border-2 focus:ring-1 focus:shadow-2xl focus:ring-accent outline-none rounded-md px-3 py-2 w-full bg-white'
                    />
                </div> 
                {!isLogin && (
                  <div
                  className='w-full'
                  >
                      <label className='font-semibold' htmlFor="confirmPassword">Confirm password:</label>
                      <input 
                      placeholder='Re-type your password'
                      type="password"
                      name='confirmPassword' 
                      onChange={handleInputChange}
                      className='border-accent border-2 focus:ring-1 focus:shadow-2xl focus:ring-accent outline-none rounded-md px-3 py-2 w-full bg-white'
                      />
                  </div> 
                )}
                
                <button
                type="button"
                 onClick={handleSubmit}
                className='font-semibold border-white focus:shadow-2xl focus:bg-emerald-600 focus:ring-1 outline-none text-center mt-4 flex items-center justify-center space-x-2 cursor-pointer bg-emerald-500 text-white border-2 rounded-xl px-6 py-3 hover:bg-emerald-600 dark:bg-emerald-500 dark:text-white dark:border-emerald-500 dark:hover:bg-emerald-600'
                >
                  {isLogin ? "Login" : "SignUp"}
                </button>
            </form>
            <div className='flex gap-1 justify-center mt-4'>
              <div>
              {isLogin ? "You don't have an account?" : "Already have an account?"}
              </div>
              <p className='text-blue-500 cursor-pointer font-semibold' onClick={() => setIsLogin(!isLogin)}>{isLogin ? "SignUp" : "Login"}</p>
            </div>
            
            <div className='flex gap-1 justify-center mt-4'>SignUp with<p className='text-blue-500 cursor-pointer font-semibold'>Google</p></div>
          </div>
            
        </div>
    </>
  )
}

export default Auth