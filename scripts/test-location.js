
import { getLocation } from '../src/utils/location.js';

console.log("Starting location fetch validation...");

const startTime = Date.now();

getLocation()
  .then(result => {
    const duration = Date.now() - startTime;
    console.log(`✅ Validation Successful! (Time: ${duration}ms)`);
    console.log("Source:", result.source);
    console.log("Latitude:", result.lat);
    console.log("Longitude:", result.long);
    console.log("Formatted:", `${result.lat}, ${result.long}`);
  })
  .catch(err => {
    console.error("❌ Validation Failed!");
    console.error(err);
    process.exit(1);
  });
