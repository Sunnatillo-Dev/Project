import { promises as fsPromises } from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const LoginFilePath = path.resolve(
  process.cwd(),
  "src/data/users/registered.json",
);
const LoginFilePath2 = path.resolve(process.cwd(), "src/data/users/login.json");

const readLoginFile = async () => {
  try {
    const data = await fsPromises.readFile(LoginFilePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    throw new Error(`Error reading News.json: ${error.message}`);
  }
};

const writeLoginFile = async (data) => {
  try {
    await fsPromises.writeFile(LoginFilePath, JSON.stringify(data, null, 2));
  } catch (error) {
    throw new Error(`Error writing to News.json: ${error.message}`);
  }
};

export default async function getNews(req, res) {
  try {
    if (req.method === "GET") {
      const LoginData = await readLoginFile();
      res.status(200).json(LoginData);
    } else if (req.method === "POST") {
      const newLoginItem = req.body;
      console.log(newLoginItem);
      newLoginItem.id = uuidv4();

      const LoginData = await readLoginFile();
      LoginData.unshift(newLoginItem);
      await fsPromises.writeFile(
        LoginFilePath2,
        JSON.stringify(newLoginItem, null, 2),
      );
      await writeLoginFile(LoginData);

      res.status(201).json({
        message: "News item added successfully",
        newsItem: newLoginItem,
      });
    } else {
      res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
