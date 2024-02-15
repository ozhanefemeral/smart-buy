import Image from "next/image";
import svg from "@/public/404.svg";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex h-screen flex-col items-center space-y-4">
      <Image src={svg} alt="404" width={250} />
      <h1 className="text-3xl">Uh-oh! Page not found 😓</h1>
      <Button asChild variant="link">
        <Link href="/">Go back home</Link>
      </Button>
    </div>
  );
};

export default NotFound;
