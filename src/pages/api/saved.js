import path from "path";
import { promises as fsPromises } from "fs";

const newsFilePath = path.resolve(process.cwd(), "src/data/saved.json");

const readNewsFile = async () => {
  try {
    const data = await fsPromises.readFile(newsFilePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    throw new Error(`Error reading saved.json: ${error.message}`);
  }
};

const writeNewsFile = async (data) => {
  try {
    await fsPromises.writeFile(newsFilePath, JSON.stringify(data, null, 2));
  } catch (error) {
    throw new Error(`Error writing to saved.json: ${error.message}`);
  }
};

export default async function getNews(req, res) {
  try {
    // Handle pre-flight requests
    if (req.method === "OPTIONS") {
      res.status(200).end();
      return;
    }

    const newsData = await readNewsFile();

    if (req.method === "GET") {
      res.status(200).json(newsData);
    } else if (req.method === "POST") {
      const newNewsItem = req.body;
      const { userId } = req.body;
      const existingProduct = newsData[userId]?.find(
        (item) => item.id === newNewsItem.data.id
      );

      if (!existingProduct) {
        newsData[userId] = [newNewsItem.data, ...(newsData[userId] || [])];
        await writeNewsFile(newsData);
        res.status(201).json({
          message: "News item added successfully",
          newsItem: newNewsItem,
        });
      } else {
        res.status(200).json({
          message: "News item already exists in the saved items",
        });
      }
    } else if (req.method === "PUT") {
      const { userId, id, updatedData } = req.body;
      const newsItemIndex = newsData[userId]?.findIndex(
        (item) => item.id === id
      );

      if (newsItemIndex !== -1) {
        newsData[userId][newsItemIndex] = updatedData;
        await writeNewsFile(newsData);
        res.status(200).json({
          message: "News item updated successfully",
          updatedNewsItem: updatedData,
        });
      } else {
        res.status(404).json({
          message: "News item not found for update",
        });
      }
    } else if (req.method === "DELETE") {
      const { userId, id } = req.body;
      const newNewsData = newsData[userId]?.filter((item) => item.id !== id);
      newsData[userId] = newNewsData;
      await writeNewsFile(newsData);
      res.status(202).json(newNewsData);
    } else {
      res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
