"use client";

import { Logo } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center p-4">
      <Card className="w-full max-w-sm rounded-4xl px-6 py-10 pt-14">
        <CardContent className="">
          <div className="flex flex-col items-center space-y-8">
            <Logo />

            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-semibold text-foreground">
                Welcome back!
              </h1>
              <p className="text-muted-foreground text-sm">
                First time here?{" "}
                <a href="#" className="text-foreground hover:underline">
                  Sign up for free
                </a>
              </p>
            </div>

            <div className="w-full space-y-4">
              <Input
                type="email"
                placeholder="Your email"
                className="w-full rounded-xl"
              />
              <div className="flex flex-col gap-2">
                <Button className="w-full rounded-xl" size="lg">
                  Send me the magic link
                </Button>
                <Button
                  variant="link"
                  className="w-full text-sm text-muted-foreground"
                >
                  Sign in using password
                </Button>
              </div>

              <div className="flex items-center gap-4 py-2">
                <Separator className="flex-1" />
                <span className="text-sm text-muted-foreground">OR</span>
                <Separator className="flex-1" />
              </div>

              <Button variant="outline" className="w-full rounded-xl" size="lg">
                Single sign-on (SSO)
              </Button>
            </div>

            <p className="text-center text-xs w-11/12 text-muted-foreground">
              You acknowledge that you read, and agree, to our{" "}
              <a href="#" className="underline hover:text-foreground">
                Terms of Service
              </a>{" "}
              and our{" "}
              <a href="#" className="underline hover:text-foreground">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
