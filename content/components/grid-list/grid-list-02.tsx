import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';

const people = [
  {
    name: 'Timur Ercan',
    email: 'timur@documenso.com',
    role: 'Co-Founder / CEO',
    imageUrl: 'https://blocks.so/avatar-02.png',
  },
  {
    name: 'Lucas Smith',
    email: 'lucas@documenso.com',
    role: 'Co-Founder / CTO',
    imageUrl: 'https://blocks.so/avatar-03.png',
  },
  {
    name: 'Ephraim Duncan',
    email: 'ephraim@documenso.com',
    role: 'Software Engineer',
    imageUrl: 'https://blocks.so/avatar-01.png',
  },
  {
    name: 'Catalin Pit',
    email: 'catalin@documenso.com',
    role: 'Software Engineer',
    imageUrl: 'https://blocks.so/avatar-04.png',
  },
];

export default function GridList02() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {people.map((person) => (
          <Card
            className="relative border py-0 shadow-2xs transition-[border-color,box-shadow] duration-100 ease-out focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 hover:border-muted-foreground hover:shadow-sm"
            key={person.email}
          >
            <CardContent className="flex items-center space-x-4 p-4">
              <Avatar className="h-10 w-10">
                <AvatarImage alt={person.name} src={person.imageUrl} />
                <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <a className="focus:outline-none" href="#">
                  <span aria-hidden="true" className="absolute inset-0" />
                  <p className="text-pretty font-medium text-foreground text-sm">
                    {person.name}
                  </p>
                  <p className="truncate text-pretty text-muted-foreground text-sm">
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
