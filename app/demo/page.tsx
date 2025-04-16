import { CodeBlockEditor, FileTreeItem } from "@/components/code-block-editor";

const sampleFileTree: FileTreeItem[] = [
  {
    name: "app",
    path: "app",
    type: "folder",
    children: [
      {
        name: "login",
        path: "app/login",
        type: "folder",
        children: [
          {
            name: "page.tsx",
            path: "app/login/page.tsx",
            type: "file",
            content: `import { LoginForm } from "@/components/login-form"\n\nexport default function Page() {\n  return (\n    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">\n      <div className="w-full max-w-sm">\n        <LoginForm />\n      </div>\n    </div>\n  )\n}`,
          },
        ],
      },
    ],
  },
  {
    name: "components",
    path: "components",
    type: "folder",
    children: [
      {
        name: "login-form.tsx",
        path: "components/login-form.tsx",
        type: "file",
        content: `import { Button } from "@/components/ui/button"\nimport { Input } from "@/components/ui/input"\nimport { Label } from "@/components/ui/label"\n\nexport function LoginForm() {\n  return (\n    <div className="space-y-6">\n      <div className="space-y-2 text-center">\n        <h1 className="text-3xl font-bold">Login</h1>\n        <p className="text-gray-500 dark:text-gray-400">\n          Enter your credentials to sign in to your account\n        </p>\n      </div>\n      <div className="space-y-4">\n        <div className="space-y-2">\n          <Label htmlFor="email">Email</Label>\n          <Input id="email" placeholder="m@example.com" required type="email" />\n        </div>\n        <div className="space-y-2">\n          <Label htmlFor="password">Password</Label>\n          <Input id="password" required type="password" />\n        </div>\n        <Button className="w-full" type="submit">\n          Sign In\n        </Button>\n      </div>\n    </div>\n  )\n}`,
      },
    ],
  },
];

export default function Home() {
  return (
    <main className="container mx-auto py-10">
      <h1 className="mb-8 text-3xl font-bold">Code Block Editor</h1>
      <CodeBlockEditor fileTree={sampleFileTree} />
    </main>
  );
}
