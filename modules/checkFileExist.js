import fs from "node:fs/promises";

export const checkFileExist = async (path) => {
  try {
    await fs.access(path);
  } catch (error) {
    console.error(`File ${path} is not available`);
    return false;
  }

  return true;
};

export const createFileIfNotExist = async (path) => {
  try {
    await fs.access(path);
  } catch (error) {
    console.error(`Error: ${error}`);
    await fs.writeFile(path, JSON.stringify([]));
    console.log(`File ${path} was created!`);
    return true;
  }

  return true;
};
