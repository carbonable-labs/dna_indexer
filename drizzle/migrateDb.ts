import { migrate } from "drizzle-orm/node-postgres/migrator";
import { db } from "./dbConnexion";

// Run migrations
migrate(db, { migrationsFolder: "./drizzle" })
  .then(() => {
    console.log("✅ Migrations ran successfully");
  })
  .catch((error) => {
    console.error("Error running migrations:", error);
  })
  .finally(() => {
    db.$client.end(); // Close the connection pool
    process.exit(0);
  });
