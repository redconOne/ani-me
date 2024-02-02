import { useSession } from "next-auth/react";

export default function Home() {
  const { data } = useSession();

  return (
    <div>
      <h1>Hello there {data?.user.name}</h1>
      <h2>
        Welcome to the main page! There will be important stuff here,
        eventually. I think. Hopefully.
      </h2>
    </div>
  );
}
