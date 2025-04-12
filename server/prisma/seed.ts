import { PrismaClient } from "../generated/prisma";
import fs from "fs";
import path from "path";
const prisma = new PrismaClient();

/**
 * @description This script is used to reset and seed a database using Prisma ORM.
 *
 * It performs the following steps:
 * 1. Defines an ordered list of JSON data files located in the "seedData" directory.
 * 2. Converts each file name to its corresponding Prisma model name.
 * 3. Clears all existing data from the corresponding database tables/models in the specified order.
 * 4. Reads each JSON file and inserts the data into the database using Prisma's `create` method.
 *
 * @Notes
 * - The order of file names in `orderedFileNames` is important to maintain relational integrity.
 * - Each file name (e.g., "users.json") should match the Prisma model name in lowercase (e.g., "User").
 * - Prisma models are accessed dynamically using the model name derived from each file name.
 *
 * @Usage
 * Run the script using a Node.js runtime with TypeScript support.
 * Ensure that Prisma is properly configured and connected to your database before running.
 */
async function deleteAllData(orderedFileNames: string[]) {
  const modelNames = orderedFileNames.map((fileName) => {
    const modelName = path.basename(fileName, path.extname(fileName));
    return modelName.charAt(0).toUpperCase() + modelName.slice(1);
  });

  for (const modelName of modelNames) {
    const model: any = prisma[modelName as keyof typeof prisma];
    if (model) {
      await model.deleteMany({});
      console.log(`Cleared data from ${modelName}`);
    } else {
      console.error(
        `Model ${modelName} not found. Please ensure the model name is correctly specified.`
      );
    }
  }
}

async function main() {
  /**
   * @description __dirname is a Node.js global variable that contains the directory name of the current module.
   * In this case, it points to the directory where the seed.ts file is located.
   * The path.join function is used to create a path to the seedData directory relative to the current module's directory.
   * The seedData directory contains JSON files with data to be seeded into the database.
   * The JSON files should be structured according to the Prisma models defined in the schema.
   * The orderedFileNames array contains the names of the JSON files in the order they should be processed.
   * This order is important to maintain referential integrity when seeding data with foreign key relationships.
   * @example if the products.json file contains references to users, it should be processed after users.json.
   * This ensures that the referenced users exist in the database before attempting to create products that reference them.
   * @example The deleteAllData function is called to clear existing data from the database before seeding new data.
   * This is important to ensure that the database is in a clean state before seeding new data.
   * The function takes the orderedFileNames array as an argument and processes each file name to determine the corresponding Prisma model name.
   * It then calls the deleteMany method on each model to clear existing data.
   * After clearing the data, the script reads each JSON file and inserts the data into the database using Prisma's create method.
   * The script uses the fs module to read the JSON files synchronously and parse the data into JavaScript objects.
   * The data is then inserted into the database using the create method of the corresponding Prisma model.
   * The script logs the progress of the seeding process to the console, indicating which model is being seeded and from which file.
   * @example The script uses async/await syntax to handle asynchronous operations, ensuring that each operation completes before moving on to the next one.
   * This is important for maintaining the order of operations and ensuring that data is seeded correctly.
   * The script also includes error handling to catch any errors that occur during the seeding process.
   * If an error occurs, it logs the error to the console and ensures that the Prisma client is disconnected properly.
   * @example The script uses the finally block to ensure that the Prisma client is disconnected after the seeding process is complete, regardless of whether an error occurred or not.
   */
  const dataDirectory = path.join(__dirname, "seedData");

  const orderedFileNames = [
    "products.json",
    "expenseSummary.json",
    "sales.json",
    "salesSummary.json",
    "purchases.json",
    "purchaseSummary.json",
    "users.json",
    "expenses.json",
    "expenseByCategory.json",
  ];

  await deleteAllData(orderedFileNames);

  for (const fileName of orderedFileNames) {
    const filePath = path.join(dataDirectory, fileName);
    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const modelName = path.basename(fileName, path.extname(fileName));
    const model: any = prisma[modelName as keyof typeof prisma];

    if (!model) {
      console.error(`No Prisma model matches the file name: ${fileName}`);
      continue;
    }

    for (const data of jsonData) {
      await model.create({
        data,
      });
    }

    console.log(`Seeded ${modelName} with data from ${fileName}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
