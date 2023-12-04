const fs = require("fs");
const axios = require("axios");
const { v4 } = require("uuid");

// Your array of jobs
const randomNumbers = [
  14, 32, 8, 50, 3, 21, 45, 18, 6, 39, 12, 56, 27, 5, 48, 9, 36, 17, 42, 2, 58,
  29, 11, 54, 25, 7, 51, 14, 31, 10, 47, 20, 4, 35, 16, 41, 1, 57, 28, 13, 55,
  26, 8, 49, 19, 43, 15, 40, 22, 3, 59, 30, 12, 46, 23, 6, 37, 18, 44, 2, 53,
  24, 7, 52, 15, 33, 9, 38, 21, 5, 50, 10, 34, 16, 45, 11, 54, 27, 1, 60,
];

// Read the JSON file
const filePath = "News.json";

fs.readFile(filePath, "utf8", async (err, data) => {
  if (err) {
    console.error("Error reading the file:", err);
    return;
  }

  // Parse the JSON data
  const jsonData = JSON.parse(data);

  // Map through the array and update avatar URLs
  const updatedData = await Promise.all(
    jsonData.map(async (newsItem, index) => {
      // Change the avatar field based on the jobs array
      const job = randomNumbers[index]; // Repeatedly use jobs in a cyclic manner

      try {
        newsItem.readMinutes = `${job}`;
      } catch (error) {
        console.error(
          `Error updating avatar URL for job ${job}:`,
          error.message,
        );
      }

      return newsItem;
    }),
  );

  // Convert the modified data back to JSON format
  const updatedJsonData = JSON.stringify(updatedData, null, 2);

  // Write the updated JSON data back to the file
  fs.writeFile(filePath, updatedJsonData, "utf8", (err) => {
    if (err) {
      console.error("Error writing to the file:", err);
      return;
    }

    console.log(" News.json updated successfully!");
  });
});
