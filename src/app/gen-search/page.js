"use client";

import React, { useState } from 'react';
import InputBar from '../../components/layouts/InputBar.jsx';
import RightSideIcons from '../../components/gen-ai/RightSideIcons.jsx';
import Chat from '../../components/MassageInputActions/Chat.jsx';

function GenSearch() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);

   const sendMessage = (message, file) => {
        setLoading(true);
       
        setTimeout(() => {
          setMessages([...messages, 
            { role: 'user', content: message, file: file },
            { role: 'assistant', content: 'Scooby-Doo is a beloved animated series featuring a talking Great Dane and his teenage friends, Shaggy, Fred, Daphne, and Velma. Together, they form Mystery Inc. and embark on thrilling adventures to solve supernatural mysteries. With their iconic "Scooby-Dooby-Doo" catchphrase and wacky antics' }
          ]);
          setLoading(false);
        }, 1000);
      };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <RightSideIcons />
      </header>
      <main className="flex-grow">
        <div className="w-full lg:w-[70%] px-5 lg:px-20 mx-auto mt-4">
          <InputBar sendMessage={sendMessage} setUploadedFile={setUploadedFile} />
        </div>
        {messages.length === 0 ? (
          <p className="text-[16px] font-sans text-[#ACACAC] text-center mt-8 mx-auto max-w-[806px]">
            Welcome to GenAI Search, your go-to tool for instant answers and web exploration! Simply type your question or topic of interest, and GenAI will provide you with accurate answers along with related links from the web. Whether you are seeking quick information or diving deeper into a topic, GenAI Search has you covered.
          </p>
        ) : (
          <Chat
            loading={loading}
            messages={messages}
            sendMessage={sendMessage}
          />
        )}
      </main>
    </div>
  );
}

export default GenSearch;