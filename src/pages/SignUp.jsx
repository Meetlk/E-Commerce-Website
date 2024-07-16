import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const LOGIN_URL = '/api/v1/signup';

function SignUp() {
    
    const navigate = useNavigate();

    const[formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    })

    const { name, email, password } = formData;

    const handleOnChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }))
    }

    const submitHandler= async(e) => {
        e.preventDefault()

        try{
          const response = await axios.post(LOGIN_URL, 
            JSON.stringify({ name, email, password }),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
          );
          console.log(JSON.stringify(response?.data));
          navigate("/login");
        }
        catch(error){
            if (!error?.response) {
                console.log('No Server Response');
            } else if (error.response?.status === 400) {
                console.log('User Already Exists');
                toast.error("User Already Exists, Please Login")
                navigate("/login");
            } else if (error.response?.status === 401) {
                console.log('Unauthorized');
            } else {
                console.log('Login Failed');
            }

        }
    }

    return (
        <form onSubmit={submitHandler} className="mt-12 max-w-md mx-auto flex flex-col gap-y-4 p-6 bg-white shadow-md rounded-lg">
            <label className="mb-4">
                <p className="text-sm leading-5 text-gray-700">Name <span className="text-red-600">*</span></p>
                <input
                    required
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleOnChange}
                    placeholder="Enter your name"
                    className="form-input mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-600 focus:ring focus:ring-green-600 focus:ring-opacity-50"
                />
            </label>

            <label className="mb-4">
                <p className="text-sm leading-5 text-gray-700">Email Address <span className="text-red-600">*</span></p>
                <input
                    required
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleOnChange}
                    placeholder="Enter email address"
                    className="form-input mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-600 focus:ring focus:ring-green-600 focus:ring-opacity-50"
                />
            </label>

            <label className="mb-4">
                <p className="text-sm leading-5 text-gray-700">Password <span className="text-red-600">*</span></p>
                <input
                    required
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleOnChange}
                    placeholder="Enter password"
                    className="form-input mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-600 focus:ring focus:ring-green-600 focus:ring-opacity-50"
                />
            </label>

            <button
                type="submit"
                className="uppercase bg-green-600 hover:bg-green-700 text-white rounded-lg py-3 px-8 mt-6 transition duration-300 ease-in-out"
            >
                Submit
            </button>
        </form>
    )
}

export default SignUp;