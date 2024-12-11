import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "../schema";

const pool = new Pool({
  connectionString: "postgres://user:password@localhost:666/db",
});

export const db = drizzle(pool, { schema });
