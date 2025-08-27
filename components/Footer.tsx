import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-12 px-5 text-center border-t border-sosa-border">
      <div className="max-w-6xl mx-auto space-y-4">
        <p className="text-sosa-gray">
          © 2025 Society of Societal Architects. Building tomorrow&apos;s society through collective intelligence.
        </p>
        <div className="flex justify-center gap-6 text-sm">
          <Link href="/privacy" className="text-sosa-gray hover:text-sosa-gold transition-colors">
            Privacy Policy
          </Link>
          <Link href="/cookies" className="text-sosa-gray hover:text-sosa-gold transition-colors">
            Cookie Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}