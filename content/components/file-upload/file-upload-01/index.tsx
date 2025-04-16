"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import { useRef, useState } from "react";
import { FileDropzone } from "./dropzone";
import { FileList } from "./file-list";
import { Form } from "./form";

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
      <Card className="w-full mx-auto max-w-lg bg-background rounded-lg p-0 shadow-md">
        <CardContent className="p-0">
          <div className="p-6 pb-4">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-medium text-foreground">
                  Create a new project
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
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
            uploadedFiles={uploadedFiles}
            fileProgresses={fileProgresses}
            removeFile={removeFile}
          />
          <div className="px-6 py-3 border-t border-border bg-muted rounded-b-lg flex justify-between items-center">
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center text-muted-foreground hover:text-foreground"
                  >
                    <HelpCircle className="h-4 w-4 mr-1" />
                    Need help?
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="py-3 bg-background text-foreground border">
                  <div className="space-y-1">
                    <p className="text-[13px] font-medium">Need assistance?</p>
                    <p className="text-muted-foreground dark:text-muted-background text-xs max-w-[200px]">
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
                variant="outline"
                className="h-9 px-4 text-sm font-medium"
              >
                Cancel
              </Button>
              <Button className="h-9 px-4 text-sm font-medium">Continue</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
