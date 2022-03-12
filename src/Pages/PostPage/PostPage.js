import React, { useEffect, useState } from "react";
import axios from "axios";

import { useParams } from "react-router-dom";
const CancelToken = axios.CancelToken;
const PostPage = () =>{
    const {id} = useParams()
    const [information,setInformation] = useState({
        id:id,
        title: null,
        body: null,
    });
    const [informationId, setInformationId] = useState(id);
    useEffect(()=>{
        let cancel = null;
        axios({
            method :'GET',
            url: `https://jsonplaceholder.typicode.com/posts/${informationId}`,
            CancelToken : new CancelToken(function executor(c){
                cancel=c;
            })
        }).then (response=>{
            setInformation({
                id: response.data.id,
                title: response.data.title,
                body: response.data.body,
            })
        });
        return ()=>{
            console.log('clear effect');
            cancel();
        }
    },[informationId])
    console.log('user: ', information);
    return (
        <div>
            <p>Id:{information.id}</p>
            <p>Title:{information.title}</p>
            <p>Body:{information.body}</p>
        </div>
    );
};
export default PostPage;