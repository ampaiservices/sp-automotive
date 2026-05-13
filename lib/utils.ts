// Minimal class-name joiner. Filters out falsy values so callers can pass
// conditional class strings inline without an extra clsx dependency.
export function cn(
  ...args: (string | undefined | null | false | 0)[]
): string {
  return args.filter(Boolean).join(" ");
}
