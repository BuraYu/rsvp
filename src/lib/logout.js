export async function logout() {
  // Entferne hier deine Tokens oder Session-Daten
  if (typeof window !== "undefined") {
    // z.B. LocalStorage clearen (je nach Auth-Mechanismus)
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");

    // Optional: Cookie löschen, API-Call, usw.

    // Danach weiterleiten
    window.location.href = "/";
  }
}
