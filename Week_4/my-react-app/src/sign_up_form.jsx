import React, { useState } from 'react';

const SignUpForm = () =>  {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        passwordConfirm: "",
    })
    
    
    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }))
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        if(formData.password === formData.passwordConfirm) {
            console.log("Successfully signed up")
        } else {
            console.log("Passwords do not match")
            return
        }
        
        if(formData.joinedNewsletter) {
            console.log("Thanks for signing up for our newsletter!")
        }
    }
    
    return (
        <div className="form-container">
            <form className="form" onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    placeholder="Email address"
                    className="form--input"
                    name="email"
                    onChange={handleChange}
                    value={formData.email}
                />
                <input 
                    type="password" 
                    placeholder="Password"
                    className="form--input"
                    name="password"
                    onChange={handleChange}
                    value={formData.password}
                />
                <input 
                    type="password" 
                    placeholder="Confirm password"
                    className="form--input"
                    name="passwordConfirm"
                    onChange={handleChange}
                    value={formData.passwordConfirm}
                />
                <button 
                    className="form--submit"
                >
                    Sign up
                </button>
            </form>
        </div>
    )
}
