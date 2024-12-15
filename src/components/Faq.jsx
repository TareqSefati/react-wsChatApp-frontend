
export default function Faq() {
	return (
		<section>
			<div className="mb-5 mt-10">
				<h1 className="text-center font-semibold text-5xl mb-5">FAQ</h1>
				<hr className="w-3/4 mx-auto" />
			</div>
			<div className="space-y-3 mt-5 bg-base-200 shadow-xl rounded-lg p-3">
				<div className="collapse collapse-plus bg-base-200">
					<input type="radio" name="my-accordion-3" defaultChecked />
					<div className="collapse-title text-xl font-medium">
						Q1. What is React.js and Explain the concept of
						"components" in React?
					</div>
					<div className="collapse-content">
						<p>
							Ans:Lorem ipsum dolor sit amet consectetur
							adipisicing elit. Harum iure tenetur fugiat id culpa
							fuga maxime illum magnam qui, in architecto nihil
							consectetur soluta error mollitia vel iusto sequi!
							Similique!
						</p>
					</div>
				</div>
				<div className="collapse collapse-plus bg-base-200">
					<input type="radio" name="my-accordion-3" defaultChecked />
					<div className="collapse-title text-xl font-medium">
						Q2. What is JSX in React, and how does it work?
					</div>
					<div className="collapse-content">
						<p>
							Ans:Lorem ipsum dolor sit amet consectetur
							adipisicing elit. Harum iure tenetur fugiat id culpa
							fuga maxime illum magnam qui, in architecto nihil
							consectetur soluta error mollitia vel iusto sequi!
							Similique!
						</p>
					</div>
				</div>
				<div className="collapse collapse-plus bg-base-200">
					<input type="radio" name="my-accordion-3" defaultChecked />
					<div className="collapse-title text-xl font-medium">
						Q3. What is the Virtual DOM, and how does React use it
						to optimize performance?
					</div>
					<div className="collapse-content">
						<p>
							Ans:Lorem ipsum dolor sit amet consectetur
							adipisicing elit. Harum iure tenetur fugiat id culpa
							fuga maxime illum magnam qui, in architecto nihil
							consectetur soluta error mollitia vel iusto sequi!
							Similique!
						</p>
					</div>
				</div>
				<div className="collapse collapse-plus bg-base-200">
					<input type="radio" name="my-accordion-3" defaultChecked />
					<div className="collapse-title text-xl font-medium">
						Q4. Explain the concept of "props" in React and how they
						are used.
					</div>
					<div className="collapse-content">
						<p>
							Ans:Lorem ipsum dolor sit amet consectetur
							adipisicing elit. Harum iure tenetur fugiat id culpa
							fuga maxime illum magnam qui, in architecto nihil
							consectetur soluta error mollitia vel iusto sequi!
							Similique!
						</p>
					</div>
				</div>
				<div className="collapse collapse-plus bg-base-200">
					<input type="radio" name="my-accordion-3" defaultChecked />
					<div className="collapse-title text-xl font-medium">
						Q5. What is "state" in React, and how does it differ
						from props?
					</div>
					<div className="collapse-content">
						<p>
							Ans:Lorem ipsum dolor sit amet consectetur
							adipisicing elit. Harum iure tenetur fugiat id culpa
							fuga maxime illum magnam qui, in architecto nihil
							consectetur soluta error mollitia vel iusto sequi!
							Similique!
						</p>
					</div>
				</div>
				<div className="collapse collapse-plus bg-base-200">
					<input type="radio" name="my-accordion-3" defaultChecked />
					<div className="collapse-title text-xl font-medium">
						Q6. Explain the useState hook and provide an example of
						how it is used.
					</div>
					<div className="collapse-content">
						<p>
							Ans:Lorem ipsum dolor sit amet consectetur
							adipisicing elit. Harum iure tenetur fugiat id culpa
							fuga maxime illum magnam qui, in architecto nihil
							consectetur soluta error mollitia vel iusto sequi!
							Similique!
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}