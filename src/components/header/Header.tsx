import { Button } from "../ui/button";
import { Github } from "lucide-react";
import ThemeButton from "./ThemeButton";
import Logo from "./Logo";
import Menu from "./Menu";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <div>
          <Menu />
        </div>
        <Logo />
        <div className="flex items-center justify-between gap-4">
          <Link href="https://www.github.com/redconone/ani-me" target="_blank">
            <Button variant="outline" size="icon">
              <Github />
            </Button>
          </Link>
          <ThemeButton />
        </div>
      </div>
    </header>
  );
}
