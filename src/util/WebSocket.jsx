import { Client } from "@stomp/stompjs";



export const initializeWsConnection = (data) => {
    const loggedinUser = data;
    console.log("Initialize WS connection for: ", loggedinUser.name);
    const client = new Client({
        brokerURL: `${import.meta.env.VITE_WS_BROKER_URL}`,
        onConnect: () => {
            console.log(`Client: ${loggedinUser.name} is connected.`);
            client.subscribe("/topic/public", (message) =>
                console.log(`Received: ${message.body}`)
            );
            client.subscribe(`/topic/${loggedinUser.id}`, (message) =>
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
            console.log(`Client: ${loggedinUser.name} is disconnected.`);
        }
    });
    client.activate();
    return client;
};