module.exports.config = {
    name: "nick",
    aliases: ["nickname", "allnick"],
    version: "16.0.0",
    author: "Mr.King",
    countDown: 0,
    role: 0,
    category: "admin"
};

module.exports.onStart = async function ({ api, event }) {
    return runNick(api, event);
};

module.exports.onChat = async function ({ api, event }) {
    if (event.body && event.body.toLowerCase().startsWith("nick")) {
        return runNick(api, event);
    }
};

async function runNick(api, event) {
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
        "নাক বোঁচা পেত্নি 👺", "ঢংগি মেয়ে 💅", "ভুতনি বুড়ি 🧟‍♀️", "রাক্ষসী 👹", "পচা মেয়ে 🤢"
    ];

    for (let id of participantIDs) {
        const randomNick =
            (Math.random() < 0.5 ? maleNicks : femaleNicks)
            [Math.floor(Math.random() * 10)];

        await api.changeNickname(randomNick, threadID, id).catch(() => {});
    }

    return api.sendMessage(
        "এ হারাম খোর হাসান তোর কাজ শেষ",
        threadID
    );
}
