import { MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const bookCollections = [
  { name: 'Science Fiction', initials: 'SF', href: '#', books: 37 },
  { name: 'Mystery Thrillers', initials: 'MT', href: '#', books: 29 },
  { name: 'Historical Fiction', initials: 'HF', href: '#', books: 23 },
];

export default function GridList01() {
  return (
    <div className="flex items-center justify-center p-8">
      <div>
        <h2 className="text-balance font-medium text-muted-foreground text-sm">
          Favorite Book Collections
        </h2>
        <ul
          className="mt-3 grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-3"
          role="list"
        >
          {bookCollections.map((collection) => (
            <li className="col-span-1" key={collection.name}>
              <Card className="flex w-full flex-row gap-0 overflow-hidden rounded-md py-0 shadow-2xs">
                <div className="flex w-16 shrink-0 items-center justify-center bg-primary font-medium text-primary-foreground text-sm">
                  {collection.initials}
                </div>
                <CardContent className="flex flex-1 items-center justify-between truncate bg-card p-0">
                  <div className="flex-1 truncate px-4 py-2 text-sm">
                    <a
                      className="font-medium text-foreground hover:text-muted-foreground"
                      href={collection.href}
                    >
                      {collection.name}
                    </a>
                    <p className="text-pretty text-muted-foreground">
                      {collection.books} Books
                    </p>
                  </div>
                  <div className="shrink-0 pr-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={
                          <Button
                            className="h-8 w-8 rounded-full"
                            size="icon"
                            type="button"
                            variant="ghost"
                          />
                        }
                      >
                        <span className="sr-only">Open options</span>
                        <MoreVertical className="h-5 w-5" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View collection</DropdownMenuItem>
                        <DropdownMenuItem>Edit collection</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Share collection</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive hover:bg-destructive/10 hover:text-destructive focus:bg-destructive/10 focus:text-destructive">
                          Delete collection
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
