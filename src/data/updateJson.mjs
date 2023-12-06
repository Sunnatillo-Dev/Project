import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import News from './News.json' assert { type: 'json' };

const dataFilePath = path.join(process.cwd(), 'data', 'News.json');

export default function handler(req, res) {
  if (req.method === 'POST') {
    // Parse incoming data
    const { title, description, time, link } = req.body;

    // Validate data if needed

    // Create a new article object
    const newArticle = {
      id: uuidv4(), // Use uuid library for unique ID
      title,
      description,
      author: "YourName", // Set the author as needed
      avatar: "https://your-avatar-url.com", // Set the avatar URL as needed
      date: getCurrentDate(),
      comments: [],
      photo: link,
      readMinutes: time.toString(),
    };

    // Add the new article to the existing data
    News.push(newArticle);

    // Save the updated data to the file
    fs.writeFile(dataFilePath, JSON.stringify(News, null, 2), (err) => {
      if (err) {
        console.error('Error writing file:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        // Respond with the updated data
        res.status(200).json(News);
      }
    });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}

// Function to get the current date in the format "YYYY-MM-DD"
function getCurrentDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
