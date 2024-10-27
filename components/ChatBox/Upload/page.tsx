'use client'
import React, { useState, DragEvent } from 'react';
import { VscCloudUpload } from "react-icons/vsc";
import CircularProgressBar from '../CircularProgressBar/page';

// Define props type
interface FileUploadProps {
  onUploadComplete: (fileName: string) => void;
}

// Convert the component to TypeScript
const FileUpload: React.FC<FileUploadProps> = ({ onUploadComplete }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [dragOver, setDragOver] = useState<boolean>(false);

  const uploadFile = (file: File) => {
    const uploadTime = 2000;

    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(interval);
          onUploadComplete(file.name); // Corrected function name
          return 100;
        }
        return Math.min(oldProgress + 10, 100);
      });
    }, uploadTime / 10);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setSelectedFile(file);
      uploadFile(file);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length) {
      uploadFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div
      className={dragOver ? "file-upload file-upload-drag-over" : "file-upload"}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => document.getElementById("file-upload")?.click()}
    >
      <input type="file" id="file-upload" hidden onChange={handleFileChange} />
      <div className="file-input-custom">
        <div className="file-input-custom-icon">
          {uploadProgress > 0 ? (
            <CircularProgressBar progress={uploadProgress} size={25} strokeWidth={2} />
          ) : (
            <VscCloudUpload className="file-input-button-icon" />
          )}
        </div>
        <span className="file-input-name">
          {selectedFile?.name ?? "Select a file..."}
        </span>
      </div>
    </div>
  );
};

export default FileUpload;