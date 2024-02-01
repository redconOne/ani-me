import { useSession, signOut } from "next-auth/react";

export default function Home() {
  const { data } = useSession();

  return (
    <div>
      Hello there {data?.user.name}
      <br />
      <button onClick={() => signOut()}>SIGNOUT</button>
    </div>
  );
}
