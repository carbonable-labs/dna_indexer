import { EventAbi, EventMember } from "./parser";

type SqlTypeMapping = {
  [key: string]: string;
};

export class SchemaGenerator {
  private readonly sqlTypeMapping: SqlTypeMapping = {
    u256: "NUMERIC(78,0)",
    ContractAddress: "VARCHAR(66)",
    ClassHash: "VARCHAR(66)",
    u64: "BIGINT",
    u32: "BIGINT",
    bool: "BOOLEAN",
  };

  constructor() {
    console.log("🚀 Initializing SchemaGenerator");
  }

  public generateSqlSchema(abi: EventAbi[]): string {
    let sqlStatements: string[] = [];

    // Common fields that every table should have
    const commonFields = [
      "id SERIAL PRIMARY KEY",
      "created_at TIMESTAMPTZ DEFAULT NOW()",
      "contract_address VARCHAR(66) NOT NULL",
      "tx_hash VARCHAR(66) NOT NULL",
      "blocknumber BIGINT NOT NULL",
    ];

    for (const event of abi) {
      const shortName = event.name.split("::").pop() || event.name;
      const tableName = this.formatTableName(shortName);

      let columns = [...commonFields];

      for (const member of event.members) {
        const columnName = this.formatColumnName(member.name);
        const sqlType = this.getSqlType(member.type);
        columns.push(`${columnName} ${sqlType}`);
      }

      const createTableSQL = `
CREATE TABLE IF NOT EXISTS ${tableName} (
    ${columns.join(",\n    ")}
);

-- Create indexes for ${tableName}
CREATE INDEX IF NOT EXISTS idx_${tableName}_contract_address ON ${tableName}(contract_address);
CREATE INDEX IF NOT EXISTS idx_${tableName}_tx_hash ON ${tableName}(tx_hash);
CREATE INDEX IF NOT EXISTS idx_${tableName}_blocknumber ON ${tableName}(blocknumber);
`;
      sqlStatements.push(createTableSQL);
    }

    const finalSQL = sqlStatements.join("\n");
    console.log("✅ Generated SQL schema");
    return finalSQL;
  }

  private formatTableName(eventName: string): string {
    return eventName
      .replace(/([a-z])([A-Z])/g, "$1_$2")
      .toLowerCase()
      .replace(/[^a-z0-9_]/g, "_")
      .replace(/_{2,}/g, "_")
      .replace(/^_|_$/g, "");
  }

  private formatColumnName(memberName: string): string {
    return memberName
      .replace(/([a-z])([A-Z])/g, "$1_$2")
      .toLowerCase()
      .replace(/[^a-z0-9_]/g, "_")
      .replace(/_{2,}/g, "_")
      .replace(/^_|_$/g, "");
  }

  private getSqlType(type: string): string {
    const baseType = type.split("::").pop() || type;
    return this.sqlTypeMapping[baseType] || "TEXT";
  }
}
