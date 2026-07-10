import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function Form() {
  return (
    <div className="mt-2 px-6 pb-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="mb-2" htmlFor="projectName">
            Project name
          </Label>
          <Input
            defaultValue="Open Source Stripe"
            id="projectName"
            type="text"
          />
        </div>

        <div>
          <Label className="mb-2" htmlFor="projectLead">
            Project lead
          </Label>
          <Select
            defaultValue="1"
            items={{
              '1': 'Ephraim Duncan',
              '2': 'Lucas Smith',
              '3': 'Timur Ercan',
            }}
          >
            <SelectTrigger className="ps-2" id="projectLead">
              <SelectValue placeholder="Select framework" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="1">
                  <img
                    alt="Ephraim Duncan"
                    className="size-5 rounded"
                    height={20}
                    src="https://blocks.so/avatar-01.png"
                    width={20}
                  />
                  <span className="truncate">Ephraim Duncan</span>
                </SelectItem>
                <SelectItem value="2">
                  <img
                    alt="Lucas Smith"
                    className="size-5 rounded"
                    height={20}
                    src="https://blocks.so/avatar-03.png"
                    width={20}
                  />
                  <span className="truncate">Lucas Smith</span>
                </SelectItem>
                <SelectItem value="3">
                  <img
                    alt="Timur Ercan"
                    className="size-5 rounded"
                    height={20}
                    src="https://blocks.so/avatar-02.jpg"
                    width={20}
                  />
                  <span className="truncate">Timur Ercan</span>
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
