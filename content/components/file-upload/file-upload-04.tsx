'use client';

import { File, FileSpreadsheet, X } from 'lucide-react';
import { type ChangeEvent, type DragEvent, useRef, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export default function FileUpload04() {
  const [uploadState, setUploadState] = useState<{
    file: File | null;
    progress: number;
    uploading: boolean;
  }>({
    file: null,
    progress: 0,
    uploading: false,
  });
  const [showDummy, setShowDummy] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validFileTypes = [
    'text/csv',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ];

  const handleFile = (file: File | undefined) => {
    if (!file) return;

    if (validFileTypes.includes(file.type)) {
      setUploadState({ file, progress: 0, uploading: true });

      const interval = setInterval(() => {
        setUploadState((prev) => {
          const newProgress = prev.progress + 5;
          if (newProgress >= 100) {
            clearInterval(interval);
            return { ...prev, progress: 100, uploading: false };
          }
          return { ...prev, progress: newProgress };
        });
      }, 200);
    } else {
      toast.error('Please upload a CSV, XLSX, or XLS file.', {
        position: 'bottom-right',
        duration: 3000,
      });
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleFile(event.target.files?.[0]);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    handleFile(event.dataTransfer.files?.[0]);
  };

  const resetFile = () => {
    setUploadState({ file: null, progress: 0, uploading: false });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getFileIcon = () => {
    if (!uploadState.file) return <File />;

    const fileExt = uploadState.file.name.split('.').pop()?.toLowerCase() || '';
    return ['csv', 'xlsx', 'xls'].includes(fileExt) ? (
      <FileSpreadsheet className="h-5 w-5 text-foreground" />
    ) : (
      <File className="h-5 w-5 text-foreground" />
    );
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Number.parseFloat((bytes / k ** i).toFixed(1)) + ' ' + sizes[i];
  };

  const { file, progress, uploading } = uploadState;

  return (
    <div className="flex w-full max-w-lg items-center justify-center p-10">
      <form className="w-full" onSubmit={(e) => e.preventDefault()}>
        <h3 className="text-balance font-semibold text-foreground text-lg">
          File Upload
        </h3>

        <div
          className="mt-2 flex justify-center rounded-md border border-input border-dashed px-6 py-12"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <div>
            <File
              aria-hidden={true}
              className="mx-auto h-12 w-12 text-muted-foreground"
            />
            <div className="flex text-muted-foreground text-sm leading-6">
              <p>Drag and drop or</p>
              <label
                className="relative cursor-pointer rounded-sm pl-1 font-medium text-primary hover:underline hover:underline-offset-4"
                htmlFor="file-upload-03"
              >
                <span>choose file</span>
                <input
                  accept=".csv, .xlsx, .xls"
                  className="sr-only"
                  id="file-upload-03"
                  name="file-upload-03"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  type="file"
                />
              </label>
              <p className="text-pretty pl-1">to upload</p>
            </div>
          </div>
        </div>

        <p className="mt-2 text-pretty text-muted-foreground text-xs leading-5 sm:flex sm:items-center sm:justify-between">
          <span>Accepted file types: CSV, XLSX or XLS files.</span>
          <span className="pl-1 sm:pl-0">Max. size: 10MB</span>
        </p>

        {!file && showDummy && (
          <Card className="relative mt-8 gap-4 bg-muted p-4 shadow-none">
            <Button
              aria-label="Remove"
              className="absolute top-1 right-1 text-muted-foreground hover:text-foreground"
              onClick={() => setShowDummy(false)}
              size="icon-sm"
              type="button"
              variant="ghost"
            >
              <X aria-hidden={true} className="h-5 w-5 shrink-0" />
            </Button>

            <div className="flex items-center space-x-2.5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-background shadow-sm ring-1 ring-border ring-inset">
                <FileSpreadsheet
                  aria-hidden={true}
                  className="h-5 w-5 text-foreground"
                />
              </span>
              <div>
                <p className="text-pretty font-medium text-foreground text-xs">
                  Revenue_Q1_2024.xlsx
                </p>
                <p className="mt-0.5 text-pretty text-muted-foreground text-xs">
                  3.1 MB
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Progress className="h-1.5" value={45} />
              <span className="text-muted-foreground text-xs">45%</span>
            </div>
          </Card>
        )}

        {file && (
          <Card className="relative mt-8 gap-4 bg-muted p-4 shadow-none">
            <Button
              aria-label="Remove"
              className="absolute top-1 right-1 text-muted-foreground hover:text-foreground"
              onClick={resetFile}
              size="icon-sm"
              type="button"
              variant="ghost"
            >
              <X aria-hidden={true} className="h-5 w-5 shrink-0" />
            </Button>

            <div className="flex items-center space-x-2.5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-background shadow-sm ring-1 ring-border ring-inset">
                {getFileIcon()}
              </span>
              <div>
                <p className="text-pretty font-medium text-foreground text-xs">
                  {file?.name}
                </p>
                <p className="mt-0.5 text-pretty text-muted-foreground text-xs">
                  {file && formatFileSize(file.size)}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Progress className="h-1.5" value={progress} />
              <span className="text-muted-foreground text-xs">{progress}%</span>
            </div>
          </Card>
        )}

        <div className="mt-8 flex items-center justify-end space-x-3">
          <Button
            className="whitespace-nowrap"
            disabled={!file}
            onClick={resetFile}
            type="button"
            variant="outline"
          >
            Cancel
          </Button>
          <Button
            className="whitespace-nowrap"
            disabled={!file || uploading || progress < 100}
            type="submit"
          >
            Upload
          </Button>
        </div>
      </form>
    </div>
  );
}
