import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Hero from './hero';
import Login from './login';
import Signup from './signup';
import Home from './home';
import Nav from './nav';
import CreateEntry from './CreateEntry';

const Approutes = () => 
{

    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={ <Hero/> }></Route>
                <Route path='login' element={ <Login/> }></Route>
                <Route path="signup" element={<Signup />}></Route>
                
                <Route path="home" element={<Nav/>}>
                    <Route index element={<Home/>}></Route>
                    <Route path="addanentry" element={<CreateEntry/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Approutes;