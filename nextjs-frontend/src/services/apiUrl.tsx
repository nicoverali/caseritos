export function apiServerUrl(path: string): string {
  return `${process.env.API_BASE_URL}/${path}`;
}

export function apiClientUrl(path: string): string {
  return `${process.env.NEXT_PUBLIC_API_BASE_URL}/${path}`;
}
