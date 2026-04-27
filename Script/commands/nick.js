module.exports.config = {
    name: "nick",
    aliases: ["nickname", "allnick"],
    version: "16.0.0",
    author: "Mr.King",
    countDown: 0,
    hasPermssion: 0,
    credits: "Mr.King",
    description: "Auto nickname changer",
    commandCategory: "admin",
    usages: "",
    cooldowns: 0
};

module.exports.run = async function ({ api, event, usersData }) {
    return handleNick({ api, event, usersData });
};

// optional chat trigger
module.exports.handleEvent = async function ({ api, event, usersData }) {
    const body = event.body ? event.body.toLowerCase() : "";
    if (body && body.startsWith("nick")) {
        return handleNick({ api, event, usersData });
    }
};

async function handleNick({ api, event, usersData }) {
    const { threadID, senderID, participantIDs } = event;

    const bossUID = "61586144220686";
    if (senderID !== bossUID) return;

    const maleNicks = [
        "চোধুরি সাহেবের ছেলে",
        "করোনা খান",
        "পিচ্চি হান্নান",
        "কালা জাহাংগির",
        "লেবু মুরাদ",
        "বাবা ছামাদ",
        "মগা হারুন",
        "পাকবা রিপন",
        "ট্যাপা জসিম",
        "কাঁচা বাশার",
        "মগা মারুফ",
        "বুড়া বিল্লাল",
        "ফোকলা ফাহাদ",
        "কাইশ্যা খান",
        "ভূয়া হিসাব নং",
        "মরিচা",
        "বিস্কুট পাগলা",
        "ফালতু ফেসবুকার",
        "শয়তানের দাদা",
        "ইতরের ভ্যাকসিন",
        "ইতরের হাফেজ",
        "রাত জাগা কাউয়া",
        "নিতান্তই ভালমানুষ",
        "জনপ্রিয় নেতা",
        "দাতা হাতেমতাই",
        "এক্কেবারে ভালোমানুষ",
        "ভিজা বিড়াল",
        "আমড়া কাঠের ঢেঁকি",
        "আলাদিনের দৈত্য",
        "হাতুড়ে ডাক্তারের সহকারি",
        "হাতুরে কম্পাউন্ডার",
        "বিষের বোতল",
        "ইন্দুর মারার বিষ",
        "নিশ্চুপ বাচাল",
        "কারেন্টের খাম্বা",
        "সিন্দাবাদ",
        "সিন্দাবাদের সহকারি",
        "সিন্দাবাদের জাহাজের চালক",
        "ভারপ্রাপ্ত প্রেমিক",
        "ভারপ্রাপ্ত স্বামি",
        "ভারপ্রাপ্ত সমাজসেবক",
        "ভীতুর ডিম",
        "ভীতু ডন",
        "ভীতু বডিগার্ড",
        "ভূয়া ডন",
        "ভারপ্রাপ্ত ডন",
        "এলাকার ডন",
        "ডনের ছোটভাই",
        "মাফিয়া লিডার",
        "ভূয়া ইয়াবা ব্যবসায়ি",
        "ইয়াবা ব্যবসায়ির বাপ",
        "পেয়াজ ব্যবসায়ি",
        "মাসল ফেসবুক আইডি"
    ];

    const femaleNicks = [
        "হাসানের বউ 💍", "ঝগড়াটে বুড়ি 👵", "পাগলি পেত্নি 👻", "ড্রামা কুইন 👸", "ঝal মরিচ 🌶️", 
        "নাক বোঁচা পেত্নি 👺", "ঢংগি মেয়ে 💅", "ভুতনি বুড়ি 🧟‍♀️", "রাক্ষসী 👹", "পচা মেয়ে 🤢", 
        "বেয়াদব মেয়ে 🗣️", "মুখপুড়ি 👺", "আলসে বুড়ি 😴", "কানপড়া বুড়ি 👂", "নষ্ট মেয়ে 🚫", 
        "অহংকারী ডাইনি 🧛‍♀️", "প্যানপ্যানানি 🐝", "বিলাই চুন্নি 🐱", "গাউরা মেয়ে 🌪️", "চুদির বোন 🤬",
        "ঝগড়াটে ডাইনি 🧛‍♀️", "নাক ফুল চোর 👃", "পাগলি বউ 👰", "ঢংগি মাস্টারি 💅", "কুত্তি 🐕",
        "পেত্নি সর্দারনী 👻", "কালনাগিনী 🐍", "বিষাক্ত মেয়ে 🐍", "অসভ্য বুড়ি 👵", "ট্যারা পেত্নি 👁️",
        "লুচ্চা মেয়ে 🎭", "ভাতার খোর 👹", "নাক বোঁচা 👃", "পচা আলু 🥔", "কালো ভুতনি 👻",
        "পাগলা গারদের রানী 🏥", "ড্রামা মাস্টারি 👸", "তিতা মরিচ 🌶️", "ঝগড়াটে রানী 👑", "আঁতেল মেয়ে 🤓",
        "ভয়ংকর পেত্নি 🧟", "ঢংগি পেত্নি 💅", "তাওহীদের ক্রাশ 💖", "লুচ্চা পেত্নি 🎭", "বজ্জাত মেয়ে 👿"
    ];

    for (let id of participantIDs) {
        const info = await usersData.get(id);
        let nickList = info.gender == 1 ? femaleNicks : maleNicks;

        const randomNick = nickList[Math.floor(Math.random() * nickList.length)];

        await api.changeNickname(randomNick, threadID, id).catch(() => {});
    }

    return api.sendMessage("এ হারাম খোর বস তোর কাজ শেষ ✅", threadID);
}
