import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

const people = [
  {
    name: "Timur Ercan",
    email: "timur@documenso.com",
    role: "Co-Founder / CEO",
    imageUrl: "https://blocks.so/avatar-02.png",
  },
  {
    name: "Lucas Smith",
    email: "lucas@documenso.com",
    role: "Co-Founder / CTO",
    imageUrl: "https://blocks.so/avatar-03.png",
  },
  {
    name: "Ephraim Duncan",
    email: "ephraim@documenso.com",
    role: "Software Engineer",
    imageUrl: "https://blocks.so/avatar-01.png",
  },
  {
    name: "Catalin Pit",
    email: "catalin@documenso.com",
    role: "Software Engineer",
    imageUrl: "https://blocks.so/avatar-04.png",
  },
];

export default function GridList02() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {people.map((person) => (
          <Card
            key={person.email}
            className="relative border transition-all duration-100 hover:border-muted-foreground hover:shadow-sm focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 py-0"
          >
            <CardContent className="flex items-center space-x-4 p-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={person.imageUrl} alt={person.name} />
                <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <a href="#" className="focus:outline-none">
                  <span aria-hidden="true" className="absolute inset-0" />
                  <p className="text-sm font-medium text-foreground">
                    {person.name}
                  </p>
                  <p className="truncate text-sm text-muted-foreground">
                    {person.role}
                  </p>
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
