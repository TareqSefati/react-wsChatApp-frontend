import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../routes/Routes";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import bcrypt from "bcryptjs";

export default function Register() {
    const [checkbox, setCheckbox] = useState(false);
    // const navigate = useNavigate();
    // const { createUser, updateUserProfile, logOut } = useContext(AuthContext);
    const handleRegister = (event) => {
        // event.preventDefault();
        // const form = new FormData(event.currentTarget);
        // console.log(form);
        // const name = form.get("name");
        // const photo = form.get("photo");
        // const phone = form.get("phone");
        // const address = form.get("address");
        // const email = form.get("email");
        // const password = form.get("password");
        // console.log(name, phone, address, email, password, photo);
        // const photoData = new FormData();
        // photoData.append("image", photo);
        // createUser(email, password)
        //     .then(async (result) => {
        //         console.log(result.user);
        //         const displayUrl = await uploadImage(photoData);
        //         handleUserProfile(name, displayUrl);
        //         await saveUserInDb(
        //             result.user.uid,
        //             email,
        //             password,
        //             name,
        //             phone,
        //             address,
        //             displayUrl
        //         );
        //         toast.success("User Registration Successful", {
        //             position: "top-right",
        //         });
        //         navigate(ROUTES.LOGIN);
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //         toast.error("User Registration Failed - Firebase", {
        //             position: "top-right",
        //         });
        //     });
    };

    const uploadImage = async (photoData) => {
        //upload image to imagebb and get image url
        const url = `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_IMAGE_BB_API_KEY
        }`;
        let displayUrl = await fetch(url, {
            method: "POST",
            body: photoData,
        })
            .then((res) => res.json())
            .then((result) => {
                // displayUrl = result.data.display_url;
                console.log("Image display url:", result.data.display_url);
                return result.data.display_url;
                //console.log("Image delete url:", result.data.delete_url);
            })
            .catch((error) => {
                console.log("Error while uploading image to imagebb: ", error);
                return null;
            });
        return displayUrl;
    };

    const saveUserInDb = async (
        uid,
        email,
        password,
        name,
        phone,
        address,
        displayUrl
    ) => {
        //Save user in mongo db
        const dbUrl = `${import.meta.env.VITE_BACKEND_USER_URL}`;
        const hashedPassword = await hashPassword(password);
        const userDbData = {
            uid: uid,
            email: email,
            password: hashedPassword,
            name: name,
            phoneNumber: phone,
            address: address,
            photoUrl: displayUrl,
            isAdmin: false,
            isEnabled: true,
        };
        console.log("Show user data before save in db: ", userDbData);
        fetch(dbUrl, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(userDbData),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data?.insertedId) {
                    //The following logout() function is to logout the registered user by force.
                    logOut();
                }
            })
            .catch((err) => {
                console.log("Error to create user in database: ", err);
                toast.error("User Registration Failed - MongoDB", {
                    position: "top-right",
                });
            });
    };

    const hashPassword = async (password) => {
        // Hash the password before storing it
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        console.log("Hashed password: ", hashedPassword);
        return hashedPassword;
    };

    const handleUserProfile = (name, displayUrl) => {
        const profile = { displayName: name, photoURL: displayUrl };
        updateUserProfile(profile)
            .then(() => {
                //The following logout() function is to logout the registered user by force.
                //logOut();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const enableOrDisableRegisterBtn = (event) => {
        if (event.target.checked == true) {
            console.log("box checked");
            setCheckbox(true);
        } else {
            console.log("box unchecked");
            setCheckbox(false);
        }
        // if (event.target.checked != true) {
        //     console.log("box unchecked");
        // }
    };
    return (
        <div>
            <div className="py-8 bg-base-200 shadow-xl rounded-lg">
                <div className="flex h-full items-center justify-center">
                    <div className="rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-900 flex-col flex h-full items-center justify-center sm:px-4">
                        <div className="flex h-full flex-col justify-center gap-4 p-6">
                            <div className="left-0 right-0 inline-block border-gray-200 px-2 py-2.5 sm:px-4">
                                <form
                                    onSubmit={handleRegister}
                                    className="flex flex-col gap-4 pb-4"
                                >
                                    <h1 className="mb-4 text-2xl font-bold dark:text-white text-center">
                                        Register your Account
                                    </h1>

                                    <div>
                                        <div className="mb-2">
                                            <label
                                                className="text-sm font-medium text-gray-900 dark:text-gray-300"
                                                htmlFor="name"
                                            >
                                                Name
                                            </label>
                                        </div>
                                        <div className="flex w-full rounded-lg pt-1">
                                            <div className="relative w-full">
                                                <input
                                                    className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-md"
                                                    id="name"
                                                    type="text"
                                                    name="name"
                                                    placeholder="Your Name"
                                                    autoComplete="on"
                                                    required
                                                ></input>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="mb-2">
                                            <label
                                                className="text-sm font-medium text-gray-900 dark:text-gray-300"
                                                htmlFor="photo"
                                            >
                                                Photo
                                            </label>
                                        </div>
                                        <div className="flex w-full rounded-lg pt-1">
                                            <div className="relative w-full">
                                                <input
                                                    className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-md"
                                                    id="photo"
                                                    type="file"
                                                    name="photo"
                                                    placeholder="Select prifile picture"
                                                    autoComplete="on"
                                                    required
                                                ></input>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="mb-2">
                                            <label
                                                className="text-sm font-medium text-gray-900 dark:text-gray-300"
                                                htmlFor="phone"
                                            >
                                                Phone Number
                                            </label>
                                        </div>
                                        <div className="flex w-full rounded-lg pt-1">
                                            <div className="relative w-full">
                                                <input
                                                    className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-md"
                                                    id="phone"
                                                    type="tel"
                                                    name="phone"
                                                    placeholder="Phone Number"
                                                    autoComplete="on"
                                                    required
                                                ></input>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="mb-2">
                                            <label
                                                className="text-sm font-medium text-gray-900 dark:text-gray-300"
                                                htmlFor="address"
                                            >
                                                Address
                                            </label>
                                        </div>
                                        <div className="flex w-full rounded-lg pt-1">
                                            <div className="relative w-full">
                                                <input
                                                    className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-md"
                                                    id="address"
                                                    type="text"
                                                    name="address"
                                                    placeholder="Address"
                                                    autoComplete="on"
                                                    required
                                                ></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="mb-2">
                                            <label
                                                className="text-sm font-medium text-gray-900 dark:text-gray-300"
                                                htmlFor="email"
                                            >
                                                Email
                                            </label>
                                        </div>
                                        <div className="flex w-full rounded-lg pt-1">
                                            <div className="relative w-full">
                                                <input
                                                    className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-md"
                                                    id="email"
                                                    type="email"
                                                    name="email"
                                                    placeholder="email@example.com"
                                                    autoComplete="on"
                                                    required
                                                ></input>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="mb-2">
                                            <label
                                                className="text-sm font-medium text-gray-900 dark:text-gray-300"
                                                data-testid="flowbite-label"
                                                htmlFor="password"
                                            >
                                                Password
                                            </label>
                                        </div>
                                        <div className="flex w-full rounded-lg pt-1">
                                            <div className="relative w-full">
                                                <input
                                                    className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-md"
                                                    id="password"
                                                    type="password"
                                                    name="password"
                                                    placeholder="Password"
                                                    autoComplete="on"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="flex items-center mt-4">
                                            <input
                                                type="checkbox"
                                                className="checkbox checkbox-info"
                                                onChange={
                                                    enableOrDisableRegisterBtn
                                                }
                                            />
                                            <Link className="label-text text-blue-700 ml-2">
                                                Accept Terms and Conditions
                                            </Link>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <button
                                            type="submit"
                                            disabled={!checkbox}
                                            className="btn btn-outline btn-info rounded-md"
                                        >
                                            <span className="flex items-center justify-center gap-1 font-medium py-1 px-2.5 text-base false">
                                                Register
                                            </span>
                                        </button>
                                    </div>
                                </form>
                                <div className="min-w-[270px]">
                                    <div className="mt-2 text-center dark:text-gray-200">
                                        Already Have an Account? &nbsp;
                                        <Link
                                            className="text-blue-500 underline hover:text-blue-600"
                                            to={ROUTES.LOGIN}
                                        >
                                            Login Here
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
