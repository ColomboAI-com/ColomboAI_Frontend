// // 'use client';

// // import React, { useState, useEffect } from 'react';
// // import { toast } from 'react-toastify';
// // // import { Navbar } from './Navbar';
// // import  Chat  from '../MassageInputActions/Chat';
// // import InputBar from '../layouts/InputBar';
// // // import { EmptyChat } from './EmptyChat'; // Comment out or delete this line
// // import MessageInput from '../MassageInputActions/MessageInput'

// // export const ChatWindow = ({ id }) => {
// //   // State hooks for managing component state
// //   const [messages, setMessages] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [focusMode, setFocusMode] = useState(false);
// //   const [ws, setWs] = useState(null);

// //   // Effect hook to establish WebSocket connection
// //   useEffect(() => {
// //     const socket = new WebSocket(`${process.env.NEXT_PUBLIC_WS_URL}`);
// //     setWs(socket);

// //     // Cleanup function to close WebSocket when component unmounts
// //     return () => {
// //       socket.close();
// //     };
// //   }, []);

// //   // Function to send messages and handle file uploads
// //   const sendMessage = async (message, files) => {
// //     if (!ws) return; // Exit if WebSocket is not connected

// //     // Prepare message payload
// //     const messagePayload = {
// //       type: 'message',
// //       message: {
// //         chatId: id.id,
// //         content: message,
// //         files: []
// //       },
// //       focusMode,
// //       history: [...messages, ['human', message]]
// //     };

// //     // Handle file uploads if present
// //     if (files && files.length > 0) {
// //       const formData = new FormData();
// //       formData.append('message', message);
// //       formData.append('chatId', id.id || '');
// //       files.forEach((file, index) => {
// //         formData.append(`file${index}`, file);
// //       });

// //       try {
// //         // Send files and message via HTTPS POST
// //         const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/messages`, {
// //           method: 'POST',
// //           body: formData,
// //         });

// //         if (!response.ok) {
// //           throw new Error('Failed to send message via HTTPS');
// //         }

// //         const responseData = await response.json();
// //         console.log('Message sent via HTTPS:', responseData);

// //         // Update messagePayload with file information from the response
// //         messagePayload.message.files = responseData.files;
// //       } catch (error) {
// //         console.error('Error sending message via HTTPS:', error);
// //         if (typeof error === 'object' && error !== null && 'message' in error) {
// //           console.error('Status:', error.status);
// //           console.error('StatusText:', error.statusText);
// //         }
// //         toast.error('Failed to send message. Please try again.');
// //         return;
// //       }
// //     }

// //     // Send the message payload via WebSocket
// //     ws.send(JSON.stringify(messagePayload));

// //     // Update local messages state
// //     setMessages(prevMessages => [
// //       ...prevMessages,
// //       {
// //         content: message,
// //         messageId: Date.now().toString(),
// //         chatId: id.id,
// //         role: 'user',
// //         createdAt: new Date(),
// //         files: messagePayload.message.files
// //       }
// //     ]);

// //     setLoading(true);
// //   };

// //   // Handler for incoming WebSocket messages
// //   const messageHandler = (event) => {
// //     const data = JSON.parse(event.data);
// //     if (data.type === 'message') {
// //       setMessages(prevMessages => [...prevMessages, data.message]);
// //       setLoading(false);
// //     }
// //   };

// //   // Effect hook to add and remove WebSocket message listener
// //   useEffect(() => {
// //     if (ws) {
// //       ws.addEventListener('message', messageHandler);
// //     }

// //     return () => {
// //       if (ws) {
// //         ws.removeEventListener('message', messageHandler);
// //       }
// //     };
// //   }, [ws]);

// //   // Placeholder functions for message appeared and rewrite events
// //   const messageAppeared = (messageId) => {
// //     // Handle message appeared event
// //   };

// //   const rewrite = (messageId) => {
// //     // Handle rewrite event
// //   };

// //   // Render chat window
// //   return (
// //     <div>
// //       {!ws && (
// //         <p className={`dark:text-white/70 text-black/70 text-sm`}>
// //           Failed to connect to the server. Please try again later.
// //         </p>
// //       )}
// //       {messages.length > 0 ? (
// //         <>
// //           <MessageInput messages={messages} />
// //           <Chat
// //             loading={loading}
// //             messages={messages}
// //             sendMessage={sendMessage}
// //             messageAppeared={messageAppeared}
// //             rewrite={rewrite}
// //           />
// //         </>
// //       ) : (
// //         // Remove EmptyChat component here
// //         <p></p>
// //       )}
// //     </div>
// //   );
// // };

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
//     const socket = new WebSocket(`${process.env.NEXT_PUBLIC_WS_URL}`);
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
