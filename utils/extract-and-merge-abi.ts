import { readFileSync, readdirSync } from "fs";
import { join } from "path/posix";

export function extractAndMergeAbi(appName: string) {
  const appPath = join(__dirname, `../protocols/${appName}`);
  const eventPath = join(appPath, "events");

  return readdirSync(eventPath)
    .filter((file) => file.endsWith(".json"))
    .map((file) => JSON.parse(readFileSync(join(eventPath, file), "utf8")))
    .flat();
}

export function getAppAddresses(appName: string) {
  const appPath = join(__dirname, `../../protocols/${appName}`);
  return JSON.parse(
    readFileSync(join(appPath, "addresses/mainnet.json"), "utf8")
  );
}
