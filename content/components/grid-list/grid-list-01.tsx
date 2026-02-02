import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";

const bookCollections = [
  { name: "Science Fiction", initials: "SF", href: "#", books: 37 },
  { name: "Mystery Thrillers", initials: "MT", href: "#", books: 29 },
  { name: "Historical Fiction", initials: "HF", href: "#", books: 23 },
];

export default function GridList01() {
  return (
    <div className="flex items-center justify-center p-8">
      <div>
        <h2 className="text-balance text-sm font-medium text-muted-foreground">
          Favorite Book Collections
        </h2>
        <ul
          role="list"
          className="mt-3 grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-3"
        >
          {bookCollections.map((collection) => (
            <li key={collection.name} className="col-span-1">
              <Card className="flex flex-row w-full gap-0 rounded-md shadow-sm overflow-hidden py-0">
                <div className="flex w-16 shrink-0 items-center justify-center bg-primary text-sm font-medium text-primary-foreground">
                  {collection.initials}
                </div>
                <CardContent className="flex  flex-1 items-center justify-between truncate p-0 bg-card">
                  <div className="flex-1 truncate px-4 py-2 text-sm">
                    <a
                      href={collection.href}
                      className="font-medium text-foreground hover:text-muted-foreground"
                    >
                      {collection.name}
                    </a>
                    <p className="text-pretty text-muted-foreground">
                      {collection.books} Books
                    </p>
                  </div>
                  <div className="shrink-0 pr-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                        >
                          <span className="sr-only">Open options</span>
                          <MoreVertical className="h-5 w-5" />
                        </Button>
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
