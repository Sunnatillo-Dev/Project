import path from "path";
import { promises as fsPromises } from "fs";

const newsFilePath = path.resolve(process.cwd(), "src/data/saved.json");

const readNewsFile = async () => {
  try {
    const data = await fsPromises.readFile(newsFilePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    throw new Error(`Error reading News.json: ${error.message}`);
  }
};

const writeNewsFile = async (data) => {
  try {
    await fsPromises.writeFile(newsFilePath, JSON.stringify(data, null, 2));
  } catch (error) {
    throw new Error(`Error writing to News.json: ${error.message}`);
  }
};

export default async function getNews(req, res) {
  try {
    if (req.method === "GET") {
      const newsData = await readNewsFile();
      res.status(200).json(newsData);
    } else if (req.method === "POST") {
      const newNewsItem = req.body;
      const { userId } = req.body;
      const newsData = await readNewsFile();

      const existingProduct = newsData[userId]?.find(
        (item) => item.id === newNewsItem.data.id
      );

      if (!existingProduct) {
        newsData[userId] = [newNewsItem.data, ...newsData[userId]];
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
    } else if (req.method == "DELETE") {
      const { userId, id } = req.body;
      const newsData = await readNewsFile();
      const NewNewsData = newsData[userId].filter((item) => {
        return item.id != id;
      });
      newsData[userId] = NewNewsData;
      writeNewsFile(newsData);
      res.status(202).json(NewNewsData);
    } else {
      res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
