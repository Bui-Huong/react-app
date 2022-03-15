import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoginPage from "../LoginPage/LoginPage";
import { AuthContext } from "../../App";
const CancelToken = axios.CancelToken;

const ProfilePage = () => {
    const [information,setInformation] = useState({})
    const {loginState}= useContext(AuthContext)
    useEffect(()=>{
        let cancel = false;
        axios({
            method:'GET',
            url: `https://60dff0ba6b689e001788c858.mockapi.io/users/${loginState.userId}`,
            CancelToken : new CancelToken(function executor(c){
                cancel=c;
        })
    }).then(res=>{
        setInformation(res)
    });
    return ()=>{
        console.log('clear effect');
        cancel();
    }
    },[])
    return (
        <div className="App">{!loginState?.token ? <LoginPage /> : (
            <div>
           <p>token: {information.token}</p>
           <p>userID:{information.userId}</p>
        </div>
        )}</div>
    )
};
export default ProfilePage;