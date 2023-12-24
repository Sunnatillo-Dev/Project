import fs from "fs/promises";

async function processFile() {
  try {
    // Log the current working directory
    console.log("Current working directory:", process.cwd());

    // List files in the current working directory
    const filesInDirectory = await fs.readdir(".");
    console.log("Files in the directory:", filesInDirectory);

    // Check if the file exists
    const fileExists = await fs
      .access("News.json")
      .then(() => true)
      .catch(() => false);

    if (!fileExists) {
      console.error("Error: The 'News.json' file does not exist.");
      return;
    }

    // Rest of your code remains the same
    const data = await fs.readFile("News.json", "utf8");
    const yourList = JSON.parse(data);
    const updatedList = yourList.map((item) => ({
      ...item,
      article: item.description,
    }));
    const updatedData = JSON.stringify(updatedList, null, 2);

    await fs.writeFile("News.json", updatedData, "utf8");
    console.log("Data updated and saved to updated-News.json!");
  } catch (error) {
    console.error("Error:", error);
  }
}

// Run the function
processFile();
