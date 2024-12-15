import { Link } from "react-router-dom";

export default function Banner() {
	return (
		<section>
			<div className="hero bg-base-200 shadow-xl rounded-lg mt-5 px-5">
				<div className="hero-content flex-col lg:flex-row-reverse">
					<img
						src="https://i.ibb.co.com/2SwZLr2/banner-open-book-logo.jpg"
						className="lg:max-w-xl md:max-w-lg rounded-lg shadow-2xl"
					/>
					<div className="space-y-10">
						<div>
							<div className="text-2xl text-slate-500">
								Books build minds, not debt.<br />
							</div>
							<div className="mt-5 text-2xl text-slate-600">
								Knowledge is worth more than money.<br />
							</div>
							<div className="mt-5 text-4xl font-bold text-slate-700">
								Books are an investment, not a luxury.
							</div>
						</div>
						<div>
							<Link><a className="btn btn-neutral">Buy Now</a></Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}