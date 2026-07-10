import { Trash2 } from 'lucide-react';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface UploadedFileItemProps {
  file: File;
  progress: number;
  onRemove: (filename: string) => void;
}

export function UploadedFileItem({
  file,
  progress,
  onRemove,
}: UploadedFileItemProps) {
  const imageUrl = URL.createObjectURL(file);

  useEffect(() => {
    return () => URL.revokeObjectURL(imageUrl);
  }, [imageUrl]);

  return (
    <div
      className="flex flex-col rounded-lg border border-border p-2"
      key={file.name}
    >
      <div className="flex items-center gap-2">
        <div className="row-span-2 flex h-14 w-18 items-center justify-center self-start overflow-hidden rounded-sm bg-muted">
          <img
            alt={file.name}
            className="h-full w-full object-cover"
            src={imageUrl}
          />
        </div>

        <div className="flex-1 pr-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="max-w-[250px] truncate text-foreground text-sm">
                {file.name}
              </span>
              <span className="whitespace-nowrap text-muted-foreground text-sm">
                {Math.round(file.size / 1024)} KB
              </span>
            </div>
            <Button
              className="bg-transparent! hover:text-red-500"
              onClick={() => onRemove(file.name)}
              size="icon-sm"
              variant="ghost"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full bg-primary"
                style={{
                  width: `${progress || 0}%`,
                }}
              />
            </div>
            <span className="whitespace-nowrap text-muted-foreground text-xs">
              {Math.round(progress || 0)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
