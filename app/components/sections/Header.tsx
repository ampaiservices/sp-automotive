/**
 * Top-of-page header: logo (left), nav links (center, hidden on mobile),
 * estimate CTA (right). Server component — zero JS.
 *
 * Nav links are placeholder anchors pointing to in-page hashes; future sessions
 * will replace these with real routes / scroll targets.
 */
export function Header() {
  return (
    <header className="flex h-20 shrink-0 items-center justify-between border-b border-charcoal/10 bg-white px-6 sm:px-10 lg:px-16">
      <a
        href="#top"
        className="text-base font-bold tracking-[0.18em] text-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cool-blue sm:text-lg"
      >
        SP AUTOMOTIVE
      </a>

      <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
        {[
          { label: "Services", href: "#services" },
          { label: "Our Process", href: "#process" },
          { label: "About", href: "#about" },
          { label: "Contact", href: "#contact" },
        ].map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-sm font-medium text-charcoal transition-colors hover:text-black focus-visible:underline focus-visible:outline-none"
          >
            {link.label}
          </a>
        ))}
      </nav>

      <a
        href="#estimate"
        className="rounded-md bg-black px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-charcoal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cool-blue"
      >
        Get an Estimate
      </a>
    </header>
  );
}
