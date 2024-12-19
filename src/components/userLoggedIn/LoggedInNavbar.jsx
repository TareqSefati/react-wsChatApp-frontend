import { Link, NavLink } from "react-router-dom";
import { ROUTES } from "../../routes/Routes";
import { useContext } from "react";
import { AppContext } from "../../contexts/AppContextProvider";

export default function LoggedInNavbar() {
    const {loggedinUser} = useContext(AppContext);
    //const {user} = props;
    return (
        <div>
            <div className="navbar bg-base-100 shadow-md mb-5">
                <div className="flex-1 navbar-start">
                    <Link href={ROUTES.USER_LOGGEDIN.DYNAMIC(loggedinUser.id)} className="btn btn-outline btn-square font-extrabold">Chat App</Link>
                </div>
                <div className="navbar-center">
                    <ul className="menu menu-horizontal space-x-2">
                        <li>
                            <Link to={ROUTES.CHAT.DYNAMIC(loggedinUser.id)}>Chatting</Link>
                        </li>
                        <li>
                            <Link to={""}>Create Group</Link>
                        </li>
                        <li>
                            <Link to={""}>Friends</Link>
                        </li>
                        <li>
                            <Link to={""}>Active Friends</Link>
                        </li>
                        <li>
                            <Link to={""}>About</Link>
                        </li>
                        <li>
                            <Link to={""}>FAQ</Link>
                        </li>
                    </ul>
                </div>
                <div className="flex-none gap-2 navbar-end">
                    <div className="form-control">
                        <input
                            type="text"
                            placeholder="Search"
                            className="input input-bordered w-24 md:w-auto"
                        />
                    </div>
                    <div className="dropdown dropdown-end">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost btn-circle avatar"
                        >
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src={"https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                                />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                        >
                            <li>
                                <Link className="justify-between">
                                    Profile
                                    <span className="badge">{loggedinUser.name}</span>
                                </Link>
                            </li>
                            <li>
                                <a>Settings</a>
                            </li>
                            <li>
                                <a>Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
