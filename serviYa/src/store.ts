import { writable, derived, type Writable } from "svelte/store";
import type { User } from "@auth0/auth0-spa-js";
export const isAuthenticated: Writable<Boolean> = writable(false);
export const user: Writable<User> = writable({});
export const popupOpen: Writable<Boolean> = writable(false);
export const error: Writable<any> = writable();
export const tasks: Writable<any[]> = writable([]);

export const user_tasks = derived([tasks, user], ([$tasks, $user]) => {
  let logged_in_user_tasks: any[] = [];

  if ($user && $user.email) {
    logged_in_user_tasks = $tasks.filter((task) => task.user === $user.email);
  }

  return logged_in_user_tasks;
});
