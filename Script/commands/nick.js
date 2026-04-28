const maleNames = [
"এলাকার ডন","ডনের ছোটভাই","মাফিয়া লিডার","ভূয়া ইয়াবা ব্যবসায়ি",
"ইয়াবা ব্যবসায়ির বাপ","পেয়াজ ব্যবসায়ি","বিটিভির সংবাদদাতা",
"ভূয়া সংবাদদাতা","প্রথমআলোর সাংঘাতিক","আন্ডার মেট্রিক পাস",
"ওভার মেট্রিক","M.B.B.S ডাক্তার","ডাকসু ভিপি","ডাকসুর সাবেক ভিপি",
"এটিএম বুথের দাড়োয়ান","হাতুড়ে ডাক্তার","সচেতন মেন্টাল",
"জ্ঞান পাপী","বিশ্ব বেহায়া","সচেতন মাতাল","দাতের পোঁকা","চোখের ময়লা",

"জর্জ ডাব্লিউ বুশ","কিম জং উন","মুরাদ টাকলা","মুরাদ টাকলার মুখপাত্র",
"মুরাদ টাকলার বড়ভাই","মুরাদ টাকলার প্রতিবেশি","মুরাদ টাকলার এলাকার লোক",
"সাকা চৌধুরি","কোকো","কাদের মির্জা","পাপান হাসান","এরশাদ","এরশাদ শিকদার",
"ভবিষ্যৎ প্রধানমন্ত্রী","দেশবিহীন সরাষ্ট্রমন্ত্রী","নির্বাচন কমিশনার",
"উগান্ডার তথ্যমন্ত্রী","উগান্ডার রাষ্ট্রদূত","প্রেম মন্ত্রী",
"ফাটা কেষ্ট","শি চিন পী","শিনজো আবে","অং সাং সুচি","নরেন্দ মোদি",
"ইমরান খান","যুবরাজ সালমান","ভ্লাদিমির পুতিন","ডন","আলেকজেন্ডার বো",
"জাম্বু","দিলদার","মান্না","সালমান শাহ","শাকিব খান","নায়ক জসিম",
"কাবিলা","হিরো আলমের পাগলা ভক্ত","গাজা খোর","হারবাল চিকিৎসক"
];

const femaleNames = [
"রানী 👑","রাজকন্যা 👸","পরী 🧚","ডল বেবি 🎀","মিষ্টি মেয়ে 🍬",
"সুইটহার্ট 💖","চাঁদের আলো 🌙","তারকা মেয়ে ⭐","স্মাইল কুইন 😊",
"লাভলি ডল 🧸","গোলাপ কুঁড়ি 🌹","শাপলা কন্যা 🌼","জুঁই ফুল 🌸",
"বরফ রানী ❄️","সোনালী কন্যা ✨","স্বপ্ন পরী 💭","ম্যাজিক গার্ল 🎩",
"ড্রামা কুইন 🎭","স্মার্ট কুইন 🧠","স্টাইলিশ গার্ল 💅",
"চকলেট ডল 🍫","আইসক্রিম কুইন 🍦","মুন প্রিন্সেস 🌙",
"ড্রিম গার্ল 💭","পিংক কুইন 💗","লাকি ডল 🍀","ফুল রানী 🌺",
"সোনার কন্যা 💛","মিষ্টি পরী 🧁","গোল্ডেন গার্ল ✨"
];

module.exports = {
    config: {
        name: "nick",
        aliases: ["nickname"],
        version: "29.0.0",
        author: "Fixed + Expanded by ChatGPT",
        countDown: 3,
        role: 1,
        category: "admin"
    },

    onStart: async function ({ api, event, args }) {
        const threadID = event.threadID;

        if (!args[0]) {
            return api.sendMessage(
                "⚠️ Use: /nick male | female | random | all <name>",
                threadID
            );
        }

        const type = args[0].toLowerCase();
        const customName = args.slice(1).join(" ");

        const threadInfo = await api.getThreadInfo(threadID);
        const members = threadInfo.participantIDs;

        let success = 0, failed = 0;

        for (const userID of members) {
            if (userID === api.getCurrentUserID()) continue;

            let name = "";

            if (type === "random") {
                const all = [...maleNames, ...femaleNames];
                name = all[Math.floor(Math.random() * all.length)];
            }
            else if (type === "male") {
                name = maleNames[Math.floor(Math.random() * maleNames.length)];
            }
            else if (type === "female") {
                name = femaleNames[Math.floor(Math.random() * femaleNames.length)];
            }
            else if (type === "all") {
                if (!customName) return api.sendMessage("⚠️ নাম দিতে হবে", threadID);
                name = customName;
            }
            else {
                return api.sendMessage("⚠️ ভুল টাইপ", threadID);
            }

            try {
                await api.changeNickname(name, threadID, userID);
                success++;
            } catch {
                failed++;
            }
        }

        return api.sendMessage(
            `✅ Done\n✔️ Success: ${success}\n❌ Failed: ${failed}`,
            threadID
        );
    }
};
