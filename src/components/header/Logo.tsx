import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Logo() {
  return (
    <Link href="/anime/">
      <Button variant="link">ANI-ME</Button>{" "}
    </Link>
  );
}
