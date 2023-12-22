import React, { useContext, useState } from 'react';
import './Login.css'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';

const Login = () => {
    const [error, setError] = useState('')
    const [succes, setSucces] = useState('')
    const [show, setShow] = useState(false)
    const { singInUser } = useContext(AuthContext)
    const Naveget = useNavigate();
    const location = useLocation();
    console.log(location);

    const from = location.state?.from?.pathname || '/'

    const handLogin = (event) => {
        setError('')
        setSucces('')
        event.preventDefault()
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        singInUser(email, password)
            .then(result => {
                const loginUser = result.user;
                console.log(loginUser);
                form.reset()
                setSucces('user uccesfully login')
                Naveget(from, { replace: true })

            })
            .catch(error => {
                console.log(error.message);
                setError(error.message)
            })

    }
    return (
        <div className='form-contaier'>
            <h2 className='form-title'>Please Login</h2>
            <form onSubmit={handLogin}>
                <div className="form-control">
                    <label htmlFor="">Email</label>
                    <input type="text" name='email' id='' required />
                </div>
                <div className="form-control">
                    <label htmlFor="">password</label>
                    <input type={show ? 'password' : 'text'} name='password' id='' required />
                    <p onClick={()=>setShow(!show)}>
                        
                            {
                                show ? <Link><span>Hide password</span></Link> : <Link><span>show password</span></Link>
                            }
                        
                        </p>
                   
                </div>
                <p>New to this website<Link to='/regester'> ?  <span>Regester</span></Link></p>
                <div><p className='text-error'>{error}</p></div>
                <div><p className='text-succes'>{succes}</p></div>
                <input className='btn-submit' type="submit" value="Login" />
            </form>
        </div>
    );
};

export default Login;