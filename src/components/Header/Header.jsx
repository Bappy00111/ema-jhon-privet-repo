import React, { useContext } from 'react';
import './Header.css';
import logo from '../../images/Logo.svg';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';

const Header = () => {
    const {logOut,user} = useContext(AuthContext)

    const handelLogOut = () =>{
        logOut()
        .then(() => {

        })
        .catch(error => {
            console.log(error.message);
        })
    }
    return (
        <nav className='header'>
            <img src={logo} alt="" />
            <div>
                <Link to="/">Shop</Link>
                <Link to="/orders">Orders</Link>
                {/* <Link to="/checkout">Checkout</Link> */}
                <Link to="/inventory">Inventory</Link>
                <Link to="/login">Login</Link>
                <Link to="/regester">Regester</Link>
               
                {
                    user &&  <span>wellcome{user.email} <button onClick={handelLogOut}>singOut</button></span> 
                }
            </div>
        </nav>
    );
};

export default Header;