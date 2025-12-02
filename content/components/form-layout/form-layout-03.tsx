import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

export default function FormLayout03() {
  return (
    <div className="flex items-center justify-center p-10">
      <form>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <h2 className="font-semibold text-foreground dark:text-foreground">
              Personal information
            </h2>
            <p className="mt-1 text-sm leading-6 text-muted-foreground dark:text-muted-foreground">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
            </p>
          </div>
          <div className="sm:max-w-3xl md:col-span-2">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
              <div className="col-span-full sm:col-span-3">
                <Field className="gap-2">
                  <FieldLabel htmlFor="first-name">First name</FieldLabel>
                  <Input
                    type="text"
                    id="first-name"
                    name="first-name"
                    autoComplete="given-name"
                    placeholder="Emma"
                  />
                </Field>
              </div>
              <div className="col-span-full sm:col-span-3">
                <Field className="gap-2">
                  <FieldLabel htmlFor="last-name">Last name</FieldLabel>
                  <Input
                    type="text"
                    id="last-name"
                    name="last-name"
                    autoComplete="family-name"
                    placeholder="Crown"
                  />
                </Field>
              </div>
              <div className="col-span-full">
                <Field className="gap-2">
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="email"
                    placeholder="emma@company.com"
                  />
                </Field>
              </div>
              <div className="col-span-full sm:col-span-3">
                <Field className="gap-2">
                  <FieldLabel htmlFor="birthyear">Birth year</FieldLabel>
                  <Input
                    type="number"
                    id="birthyear"
                    name="year"
                    placeholder="1990"
                  />
                </Field>
              </div>
              <div className="col-span-full sm:col-span-3">
                <Field className="gap-2">
                  <FieldLabel htmlFor="role">Role</FieldLabel>
                  <Input
                    type="text"
                    id="role"
                    name="role"
                    placeholder="Senior Manager"
                    disabled
                  />
                  <FieldDescription>
                    Roles can only be changed by system admin.
                  </FieldDescription>
                </Field>
              </div>
            </div>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <h2 className="font-semibold text-foreground dark:text-foreground">
              Workspace settings
            </h2>
            <p className="mt-1 text-sm leading-6 text-muted-foreground dark:text-muted-foreground">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
            </p>
          </div>
          <div className="sm:max-w-3xl md:col-span-2">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
              <div className="col-span-full sm:col-span-3">
                <Field className="gap-2">
                  <FieldLabel htmlFor="workspace-name">Workspace name</FieldLabel>
                  <Input
                    type="text"
                    id="workspace-name"
                    name="workspace-name"
                    placeholder="Test workspace"
                  />
                </Field>
              </div>
              <div className="col-span-full sm:col-span-3">
                <Field className="gap-2">
                  <FieldLabel htmlFor="visibility">Visibility</FieldLabel>
                  <Select name="visibility" defaultValue="private">
                    <SelectTrigger id="visibility">
                      <SelectValue placeholder="Select visibility" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
              </div>
              <div className="col-span-full">
                <Field className="gap-2">
                  <FieldLabel htmlFor="workspace-description">
                    Workspace description
                  </FieldLabel>
                  <Textarea
                    id="workspace-description"
                    name="workspace-description"
                    rows={4}
                  />
                  <FieldDescription>
                    Note: description provided will not be displayed externally.
                  </FieldDescription>
                </Field>
              </div>
            </div>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <h2 className="font-semibold text-foreground dark:text-foreground">
              Notification settings
            </h2>
            <p className="mt-1 text-sm leading-6 text-muted-foreground dark:text-muted-foreground">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
            </p>
          </div>
          <div className="sm:max-w-3xl md:col-span-2">
            <fieldset>
              <legend className="text-sm font-medium text-foreground dark:text-foreground">
                Team
              </legend>
              <FieldDescription className="mt-1 leading-6">
                Configure the types of team alerts you want to receive.
              </FieldDescription>
              <div className="mt-2">
                <div className="flex items-center gap-x-3 py-1">
                  <Checkbox
                    id="team-requests"
                    name="team-requests"
                    defaultChecked
                  />
                  <FieldLabel htmlFor="team-requests" className="font-normal">
                    Team join requests
                  </FieldLabel>
                </div>
                <div className="flex items-center gap-x-3 py-1">
                  <Checkbox
                    id="team-activity-digest"
                    name="team-activity-digest"
                  />
                  <FieldLabel
                    htmlFor="team-activity-digest"
                    className="font-normal"
                  >
                    Weekly team activity digest
                  </FieldLabel>
                </div>
              </div>
            </fieldset>
            <fieldset className="mt-6">
              <legend className="text-sm font-medium text-foreground dark:text-foreground">
                Usage
              </legend>
              <FieldDescription className="mt-1 leading-6">
                Configure the types of usage alerts you want to receive.
              </FieldDescription>
              <div className="mt-2">
                <div className="flex items-center gap-x-3 py-1">
                  <Checkbox id="api-requests" name="api-requests" />
                  <FieldLabel htmlFor="api-requests" className="font-normal">
                    API requests
                  </FieldLabel>
                </div>
                <div className="flex items-center gap-x-3 py-1">
                  <Checkbox
                    id="workspace-execution"
                    name="workspace-execution"
                  />
                  <FieldLabel
                    htmlFor="workspace-execution"
                    className="font-normal"
                  >
                    Workspace loading times
                  </FieldLabel>
                </div>
                <div className="flex items-center gap-x-3 py-1">
                  <Checkbox
                    id="query-caching"
                    name="query-caching"
                    defaultChecked
                  />
                  <FieldLabel htmlFor="query-caching" className="font-normal">
                    Query caching
                  </FieldLabel>
                </div>
                <div className="flex items-center gap-x-3 py-1">
                  <Checkbox id="storage" name="storage" defaultChecked />
                  <FieldLabel htmlFor="storage" className="font-normal">
                    Storage
                  </FieldLabel>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="flex items-center justify-end space-x-4">
          <Button type="button" variant="outline" className="whitespace-nowrap">
            Go back
          </Button>
          <Button type="submit" className="whitespace-nowrap">
            Save settings
          </Button>
        </div>
      </form>
    </div>
  );
}
