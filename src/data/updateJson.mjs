import fs from "fs/promises";

async function processFile() {
  try {
    const data = await fs.readFile("News.json", "utf8");
    const yourList = JSON.parse(data);
    const updatedList = yourList.map((item) => ({
      ...item,
      saved: false,
    }));
    const updatedData = JSON.stringify(updatedList, null, 2);

    await fs.writeFile("./updated-News.json", updatedData, "utf8");
  } catch (error) {
    console.error("Error:", error);
  }
}

processFile();
