import { Outlet, useParams } from 'react-router-dom'
import LoggedInNavbar from '../components/userLoggedIn/LoggedInNavbar'
import { useEffect, useState } from 'react';

export default function UserLoggedinPageLayout() {
    // const [user, setUser] = useState({})
    // const {userId} = useParams()
    // console.log("logged in id from layout: ", userId);
    // const dbUrl = `${import.meta.env.VITE_FIND_USER_BY_ID_URL}/${userId}`;
    // useEffect(()=>{
    //     fetch(dbUrl)
    //     .then((res) => res.json())
    //     .then((data) => {
    //         console.log("Logged in user full data: ", data);
    //         setUser(data);
    //     })
    //     .catch((err) => {
    //         console.log("Loggedin user data fetch error:", err);
    //     });
    // },[]);
  return (
    <div className="max-w-7xl mx-auto">
        <LoggedInNavbar></LoggedInNavbar>
        <Outlet></Outlet>
    </div>
  )
}
