import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { type FormEvent } from "react";

type searchFunction = (name: string) => void;

export default function Search({ search }: { search: searchFunction }) {
  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = formData.get("searchInput") as string;
    if (!data) return;
    search(data);
  };

  return (
    <form
      className="mx-auto flex w-full max-w-sm items-center space-x-1 pb-2 pt-6"
      onSubmit={handleSearch}
    >
      <Input
        className=""
        name="searchInput"
        id="searchInput"
        type="text"
        placeholder="Search for an anime!"
      />
      <Button variant="default" type="submit">
        <SearchIcon />
      </Button>
    </form>
  );
}
