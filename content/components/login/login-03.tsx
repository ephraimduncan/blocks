'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Login03() {
  return (
    <div className="flex min-h-dvh items-center justify-center">
      <div className="flex flex-1 flex-col justify-center px-4 py-10 lg:px-6">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h3 className="text-balance text-center font-semibold text-foreground text-lg dark:text-foreground">
            Welcome Back
          </h3>
          <p className="text-pretty text-center text-muted-foreground text-sm dark:text-muted-foreground">
            Enter your credentials to access your account.
          </p>
          <form action="#" className="mt-6 space-y-4" method="post">
            <div>
              <Label
                className="font-medium text-foreground text-sm dark:text-foreground"
                htmlFor="email-login-03"
              >
                Email
              </Label>
              <Input
                autoComplete="email"
                className="mt-2"
                id="email-login-03"
                name="email-login-03"
                placeholder="ephraim@blocks.so"
                type="email"
              />
            </div>
            <div>
              <Label
                className="font-medium text-foreground text-sm dark:text-foreground"
                htmlFor="password-login-03"
              >
                Password
              </Label>
              <Input
                autoComplete="password"
                className="mt-2"
                id="password-login-03"
                name="password-login-03"
                placeholder="**************"
                type="password"
              />
            </div>
            <Button className="mt-4 w-full py-2 font-medium" type="submit">
              Sign in
            </Button>
          </form>
          <p className="mt-6 text-pretty text-muted-foreground text-sm dark:text-muted-foreground">
            Forgot your password?{' '}
            <a
              className="font-medium text-primary hover:text-primary/90 dark:text-primary dark:hover:text-primary/90"
              href="#"
            >
              Reset password
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
