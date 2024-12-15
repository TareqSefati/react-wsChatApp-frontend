import { Link, useRouteError } from "react-router-dom";
import { ROUTES } from "../routes/Routes";

export default function Error() {
	const error = useRouteError();
	return (
		<div className="grid place-items-center shadow-xl p-6 rounded-lg">
			<p className="text-orange-500 text-5xl font-bold font-edu">
				This Web Page is Coming Soon
			</p>
			<br />
			<img className="w-96" src="/images/404.jpg" alt="Error image" />
			<p className="text-red-400 mt-16 text-5xl font-bold">
				{error.statusText || error.message}
			</p>
			<h4 className="text-3xl font-semibold mt-10">
				Please Go Back to &nbsp;
				<Link to={ROUTES.HOME}>
					<button className="btn btn-active btn-sm btn-secondary text-white rounded-none text-lg font-bold">
						Home
					</button>
				</Link>
			</h4>
		</div>
	);
}