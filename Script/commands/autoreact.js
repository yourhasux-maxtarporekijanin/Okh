module.exports.config = {
  name: "autoreact",
  version: "4.0",
  hasPermission: 0,
  credits: "Edited by Nazim 😎",
  description: "Auto React System Pro",
  commandCategory: "No Prefix",
  usages: "[]",
  cooldowns: 0,
};

module.exports.handleEvent = function ({ api, event }) {

  if (!event.body) return;

  const msg = event.body.toLowerCase();

  /* ❤️ Name Words */
  const nameWords = [
    "ratul","hasan","ziniya","zinea","xinea","sahadat","mohem","tahiya",
    "vaiya","vai","mama","মামা","রাতুল","হাসান","জিনিয়া","সুলতানা",
    "তাহিয়া","শাহাদাত","মহিম","ভাইয়া"
  ];

  /* ☪️ Islamic Words */
  const islamicWords = [
    "assalamualaikum","assalamu alaikum","আসসালামু আলাইকুম","salam","সালাম",
    "walaikumassalam","ওয়ালাইকুম আসসালাম",
    "alhamdulillah","আলহামদুলিল্লাহ",
    "mashallah","মাশাআল্লাহ",
    "subhanallah","সুবহানাল্লাহ",
    "astagfirullah","আস্তাগফিরুল্লাহ",
    "inshallah","ইনশাআল্লাহ",
    "jazakallah","জাযাকাল্লাহ",
    "allah","আল্লাহ",
    "allah hafez","আল্লাহ হাফেজ",
    "namaz","নামাজ","dua","দোয়া","amin","আমিন",
    "ramadan","রমজান","roja","রোজা","iftar","ইফতার","sehri","সেহরি",
    "eid mubarak","ঈদ মোবারক","jumma mubarak","জুম্মা মোবারক",
    "la ilaha illallah","muhammad rasulullah"
  ];

  /* 👋 Bye Words */
  const byeWords = [
    "bye","bai","bye bye","good night","gn","tata",
    "বাই","টা টা","বিদায়","আল্লাহ হাফেজ"
  ];

  /* 😂 Funny Emoji */
  const funnyEmojis = [
    "😆","😁","🤣","😂","👉😆👈","👉😁👈","👉🤣👈","👉😂👈"
  ];

  /* 😡 Angry Emoji */
  const angryEmojis = ["😡","🤬","😠"];

  /* 😭 Sad Emoji */
  const sadEmojis = ["😭","😢","😔","😞"];

  /* ❤️ Love Emoji */
  const loveMsgEmoji = ["❤️","💖","💘","💕"];

  /* 👍 Like Emoji */
  const likeEmojis = ["👍","👌","🔥"];

  /* Emoji Sets */
  const islamicEmoji = ["☪️","🕌","🤲","📿","🕋","🌙","✨","🤍"];
  const loveEmoji = ["❤️","💖","💘","💕","💞"];
  const byeEmoji = ["👋","🙂","😌","✨","🌙"];
  const hahaReact = ["😆","😂","🤣","😁"];
  const angryReact = ["😠","😡"];
  const sadReact = ["😢","😭"];
  const likeReact = ["👍","🔥"];

  /* ===== CONDITIONS ===== */

  if (nameWords.some(w => msg.includes(w))) {
    const e = loveEmoji[Math.floor(Math.random() * loveEmoji.length)];
    return api.setMessageReaction(e, event.messageID, () => {}, true);
  }

  if (islamicWords.some(w => msg.includes(w))) {
    const e = islamicEmoji[Math.floor(Math.random() * islamicEmoji.length)];
    return api.setMessageReaction(e, event.messageID, () => {}, true);
  }

  if (byeWords.some(w => msg.includes(w))) {
    const e = byeEmoji[Math.floor(Math.random() * byeEmoji.length)];
    return api.setMessageReaction(e, event.messageID, () => {}, true);
  }

  if (funnyEmojis.some(e => msg.includes(e))) {
    const r = hahaReact[Math.floor(Math.random() * hahaReact.length)];
    return api.setMessageReaction(r, event.messageID, () => {}, true);
  }

  if (angryEmojis.some(e => msg.includes(e))) {
    const r = angryReact[Math.floor(Math.random() * angryReact.length)];
    return api.setMessageReaction(r, event.messageID, () => {}, true);
  }

  if (sadEmojis.some(e => msg.includes(e))) {
    const r = sadReact[Math.floor(Math.random() * sadReact.length)];
    return api.setMessageReaction(r, event.messageID, () => {}, true);
  }

  if (loveMsgEmoji.some(e => msg.includes(e))) {
    const r = loveEmoji[Math.floor(Math.random() * loveEmoji.length)];
    return api.setMessageReaction(r, event.messageID, () => {}, true);
  }

  if (likeEmojis.some(e => msg.includes(e))) {
    const r = likeReact[Math.floor(Math.random() * likeReact.length)];
    return api.setMessageReaction(r, event.messageID, () => {}, true);
  }

};

module.exports.run = function () {};
