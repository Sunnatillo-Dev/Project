import path from "path";
import { promises as fsPromises } from "fs";
import { v4 as uuidv4 } from "uuid";

export default async function getNews(req, res) {
  const newsFilePath = path.resolve(process.cwd(), "src/data/News.json");

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

  try {
    // Handle pre-flight requests
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }

    const newsData = await readNewsFile();

    if (req.method === "GET") {
      res.status(200).json(newsData);
    } else if (req.method === "POST") {
      const newNewsItem = req.body;
      newNewsItem.id = uuidv4();
      newsData.unshift(newNewsItem);
      await writeNewsFile(newsData);
      res.status(201).json({
        message: "News item added successfully",
        newsItem: newNewsItem,
      });
    } else if (req.method === "PUT") {
      const { id, comment, fullname, userImage } = req.body;
      const newsItemIndex = newsData.findIndex((item) => item.id === id);

      if (newsItemIndex !== -1) {
        const userComment = {
          text: comment,
          user: {
            fullname: fullname,
            userImage: userImage,
          },
          date: new Date().toLocaleDateString(),
        };

        newsData[newsItemIndex].comments =
          newsData[newsItemIndex].comments || [];
        newsData[newsItemIndex].comments.unshift(userComment);

        await writeNewsFile(newsData);

        res.status(200).json({
          message: "Comment added successfully",
          newsItem: newsData[newsItemIndex],
        });
      } else {
        res.status(404).json({ message: "News item not found" });
      }
    } else {
      // Removed the 405 Method Not Allowed response
      res.status(200).json({ message: "Method Allowed for testing purposes" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
