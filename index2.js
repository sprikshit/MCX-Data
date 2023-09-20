const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

const URL = 'https://in.investing.com/commodities/real-time-futures';

let commodityData = {}; // Initialize with an empty object

// Function to scrape commodity data and update the cache
async function updateCommodityData() {
  try {
    // Fetch the HTML content of the webpage
    const response = await axios.get(URL);

    // Load the HTML content into Cheerio for parsing
    const $ = cheerio.load(response.data);

    // Find the commodity data using updated CSS selectors
    const newData = {};

    // Loop through each table row with class "common-table-item"
    $('tr.common-table-item').each((index, element) => {
      const $row = $(element);
      const commodityName = $row.find('td.col-name a.js-instrument-page-link').text();
      const lastPrice = $row.find('td.col-last span.text').text();
      const highPrice = $row.find('td.col-high span.text').text();
      const lowPrice = $row.find('td.col-low span.text').text();
      const change = $row.find('td.col-chg span.text').text();
      const changePercentage = $row.find('td.col-chg_pct span.text').text();

      newData[commodityName] = {
        Last: lastPrice,
        High: highPrice,
        Low: lowPrice,
        Chg: change,
        'Chg%': changePercentage,
      };
    });

    // Update the commodityData cache
    commodityData = newData;
  } catch (error) {
    console.error('An error occurred while updating data:', error);
  }
}

// Periodically update the data cache (every 40 seconds)
const updateInterval = 3000; // 40 seconds
setInterval(updateCommodityData, updateInterval);
updateCommodityData(); // Initial data update

// Define routes to fetch commodity data
app.get('/commodity/ncdex-jeera', (req, res) => {
  try {
    if (commodityData && commodityData['NCDEX Jeera']) {
      const jeeraData = commodityData['NCDEX Jeera'];
      res.json(jeeraData);
    } else {
      res.status(404).json({ error: 'Data not found for NCDEX Jeera' });
    }
  } catch (error) {
    console.error('An error occurred while fetching data:', error);
    res.status(500).json({ error: 'An error occurred while fetching data.' });
  }
});

app.get('/commodity/ncdex-coriander', (req, res) => {
  try {
    if (commodityData && commodityData['NCDEX Coriander']) {
      const corianderData = commodityData['NCDEX Coriander'];
      res.json(corianderData);
    } else {
      res.status(404).json({ error: 'Data not found for NCDEX Coriander' });
    }
  } catch (error) {
    console.error('An error occurred while fetching data:', error);
    res.status(500).json({ error: 'An error occurred while fetching data.' });
  }
});

app.get('/commodity/ncdex-guar-gum', (req, res) => {
  try {
    if (commodityData && commodityData['NCDEX Guar Gum']) {
      const guarGumData = commodityData['NCDEX Guar Gum'];
      res.json(guarGumData);
    } else {
      res.status(404).json({ error: 'Data not found for NCDEX Guar Gum' });
    }
  } catch (error) {
    console.error('An error occurred while fetching data:', error);
    res.status(500).json({ error: 'An error occurred while fetching data.' });
  }
});

app.get('/commodity/ncdex-soybean', (req, res) => {
  try {
    if (commodityData && commodityData['NCDEX Soybean']) {
      const soybeanData = commodityData['NCDEX Soybean'];
      res.json(soybeanData);
    } else {
      res.status(404).json({ error: 'Data not found for NCDEX Soybean' });
    }
  } catch (error) {
    console.error('An error occurred while fetching data:', error);
    res.status(500).json({ error: 'An error occurred while fetching data.' });
  }
});

app.get('/commodity/mcx-gold', (req, res) => {
  try {
    if (commodityData && commodityData['MCX Gold 1 Kg']) {
      const mcxGoldData = commodityData['MCX Gold 1 Kg'];
      res.json(mcxGoldData);
    } else {
      res.status(404).json({ error: 'Data not found for MCX Gold 1 Kg' });
    }
  } catch (error) {
    console.error('An error occurred while fetching data:', error);
    res.status(500).json({ error: 'An error occurred while fetching data.' });
  }
});

app.get('/commodity/mcx-silver', (req, res) => {
  try {
    if (commodityData && commodityData['MCX Silver']) {
      const mcxGoldData = commodityData['MCX Silver'];
      res.json(mcxGoldData);
    } else {
      res.status(404).json({ error: 'Data not found for MCX Silver' });
    }
  } catch (error) {
    console.error('An error occurred while fetching data:', error);
    res.status(500).json({ error: 'An error occurred while fetching data.' });
  }
});

app.get('/commodity/mcx-crude-Oil', (req, res) => {
  try {
    if (commodityData && commodityData['MCX Crude Oil WITI']) {
      const mcxGoldData = commodityData['MCX Crude Oil WITI'];
      res.json(mcxGoldData);
    } else {
      res.status(404).json({ error: 'Data not found for MCX Crude Oil WITI' });
    }
  } catch (error) {
    console.error('An error occurred while fetching data:', error);
    res.status(500).json({ error: 'An error occurred while fetching data.' });
  }
});

app.get('/commodity/mcx-natural-gas', (req, res) => {
  try {
    if (commodityData && commodityData['MCX Copper']) {
      const mcxGoldData = commodityData['MCX Copper'];
      res.json(mcxGoldData);
    } else {
      res.status(404).json({ error: 'Data not found for MCX Copper' });
    }
  } catch (error) {
    console.error('An error occurred while fetching data:', error);
    res.status(500).json({ error: 'An error occurred while fetching data.' });
  }
});
app.get('/commodity/mcx-copper', (req, res) => {
  try {
    if (commodityData && commodityData['MCX Copper']) {
      const mcxGoldData = commodityData['MCX Copper'];
      res.json(mcxGoldData);
    } else {
      res.status(404).json({ error: 'Data not found for MCX Copper' });
    }
  } catch (error) {
    console.error('An error occurred while fetching data:', error);
    res.status(500).json({ error: 'An error occurred while fetching data.' });
  }
});

app.get('/commodity/mcx-aluminium', (req, res) => {
  try {
    if (commodityData && commodityData['MCX Aluminium']) {
      const mcxGoldData = commodityData['MCX Aluminium'];
      res.json(mcxGoldData);
    } else {
      res.status(404).json({ error: 'Data not found for MCX Aluminium' });
    }
  } catch (error) {
    console.error('An error occurred while fetching data:', error);
    res.status(500).json({ error: 'An error occurred while fetching data.' });
  }
});
app.get('/commodity/mcx-nickel', (req, res) => {
  try {
    if (commodityData && commodityData['MCX Nickel']) {
      const mcxGoldData = commodityData['MCX Nickel'];
      res.json(mcxGoldData);
    } else {
      res.status(404).json({ error: 'Data not found for MCX Nickel' });
    }
  } catch (error) {
    console.error('An error occurred while fetching data:', error);
    res.status(500).json({ error: 'An error occurred while fetching data.' });
  }
});
app.get('/commodity/mcx-lead', (req, res) => {
  try {
    if (commodityData && commodityData['MCX Lead']) {
      const mcxGoldData = commodityData['MCX Lead'];
      res.json(mcxGoldData);
    } else {
      res.status(404).json({ error: 'Data not found for MCX Lead' });
    }
  } catch (error) {
    console.error('An error occurred while fetching data:', error);
    res.status(500).json({ error: 'An error occurred while fetching data.' });
  }
});
app.get('/commodity/mcx-zinc', (req, res) => {
  try {
    if (commodityData && commodityData['MCX Zinc']) {
      const mcxGoldData = commodityData['MCX Zinc'];
      res.json(mcxGoldData);
    } else {
      res.status(404).json({ error: 'Data not found for MCX Zinc' });
    }
  } catch (error) {
    console.error('An error occurred while fetching data:', error);
    res.status(500).json({ error: 'An error occurred while fetching data.' });
  }
});
app.get('/commodity/mcx-cotton', (req, res) => {
  try {
    if (commodityData && commodityData['MCX Cotton']) {
      const mcxGoldData = commodityData['MCX Cotton'];
      res.json(mcxGoldData);
    } else {
      res.status(404).json({ error: 'Data not found for MCX Cotton' });
    }
  } catch (error) {
    console.error('An error occurred while fetching data:', error);
    res.status(500).json({ error: 'An error occurred while fetching data.' });
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
