const axios = require("axios");
const request = require("request");
const fs = require("fs-extra");
const moment = require("moment-timezone");

module.exports.config = {
 name: "stop",
 version: "1.0.0",
 hasPermssion: 2,
 credits: "🔰𝗥𝗮𝗵𝗮𝘁_𝗕𝗼𝘀𝘀🔰",
 description: "Show stop",
 commandCategory: "murgi",
 usages: "intro",
 cooldowns: 2
};

module.exports.run = async function({ api, event }) {
  const threadID = event.threadID;

  // ONLY FIX: prevent crash
  if (!global.clientIntervals) {
    global.clientIntervals = {};
  }

  if (!global.clientIntervals[threadID]) {
    return api.sendMessage(
      "বস আমি তো ঝাউরামি করছি না🥹\nতাহলে stop বলছো কেন🙄🤷",
      threadID
    );
  }

  clearInterval(global.clientIntervals[threadID]);
  delete global.clientIntervals[threadID];

  return api.sendMessage(
    "✅বস থামতে বলছো কেন😑 এইমাত্র তো শুরু করলাম💩",
    threadID
  );
};
