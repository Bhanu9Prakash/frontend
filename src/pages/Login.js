import React, { useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import { sentOtpFunction } from "../services/Apis";
import Spinner from 'react-bootstrap/Spinner';
import "../styles/mix.css"


const Login = () => {

    const [email, setEmail] = useState("");
    const [spiner,setSpiner] = useState(false);

    const navigate = useNavigate();



    // sendotp
    const sendOtp = async (e) => {
        e.preventDefault();

        if (email === "") {
            toast.error("Enter Your Email !")
        } else if (!email.includes("@")) {
            toast.error("Enter Valid Email !")
        } else {
            setSpiner(true)
            localStorage.setItem("email", email);
            const data = {
                email: email
            }

            const response = await sentOtpFunction(data);
            console.log(response);


            // if (response.status === 200) {
            //     setSpiner(false)
            //     navigate("/user/otp",{state:email})
            // } else {
            //     toast.error(response.response.data.error);
            // }
            if (response && response.status === 200) {
                setSpiner(false)
                navigate("/user/otp",{state:email})
            } else {
                const errorMessage = response && response.response && response.response.data && response.response.data.error;
                toast.error(errorMessage || "Something went wrong. Please try again later.");
            }
        }
    }

    return (
        <>
            <section>
                <div className="form_data">
                    <div className="form_heading">
                        <h1>Log In</h1>
                    </div>
                    <form>
                        <div className="form_input">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" id="" onChange={(e) => setEmail(e.target.value)} placeholder='Enter Your Email Address' />
                        </div>
                        <button className='btn' onClick={sendOtp}>Login
                        {
                            spiner ? <span><Spinner animation="border" /></span>:""
                        }
                        </button>
                        <p> Or <NavLink to="/register"> Sign up </NavLink> </p>
                    </form>
                </div>
                <ToastContainer />
            </section>
        </>
    )
}

export default Login