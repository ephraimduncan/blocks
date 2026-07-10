'use client';

import { HelpCircle } from 'lucide-react';
import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { FileDropzone } from './dropzone';
import { FileList } from './file-list';
import { Form } from './form';

export default function FileUpload01() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [fileProgresses, setFileProgresses] = useState<Record<string, number>>(
    {}
  );

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const newFiles = Array.from(files);
    setUploadedFiles((prev) => [...prev, ...newFiles]);

    newFiles.forEach((file) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
        }
        setFileProgresses((prev) => ({
          ...prev,
          [file.name]: Math.min(progress, 100),
        }));
      }, 300);
    });
  };

  const handleBoxClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    handleFileSelect(e.dataTransfer.files);
  };

  const removeFile = (filename: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.name !== filename));
    setFileProgresses((prev) => {
      const newProgresses = { ...prev };
      delete newProgresses[filename];
      return newProgresses;
    });
  };

  return (
    <div className="flex items-center justify-center p-10">
      <Card className="mx-auto w-full max-w-lg rounded-lg bg-background p-0 shadow-md">
        <CardContent className="p-0">
          <div className="p-6 pb-4">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="font-medium text-foreground text-lg">
                  Create a new project
                </h2>
                <p className="mt-1 text-muted-foreground text-sm">
                  Drag and drop files to create a new project.
                </p>
              </div>
            </div>
          </div>
          <Form />
          <FileDropzone
            fileInputRef={fileInputRef}
            handleBoxClick={handleBoxClick}
            handleDragOver={handleDragOver}
            handleDrop={handleDrop}
            handleFileSelect={handleFileSelect}
          />
          <FileList
            fileProgresses={fileProgresses}
            removeFile={removeFile}
            uploadedFiles={uploadedFiles}
          />
          <div className="flex items-center justify-between rounded-b-lg border-border border-t bg-muted px-6 py-3">
            <TooltipProvider delay={0}>
              <Tooltip>
                <TooltipTrigger
                  render={
                    <Button
                      className="flex items-center text-muted-foreground hover:text-foreground"
                      size="sm"
                      variant="ghost"
                    />
                  }
                >
                  <HelpCircle className="mr-1 h-4 w-4" />
                  Need help?
                </TooltipTrigger>
                <TooltipContent className="border bg-background py-3 text-foreground">
                  <div className="space-y-1">
                    <p className="font-medium text-[13px]">Need assistance?</p>
                    <p className="max-w-[200px] text-muted-foreground text-xs dark:text-muted-background">
                      Upload project images by dragging and dropping files or
                      using the file browser. Supported formats: JPG, PNG, SVG.
                      Maximum file size: 4MB.
                    </p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <div className="flex gap-2">
              <Button
                className="h-9 px-4 font-medium text-sm"
                variant="outline"
              >
                Cancel
              </Button>
              <Button className="h-9 px-4 font-medium text-sm">Continue</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
