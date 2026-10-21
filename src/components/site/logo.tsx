import Image from "next/image";
import logo from "@/assets/brand/dj-abdul-logo.png";

export function Logo({
  className = "h-8 w-auto",
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={logo}
      alt="DJ Abdul"
      priority={priority}
      className={className}
    />
  );
}
