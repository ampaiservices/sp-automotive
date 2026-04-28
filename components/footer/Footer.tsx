import Image from "next/image";
import PhoneCTA from "@/components/ui/PhoneCTA";

export default function Footer() {
  return (
    <footer className="bg-bg border-t border-divider px-6 md:px-10 py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto">
        <div>
          <Image
            src="/logos/sp-mark.jpeg"
            alt="SP Automotive"
            width={240}
            height={56}
            className="h-12 w-auto invert"
          />
          <p className="mt-3 text-muted text-sm">Sarasota, FL</p>
        </div>
        <div className="flex md:justify-center"><PhoneCTA /></div>
        <div className="flex flex-col gap-2 text-sm text-muted md:items-end">
          <a href="#" className="hover:text-accent transition-colors">Instagram</a>
          <a href="#" className="hover:text-accent transition-colors">YouTube</a>
        </div>
      </div>
    </footer>
  );
}
