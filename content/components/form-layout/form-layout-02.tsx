import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

export default function FormLayout02() {
  return (
    <div className="flex items-center justify-center p-10">
      <form>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <h2 className="text-balance font-semibold text-foreground dark:text-foreground">
              Personal information
            </h2>
            <p className="text-pretty mt-1 text-sm leading-6 text-muted-foreground dark:text-muted-foreground">
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
            <h2 className="text-balance font-semibold text-foreground dark:text-foreground">
              Workspace settings
            </h2>
            <p className="text-pretty mt-1 text-sm leading-6 text-muted-foreground dark:text-muted-foreground">
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
            <h2 className="text-balance font-semibold text-foreground dark:text-foreground">
              Notification settings
            </h2>
            <p className="text-pretty mt-1 text-sm leading-6 text-muted-foreground dark:text-muted-foreground">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
            </p>
          </div>
          <div className="sm:max-w-3xl md:col-span-2">
            <fieldset>
              <legend className="text-sm font-medium text-foreground dark:text-foreground">
                Newsletter
              </legend>
              <FieldDescription
                id="newsletter-description"
                className="mt-2 leading-6"
              >
                Change how often you want to receive updates from our
                newsletter.
              </FieldDescription>
              <RadioGroup defaultValue="never" className="mt-6">
                <div className="flex items-center gap-x-3">
                  <RadioGroupItem
                    id="every-week"
                    value="every-week"
                    aria-describedby="newsletter-description"
                  />
                  <FieldLabel htmlFor="every-week" className="font-normal">
                    Every week
                  </FieldLabel>
                </div>
                <div className="flex items-center gap-x-3">
                  <RadioGroupItem
                    id="every-month"
                    value="every-month"
                    aria-describedby="newsletter-description"
                  />
                  <FieldLabel htmlFor="every-month" className="font-normal">
                    Every month
                  </FieldLabel>
                </div>
                <div className="flex items-center gap-x-3">
                  <RadioGroupItem
                    id="never"
                    value="never"
                    aria-describedby="newsletter-description"
                  />
                  <FieldLabel htmlFor="never" className="font-normal">
                    Never
                  </FieldLabel>
                </div>
              </RadioGroup>
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
