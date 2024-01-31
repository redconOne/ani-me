import UserAuthForm from "@/components/auth/UserAuthForm";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") router.push("/main").catch(console.error);
  }, [status, router]);

  return (
    <>
      <Head>
        <title>Ani-me Login</title>
        <meta name="description" content="All your anime needs in one place" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="md:hidden">
        <div className="mx-auto flex w-11/12 flex-col justify-center space-y-6 sm:w-full">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
          </div>
          <div className="mx-auto w-3/4">
            <UserAuthForm />
          </div>
        </div>
      </div>
      <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            Ani-me
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;I am a real person and this is a pretty amazing
                website.&rdquo;
              </p>
              <footer className="text-sm">Totally real person</footer>
            </blockquote>
            <br />
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Super! Such amaze! Much wow!&rdquo;
              </p>
              <footer className="text-sm">
                Definitely not the person that made the webpage
              </footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-full">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h1>
            </div>
            <UserAuthForm />
          </div>
        </div>
      </div>
    </>
  );
}
