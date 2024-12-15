import { useState } from "react";
import { Client } from "@stomp/stompjs";

export default function Login() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const initializeConnection = () => {
        const client = new Client({
            brokerURL: "ws://localhost:8080/ws",
            onConnect: () => {
                console.log(`Client: ${username} is connected.`);
                client.subscribe("/topic/public", (message) =>
                    console.log(`Received: ${message.body}`)
                );
                client.subscribe(`/topic/${username}`, (message) =>
                    console.log(`Received self username queue: ${message.body}`)
                );
                client.publish({
                    destination: "/topic/public",
                    body: "First Message",
                });
            },
            onWebSocketError: (error)=>{
                console.error('Error with websocket', error);
            },
            onStompError: (frame)=>{
                console.error('Broker reported error: ' + frame.headers['message']);
                console.error('Additional details: ' + frame.body);
            },
            onDisconnect: ()=>{
                console.log(`Client: ${username} is disconnected.`);
            }
        });
        client.activate();
    };

    const handleLogin = (e) => {
        e.preventDefault();

        if (username && password) {
            console.log(username, password);
            initializeConnection();
        } else {
            console.log("Provide username and password properly!");
            alert("Provide username and password properly!");
        }
    };
    return (
        <div>
            <div className="hero">
                <div className="hero-content flex flex-col">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold mb-2">
                            Spring WebSocket Chat Demo
                        </h1>
                        <h1 className="text-2xl font-bold">Login now!</h1>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Username</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="username"
                                    className="input input-bordered"
                                    required
                                    onChange={(event) =>
                                        setUsername(event.target.value)
                                    }
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="password"
                                    className="input input-bordered"
                                    required
                                    onChange={(event) =>
                                        setPassword(event.target.value)
                                    }
                                />
                                <label className="label">
                                    <a
                                        href="#"
                                        className="label-text-alt link link-hover"
                                    >
                                        Forgot password?
                                    </a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button
                                    className="btn btn-primary"
                                    onClick={handleLogin}
                                >
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
