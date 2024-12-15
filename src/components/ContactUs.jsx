export default function ContactUs() {
	return (
		<section>
			<div className="mb-5 mt-10">
				<h1
					className="text-center font-semibold text-5xl mb-5"
				>
					Contact Us
				</h1>
				<hr className="w-3/4 mx-auto" />
			</div>

			<div className="bg-base-200 w-full shrink-0 shadow-xl rounded-lg px-14">
				<form className="card-body">
					<div className="form-control">
						<label className="label">
							<span className="label-text">Email</span>
						</label>
						<input
							type="email"
							placeholder="Your email"
							className="input input-bordered"
							required
						/>
					</div>
					<div className="form-control">
						<label className="label">
							<span className="label-text">Subject</span>
						</label>
						<input
							type="text"
							placeholder="Your Subject"
							className="input input-bordered"
							required
						/>
					</div>
					<div className="form-control">
						<label className="label">
							<span className="label-text">Message</span>
						</label>
						<textarea
							placeholder="Your Message"
							className="input input-bordered min-h-40"
							required
						/>
					</div>
					<div className="form-control mt-2 items-center">
						<button className="btn btn-neutral px-14">
							Submit
						</button>
					</div>
				</form>
			</div>
		</section>
	);
}