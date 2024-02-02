import {
  forwardRef,
  type ElementRef,
  type ComponentPropsWithoutRef,
} from "react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut } from "next-auth/react";
import { User } from "lucide-react";

type PageLink = {
  title: string;
  href: string;
  description: string;
};

const animePages: PageLink[] = [
  {
    title: "Search Anime",
    href: "/anime/search/",
    description: "Search for an anime!",
  },
  {
    title: "Top Anime",
    href: "/anime/top/",
    description: "Take a look at the top anime list!",
  },
  {
    title: "Recommended",
    href: "/anime/recommended/",
    description: "Here is our list of recommended anime!",
  },
  {
    title: "Random",
    href: "/anime/random",
    description: "Feeling adventurous? Check out a random anime!",
  },
];

const profilePages: PageLink[] = [
  {
    title: "My Profile",
    href: "/profile/",
    description: "Go to your profaile and change your personal settings!",
  },
  {
    title: "My Anime",
    href: "/profile/myanime",
    description: "Checkout your wishlist and watchlist!",
  },
  {
    title: "Settings",
    href: "/profile/settings",
    description: "Adjust your personal Ani-me settings!",
  },
  {
    title: "Sign Out",
    href: "/signOut",
    description: "Sign out of Ani-me",
  },
];

export default function Menu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <Avatar>
              <AvatarImage
                src="https://placekitten.com/200/200"
                alt="User Avatar"
              />
              <AvatarFallback>
                <User />
              </AvatarFallback>
            </Avatar>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {profilePages.map((page) => {
                if (page.href === "/signOut")
                  return (
                    <ListItem
                      key={page.title}
                      title={page.title}
                      href={"/"}
                      onClick={async () => await signOut()}
                    >
                      {page.description}
                    </ListItem>
                  );
                return (
                  <ListItem
                    key={page.title}
                    title={page.title}
                    href={page.href}
                  >
                    {page.description}
                  </ListItem>
                );
              })}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Anime</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {animePages.map((page) => (
                <ListItem key={page.title} title={page.title} href={page.href}>
                  {page.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = forwardRef<ElementRef<"a">, ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className,
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  },
);
ListItem.displayName = "ListItem";
