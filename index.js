const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

const realTimeFuturesURL = 'https://in.investing.com/commodities/real-time-futures';
const agricultureURL = 'https://in.investing.com/commodities/agriculture';
const metalsURL = 'https://in.investing.com/commodities/metals';

let commodityData = {}; // Initialize with an empty object

// Function to scrape commodity data from the real-time futures URL and update the cache
async function updateRealTimeFuturesData() {
  try {
    // Fetch the HTML content of the real-time futures URL
    const response = await axios.get(realTimeFuturesURL);

    // Load the HTML content into Cheerio for parsing
    const $ = cheerio.load(response.data);

    // Find the commodity data using updated CSS selectors
    const newData = {};

    // Loop through each table row with class "common-table-item"
    $('tr.common-table-item').each((index, element) => {
      const $row = $(element);
      const commodityName = $row.find('td.col-name a.js-instrument-page-link').text();
      const month = $row.find('td.col-month').text();
      const lastPrice = $row.find('td.col-last span.text').text();
      const highPrice = $row.find('td.col-high span.text').text();
      const lowPrice = $row.find('td.col-low span.text').text();
      const change = $row.find('td.col-chg span.text').text();
      const changePercentage = $row.find('td.col-chg_pct span.text').text();

      newData[commodityName] = {
        Expiry: month,
        Last: lastPrice,
        High: highPrice,
        Low: lowPrice,
        Chg: change,
        'Chg%': changePercentage,
      };
    });

    // Update the commodityData cache with data from real-time futures URL
    commodityData = { ...commodityData, ...newData };
  } catch (error) {
    console.error('An error occurred while updating real-time futures data:', error);
  }
}

// Function to scrape commodity data from the agriculture URL and update the cache
async function updateAgricultureData() {
  try {
    // Fetch the HTML content of the agriculture URL
    const response = await axios.get(agricultureURL);

    // Load the HTML content into Cheerio for parsing
    const $ = cheerio.load(response.data);

    // Find the agriculture commodity data using the provided HTML format
    const agricultureData = {};

    // Loop through each table row with class "common-table-item"
    $('tr.common-table-item').each((index, element) => {
      const $row = $(element);
      const commodityName = $row.find('td.col-name a.js-instrument-page-link').text();
      const month = $row.find('td.col-month span.text').text();
      const lastPrice = $row.find('td.col-last span.text').text();
      const highPrice = $row.find('td.col-high span.text').text();
      const lowPrice = $row.find('td.col-low span.text').text();
      const change = $row.find('td.col-chg span.text').text();
      const changePercentage = $row.find('td.col-chg_pct span.text').text();

      agricultureData[commodityName] = {
        Expiry: month,
        Last: lastPrice,
        High: highPrice,
        Low: lowPrice,
        Chg: change,
        'Chg%': changePercentage,
      };
    });

    // Update the commodityData cache with data from agriculture URL
    commodityData = { ...commodityData, ...agricultureData };
  } catch (error) {
    console.error('An error occurred while updating agriculture data:', error);
  }
}

// Function to scrape commodity data from the metals URL and update the cache
async function updateMetalsData() {
  try {
    // Fetch the HTML content of the metals URL
    const response = await axios.get(metalsURL);

    // Load the HTML content into Cheerio for parsing
    const $ = cheerio.load(response.data);

    // Find the metals commodity data using the provided HTML format
    const metalsData = {};

    // Loop through each table row with class "common-table-item"
    $('tr.common-table-item').each((index, element) => {
      const $row = $(element);
      const commodityName = $row.find('td.col-name a.js-instrument-page-link').text();
      const month = $row.find('td.col-month span.text').text();
      const lastPrice = $row.find('td.col-last span.text').text();
      const highPrice = $row.find('td.col-high span.text').text();
      const lowPrice = $row.find('td.col-low span.text').text();
      const change = $row.find('td.col-chg span.text').text();
      const changePercentage = $row.find('td.col-chg_pct span.text').text();

      metalsData[commodityName] = {
        Expiry: month,
        Last: lastPrice,
        High: highPrice,
        Low: lowPrice,
        Chg: change,
        'Chg%': changePercentage,
      };
    });

    // Update the commodityData cache with data from metals URL
    commodityData = { ...commodityData, ...metalsData };
  } catch (error) {
    console.error('An error occurred while updating metals data:', error);
  }
}

// Periodically update the data cache from all three URLs
const updateInterval = 300; // 40 seconds
setInterval(updateRealTimeFuturesData, updateInterval);
setInterval(updateAgricultureData, updateInterval);
setInterval(updateMetalsData, updateInterval);

// Initial data update
updateRealTimeFuturesData();
updateAgricultureData();
updateMetalsData();

// Define the /commodity/all endpoint to return data for all specified commodities
app.get('/commodity/all', (req, res) => {
  try {
    const specifiedCommodities = [
      'MCX Gold 1 Kg',
      'MCX Gold Mini',
      'MCX Silver',
      'MCX Silver Mini',
      'MCX Copper',
      'MCX Crude Oil WTI',
      'Lead',
      'MCX Zinc',
      'MCX Aluminium',
      'MCX Natural Gas',
      'MCX Nickel',
      'MCX Mentha Oil',
      'MCX Silver Micro',
      'MCX Gold Guinea',
      'MCX Gold Petal',
      'MCX Cotton',
      'MCX Cardamom',
      'MCX Kapas',
      'MCX Crude Palm Oil',
      'MCX Castor Seed',
      'NCDEX Jeera',
      'NCDEX Guar Gum',
      'NCDEX Soybean',
      'NCDEX Coriander',
    ];

    const filteredData = {};
    for (const commodity of specifiedCommodities) {
      if (commodityData[commodity]) {
        filteredData[commodity] = commodityData[commodity];
      }
    }

    res.json(filteredData);
  } catch (error) {
    console.error('An error occurred while fetching data:', error);
    res.status(500).json({ error: 'An error occurred while fetching data.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
