import Header from "./header/Header";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, type ReactNode } from "react";

export default function Container({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated" && router.route !== "/")
      router.push("/").catch(console.error);
  }, [status, router]);

  return (
    <div>
      {status === "authenticated" && <Header />}
      <main>{children}</main>
    </div>
  );
}
