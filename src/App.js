import Home from "./Components/Home/Home";
import HomePage from "./Pages/HomePage/HomePage";
import { useState } from "react";
import { Link } from "react-router-dom";
import PostPage from "./Pages/PostPage/PostPage";
import PostsPage from "./Pages/PostsPage/PostsPage";
import LoginPage from "./Pages/LoginPage/LoginPage";

import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

const PATHS = {
    Home: '/',
    Post:'/post/:id',
    Posts:'/posts',
    Login:'/login',
}
const router =[{
    path: PATHS.Home,
    element:(<HomePage/>)
},
{
    path: PATHS.Login,
    element:(<LoginPage/>)
},
{
    path: PATHS.Post,
    element:(<PostPage/>)
},
{
    path: PATHS.Posts,
    element:(<PostsPage/>)
},

];
const navbarItems =[{
    to: PATHS.Home,
    title: 'home'
},
{
    to: PATHS.Login,
    title: 'login'
},
{
    to: PATHS.Posts,
    title: 'posts'
},

]
const App = () => {

    // const getPage = () =>{
    //     switch(pageSelected){
    //         case OPTIONS.Home: return<HomePage/>
    //         case OPTIONS.Post: return<PostPage/>
    //         case OPTIONS.Posts: return<PostsPage/>
    //         case OPTIONS.Login: return<LoginPage/>
    //         default: return <div>You need to enable JavaScript to run this app</div>
    //     }
    // }
    return (
        <div>
              <BrowserRouter>
                <ul style={{display:'flex'}}>
                    { navbarItems.map(item=>(
                        <li style={{margin:20}}><Link to={item.to}>{item.title}</Link></li>
                    ))
                    }
                    {/* <li style={{margin:20}}><Link to="/">Home</Link></li>
                    <li style={{margin:20}}><Link to="/post">PostPage</Link></li>
                    <li style={{margin:20}}><Link to="/posts">PostsPage</Link></li>
                    <li style={{margin:20}}><Link to="/login">LoginPage</Link></li> */}
                </ul>
                <Routes>
                    {router.map(route =>(
                    <Route key={route.path} path={route.path} element={route.element}/>
                ))}
                </Routes>
            </BrowserRouter>,

            {/* <select value={pageSelected} onChange={handleChange}>
                <option value={OPTIONS.Home}>Home Page</option>
                <option value={OPTIONS.Post}>Post Page</option>
                <option value={OPTIONS.Posts}>Post List Page</option>
                <option value={OPTIONS.Login}>Login Page</option>
            </select>
            {getPage()} */}
        </div>
    )
};
export default App;