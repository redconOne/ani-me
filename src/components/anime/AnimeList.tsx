import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import React from "react";
import { type Anime } from "@/types/anime";

export default function AnimeList({ animeList }: { animeList: Anime[] }) {
  return (
    <div className="flex flex-wrap justify-around">
      {animeList.map((anime) => {
        return (
          <Dialog key={anime.default_title}>
            <DialogTrigger asChild>
              <Card className="mb-4 mt-4 w-64 p-4">
                <CardHeader>
                  <CardTitle>
                    {anime.english_title ||
                      anime.default_title ||
                      "No Title Available"}
                  </CardTitle>
                  <CardDescription></CardDescription>
                </CardHeader>
                <CardContent>
                  <Image
                    className="mb-4 h-40 w-full rounded-md object-cover"
                    src={anime.image}
                    width={100}
                    height={100}
                    alt="Anime Cover"
                  />
                </CardContent>
                <CardFooter className="flex flex-col text-sm">
                  <p>
                    <b className="bold">Rating</b>:{" "}
                    {anime.rating || "Not rated yet"}
                  </p>
                  <p>
                    <b className="bold">Score</b>:{" "}
                    {anime.score || "Not scored yet"}
                  </p>
                  <p>
                    <b className="bold">Rank</b>:{" "}
                    {anime.rank || "Not ranked yet"}
                  </p>
                </CardFooter>
              </Card>
            </DialogTrigger>
            <DialogContent className="h-96 sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="mx-auto"> Synopsis</DialogTitle>
              </DialogHeader>
              <ScrollArea className="mx-auto h-full w-10/12 rounded-md">
                {anime.synopsis}
              </ScrollArea>
              <div className="flex flex-col md:flex-row md:gap-4">
                <Button
                  variant="default"
                  className="md:jw-40 mb-2 flex-1 md:mb-0"
                >
                  Add to Wish List
                </Button>
                <Button
                  variant="default"
                  className="md:jw-40 mb-2 flex-1 md:mb-0"
                >
                  Add to Watched List
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        );
      })}
    </div>
  );
}
