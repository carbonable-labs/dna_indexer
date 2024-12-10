import { writeFile } from "fs/promises";
import { extractAndMergeAbi } from "../utils/extract-and-merge-abi";
import { varchar } from "drizzle-orm/pg-core";

export async function generateDrizzleSchema(appName: string) {
  const allEvents = extractAndMergeAbi(appName);
  const eventss: any[] = [];
  const eventNames: string[] = [];

  allEvents.forEach((event) => {
    const name = event.name.split("::").pop()!;
    if (!eventNames.includes(name)) {
      eventss.push(event);
      eventNames.push(name);
    }
  });

  const schemaContent = generateSchemaContent(eventss);
  await writeFile("./drizzle/schema.ts", schemaContent, "utf8");
  console.log(`✅ Generated Drizzle schema for ${appName}`);
}

function generateSchemaContent(events: any[]): string {
  return `import { pgTable, serial, varchar, bigint, timestamp, index } from 'drizzle-orm/pg-core';

const baseColumns = {
  event_id: varchar('event_id', { length: 42 }).primaryKey(),
  created_at: timestamp('created_at').defaultNow(),
  contract_address: varchar('contract_address', { length: 66 }).notNull(),
  tx_hash: varchar('tx_hash', { length: 66 }).notNull(),
  block_number: bigint('block_number', { mode: 'number' }).notNull(),
};

export const unknownEvents = pgTable('unknown_event', {
  ...baseColumns,
  selector: varchar('selector', { length: 66 }),
  data: varchar("data", { length: 66 }).array(),
}, (table) => ({
  contractIdx: index('idx_unknown_event_contract').on(table.contract_address),
  txHashIdx: index('idx_unknown_event_tx').on(table.tx_hash),
  blockIdx: index('idx_unknown_event_block').on(table.block_number)
}));

${events.map((event) => generateTableDefinition(event)).join("\n\n")}
`;
}

function generateTableDefinition(event: any): string {
  const tableName = formatTableName(event.name);
  const columns = generateColumns(event.members);

  return `export const ${camelCase(tableName)} = pgTable('${tableName}', {
  ...baseColumns,
  ${columns}
}, (table) => ({
  contractIdx: index('idx_${tableName}_contract').on(table.contract_address),
  txHashIdx: index('idx_${tableName}_tx').on(table.tx_hash),
  blockIdx: index('idx_${tableName}_block').on(table.block_number)
}));`;
}

function getColumnType(type: string, columnName: string): string {
  const baseType = type.split("::").pop();
  switch (baseType) {
    case "u256":
      return `varchar('${columnName}', { length: 78 })`;
    case "u64":
    case "u32":
      return `bigint('${columnName}', { mode: 'number' })`;
    case "ContractAddress":
      return `varchar('${columnName}', { length: 66 })`;
    default:
      return `varchar('${columnName}', { length: 255 })`;
  }
}

function generateColumns(members: any[]): string {
  return members
    .map((member) => {
      const columnName = formatColumnName(member.name);
      const columnType = getColumnType(member.type, columnName);
      return `${columnName}: ${columnType},`;
    })
    .join("\n ");
}

function formatTableName(name: string): string {
  return name
    .split("::")
    .pop()!
    .replace(/([a-z])([A-Z])/g, "$1_$2")
    .toLowerCase();
}

function formatColumnName(name: string): string {
  return name.toLowerCase();
}

function camelCase(str: string): string {
  return str.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
}
if (process.argv.length < 3) {
  console.error("Please provide a app name as a command-line argument.");
  process.exit(1);
}

const appName = process.argv[2];
generateDrizzleSchema(appName);
