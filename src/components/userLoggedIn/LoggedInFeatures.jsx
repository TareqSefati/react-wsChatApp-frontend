
export default function LoggedInFeatures() {
    return (
        <section>
            <div className="mb-5 mt-10">
                <h1 className="text-center font-semibold text-5xl mb-5">
                    Application Features
                </h1>
                <hr className="w-3/4 mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 bg-base-200 shadow-xl rounded-lg p-2">
                <div className="card bg-base-100 shadow-xl h-fit">
                    <figure className="px-10 pt-10">
                        <img
                            src="https://i.ibb.co.com/48qDqXZ/book-category-default-logo.png"
                            alt="Books"
                            className="rounded-xl h-20"
                        />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Start Chatting</h2>
                        <p>12345</p>
                        <div className="card-actions">
                            <button className="btn btn-primary">Buy Now</button>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 shadow-xl h-fit">
                    <figure className="px-10 pt-10">
                        <img
                            src="https://i.ibb.co.com/tPdbvPH/book-default-logo.png"
                            alt="Books"
                            className="rounded-xl h-20"
                        />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">My Groups</h2>
                        <p>5000</p>
                        <div className="card-actions">
                            <button className="btn btn-primary">Buy Now</button>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 shadow-xl h-fit">
                    <figure className="px-10 pt-10">
                        <img
                            src="https://i.ibb.co.com/FBhRF5n/happy-clients.png"
                            alt="Shoes"
                            className="rounded-xl h-20"
                        />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">My Friends</h2>
                        <p>4500+</p>
                        <div className="card-actions">
                            <button className="btn btn-primary">Buy Now</button>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 shadow-xl h-fit">
                    <figure className="px-10 pt-10">
                        <img
                            src="https://i.ibb.co.com/XZv0zXc/award.png"
                            alt="Shoes"
                            className="rounded-xl h-20"
                        />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Active User</h2>
                        <p>12</p>
                        <div className="card-actions">
                            <button className="btn btn-primary">Buy Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
