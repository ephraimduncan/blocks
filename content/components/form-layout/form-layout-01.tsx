import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function FormLayout01() {
  return (
    <div className="flex items-center justify-center p-10">
      <div className="sm:mx-auto sm:max-w-2xl">
        <h3 className="text-balance text-2xl font-semibold text-foreground dark:text-foreground">
          Register to workspace
        </h3>
        <p className="text-pretty mt-1 text-sm text-muted-foreground dark:text-muted-foreground">
          Take a few moments to register for your company&apos;s workspace
        </p>
        <form action="#" method="post" className="mt-8">
          <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
            <div className="col-span-full sm:col-span-3">
              <Field className="gap-2">
                <FieldLabel htmlFor="first-name">
                  First name
                  <span className="text-red-500">*</span>
                </FieldLabel>
                <Input
                  type="text"
                  id="first-name"
                  name="first-name"
                  autoComplete="first-name"
                  placeholder="First name"
                  required
                />
              </Field>
            </div>
            <div className="col-span-full sm:col-span-3">
              <Field className="gap-2">
                <FieldLabel htmlFor="last-name">
                  Last name
                  <span className="text-red-500">*</span>
                </FieldLabel>
                <Input
                  type="text"
                  id="last-name"
                  name="last-name"
                  autoComplete="last-name"
                  placeholder="Last name"
                  required
                />
              </Field>
            </div>
            <div className="col-span-full">
              <Field className="gap-2">
                <FieldLabel htmlFor="email">
                  Email
                  <span className="text-red-500">*</span>
                </FieldLabel>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  placeholder="Email"
                  required
                />
              </Field>
            </div>
            <div className="col-span-full">
              <Field className="gap-2">
                <FieldLabel htmlFor="address">Address</FieldLabel>
                <Input
                  type="text"
                  id="address"
                  name="address"
                  autoComplete="street-address"
                  placeholder="Address"
                />
              </Field>
            </div>
            <div className="col-span-full sm:col-span-2">
              <Field className="gap-2">
                <FieldLabel htmlFor="city">City</FieldLabel>
                <Input
                  type="text"
                  id="city"
                  name="city"
                  autoComplete="address-level2"
                  placeholder="City"
                />
              </Field>
            </div>
            <div className="col-span-full sm:col-span-2">
              <Field className="gap-2">
                <FieldLabel htmlFor="state">State</FieldLabel>
                <Input
                  type="text"
                  id="state"
                  name="state"
                  autoComplete="address-level1"
                  placeholder="State"
                />
              </Field>
            </div>
            <div className="col-span-full sm:col-span-2">
              <Field className="gap-2">
                <FieldLabel htmlFor="postal-code">Postal code</FieldLabel>
                <Input
                  id="postal-code"
                  name="postal-code"
                  autoComplete="postal-code"
                  placeholder="Postal code"
                />
              </Field>
            </div>
          </div>
          <Separator className="my-6" />
          <div className="flex items-center justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              className="whitespace-nowrap"
            >
              Cancel
            </Button>
            <Button type="submit" className="whitespace-nowrap">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
