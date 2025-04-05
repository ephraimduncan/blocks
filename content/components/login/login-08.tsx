"use client";

import { Logo } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon, Key } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function SignIn() {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const togglePasswordVisibility = () => setIsPasswordVisible((prev) => !prev);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md mx-4 pb-0">
        <CardHeader className="space-y-1 text-center mb-2 mt-4">
          <div className="flex justify-center">
            <Logo />
          </div>
          <div>
            <h2 className="text-2xl font-semibold">Sign in to Acme</h2>
            <p className="text-muted-foreground text-sm">
              Welcome back! Please enter your details.
            </p>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input id="email" type="email" placeholder="ephraim@blocks.so" />
          </div>
          <div className="space-y-0">
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="password">Password</Label>
              <Link href="#" className="text-sm text-primary hover:underline">
                Reset password
              </Link>
            </div>
            <div className="relative">
              <Input
                id="password"
                className="pe-9"
                placeholder="Enter your password"
                type={isPasswordVisible ? "text" : "password"}
              />
              <button
                className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                type="button"
                onClick={togglePasswordVisibility}
                aria-label={
                  isPasswordVisible ? "Hide password" : "Show password"
                }
                aria-pressed={isPasswordVisible}
                aria-controls="password"
              >
                {isPasswordVisible ? (
                  <EyeOffIcon size={16} aria-hidden="true" />
                ) : (
                  <EyeIcon size={16} aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="remember" defaultChecked />
            <Label htmlFor="remember" className="text-sm font-normal">
              Remember me
            </Label>
          </div>

          <div className="space-y-2">
            <Button className="w-full" type="submit">
              Sign In
            </Button>
            <Button variant="outline" className="w-full" type="button">
              <Key className="mr-2 h-4 w-4" />
              Single sign-on (SSO)
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center border-t !py-4">
          <p className="text-center text-sm text-muted-foreground">
            New to Acme?{" "}
            <Link href="#" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
