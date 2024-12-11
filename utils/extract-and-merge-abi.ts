import { readFileSync, readdirSync } from "fs";
import { join } from "path/posix";

export function extractAndMergeAbi(appName: string) {
  try {
    // Build paths
    const appPath = join(__dirname, `../protocols/${appName}`);
    const eventPath = join(appPath, "events");

    // Verify directory exists
    if (!readdirSync(eventPath)) {
      throw new Error(`Events directory not found at ${eventPath}`);
    }

    // Get JSON files
    const jsonFiles = readdirSync(eventPath).filter((file) =>
      file.endsWith(".json")
    );
    console.log("Found JSON files:", jsonFiles);

    if (jsonFiles.length === 0) {
      throw new Error("No JSON files found in events directory");
    }

    // Process each file
    const mergedAbi = jsonFiles
      .map((file) => {
        const filePath = join(eventPath, file);
        try {
          const content = readFileSync(filePath, "utf8");

          if (!content.trim()) {
            throw new Error(`File is empty: ${file}`);
          }

          const parsed = JSON.parse(content);
          console.log(`Successfully parsed ${file}`);
          return parsed;
        } catch (err) {
          if (err instanceof Error) {
            throw new Error(
              `Error processing file ${file}: ${err.message}\n` +
                `File path: ${filePath}`
            );
          }
          throw err;
        }
      })
      .flat();

    if (!Array.isArray(mergedAbi)) {
      throw new Error("Merged ABI is not an array");
    }

    return mergedAbi;
  } catch (error) {
    // Add context to the error
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    throw new Error(
      `Failed to extract and merge ABI for ${appName}: ${errorMessage}`
    );
  }
}

export function getAppAddresses(appName: string) {
  const appPath = join(__dirname, `../../protocols/${appName}`);
  return JSON.parse(
    readFileSync(join(appPath, "addresses/mainnet.json"), "utf8")
  );
}
