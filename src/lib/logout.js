export async function logout() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");


    window.location.href = "/";
  }
}
