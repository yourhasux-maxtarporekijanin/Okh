module.exports.config = {
  name: "help",
  version: "3.0.0",
  hasPermssion: 0,
  credits: "CYBER BOT TEAM (Enhanced by ChatGPT)",
  description: "Show command list with stylish UI + anime support",
  commandCategory: "system",
  usages: "[command name/page]",
  cooldowns: 5,
  envConfig: {
    autoUnsend: true,
    delayUnsend: 20
  }
};

module.exports.languages = {
  en: {
    moduleInfo: `╭━━━〔 ✨ 𝗛𝗘𝗟𝗣 𝗜𝗡𝗙𝗢 ✨ 〕━━━╮
┃ 📛 Name: %1
┃ 📝 Desc: %2
┃ 📌 Usage: %3
┃ 📂 Category: %4
┃ ⏱️ Cooldown: %5s
┃ 🔐 Permission: %6
┃ 👑 Owner: Mehedi Hasan
╰━━━━━━━━━━━━━━━━━━━━╯`,
    user: "User",
    adminGroup: "Group Admin",
    adminBot: "Bot Admin"
  }
};

module.exports.run = async function ({ api, event, args, getText }) {
  const fs = require("fs-extra");
  const request = require("request");

  const { commands } = global.client;
  const { threadID, messageID } = event;
  const prefix = global.config.PREFIX;

  // 🌸 Anime + Stylish GIFs
  const animeGif = [
    "https://i.imgur.com/8Km9tLL.gif",
    "https://i.imgur.com/4M7IWwP.gif",
    "https://i.imgur.com/3XjMZ3R.gif",
    "https://i.imgur.com/2xkVv0H.gif"
  ];

  const randomIMG = animeGif[Math.floor(Math.random() * animeGif.length)];
  const path = __dirname + "/cache/help.png";

  const command = commands.get((args[0] || "").toLowerCase());

  // =========================
  // 📌 Single Command Info
  // =========================
  if (command) {
    const info = getText(
      "moduleInfo",
      command.config.name,
      command.config.description || "No description",
      `${prefix}${command.config.name} ${command.config.usages || ""}`,
      command.config.commandCategory || "Unknown",
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

    return request(encodeURI(randomIMG))
      .pipe(fs.createWriteStream(path))
      .on("close", callback);
  }

  // =========================
  // 📚 Command List
  // =========================
  const arrayInfo = [];
  const page = parseInt(args[0]) || 1;
  const perPage = 15;

  for (const [name] of commands) {
    arrayInfo.push(name);
  }

  arrayInfo.sort();

  const totalCommands = arrayInfo.length;
  const totalPages = Math.ceil(totalCommands / perPage);

  const start = (page - 1) * perPage;
  const list = arrayInfo.slice(start, start + perPage);

  let msg = `╭━━━〔 📜 𝗖𝗢𝗠𝗠𝗔𝗡𝗗 𝗟𝗜𝗦𝗧 📜 〕━━━╮\n`;
  list.forEach((cmd, i) => {
    msg += `┃ ${(start + i + 1)}. ✦ ${cmd}\n`;
  });
  msg += `╰━━━━━━━━━━━━━━━━━━━━╯\n`;

  const footer = `
╭──────•◈•──────╮
│ 🔰 Prefix: ${prefix}
│ 👑 Owner: Mehedi Hasan
│ 📊 Total: ${totalCommands}
│ 📄 Page: ${page}/${totalPages}
│ 💡 Use: ${prefix}help [cmd]
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

  return request(encodeURI(randomIMG))
    .pipe(fs.createWriteStream(path))
    .on("close", callback);
};

// ❌ FIXED (wrong placement removed)
// module.exports.run.config = { name: "help" };
