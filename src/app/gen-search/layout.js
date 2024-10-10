"use client"

import React, { useState } from 'react';
import Sidebar from "../../components/layouts/Sidebar.jsx";
import Bottombar from "../../components/layouts/Bottombar.jsx";
// import InputBar from "../../components/layouts/InputBar";
import RightSideIcons from '../../components/gen-ai/RightSideIcons.jsx';

const GenSearch = ({ children }) => {
    const [uploadedFiles, setUploadedFiles] = useState([]);
    

    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex flex-1">
                <div className="hidden md:block w-[10%] xl:w-[7%] fixed h-screen border-r border-brandprimary">
                    <Sidebar />
                </div>
                <div className="w-full md:ml-[10%] xl:ml-[7%]">
                    <header className="sticky top-0 z-50 bg-white">
                        <div className=" border-purple-50 py-2">
                            <img src="/images/home/ColomboAI-logo.svg" alt="ColomboAI Logo" className="mx-auto text-center " />
                        </div>
                        <div className=" bg-white border" style={{borderColor: 'rgba(227, 227, 227, 1)',borderWidth: '1px', borderStyle: 'solid'}}>
                        </div>
                        {/* <div className="horizontal-line"></div> */}
                    </header>
                    <main className="flex-1">
                        {!uploadedFiles.length > 0 && (
                            <div>
                                {/* <p className="text-[16px] font-sans text-[#ACACAC] text-center w-[806px] h-[60px] absolute top-[216px] left-[190px] gap-0">
                                    Welcome to GenAI Search, your go-to tool for instant answers and web exploration! Simply type your question or topic of interest, and GenAI will provide you with accurate answers along with related links from the web. Whether you are seeking quick information or diving deeper into a topic, GenAI Search has you covered.
                                </p> */}
                            </div>
                        )}
                        {children}
                        
                    </main>
                </div>
            </div>
            <Bottombar />
        </div>
    );
};

export default GenSearch;