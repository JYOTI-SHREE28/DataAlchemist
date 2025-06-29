/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useRef, useState } from 'react';
import Papa from 'papaparse';

export default function FileUploader({
  onData,
}: {
  onData: (data: any[], entity: string) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (files: FileList) => {
    setUploading(true);
    
    const fileArray = Array.from(files);
    
    for (const file of fileArray) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const data = results.data as any[];
          const name = file.name.toLowerCase();
          if (name.includes('client')) onData(data, 'clients');
          else if (name.includes('worker')) onData(data, 'workers');
          else if (name.includes('task')) onData(data, 'tasks');
          else alert(`Unknown file: ${file.name}`);
        },
      });
    }
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setUploading(false);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) handleUpload(files);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files) handleUpload(files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  return (
    <div className="space-y-4">
      {/* Drag & Drop Area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
          isDragging
            ? 'border-blue-400 bg-blue-50 scale-105'
            : 'border-slate-300 bg-slate-50 hover:border-slate-400 hover:bg-slate-100'
        }`}
      >
        <div className="space-y-4">
          {/* Upload Icon */}
          <div className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center transition-all duration-300 ${
            isDragging ? 'bg-blue-500 scale-110' : 'bg-slate-200'
          }`}>
            <span className={`text-2xl transition-all duration-300 ${
              isDragging ? 'text-white' : 'text-slate-500'
            }`}>
              {uploading ? '⏳' : '📁'}
            </span>
          </div>

          {/* Text */}
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">
              {uploading ? 'Processing Files...' : 'Upload CSV Files'}
            </h3>
            <p className="text-slate-600 mb-4">
              Drag & drop your CSV files here, or click to browse
            </p>
            <p className="text-xs text-slate-500">
              Supports: client.csv, worker.csv, task.csv
            </p>
          </div>

          {/* Upload Button */}
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-600 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <span>{uploading ? '⏳' : '📤'}</span>
            {uploading ? 'Processing...' : 'Choose Files'}
          </button>
        </div>

        {/* Hidden File Input */}
        <input
          type="file"
          accept=".csv"
          multiple
          onChange={handleFileInput}
          ref={fileInputRef}
          className="hidden"
        />
      </div>

      {/* File Type Guide */}
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <h4 className="text-sm font-medium text-slate-700 mb-3">📋 File Naming Guide</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
            <span className="text-slate-600">
              <span className="font-mono bg-slate-100 px-1 rounded">*client*</span>.csv
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
            <span className="text-slate-600">
              <span className="font-mono bg-slate-100 px-1 rounded">*worker*</span>.csv
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
            <span className="text-slate-600">
              <span className="font-mono bg-slate-100 px-1 rounded">*task*</span>.csv
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}