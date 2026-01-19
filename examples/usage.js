import DramaDash from "../api/DramaDash.js";
import fs from "fs/promises";

// Example: Using DramaDash class directly
async function main() {
  // Initialize DramaDash instance
  const dd = await new DramaDash().init();
  console.log("✅ DramaDash initialized");
  console.log("Device ID:", dd.deviceId);
  console.log("Device Token:", dd.deviceToken);

  try {
    // Example 1: Get home page data
    console.log("\n📺 Fetching home page data...");
    const home = await dd.getHome();
    console.log("Home data:", JSON.stringify(home, null, 2));
    await saveAsFile("home.json", home);

    // Example 2: Get specific drama details
    console.log("\n🎬 Fetching drama details (ID: 44)...");
    const drama = await dd.getDrama(44);
    console.log("Drama:", drama.data.name);
    await saveAsFile("drama_44.json", drama);

    // Example 3: Search for dramas
    console.log("\n🔍 Searching for 'putri'...");
    const search = await dd.searchDrama("putri");
    console.log(`Found ${search.data.length} results`);
    await saveAsFile("search_putri.json", search);

    // Example 4: Get specific episode
    console.log("\n📹 Fetching episode 1 of drama 44...");
    const episode = await dd.getEpisode(44, 1);
    console.log("Episode:", episode.data.episodeNumber);
    await saveAsFile("episode_44_1.json", episode);

    // Example 5: Get tabs data
    console.log("\n📑 Fetching tab data (ID: 2)...");
    const tabs = await dd.getTabs(2);
    console.log("Tabs data retrieved");
    
    console.log("\n✅ All examples completed successfully!");
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

async function saveAsFile(filename, data) {
  await fs.writeFile(filename, JSON.stringify(data, null, 2), "utf-8");
  console.log(`💾 Saved: ${filename}`);
}

main();
