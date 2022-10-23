import { Link, useLocation } from 'react-router-dom'
import 'bootstrap'
import logo from '../../recursos/logo2.png'
import DropDown from './DropDown'
import SearchBar from "./SearchBar"
import { useSelector } from 'react-redux'



const NavBar = () => {

    const userInfo = useSelector(state => state.loginReducer.userInfo);
    const dir = useLocation()

    return (
        <nav className='customNavbar d-flex justify-content-center m-0 p-0'>
            <div className='col-3 p-0 m-0'>
                <div className='row  p-0 m-0 justify-content-center'>
                    <div className='col d-flex justify-content-center'>
                        <Link to='/Home'>
                            <img src={logo} height="50px" alt="logo" />
                        </Link>
                    </div>
                </div>
            </div>
            <div className='col p-0 m-0'>
                <div role="group" aria-label="Basic example" className=' d-flex'>
                    <Link to="/Home"><button type="button" className="btn btn-primary m-1" >Home</button></Link>
                    <Link to="/AskQuestion"><button type="button" className="btn btn-primary m-1 " >Ask Question</button></Link>
                    <Link to="/Donations"><button type="button" className="btn btn-primary m-1" > Donate</button></Link>
                    {userInfo && userInfo.isAdmin && (
                        <>
                            <Link to="/admin-panel"><button type="button" className="btn btn-danger m-1">Users</button></Link>
                            <Link to="/categories"><button type="button" className="btn btn-danger m-1">Categories</button></Link>
                        </>
                    )}
                </div>
            </div>
            <div className='col  p-0 m-0'>
                {dir.pathname === "/Home" && <SearchBar />}
            </div>
            <div className='col-1 p-0 m-0 justify-content-end d-flex'>
                <DropDown />
            </div>
        </nav>
    );
}

export default NavBar;