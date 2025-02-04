import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "../routes/Routes";
import Error from "../components/Error";
import LandingPageLayout from "../layouts/LandingPageLayout";
import Home from "../components/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import UserLoggedinPageLayout from "../layouts/UserLoggedinPageLayout";
import LoggedInFeatures from "../components/userLoggedIn/LoggedInFeatures";
import Chatting from "../components/userLoggedIn/Chatting";

const router = createBrowserRouter([
    {
        path: `${ROUTES.HOME}`,
        element: <LandingPageLayout />,
        errorElement: <Error />,
        children: [
            {
				path: `${ROUTES.HOME}`,
				element: <Home />,
			},
            {
				path: `${ROUTES.LOGIN}`,
				element: <Login />,
			},
			{
				path: `${ROUTES.REGISTER}`,
				element: <Register />,
			},
        ],
    },
    {
        path: `${ROUTES.USER_LOGGEDIN.STATIC}`,
        element: <UserLoggedinPageLayout />,
        errorElement: <Error />,
        children: [
            {
				path: `${ROUTES.USER_LOGGEDIN.STATIC}`,
				element: <LoggedInFeatures />,
			},
            {
				path: `${ROUTES.CHAT.STATIC}`,
				element: <Chatting />,
			},
        ],
    },


]);

export default router;
