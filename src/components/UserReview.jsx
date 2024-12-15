export default function UserReview() {
    return (
        <section>
            <div className="mb-5 mt-20">
                <h1 className="text-center text-5xl mb-4">
                    It&apos;s not just us.
                </h1>
                <p className="text-center text-2xl mb-5">We have some fans.</p>
                <hr className="w-3/4 mx-auto" />
            </div>
            <div className="hero bg-base-200 rounded-lg">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <div className="grid grid-cols-1 gap-8">
                            <div className="w-full card card-side bg-base-100 shadow-xl">
                                <div>
                                    <div className="w-14">
                                        <img
                                            className="rounded-full"
                                            src="https://i.ibb.co.com/TLjV3sW/avarat-logo.webp"
                                        />
                                    </div>
                                </div>
                                <div className="card-body">
                                    <p>
                                        Lorem ipsum dolor sit amet consectetur
                                        adipisicing elit. Impedit ut, dicta
                                        explicabo nostrum odio consectetur.
                                        Maiores illum nostrum, porro suscipit
                                        quis fugit reprehenderit fugiat
                                        quisquam!
                                    </p>
                                    <div className="rating rating-xs">
                                        <input
                                            type="radio"
                                            name="rating-5"
                                            className="mask mask-star-2 bg-orange-400"
                                        />
                                        <input
                                            type="radio"
                                            name="rating-5"
                                            className="mask mask-star-2 bg-orange-400"
                                            checked="checked"
                                        />
                                        <input
                                            type="radio"
                                            name="rating-5"
                                            className="mask mask-star-2 bg-orange-400"
                                        />
                                        <input
                                            type="radio"
                                            name="rating-5"
                                            className="mask mask-star-2 bg-orange-400"
                                        />
                                        <input
                                            type="radio"
                                            name="rating-5"
                                            className="mask mask-star-2 bg-orange-400"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="w-full card card-side bg-base-100 shadow-xl">
                                <div>
                                    <div className="w-14">
                                        <img
                                            className="rounded-full"
                                            src="https://i.ibb.co.com/Jdt5ztP/avatar-logo-1.png"
                                        />
                                    </div>
                                </div>
                                <div className="card-body">
                                    <p>
                                        Lorem ipsum dolor sit amet consectetur
                                        adipisicing elit. Non soluta, fugiat
                                        iusto suscipit provident itaque id eaque
                                        quod ex porro?
                                    </p>
                                    <div className="rating rating-xs">
                                        <input
                                            type="radio"
                                            name="rating-5"
                                            className="mask mask-star-2 bg-orange-400"
                                        />
                                        <input
                                            type="radio"
                                            name="rating-5"
                                            className="mask mask-star-2 bg-orange-400"
                                            checked="checked"
                                        />
                                        <input
                                            type="radio"
                                            name="rating-5"
                                            className="mask mask-star-2 bg-orange-400"
                                        />
                                        <input
                                            type="radio"
                                            name="rating-5"
                                            className="mask mask-star-2 bg-orange-400"
                                        />
                                        <input
                                            type="radio"
                                            name="rating-5"
                                            className="mask mask-star-2 bg-orange-400"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <div className="card-body">
                            <h1 className="text-3xl font-bold text-center">
                                Your opinion matters!
                            </h1>
                            <p className="text-center mb-2">
                                How was your experience?
                            </p>
                            <div className="rating gap-1 justify-center">
                                <input
                                    type="radio"
                                    name="rating-3"
                                    className="mask mask-heart bg-red-400"
                                />
                                <input
                                    type="radio"
                                    name="rating-3"
                                    className="mask mask-heart bg-orange-400"
                                    checked="checked"
                                />
                                <input
                                    type="radio"
                                    name="rating-3"
                                    className="mask mask-heart bg-yellow-400"
                                />
                                <input
                                    type="radio"
                                    name="rating-3"
                                    className="mask mask-heart bg-lime-400"
                                />
                                <input
                                    type="radio"
                                    name="rating-3"
                                    className="mask mask-heart bg-green-400"
                                />
                            </div>
                            <textarea
                                className="textarea textarea-primary"
                                placeholder="Message Us..."
                            ></textarea>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">
                                    Leave Feedback
                                </button>
                            </div>
                            <div className="form-control">
                                <button className="btn btn-ghost">
                                    Maybe Later
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
