import { store } from "@/redux/store/store";

export function getStoredUser() {
  const state = store.getState();
  return state.auth.user || null;
}
