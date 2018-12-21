/**
 * services:
 * - firebase (storage): saving images (profile, live feed)
 * - push messages
 */
import * as auth from "./auth";
import * as db from "./db";

export default {
  ...auth,
  ...db
};
