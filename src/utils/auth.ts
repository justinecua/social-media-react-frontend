export function getStoredUser() {
  const storedUser = localStorage.getItem("user");
  return storedUser ? JSON.parse(storedUser) : null;
}
