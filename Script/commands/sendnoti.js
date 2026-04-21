module.exports.config = {
  name: "sendnoti",
  version: "5.1.0",
  hasPermssion: 2,
  credits: "Hasan",
  description: "Send announcement with image to all groups",
  commandCategory: "Admin",
  usages: "[text]",
  cooldowns: 5
};

module.exports.languages = {
  en: {
    sendSuccess: "✅ Sent to %1 groups!",
    sendFail: "❌ Failed in %1 groups!"
  }
};

module.exports.run = async function ({ api, event, args, Users, Threads, getText }) {
  const fs = require("fs-extra");
  const axios = require("axios");
  const moment = require("moment-timezone");

  const imageUrl = "https://i.ibb.co/ZprGsHDd/image0.jpg";

  const adminName = await Users.getNameUser(event.senderID);
  const time = moment.tz("Asia/Dhaka").format("DD/MM/YYYY • hh:mm A");

  const msg =
`╔════════════════════╗
📢 ADMIN ANNOUNCEMENT
╚════════════════════╝

${args.join(" ") || "No message"}

━━━━━━━━━━━━━━━━━━
👤 Admin: ${adminName}
⏰ Time: ${time}
⚡ Powered By: Hasan
━━━━━━━━━━━━━━━━━━`;

  // download image
  const path = __dirname + "/cache/sendnoti.jpg";
  const img = await axios.get(imageUrl, { responseType: "arraybuffer" });
  fs.writeFileSync(path, Buffer.from(img.data));

  let threads = [];
  try {
    const all = await Threads.getAll(["threadID", "isGroup"]);
    threads = all.filter(t => t.isGroup).map(t => t.threadID);
  } catch (e) {
    threads = global.data.allThreadID || [];
  }

  let success = 0;
  let fail = 0;

  for (const id of threads) {
    if (id == event.threadID) continue;

    try {
      await api.sendMessage(
        {
          body: msg,
          attachment: fs.createReadStream(path)
        },
        id
      );
      success++;
      await new Promise(r => setTimeout(r, 500));
    } catch (e) {
      fail++;
    }
  }

  fs.unlinkSync(path);

  return api.sendMessage(
    `✅ Done!\n✔ Sent: ${success}\n❌ Failed: ${fail}`,
    event.threadID
  );
};
