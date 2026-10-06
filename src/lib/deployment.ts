export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefix public assets and full-page redirects; Next Link prefixes routes itself. */
export function publicPath(path: string): string {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  return `${basePath}${path}`;
}

export function sitePathUrl(path: string, siteUrl: string): string {
  return new URL(path.replace(/^\//, ""), `${siteUrl.replace(/\/$/, "")}/`).toString();
}
