"use client";
import React, { useRef, useState } from 'react';
import { SendIcon, UploudIcon } from "../Icons";
import { X } from 'lucide-react';

const InputGenAiSearch = ({ onFileUpload }) => {
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const fileInputRef = useRef(null);

    const handleFileUpload = (event) => {
        const newFiles = Array.from(event.target.files);
        const updatedFiles = [...uploadedFiles, ...newFiles];
        setUploadedFiles(updatedFiles);
        onFileUpload(updatedFiles);
    };

    const removeFile = (fileToRemove) => {
        const updatedFiles = uploadedFiles.filter(file => file !== fileToRemove);
        setUploadedFiles(updatedFiles);
        onFileUpload(updatedFiles);
    };

    const triggerFileUpload = () => {
        fileInputRef.current.click();
    };

    return (
        <div className="relative py-[21px]">
            <input
                type="text"
                placeholder="Ask or create anything..."
                className="w-full h-[50px] border-[0.5px] border-brandprimary rounded-[50px] py-[17px] px-[35px] text-[#ACACAC] text-[16px] tracking-[4px] font-sans"
            />
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                className="hidden"
                accept="*/*"
                multiple
            />
            <button
                className="absolute top-[39px] right-[75px]"
                onClick={triggerFileUpload}
            >
                <UploudIcon w={20} h={17} />
            </button>
            <button className="absolute top-[39px] right-[34px]">
                <SendIcon w={20} h={16} fill={'#1E71F2'} />
            </button>
            {uploadedFiles.length > 0 && (
           
                    <ul className="space-y-2">
                        {uploadedFiles.map((file, index) => (
                            <li key={index} className="flex items-center justify-between  p-2 rounded">
                                <span className="text-sm truncate">{file.name}</span>
                                <button
                                    onClick={() => removeFile(file)}
                                    className=""
                                >
                                    <X size={16} />
                                </button>
                            </li>
                        ))}
                    </ul>
                   
              
            )}
        </div>
    );
};

export default InputGenAiSearch;
