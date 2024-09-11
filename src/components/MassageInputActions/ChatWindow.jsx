// 'use client';

// import React, { useState, useEffect } from 'react';
// import { toast } from 'react-toastify';
// // import { Navbar } from './Navbar';
// import  Chat  from '../MassageInputActions/Chat';
// import InputBar from '../layouts/InputBar';
// // import { EmptyChat } from './EmptyChat'; // Comment out or delete this line
// import MessageInput from '../MassageInputActions/MessageInput'

// export const ChatWindow = ({ id }) => {
//   // State hooks for managing component state
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [focusMode, setFocusMode] = useState(false);
//   const [ws, setWs] = useState(null);

//   // Effect hook to establish WebSocket connection
//   useEffect(() => {
//     const socket = new WebSocket(`ws://127.0.0.1:3001`);
//     setWs(socket);

//     // Cleanup function to close WebSocket when component unmounts
//     return () => {
//       socket.close();
//     };
//   }, []);

//   // Function to send messages and handle file uploads
//   const sendMessage = async (message, files) => {
//     if (!ws) return; // Exit if WebSocket is not connected

//     // Prepare message payload
//     const messagePayload = {
//       type: 'message',
//       message: {
//         chatId: id.id,
//         content: message,
//         files: []
//       },
//       focusMode,
//       history: [...messages, ['human', message]]
//     };

//     // Handle file uploads if present
//     if (files && files.length > 0) {
//       const formData = new FormData();
//       formData.append('message', message);
//       formData.append('chatId', id.id || '');
//       files.forEach((file, index) => {
//         formData.append(`file${index}`, file);
//       });

//       try {
//         // Send files and message via HTTPS POST
//         const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/messages`, {
//           method: 'POST',
//           body: formData,
//         });

//         if (!response.ok) {
//           throw new Error('Failed to send message via HTTPS');
//         }

//         const responseData = await response.json();
//         console.log('Message sent via HTTPS:', responseData);

//         // Update messagePayload with file information from the response
//         messagePayload.message.files = responseData.files;
//       } catch (error) {
//         console.error('Error sending message via HTTPS:', error);
//         if (typeof error === 'object' && error !== null && 'message' in error) {
//           console.error('Status:', error.status);
//           console.error('StatusText:', error.statusText);
//         }
//         toast.error('Failed to send message. Please try again.');
//         return;
//       }
//     }

//     // Send the message payload via WebSocket
//     ws.send(JSON.stringify(messagePayload));

//     // Update local messages state
//     setMessages(prevMessages => [
//       ...prevMessages,
//       {
//         content: message,
//         messageId: Date.now().toString(),
//         chatId: id.id,
//         role: 'user',
//         createdAt: new Date(),
//         files: messagePayload.message.files
//       }
//     ]);

//     setLoading(true);
//   };

//   // Handler for incoming WebSocket messages
//   const messageHandler = (event) => {
//     const data = JSON.parse(event.data);
//     if (data.type === 'message') {
//       setMessages(prevMessages => [...prevMessages, data.message]);
//       setLoading(false);
//     }
//   };

//   // Effect hook to add and remove WebSocket message listener
//   useEffect(() => {
//     if (ws) {
//       ws.addEventListener('message', messageHandler);
//     }

//     return () => {
//       if (ws) {
//         ws.removeEventListener('message', messageHandler);
//       }
//     };
//   }, [ws]);

//   // Placeholder functions for message appeared and rewrite events
//   const messageAppeared = (messageId) => {
//     // Handle message appeared event
//   };

//   const rewrite = (messageId) => {
//     // Handle rewrite event
//   };

//   // Render chat window
//   return (
//     <div>
//       {!ws && (
//         <p className={`dark:text-white/70 text-black/70 text-sm`}>
//           Failed to connect to the server. Please try again later.
//         </p>
//       )}
//       {messages.length > 0 ? (
//         <>
//           <InputBar messages={messages} />
//           <Chat
//             loading={loading}
//             messages={messages}
//             sendMessage={sendMessage}
//             messageAppeared={messageAppeared}
//             rewrite={rewrite}
//           />
//         </>
//       ) : (
//         // Remove EmptyChat component here
//         <p></p>
//       )}
//     </div>
//   );
// };

// export default ChatWindow;

// 'use client';

// import React, { useState, useEffect, useCallback } from 'react';
// import { toast } from 'react-toastify';
// import Chat from '../MassageInputActions/Chat';

// const ChatWindow = ({ id, initialMessage, initialFile }) => {
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [ws, setWs] = useState(null);

//   useEffect(() => {
//     const socket = new WebSocket(`ws://127.0.0.1:3001`);
//     setWs(socket);

//     return () => {
//       socket.close();
//     };
//   }, []);

//   useEffect(() => {
//     if (initialMessage) {
//       sendMessage(initialMessage, initialFile);
//     }
//   }, [initialMessage, initialFile]);

//   const sendMessage = useCallback(async (message, file) => {
//     setLoading(true);

    
//     setMessages(prevMessages => [...prevMessages, { role: 'user', content: message, file: file }]);

//     try {
     
//       const requestBody = {
//         message: message,
//         chatId: id,
//         history: messages.map(msg => [msg.role, msg.content]),
//       };

      
//       if (file) {
//         const formData = new FormData();
//         formData.append('file', file);
//         formData.append('message', JSON.stringify(requestBody));

        
//         const response = await fetch(`ws://127.0.0.1:3001`, {
//           method: 'POST',
//           body: formData,
//         });

//         if (!response.ok) {
//           throw new Error('Failed to get response from API');
//         }

//         const data = await response.json();

        
//         setMessages(prevMessages => [...prevMessages, { role: 'assistant', content: data.response }]);
//       } else {
      
//         const response = await fetch(`ws://127.0.0.1:3001`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(requestBody),
//         });

//         if (!response.ok) {
//           throw new Error('Failed to get response from API');
//         }

//         const data = await response.json();

    
//         setMessages(prevMessages => [...prevMessages, { role: 'assistant', content: data.response }]);
//       }
//     } catch (error) {
//       console.error('Error in API request:', error);
     
//       setMessages(prevMessages => [...prevMessages, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }]);
//     } finally {
//       setLoading(false);
//     }
//   }, [id, messages]);

//   return (
//     <Chat
//       loading={loading}
//       messages={messages}
//       sendMessage={sendMessage}
//     />
//   );
// };

// export default ChatWindow;

// import React, { useState, useCallback, useEffect } from 'react';
// import useWebSocket, { ReadyState } from 'react-use-websocket';

// export const ChatWindow = () => {
//   //Public API that will echo messages sent to it back to the client
//   const [socketUrl, setSocketUrl] = useState('ws://35.239.74.176:3001/');
//   const [messageHistory, setMessageHistory] = useState<MessageEvent<any>[]>([]);

//   const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

//   useEffect(() => {
//     if (lastMessage !== null) {
//       setMessageHistory((prev) => prev.concat(lastMessage));
//     }
//   }, [lastMessage]);

//   const handleClickChangeSocketUrl = useCallback(
//     () => setSocketUrl('wss://demos.kaazing.com/echo'),
//     []
//   );

//   const handleClickSendMessage = useCallback(() => sendMessage('Hello'), []);

//   const connectionStatus = {
//     [ReadyState.CONNECTING]: 'Connecting',
//     [ReadyState.OPEN]: 'Open',
//     [ReadyState.CLOSING]: 'Closing',
//     [ReadyState.CLOSED]: 'Closed',
//     [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
//   }[readyState];

//   return (
//     <div>
//       <button onClick={handleClickChangeSocketUrl}>
//         Click Me to change Socket Url
//       </button>
//       <button
//         onClick={handleClickSendMessage}
//         disabled={readyState !== ReadyState.OPEN}
//       >
//         Click Me to send 'Hello'
//       </button>
//       <span>The WebSocket is currently {connectionStatus}</span>
//       {lastMessage ? <span>Last message: {lastMessage.data}</span> : null}
//       <ul>
//         {messageHistory.map((message, idx) => (
//           <span key={idx}>{message ? message.data : null}</span>
//         ))}
//       </ul>
//     </div>
//   );
// };