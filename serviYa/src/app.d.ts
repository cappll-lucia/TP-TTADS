// See https://kit.svelte.dev/docs/types#app

import type { PrismaClient } from "@prisma/client";

// for information about these interfaces
declare global {
  namespace App {
    interface Locals {
      auth: import("lucia-auth").AuthRequest;
    }
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface Platform {}
  }
  // src/app.d.ts
  var __prisma: PrismaClient;
  /// <reference types="lucia" />
  declare namespace Lucia {
    type Auth = import("$lib/server/lucia").Auth;
    type UserAttributes = {};
  }
}
export {};
