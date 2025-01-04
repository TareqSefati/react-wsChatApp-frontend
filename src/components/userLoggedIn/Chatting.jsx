// Template link: https://www.creative-tim.com/twcomponents/component/quickchat-chat-layout
import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../contexts/AppContextProvider";
import toast from "react-hot-toast";

export default function Chatting() {
    const { loggedinUser, activeUser, wsClient } = useContext(AppContext);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [activeConversation, setActiveConversation] = useState(null);
    const [chats, setChats] = useState([]);
    const [message, setMessage] = useState('');
    const chatArea = useRef(null);
    
    //Subscribe to own channel in web socket client
    // (()=>{
    //     wsClient.subscribe(`/topic/${loggedinUser.id}`, (response) => {
    //         // const data = `${response.body.id}`;
    //         const chatData = JSON.parse(response.body);
    //         if(chatData && selectedUser){
    //             //setIncomingMsg(chatData);
    //             // displayMessage(chatData);
    //             // console.log("subscribe log chat number before: ", chats.length);
    //             addChat(chatData);
    //             // console.log("subscribe log chat number after: ", chats.length);
    //         }
    //         // setChats((prevMessages) => [...prevMessages, chatData]);
    //         // console.log(`Received self username queue: ${(chatData)}`);
    //     });
    // })();

    // useEffect(()=>{
    //     addChat(incomingMsg);
    //     displayMessage(incomingMsg);
    //     console.log("chat number while incoming: ", chats.length);
    // }, [incomingMsg]);

    useEffect(()=>{
        const subscription = wsClient.subscribe(`/topic/${loggedinUser.id}`, async (response) => {
            // const data = `${response.body.id}`;
            const chatData = await JSON.parse(response.body);
            if(chatData){
                // console.log("Selected User: ", selectedUser.name);
                // console.log("Incoming message : ", chatData);
                // displayMessage(chatData);
                
                if(!selectedUser && loggedinUser.id === chatData.receiverId){
                    console.log("This incoming message is for you but Conversation is not selected!")
                    // Show notification.
                    console.log("You got a message from: ", chatData.senderId);
                }
                if(selectedUser){
                    if(loggedinUser.id !== chatData.receiverId){
                        console.log("This incoming message is not for you but Conversation is selected!")
                    }else {
                        console.log("This message for you.");
                        if(selectedUser.id === chatData.senderId){
                            addChat(chatData);
                        }else{
                            //Show notification
                            console.log("You got a message from: ", chatData.senderId);
                        }
                    }
                }else{
                    console.log("Conversation is not selected!");
                }

                // if(selectedUser && loggedinUser.id !== chatData.receiverId){
                //     console.log("This incoming message is not for you but Conversation is selected!")
                //     // Show notification.
                // }
                // if((selectedUser && loggedinUser.id === chatData.receiverId)){
                //     addChat(chatData);
                // }
                // addChat(chatData);
            }
            // setChats((prevMessages) => [...prevMessages, chatData]);
            // console.log(`Received self username queue: ${(chatData)}`);
        });

        return () => {
            subscription.unsubscribe(); // Unsubscribe on cleanup
        };
    }, [wsClient, selectedUser])

    // useEffect(() => {
    //     if (chatArea.current) {
    //         chatArea.current.scrollTop = chatArea.current.scrollHeight;
    //     }
    // }, [chats])

    // Add chat in chat state
    const addChat = (chat) => {
        setChats((prevItems) => [...prevItems, chat]);
    };

    useEffect(()=>{
        if(selectedUser){
            // processActiveConversation();
            loadActiveConversationChatsFromDb(activeConversation);
        }
    }, [selectedUser, activeConversation])

    const processActiveConversation = async()=>{
        const url = `${import.meta.env.VITE_FIND_CONVERSATION_BY_IDS_URL}`;
        const conversationDto = {
            participantId: loggedinUser.id,
            adjacentId: selectedUser.id,
        };
        //console.log("conversationDto: ", conversationDto);
        
        await fetch(url, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(conversationDto),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            if (data?.id) {
                console.log("Conversation object: ", data);
                setActiveConversation(data);
                loadActiveConversationChatsFromDb(data);
            }else{
                console.log("Conversation object: ", data);
            }
        });
        console.log("Selected user: ", selectedUser);
    }

    const getConversationWithSelection = async (user) => {
        const url = `${import.meta.env.VITE_FIND_CONVERSATION_BY_IDS_URL}`;
        const conversationDto = {
            participantId: loggedinUser.id,
            adjacentId: user.id,
        };
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(conversationDto),
        });
        const data = await response.json();
        let conversation = null;
        if(!data?.id){
            console.log("No conversation found between You & ", user.name);
            console.log("Creating new conversation...");
            const url = `${import.meta.env.VITE_CREATE_CONVERSATION_URL}`;
            const conversationDto = {
                participantId: loggedinUser.id,
                adjacentId: user.id,
            };
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(conversationDto),
            });
            const value = await res.json();
            if(value){
                conversation = value;
            }
        }else{
            conversation = data;
        }
        if(conversation?.id){
            return conversation;
        }
        console.log("From get conversation function return : ", conversation);
        return null;
    }

    const setActiveUser = async (user) => {
        setChats([]);
        if(user.id != loggedinUser.id){
            const conversation = await getConversationWithSelection(user);
            if(conversation){
                setActiveConversation(conversation);
                setSelectedUserId(user.id);
                setSelectedUser(user);
            }else{
                console.log("Could not select this active user. Conversation entity not found!!!");
                toast.error("Could not select this active user. Conversation entity not found!!!", {
                    duration: 1500,
                    position: "top-right"
                })
            }
        }else{
            // setSelectedUserId(user.id);
            // setSelectedUser(user);
            console.log("You selected yourself.");
        }
    }

    const loadActiveConversationChatsFromDb = async (conversation)=>{
        const url = `${import.meta.env.VITE_FIND_CHATS_BY_CONVERSATION_HASH_URL}`;
        const chatReq = {
			conversationHash: conversation.conversationHash
		};
        const response = await fetch(url, {
            method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(chatReq),
        })
        const data = await response.json();
        console.log("chats: ",data);
        setChats(data);
        console.log("Chat number while selected: ", chats.length);
        console.log("Chats while selected: ", chats);
    }

    useEffect(()=>{
        // if(chatArea.current){
        //     chatArea.current.textContent = '';
        // }
        // chats.map((chat)=>{
        //     displayMessage(chat);
        // })
        if (chatArea.current) {
            chatArea.current.scrollTop = chatArea.current.scrollHeight;
        }
    }, [chats])

    const displayMessage = (chat)=> {
        if(loggedinUser && selectedUser && chat){
            //console.log("Selected user: ", selectedUser);
            const messageContainer = document.createElement('div');
            messageContainer.className = 'flex flex-row gap-2 max-w-[80%] w-fit p-1 text-white rounded-md m-1';
            const msgSender  = document.createElement('div');
            msgSender.className = 'flex items-center justify-center size-7 rounded-full bg-indigo-500 flex-shrink-0';
            msgSender.textContent = chat.senderId === loggedinUser.id ? loggedinUser.name.charAt(0).toUpperCase() : selectedUser.name.charAt(0).toUpperCase();
            const msg = document.createElement('p');
            msg.className = 'text-black relative text-sm py-2 px-3 shadow rounded-xl';
            msg.textContent = chat.text;
            if (chat.senderId === loggedinUser.id) {
                messageContainer.classList.toggle('self-end');
                msg.classList.toggle('bg-indigo-100');
                messageContainer.append(msg, msgSender);
            }else {
                msg.classList.toggle('bg-white');
                messageContainer.append(msgSender, msg)
            }
            if(chatArea.current){
                chatArea.current.appendChild(messageContainer);
            }
        }
        
        

        // <div className="flex flex-row gap-2 max-w-[80%] w-fit bg-blue-500 p-4 text-white rounded-md m-4">
        //     <div className="flex items-center justify-center size-7 rounded-full bg-indigo-500 flex-shrink-0">
        //         <span>T</span>
        //     </div>
        //     <p>Lorem  </p>
        // </div>
    }

    const sendMessage = async ()=>{
        if(message.trim() && activeConversation) {
            const chatPayload = {
                senderId: loggedinUser.id,
                receiverId : selectedUserId,
                conversationHash : activeConversation.conversationHash,
                text : message.trim(),
            };
            console.log(chatPayload);
            // const url = `${import.meta.env.VITE_CREATE_CHAT_URL}`;
            // const response = await fetch(url, {
            //     method: "POST",
            //     headers: {
            //         "content-type": "application/json",
            //     },
            //     body: JSON.stringify(chatPayload),
            // })
            // const data = await response.json();
            // if(data?.id){
            //     console.log(data);
            //     setMessage('');
            // }else {
            //     console.log("Unable to send message!!! Check connection & reload.")
            //     toast.error("Unable to send message!!! Check connection & reload." , {
            //         position: "top-right",
            //         duration: 1500,
            //     })
            // }

            wsClient.publish({
                destination: "/app/chat",
                body: JSON.stringify(chatPayload),
            });
            //setChats([...chats, chatPayload]);
            console.log("Before: chat number: ", chats.length);
            addChat(chatPayload);
            console.log("updated chat number: ", chats.length);
            // displayMessage(chatPayload);
            //chatArea.scrollTop = chatArea.scrollHeight;
            setMessage('');
            //scrollToBottom();
        }
    }

    return (
        <>
            {/* component */}
            <div className="flex h-[88vh] antialiased text-gray-800">
                <div className="flex flex-row h-full w-full overflow-x-hidden">
                    <div className="flex flex-col pl-6 pr-2 w-64 bg-white flex-shrink-0">
                        <div className="flex flex-row mt-2 items-center justify-center h-12 w-full">
                            <div className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10">
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                                    />
                                </svg>
                            </div>
                            <div className="ml-2 font-bold text-2xl">
                                My Profile
                            </div>
                        </div>
                        <div className="flex flex-col items-center bg-indigo-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg">
                            <div className="h-20 w-20 rounded-full border overflow-hidden">
                                <img
                                    src={loggedinUser.imgUrl}
                                    alt="Profile Img"
                                    className="h-full w-full"
                                />
                            </div>
                            <div className="text-sm font-semibold mt-2">
                                {loggedinUser.name}
                            </div>
                            <div className="text-xs text-gray-500">
                                {loggedinUser.email}
                            </div>
                            <div className="flex flex-row items-center mt-3">
                                <div className="flex flex-col justify-center h-4 w-8 bg-indigo-500 rounded-full">
                                    <div className="h-3 w-3 bg-white rounded-full self-end mr-1" />
                                </div>
                                <div className="leading-none ml-1 text-xs">
                                    Active
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col mt-8">
                            <div className="flex flex-row items-center justify-between text-xs">
                                <span className="font-bold">
                                    Active Conversations
                                </span>
                                <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
                                    {activeUser.length}
                                </span>
                            </div>
                            <ul className="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto" id="ui-chat">
                                {
                                    activeUser.map((user) => {
                                        return (
                                            <li 
                                                key={user.id} onClick={()=>setActiveUser(user)}
                                                className={
                                                    `flex flex-row items-center hover:cursor-pointer rounded-xl p-2 transition-colors duration-200
                                                    ${selectedUserId === user.id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`
                                                }
                                            >
                                                <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                                                    {user.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div className="ml-2 text-sm font-semibold">
                                                    {user.name}
                                                </div>
                                            </li>
                                        );
                                    })
                                }

                                {/* <button className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
                                    <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                                        H
                                    </div>
                                    <div className="ml-2 text-sm font-semibold">
                                        Henry Boyd
                                    </div>
                                </button>
                                <button className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
                                    <div className="flex items-center justify-center h-8 w-8 bg-gray-200 rounded-full">
                                        M
                                    </div>
                                    <div className="ml-2 text-sm font-semibold">
                                        Marta Curtis
                                    </div>
                                    <div className="flex items-center justify-center ml-auto text-xs text-white bg-red-500 h-4 w-4 rounded leading-none">
                                        2
                                    </div>
                                </button>*/}
                            </ul>
                        </div>
                    </div>
                    <div className="flex flex-col flex-auto h-full pl-2">
                        <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
                            <div className="flex flex-col h-full mb-4">
                                <div className="flex overflow-y-auto flex-col" ref={chatArea} >
                                {
                                    chats.map((chat, index)=>{
                                        return (
                                            <div key={index} 
                                                className={`flex gap-2 max-w-[80%] w-fit p-1 text-white rounded-md m-1
                                                    ${chat.senderId === loggedinUser.id?'self-end flex-row-reverse':'flex-row'}`}>
                                                <div className={`flex items-center justify-center size-7 rounded-full bg-indigo-500 flex-shrink-0`}>
                                                    {chat.senderId === loggedinUser.id ? loggedinUser.name.charAt(0).toUpperCase() : selectedUser.name.charAt(0).toUpperCase()}
                                                </div>
                                                <p className={`text-black relative text-sm py-2 px-3 shadow rounded-xl 
                                                    ${chat.senderId === loggedinUser.id?'bg-indigo-100':'bg-white'}`}>
                                                    {chat.text}
                                                </p>
                                                {/* <div className={`${chat.senderId === loggedinUser.id ? 'gap-2 flex items-center justify-start flex-row-reverse':
                                                    'flex flex-row items-center'}`} >
                                                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                                                        {chat.senderId === loggedinUser.id ? loggedinUser.name : selectedUser.name}
                                                    </div>
                                                    <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                                        <div>
                                                            {chat.text}
                                                        </div>
                                                    </div>
                                                </div> */}
                                            </div>
                                        );
                                    })
                                }

                                    {/* <div className="flex flex-row gap-2 max-w-[80%] w-fit bg-blue-500 p-4 text-white rounded-md m-4">
                                        <div className="flex items-center justify-center size-7 rounded-full bg-indigo-500 flex-shrink-0">
                                            <span>T</span>
                                        </div>
                                        <p>Lorem  </p>
                                    </div>

                                    <div className="flex flex-row gap-2 max-w-[80%] w-fit bg-blue-500 p-4 text-white rounded-md m-4 self-end">
                                        
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore aut facere quis iste reiciendis unde consequatur obcaecati? Blanditiis perspiciatis ea modi quaerat maxime qui doloribus ex, tenetur molestiae officiis deleniti.</p>
                                        <div className="flex items-center justify-center size-7 rounded-full bg-indigo-500 flex-shrink-0">
                                            <span>T</span>
                                        </div>
                                    </div> */}
                                </div>
                                {/* <div
                                    className="flex-grow overflow-y-auto flex-col-reverse"
                                >
                                    <ul className="grid grid-cols-12 gap-y-2 ui-chat">
                                        {
                                            chats.map((chat, index)=>{
                                                return (
                                                    <li key={index} className={`${chat.senderId === loggedinUser.id ? 'col-start-6 col-end-13 p-3 rounded-lg':
                                                        'col-start-1 col-end-8 p-3 rounded-lg'}`}>
                                                        <div className={`${chat.senderId === loggedinUser.id ? 'gap-2 flex items-center justify-start flex-row-reverse':
                                                            'flex flex-row items-center'}`} >
                                                            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                                                                {chat.senderId === loggedinUser.id ? loggedinUser.name : selectedUser.name}
                                                            </div>
                                                            <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                                                <div>
                                                                    {chat.text}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                );
                                            })
                                        }

                                        <div className="col-start-1 col-end-8 p-3 rounded-lg">
                                            <div className="flex flex-row items-center">
                                                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                                                    A
                                                </div>
                                                <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                                    <div>
                                                        Hey How are you today?
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-start-6 col-end-13 p-3 rounded-lg">
                                            <div className="flex items-center justify-start flex-row-reverse">
                                                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                                                    A
                                                </div>
                                                <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                                                    <div>
                                                        I'm ok what about you?
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </ul>
                                </div> */}
                            </div>
                            <div className="flex flex-row items-center rounded-xl bg-white w-full px-4 py-1">
                                <div className="flex flex-col gap-2">
                                    <button className="flex items-center justify-center text-gray-400 hover:text-gray-600 
                                    border-2 rounded-md hover:border-gray-600">
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                                            />
                                        </svg>
                                    </button>
                                    
                                    <button className="flex items-center justify-center text-gray-400 hover:text-gray-600 
                                    border-2 rounded-md hover:border-gray-600">
                                        <svg
                                            className="w-6 h-6"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                    </button>
                                </div>
                                <div className="flex-grow ml-4">
                                    <div className="relative w-full">
                                        <textarea onChange={(event)=> setMessage(event.target.value)} value={message}
                                            type="text" placeholder="Write Your Message" rows={3}
                                            className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4"
                                        />
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <button onClick={sendMessage} className="btn btn-sm btn-outline">
                                        <span>Send</span>
                                        <span>
                                            <svg
                                                className="w-4 h-4 transform rotate-45 -mt-px"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                                />
                                            </svg>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
