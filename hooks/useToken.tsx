export function useToken() {
  let token: string;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }
  return token;
}
