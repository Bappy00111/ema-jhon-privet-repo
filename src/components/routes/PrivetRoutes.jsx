import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

const PrivetRoutes = ({children}) => {

    const { user,lodding } = useContext(AuthContext);
    const location = useLocation();
    console.log(location);

    if(lodding){    
        return <p>lodding</p>
    }

    if(user){
        return children;
    }
    return <Navigate to='/login' state={{from:location}} replace></Navigate>
};

export default PrivetRoutes;