import fs from 'fs/promises';

async function processFile() {
  try {
    // Read the JSON file
    const data = await fs.readFile('News.json', 'utf8');

    // Parse the JSON data
    const yourList = JSON.parse(data);

    // Update the list
    yourList.forEach(item => {
      const photoUrlParts = item.photo.split('/?');
      const category = photoUrlParts[photoUrlParts.length - 1];
      item.category = category;
    });

    // Convert the updated data back to JSON
    const updatedData = JSON.stringify(yourList, null, 2);

    // Write the updated data to a new file
    await fs.writeFile('updated-News.json', updatedData, 'utf8');
    console.log('Data updated and saved to updated-News.json!');
  } catch (error) {
    console.error('Error:', error);
  }
}

// Run the function
processFile();
