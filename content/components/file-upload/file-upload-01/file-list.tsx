import { cn } from "@/lib/utils";
import { UploadedFileItem } from "./file-item";

interface UploadedFileListProps {
  uploadedFiles: File[];
  fileProgresses: Record<string, number>;
  removeFile: (filename: string) => void;
}

export function FileList({
  uploadedFiles,
  fileProgresses,
  removeFile,
}: UploadedFileListProps) {
  if (uploadedFiles.length === 0) {
    return null;
  }

  return (
    <div className={cn("px-6 pb-5 space-y-3 mt-4")}>
      {uploadedFiles.map((file, index) => (
        <UploadedFileItem
          key={file.name + index}
          file={file}
          progress={fileProgresses[file.name] || 0}
          onRemove={removeFile}
        />
      ))}
    </div>
  );
}
