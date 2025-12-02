"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

export default function FormLayout06() {
    return (
        <div className="w-full max-w-3xl mx-auto p-4">
            <Card>
                <CardHeader>
                    <CardTitle>Profile Settings</CardTitle>
                    <CardDescription>
                        Manage your public profile and preferences.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                    {/* Profile Picture */}
                    <div className="flex flex-col space-y-4">
                        <Label>Profile Picture</Label>
                        <div className="flex items-center gap-4">
                            <Avatar className="w-20 h-20">
                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col gap-2">
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm">
                                        Change Avatar
                                    </Button>
                                    <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">
                                        Remove
                                    </Button>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    JPG, GIF or PNG. Max size of 800K.
                                </p>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* Personal Information */}
                    <div className="grid gap-6">
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="firstName">First name</Label>
                                <Input id="firstName" placeholder="John" defaultValue="John" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="lastName">Last name</Label>
                                <Input id="lastName" placeholder="Doe" defaultValue="Doe" />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">Email address</Label>
                            <Input id="email" type="email" placeholder="john@example.com" defaultValue="john@example.com" />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="bio">Bio</Label>
                            <Textarea
                                id="bio"
                                placeholder="Tell us a little bit about yourself"
                                className="min-h-[100px]"
                            />
                            <p className="text-xs text-muted-foreground">
                                This will be displayed on your public profile.
                            </p>
                        </div>
                    </div>

                    <Separator />

                    {/* Notifications */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium">Notifications</h3>
                        <div className="grid gap-4">
                            <div className="flex items-center justify-between space-x-2">
                                <Label htmlFor="marketing" className="flex flex-col space-y-1">
                                    <span>Marketing emails</span>
                                    <span className="font-normal text-xs text-muted-foreground">
                                        Receive emails about new products, features, and more.
                                    </span>
                                </Label>
                                <Switch id="marketing" />
                            </div>
                            <div className="flex items-center justify-between space-x-2">
                                <Label htmlFor="social" className="flex flex-col space-y-1">
                                    <span>Social emails</span>
                                    <span className="font-normal text-xs text-muted-foreground">
                                        Receive emails for friend requests, follows, and more.
                                    </span>
                                </Label>
                                <Switch id="social" defaultChecked />
                            </div>
                            <div className="flex items-center justify-between space-x-2">
                                <Label htmlFor="security" className="flex flex-col space-y-1">
                                    <span>Security emails</span>
                                    <span className="font-normal text-xs text-muted-foreground">
                                        Receive emails about your account activity and security.
                                    </span>
                                </Label>
                                <Switch id="security" defaultChecked disabled />
                            </div>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                    <Button variant="outline">Cancel</Button>
                    <Button>Save Changes</Button>
                </CardFooter>
            </Card>
        </div>
    );
}
