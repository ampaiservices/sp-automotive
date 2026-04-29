import { Phone } from "lucide-react";
import Button from "./Button";
import Magnetic from "@/components/effects/Magnetic";
import { PHONE, PHONE_HREF } from "@/lib/site";

type Props = { size?: "default" | "lg"; className?: string };

export default function PhoneCTA({ size = "default", className = "" }: Props) {
  const sizing = size === "lg" ? "px-10 py-5 text-base" : "";
  return (
    <Magnetic radius={80} strength={0.15}>
      <span data-cursor="Call" className="inline-block">
        <Button variant="primary" href={PHONE_HREF} className={`${sizing} ${className}`}>
          <Phone className="h-4 w-4" aria-hidden /> {PHONE}
        </Button>
      </span>
    </Magnetic>
  );
}
