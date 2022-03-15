import Home from "./Components/Home/Home";
import HomePage from "./Pages/HomePage/HomePage";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import PostPage from "./Pages/PostPage/PostPage";
import PostsPage from "./Pages/PostsPage/PostsPage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";

import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
export const AuthContext = React.createContext();
const initialState = {
    isAuthenticated: false,
    userId: null,
    token: null
};

const PATHS = {
    Home: '/',
    Post: '/post/:id',
    Posts: '/posts',
    Login: '/login',
    Profile: '/profile',
}
const router = [{
    path: PATHS.Home,
    element: (<HomePage />)
},
{
    path: PATHS.Login,
    element: (<LoginPage />)
},
{
    path: PATHS.Post,
    element: (<PostPage />)
},
{
    path: PATHS.Posts,
    element: (<PostsPage />)
},
{
    path: PATHS.Profile,
    element: (<ProfilePage />)
},

];
const navbarItems = [{
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
{
    to: PATHS.Profile,
    title: 'profile'
},

]
const App = () => {
    const [loginState, setLoginState] = useState(initialState);
    return (
        <div>
            <AuthContext.Provider value={{
                loginState,
                setLoginState,
            }}>
                <BrowserRouter>
                    <ul style={{ display: 'flex' }}>
                        {navbarItems.map(item => (
                            <li style={{ margin: 20 }}><Link to={item.to}>{item.title}</Link></li>
                        ))
                        }
                    </ul>
                    <Routes>
                        {router.map(route => (
                            <Route key={route.path} path={route.path} element={route.element} />
                        ))}
                    </Routes>
                </BrowserRouter>

            </AuthContext.Provider>
        </div>
    )
};
export default App;