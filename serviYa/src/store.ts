import type { LuciaError } from "lucia-auth";
import { writable, type Writable } from "svelte/store";

export const errorStore: Writable<LuciaError | string> = writable();
