const fs = require('fs');

function saveToDatabase(data) {
    const jsonData = JSON.stringify(data);

    fs.writeFile('database.json', jsonData, 'utf8', (err) => {
        if (err) {
            console.error('Error ', err);
            return;
        }
        console.log('Data saved to database.json successfully.');
    });
}


const piratedWebsites = ['website1.com', 'website2.com', 'website3.com'];

saveToDatabase(piratedWebsites);
