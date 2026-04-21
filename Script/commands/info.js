const fs = require("fs-extra");
const axios = require("axios");
const path = require("path");

module.exports.config = {
  name: "info",
  version: "3.1",
  hasPermssion: 0,
  credits: "Shaon Ahmed + Fixed by ChatGPT",
  description: "Bot Owner Info",
  commandCategory: "For users",
  usages: "",
  cooldowns: 5
};

module.exports.run = async function ({ api, event, Threads }) {
  try {
    const { threadID } = event;
    const startTime = Date.now();

    // Load Config Safely
    const configPath = global.client.configPath;
    delete require.cache[require.resolve(configPath)];
    const config = require(configPath);

    const PREFIX = config.PREFIX || "!";
    const namebot = config.BOTNAME || "CYBER BOT";
    const commands = global.client.commands || new Map();

    // Get Group Prefix Safely
    let prefix = PREFIX;
    try {
      const threadData = await Threads.getData(threadID);
      if (threadData && threadData.data && threadData.data.PREFIX) {
        prefix = threadData.data.PREFIX;
      }
    } catch (e) {
      prefix = PREFIX;
    }

    // Uptime Calculation
    const uptime = process.uptime();
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);

    // Total Users & Groups
    const totalUsers = global.data?.allUserID?.length || 0;
    const totalThreads = global.data?.allThreadID?.length || 0;

    // Random Image Links
    const links = [
      "https://i.ibb.co/cSsPSBhG/image0.jpg",
      "https://i.ibb.co/DH1hxKsV/image0.jpg",
      "https://i.ibb.co/bGZp5tx/image0.jpg",
      "https://i.ibb.co/nXRfjZk/image0.jpg",
      "https://i.ibb.co/prP1cn1Q/image0.jpg",
      "https://i.ibb.co/Ldcb6H8V/image0.jpg"
    ];

    const imgURL = links[Math.floor(Math.random() * links.length)];
    const cacheDir = path.join(__dirname, "cache");
    const imgPath = path.join(cacheDir, "info.jpg");

    // Ensure cache folder exists
    await fs.ensureDir(cacheDir);

    // Download Image
    const response = await axios({
      url: imgURL,
      method: "GET",
      responseType: "stream"
    });

    const writer = fs.createWriteStream(imgPath);
    response.data.pipe(writer);

    writer.on("finish", () => {
      const ping = Date.now() - startTime;

      api.sendMessage(
        {
          body: `
╔═══════❖•ೋ° 🌟 °ೋ•❖═══════╗
            🤖 ${namebot}
╚═══════❖•ೋ° 🌟 °ೋ•❖═══════╝

📌 『 𝗥𝗢𝗕𝗢𝗧 𝗦𝗬𝗦𝗧𝗘𝗠 』

⚙️ Default Prefix : ${PREFIX}
🌐 Group Prefix   : ${prefix}
📦 Total Modules  : ${commands.size}
📡 Ping           : ${ping} ms

━━━━━━━━━━━━━━━━━━

👑 『 𝗢𝗪𝗡𝗘𝗥 𝗜𝗡𝗙𝗢 』

👤 Name     : 𝗠𝗲𝗵𝗲𝗱𝗶 𝗛𝗮𝘀𝗮𝗻
📘 Facebook : Inbox for Contact
💬 WhatsApp : Available on Request

━━━━━━━━━━━━━━━━━━

⏰ 『 𝗕𝗢𝗧 𝗨𝗣𝗧𝗜𝗠𝗘 』
🟢 ${hours}h ${minutes}m ${seconds}s

━━━━━━━━━━━━━━━━━━

👥 Total Users  : ${totalUsers}
👥 Total Groups : ${totalThreads}

⚠️ 𝐂𝐘𝐁𝐄𝐑 ☢️ 𖣘 𝐁𝐎𝐓 ⚠️
━━━━━━━━━━━━━━━━━━
✨ Powered by Mehedi Hasan
`,
          attachment: fs.createReadStream(imgPath)
        },
        threadID,
        () => fs.unlinkSync(imgPath)
      );
    });

    writer.on("error", () => {
      api.sendMessage("❌ Image download failed!", threadID);
    });

  } catch (error) {
    console.error(error);
    api.sendMessage("❌ Error: " + error.message, event.threadID);
  }
};
