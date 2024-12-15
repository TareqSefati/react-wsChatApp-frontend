import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "../routes/Routes";
import Error from "../components/Error";
import LandingPageLayout from "../layouts/LandingPageLayout";
import Home from "../components/Home";
import Login from "../components/Login";
import Register from "../components/Register";

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
]);

export default router;
