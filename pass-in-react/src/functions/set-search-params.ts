export function setSearchParams(key: string, value: string | number) {
  const url = new URL(window.location.toString());

  url.searchParams.set(key, String(value));

  window.history.pushState({}, "", url);
}
