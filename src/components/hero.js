import { NavLink } from "react-router-dom";

const Hero = () => {
    return (
        <div className="container center">
            <h1>Hero</h1>
            <NavLink to='/login'>Login</NavLink>
        </div>
    );
};

export default Hero;
