import React, { useContext, useState } from 'react';
import './Regester.css'
import { Link } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';

const Regester = () => {
    const [error,setError] = useState('')
    const [succes,setSucces] = useState('')

    const {createUser} = useContext(AuthContext)

    const handelSubmit = (event) => {
        setError('')
        setSucces('')
        event.preventDefault();
        const from = event.target;
        const email = from.email.value;
        const password = from.password.value;
        const passwordConfram = from.passwordConfram.value;
        if(password !== passwordConfram){
           return setError('Your password did not match')
        }else if(password.length < 6){
           return setError('password at lest 6 carcater')
        }

        createUser(email,password)
        .then(result => {
            const singInUser = result.user;
            console.log(singInUser);
            setSucces('User succesfuly Regester')
        })
        .catch(error => {
            console.log(error.message);
        })

        from.reset()

    }
    return (
        <div className='form-contaier'>
        <h2 className='form-title'>Please Regester</h2>
        <form onSubmit={handelSubmit}>
            <div className="form-control">
                <label htmlFor="">Email</label> 
                <input type="text" name='email' id='' placeholder='your email' required />
            </div>
            <div className="form-control">
                <label htmlFor="">password</label>
                <input type="password" name='password' id='' placeholder='yor password' required />
            </div>
            <div className="form-control">
                <label htmlFor="">password Confram</label>
                <input type="password" name='passwordConfram' placeholder='password Confram' id='' required />
                <p>Alredy have a accunt ? <Link to='/login'><span> Login</span></Link></p>
                <div><p className='text-error'>{error}</p></div>
                <div><p className='text-succes'>{succes}</p></div>
            </div>
           <input className='btn-submit' type="submit" value="Regester" />
        </form>
    </div>
    );
};

export default Regester;