import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getProviders, signIn } from "next-auth/react";
import { useEffect, useState, type HTMLAttributes } from "react";

type UserAuthFormProps = HTMLAttributes<HTMLDivElement>;

type Provider = {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
};

export default function UserAuthForm({
  className,
  ...props
}: UserAuthFormProps) {
  const [providers, setProviders] = useState<Record<string, Provider>>();

  useEffect(() => {
    const getProvidersData = async () => {
      const providersData = await getProviders();
      setProviders(providersData ?? undefined);
    };
    getProvidersData().catch(console.error);
  }, []);

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      {providers &&
        Object.values(providers).map((provider: Provider) => (
          <Button
            key={provider.name}
            variant="outline"
            type="button"
            onClick={() => signIn(provider.id)}
          >
            {provider.name}
          </Button>
        ))}
    </div>
  );
}
