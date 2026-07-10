import { FileSpreadsheet, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export default function FileUpload05() {
  return (
    <div className="flex w-full max-w-lg items-center justify-center p-10 sm:mx-auto sm:max-w-lg">
      <form>
        <h3 className="text-balance font-semibold text-foreground text-lg">
          File Upload
        </h3>
        <div className="mt-4 flex justify-center space-x-4 rounded-md border border-input border-dashed px-6 py-10">
          <div className="sm:flex sm:items-center sm:gap-x-3">
            <Upload
              aria-hidden={true}
              className="mx-auto h-8 w-8 text-muted-foreground sm:mx-0 sm:h-6 sm:w-6"
            />
            <div className="mt-4 flex text-foreground text-sm leading-6 sm:mt-0">
              <p>Drag and drop or</p>
              <Label
                className="relative cursor-pointer rounded-sm pl-1 font-medium text-primary hover:underline hover:underline-offset-4"
                htmlFor="file-upload-4"
              >
                <span>choose file</span>
                <input
                  className="sr-only"
                  id="file-upload-4"
                  name="file-upload-4"
                  type="file"
                />
              </Label>
              <p className="text-pretty pl-1">to upload</p>
            </div>
          </div>
        </div>
        <p className="mt-2 flex items-center justify-between text-pretty text-muted-foreground text-xs leading-5">
          Recommended max. size: 10 MB, Accepted file types: XLSX, XLS, CSV.
        </p>
        <div className="relative mt-8 rounded-lg bg-muted p-3">
          <div className="absolute top-1 right-1">
            <Button
              aria-label="Remove"
              className="rounded-sm p-2 text-muted-foreground hover:text-foreground"
              size="sm"
              type="button"
              variant="ghost"
            >
              <X aria-hidden={true} className="size-4 shrink-0" />
            </Button>
          </div>
          <div className="flex items-center space-x-2.5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-background shadow-sm ring-1 ring-input ring-inset">
              <FileSpreadsheet
                aria-hidden={true}
                className="size-5 text-foreground"
              />
            </span>
            <div className="w-full">
              <p className="text-pretty font-medium text-foreground text-xs">
                Revenue_Q1_2024.xlsx
              </p>
              <p className="mt-0.5 flex justify-between text-pretty text-muted-foreground text-xs">
                <span>3.1 MB</span>
                <span>Completed</span>
              </p>
            </div>
          </div>
        </div>
        <div className="mt-8 flex items-center justify-end space-x-3">
          <Button
            className="whitespace-nowrap rounded-sm border border-input px-4 py-2 font-medium text-foreground text-sm shadow-sm hover:bg-accent hover:text-foreground"
            type="button"
            variant="outline"
          >
            Cancel
          </Button>
          <Button
            className="whitespace-nowrap rounded-sm bg-primary px-4 py-2 font-medium text-primary-foreground text-sm shadow-sm hover:bg-primary/90"
            type="submit"
            variant="default"
          >
            Upload
          </Button>
        </div>
      </form>
    </div>
  );
}
