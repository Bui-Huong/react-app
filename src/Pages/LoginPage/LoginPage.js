import React, {useEffect, useState,createContext } from 'react';
import axios, { Axios } from "axios";
import { AuthContext } from "../../App";


const validateEmail= email =>{
    if(!email) return 'Required'
    const isValidEmail = String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    if(!isValidEmail) return 'Invalid email';
    return '';
};
const validatePassword = password =>{
    if(!password) return 'Required'
    if(password.length<0) return 'At least 8 characters';
    return '';
};
const LoginPage = () =>{
    const {setLoginState}=React.useContext(AuthContext);
    const initialState = {
        email: '',
        password: '',
    };
    
    const [values, setValues] = useState(initialState);
    const [touched,setTouched] = useState({
        email: false,
        password:false,
    })

    const errors = {
        email:validateEmail(values.email),
        password:validatePassword(values.password)
    };
    console.log('errors = ', errors);

    const handleInputChange = evt =>{
        setValues(
            {...values,[evt.target.name]: evt.target.value})
    };
    const handleInputBlur = evt =>{
        setTouched({
            ...touched,
            [evt.target.name]:true
        })
    }
    const handleOnSubmit = evt =>{
        evt.preventDefault();
        console.log('values = ', values);
        setValues({
            ...values,
        });
        axios(
            {
            url: 'https://60dff0ba6b689e001788c858.mockapi.io/tokens',
            method:'GET'
    })
    .then(resJson=>{
        setLoginState(resJson);
        console.log('resJson: ', resJson);
        axios.defaults.headers.common['Authorization']=resJson.data
    })     
    };
    const isFormValid = errors.email || errors.password;

    return(
        <div>
            <form onSubmit={handleOnSubmit}>
                <div>
                <input style = {{display:'block', margin:'20px'}} 
                type="text" 
                placeholder='Email' 
                value={values.email} 
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                name = "email"
                />
                { touched.email && <p style={{color:'pink', margin: '20px'}}>{errors.email}</p>}
                </div>

                <div>
                <input style = {{display:'block', margin:'20px'}} 
                type="password" 
                placeholder='Password' 
                value={values.password} 
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                name="password"/>
                <p style={{color:'pink', margin: '20px'}}>{errors.password}</p>
                </div>

                <button disabled ={isFormValid} style={{display:'block', margin:'20px'}} type ="submit">Submit</button>
            </form>
            
        </div>
    )
}
export default LoginPage;