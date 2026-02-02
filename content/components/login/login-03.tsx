"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login03() {
  return (
    <div className="flex items-center justify-center min-h-dvh">
      <div className="flex flex-1 flex-col justify-center px-4 py-10 lg:px-6">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h3 className="text-balance text-center text-lg font-semibold text-foreground dark:text-foreground">
            Welcome Back
          </h3>
          <p className="text-pretty text-center text-sm text-muted-foreground dark:text-muted-foreground">
            Enter your credentials to access your account.
          </p>
          <form action="#" method="post" className="mt-6 space-y-4">
            <div>
              <Label
                htmlFor="email-login-03"
                className="text-sm font-medium text-foreground dark:text-foreground"
              >
                Email
              </Label>
              <Input
                type="email"
                id="email-login-03"
                name="email-login-03"
                autoComplete="email"
                placeholder="ephraim@blocks.so"
                className="mt-2"
              />
            </div>
            <div>
              <Label
                htmlFor="password-login-03"
                className="text-sm font-medium text-foreground dark:text-foreground"
              >
                Password
              </Label>
              <Input
                type="password"
                id="password-login-03"
                name="password-login-03"
                autoComplete="password"
                placeholder="**************"
                className="mt-2"
              />
            </div>
            <Button type="submit" className="mt-4 w-full py-2 font-medium">
              Sign in
            </Button>
          </form>
          <p className="text-pretty mt-6 text-sm text-muted-foreground dark:text-muted-foreground">
            Forgot your password?{" "}
            <a
              href="#"
              className="font-medium text-primary hover:text-primary/90 dark:text-primary dark:hover:text-primary/90"
            >
              Reset password
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
