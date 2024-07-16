import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import axios from "../api/axios"
import { toast } from "react-hot-toast"
import { loginSuccess } from "../redux/Slices/AuthSlice"
const LOGIN_URL = '/api/v1/login';

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const [showPassword, setShowPassword] = useState(false)

    const { email, password } = formData

    const handleOnChange = (e) => {
        setFormData((prevData) => ({
        ...prevData,
        [e.target.name]: e.target.value,
        }))
    }

    const handleOnSubmit = async(e) => {
      e.preventDefault()

      try{
        const response = await axios.post(LOGIN_URL, 
          JSON.stringify({ email, password }),
          {
              headers: { 'Content-Type': 'application/json' },
              withCredentials: true
          }
        );
        console.log(JSON.stringify(response?.data));
        dispatch(loginSuccess(response.data.user));
        toast.success("Logged In Successfully");
        navigate("/");
      }
      catch(error){
          console.log("Error while login");
      }
  }

    
    return (
      <form
        onSubmit={handleOnSubmit}
        className="mt-12 max-w-md mx-auto flex flex-col gap-y-4 p-6 bg-white shadow-md rounded-lg"
      >
        <label className="w-full">
          <p className="mb-1 text-sm leading-5 text-gray-700">
            Email Address <sup className="text-red-600">*</sup>
          </p>
          <input
            required
            type="text"
            name="email"
            value={email}
            onChange={handleOnChange}
            placeholder="Enter email address"
            className="form-input mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-600 focus:ring focus:ring-green-600 focus:ring-opacity-50"
          />
        </label>
      
        <label className="relative">
          <p className="mb-1 text-sm leading-5 text-gray-700">
            Password <sup className="text-red-600">*</sup>
          </p>
          <input
            required
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={handleOnChange}
            placeholder="Enter Password"
            className="form-input mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-600 focus:ring focus:ring-green-600 focus:ring-opacity-50"
          />
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-[25px] z-10 cursor-pointer"
          >
            {showPassword ? (
              <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
            ) : (
              <AiOutlineEye fontSize={24} fill="#AFB2BF" />
            )}
          </span>
        </label>
      
        <button
          type="submit"
          className="uppercase bg-green-600 hover:bg-green-700 text-white rounded-lg py-3 px-8 mt-6 transition duration-300 ease-in-out"
        >
          Sign In
        </button>
      </form>
    
    )
};

export default Login;