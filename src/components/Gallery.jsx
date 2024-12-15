export default function Gallery() {
	return (
		<div>
			<div className="mb-5 mt-10">
				<h1
					className="text-center font-semibold text-5xl mb-5"
				>
					Course Gallery
				</h1>
				<hr className="w-3/4 mx-auto" />
			</div>
			<div>
				<div className="bg-base-200 shadow-xl rounded-lg lg:px-1 lg:pt-1">
					<div className="-m-1 flex flex-wrap md:-m-2">
						<div className="flex w-1/2 flex-wrap">
							<div className="w-1/2 p-1 md:p-2">
								<img
									alt="gallery"
									className="block h-full w-full rounded-lg object-cover object-center"
									src="/images/java.jpg"
								/>
							</div>
							<div className="w-1/2 p-1 md:p-2">
								<img
									alt="gallery"
									className="block h-full w-full rounded-lg object-cover object-center"
									src="/images/javafx-1.png"
								/>
							</div>
							<div className="w-full p-1 md:p-2">
								<img
									alt="gallery"
									className="block h-full w-full rounded-lg object-cover object-center"
									src="/images/springboot.jpg"
								/>
							</div>
						</div>
						<div className="flex w-1/2 flex-wrap">
							<div className="w-full p-1 md:p-2">
								<img
									alt="gallery"
									className="block h-full w-full rounded-lg object-cover object-center"
									src="/images/nextjs.webp"
								/>
							</div>
							<div className="w-1/2 p-1 md:p-2">
								<img
									alt="gallery"
									className="block h-full w-full rounded-lg object-cover object-center"
									src="/images/reactjs.png"
								/>
							</div>
							<div className="w-1/2 p-1 md:p-2">
								<img
									alt="gallery"
									className="block h-full w-full rounded-lg object-cover object-center"
									src="/images/mongodb.jpg"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}