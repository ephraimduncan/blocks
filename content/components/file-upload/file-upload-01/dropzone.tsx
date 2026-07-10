import { Upload } from 'lucide-react';
import type React from 'react';
import type { RefObject } from 'react';

interface FileDropzoneProps {
  fileInputRef: RefObject<HTMLInputElement | null>;
  handleBoxClick: () => void;
  handleDragOver: (e: React.DragEvent) => void;
  handleDrop: (e: React.DragEvent) => void;
  handleFileSelect: (files: FileList | null) => void;
}

export function FileDropzone({
  fileInputRef,
  handleBoxClick,
  handleDragOver,
  handleDrop,
  handleFileSelect,
}: FileDropzoneProps) {
  return (
    <div className="px-6">
      <div
        className="flex cursor-pointer flex-col items-center justify-center rounded-md border-2 border-border border-dashed p-8 text-center"
        onClick={handleBoxClick}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="mb-2 rounded-full bg-muted p-3">
          <Upload className="h-5 w-5 text-muted-foreground" />
        </div>
        <p className="font-medium text-foreground text-sm">
          Upload a project image
        </p>
        <p className="mt-1 text-muted-foreground text-sm">
          or,{' '}
          <label
            className="cursor-pointer font-medium text-primary hover:text-primary/90"
            htmlFor="fileUpload"
            onClick={(e) => e.stopPropagation()} // Prevent triggering handleBoxClick
          >
            click to browse
          </label>{' '}
          (4MB max)
        </p>
        <input
          accept="image/*"
          className="hidden"
          id="fileUpload"
          onChange={(e) => handleFileSelect(e.target.files)}
          ref={fileInputRef}
          type="file"
        />
      </div>
    </div>
  );
}
