// import { useAuthContext } from "./useAuthContext";


// import { signOut } from "firebase/auth"
// import { auth } from "../firebase/config"



// export const useLogout = () => {
//     const { dispatch} = useAuthContext();


//     const logout = ()=> {
//         signOut(auth)
//             .then(()=> {
//                 dispatch({type: 'LOGOUT'})
//             })
//             .catch((err)=> {
//                 console.log(err.message);
//             })
//     }

//     return { logout}
import { useAuthContext } from "./useAuthContext";


import { signOut } from "firebase/auth"
import { auth } from "../firebase/config"

import { useNavigate } from 'react-router-dom';

export const useLogout = () => {
  
  const { dispatch } = useAuthContext();
const navigate = useNavigate()
  const logout = async () => {
    try {
      await signOut(auth);
      dispatch({ type: 'LOGOUT' });
      navigate('/login'); // Redirect after successful logout
    } catch (error) {
      console.error('Logout error:', error.message);
    }
  };

  return { logout };
};
