import Wishlist from "@/components/anime/Wishlist";
import Watchedlist from "@/components/anime/Watchedlist";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Page() {
  return (
    <div className="mx-auto mt-4 w-10/12">
      <Tabs defaultValue="wishlist" className="flex flex-col">
        <TabsList className="w-full">
          <TabsTrigger value="wishlist" className="w-1/2">
            My Wishlist
          </TabsTrigger>
          <TabsTrigger value="watchlist" className="w-1/2">
            My To Watchlist
          </TabsTrigger>
        </TabsList>
        <TabsContent value="wishlist">
          <Wishlist />
        </TabsContent>
        <TabsContent value="watchlist">
          <Watchedlist />
        </TabsContent>
      </Tabs>
    </div>
  );
}
