module.exports.config = {
  name: "help",
  version: "3.0.0",
  hasPermssion: 0,
  credits: "CYBER BOT TEAM + ChatGPT FIX",
  description: "Show command list",
  commandCategory: "system",
  usages: "[command/page]",
  cooldowns: 5,
  envConfig: {
    autoUnsend: true,
    delayUnsend: 20
  }
};

module.exports.languages = {
  en: {
    moduleInfo: `╭━━━〔 🌸 ISLAMIC BOT HELP 🌸 〕━━━╮
┃ 📛 Name: %1
┃ 📝 Description: %2
┃ 📌 Usage: %3
┃ 📂 Category: %4
┃ ⏱ Cooldown: %5s
┃ 🔐 Permission: %6
┃ 👑 Owner: Mehedi Hasan
╰━━━━━━━━━━━━━━━━━━━━━━╯`,
    user: "User",
    adminGroup: "Admin Group",
    adminBot: "Admin Bot"
  }
};

module.exports.run = async function ({ api, event, args, getText }) {
  const fs = require("fs-extra");
  const request = require("request");

  const { commands } = global.client;
  const { threadID, messageID } = event;
  const prefix = global.config.PREFIX;

  // 🎥 Anime Video Links (Random)
  const videoLinks = [
    "https://files.catbox.moe/7l6w8k.mp4",
    "https://files.catbox.moe/8k9x2p.mp4",
    "https://files.catbox.moe/1a2b3c.mp4",
    "https://files.catbox.moe/9z8y7x.mp4"
  ];

  const randomVideo = videoLinks[Math.floor(Math.random() * videoLinks.length)];
  const path = __dirname + "/cache/help.mp4";

  // 📌 COMMAND DETAILS
  const command = commands.get((args[0] || "").toLowerCase());
  if (command) {
    const info = getText(
      "moduleInfo",
      command.config.name,
      command.config.description || "No description",
      `${prefix}${command.config.name} ${command.config.usages || ""}`,
      command.config.commandCategory || "No category",
      command.config.cooldowns || 0,
      command.config.hasPermssion == 0
        ? getText("user")
        : command.config.hasPermssion == 1
        ? getText("adminGroup")
        : getText("adminBot")
    );

    const callback = () =>
      api.sendMessage(
        {
          body: info,
          attachment: fs.createReadStream(path)
        },
        threadID,
        () => fs.unlinkSync(path),
        messageID
      );

    return request(randomVideo)
      .pipe(fs.createWriteStream(path))
      .on("close", callback);
  }

  // 📚 COMMAND LIST
  const page = parseInt(args[0]) || 1;
  const perPage = 15;

  const cmdList = Array.from(commands.keys()).sort();
  const total = cmdList.length;
  const totalPages = Math.ceil(total / perPage);

  const slice = cmdList.slice((page - 1) * perPage, page * perPage);

  let msg = `╭━━━〔 📜 COMMAND LIST 📜 〕━━━╮\n`;
  slice.forEach(cmd => {
    msg += `┃ ✦ ${cmd}\n`;
  });
  msg += `╰━━━━━━━━━━━━━━━━━━━━━━╯`;

  const footer = `
╭──────•◈•──────╮
│ 🔰 Prefix: ${prefix}
│ 📊 Total: ${total}
│ 📄 Page: ${page}/${totalPages}
│ 💡 Use: ${prefix}help [name]
╰──────•◈•──────╯`;

  const callback = () =>
    api.sendMessage(
      {
        body: msg + footer,
        attachment: fs.createReadStream(path)
      },
      threadID,
      () => fs.unlinkSync(path),
      messageID
    );

  return request(randomVideo)
    .pipe(fs.createWriteStream(path))
    .on("close", callback);
};
