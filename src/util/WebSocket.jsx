import { Client } from "@stomp/stompjs";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContextProvider";
// import { WebSocket } from 'ws';
// Object.assign(global, { WebSocket });


export const initializeWsConnection = (user) => {
    // const {loggedinUser} = useContext(AppContext);
    const loggedinUser = user;
    console.log("Initialize WS connection for: ", loggedinUser.name);
    let client = new Client({
        brokerURL: `${import.meta.env.VITE_WS_BROKER_URL}`,
        onConnect: () => {
            console.log(`Client: ${loggedinUser.name} is connected.`);
            // client.subscribe("/topic/public", (response) =>{
            //     const message = JSON.parse(response.body);
            //     console.log(`Received: ${message}`);
            //     // if(message.status === STATUS.JOIN){

            //     // }
            // });
            client.subscribe(`/topic/${loggedinUser.id}`, (response) =>
                console.log(`Received self username queue: ${response.body}`)
            );
            client.publish({
                destination: "/topic/public",
                body: "First Message",
            });
            const wsMessage = {
                status: "JOIN",
                content: `ID: ${loggedinUser.id}`,
                user: loggedinUser
            };
            //console.log("WS message: ", wsMessage);
            client.publish({
                destination: "/app/chat.connectUser",
                body: JSON.stringify(wsMessage),
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
            console.log(`Client: ${loggedinUser.name} is disconnected.`);
        }
    });
    client.activate();
    console.log("client in WS", client);
    return client;
};