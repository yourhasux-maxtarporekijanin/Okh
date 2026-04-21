const fs = require("fs-extra");
const axios = require("axios");

module.exports.config = {
  name: "help",
  version: "6.0.0",
  hasPermssion: 0,
  credits: "FIXED BY CHATGPT",
  description: "Help with random anime video",
  commandCategory: "system",
  cooldowns: 5
};

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID } = event;
  const { commands } = global.client;
  const prefix = global.config.PREFIX;

  // 📁 cache safe
  const cacheDir = __dirname + "/cache";
  fs.ensureDirSync(cacheDir);

  // 🎥 safe anime videos (working stream links)
  const videos = [
    "https://files.catbox.moe/7l6w8k.mp4",
    "https://files.catbox.moe/8k9x2p.mp4",
    "https://files.catbox.moe/9z8y7x.mp4"
  ];

  const video = videos[Math.floor(Math.random() * videos.length)];
  const file = cacheDir + "/help.mp4";

  let attachment = null;

  // 🔥 SAFE DOWNLOAD (NO CRASH)
  try {
    const res = await axios({
      url: video,
      responseType: "stream",
      timeout: 7000
    });

    const writer = fs.createWriteStream(file);
    res.data.pipe(writer);

    await new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });

    attachment = fs.createReadStream(file);

  } catch (err) {
    attachment = null; // যদি video fail হয় তাও text যাবে
  }

  // 🔎 COMMAND INFO
  if (args[0] && isNaN(args[0])) {
    const cmd = commands.get(args[0].toLowerCase());

    if (!cmd) {
      return api.sendMessage("❌ Command not found!", threadID, messageID);
    }

    const msg = `
🌸 HELP INFO 🌸

📛 Name: ${cmd.config.name}
📝 Desc: ${cmd.config.description || "No desc"}
📌 Usage: ${prefix}${cmd.config.name}
📂 Cat: ${cmd.config.commandCategory}
`;

    return api.sendMessage(
      { body: msg, attachment },
      threadID,
      () => attachment && fs.unlinkSync(file),
      messageID
    );
  }

  // 📜 COMMAND LIST
  const list = Array.from(commands.keys());
  const page = parseInt(args[0]) || 1;
  const perPage = 10;

  const start = (page - 1) * perPage;
  const slice = list.slice(start, start + perPage);

  let msg = `📜 COMMAND LIST\n\n`;

  slice.forEach((c, i) => {
    msg += `${start + i + 1}. ${c}\n`;
  });

  msg += `\n🔰 Prefix: ${prefix}\n📄 Page: ${page}`;

  return api.sendMessage(
    { body: msg, attachment },
    threadID,
    () => attachment && fs.unlinkSync(file),
    messageID
  );
};
