import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hero from "./pages/hero";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Home from "./pages/home";
import Nav from "./pages/nav";
// import CreateEntry from './CreateEntry';
// import CreateCategory from './category/CreateCategory';

const Approutes = () => {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Hero />}></Route>
            <Route path="login" element={<Login />}></Route>
            <Route path="signup" element={<Signup />}></Route>

            <Route path="home" element={<Nav />}>
            <Route index element={<Home />}></Route>
            </Route>
        </Routes>
        </BrowserRouter>
    );
};

export default Approutes;
