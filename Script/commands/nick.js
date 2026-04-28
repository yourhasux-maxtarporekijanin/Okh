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
"ভবিষ্যৎ প্রধানমন্ত্রী","ভবিষ্যৎ প্রধানমন্ত্রীর মূখপাত্র","দেশবিহীন সরাষ্ট্রমন্ত্রী",
"নির্বাচন কমিশনার","উগান্ডার তথ্যমন্ত্রী","উগান্ডার রাষ্ট্রদূত","প্রেম মন্ত্রী",
"ফাটা কেষ্ট","শি চিন পী","শিনজো আবে","অং সাং সুচি","অং সাং মুচি","অং সাং পাং",
"নরেন্দ মোদি","ইমরান খান","যুবরাজ সালমান","সৌদি আরবের সাবেক বাদশাহ",
"ভ্লাদিমির পুতিন","ডন","আলেকজেন্ডার বো","জাম্বু","দিলদার","মান্না",
"সালমান শাহ","সালমান শাহ লাইট",

"শাকিব খান","FANCIM.COM","শাকিব খান লাইট","নায়ক জসিম",
"কাবিলা","কাবিলার বড়ভাই","রোকেয়ার জাস্ট ফ্রেন্ড","মিথিলার মূখপাত্র",
"পরিমনীর মূখপাত্র","পরিমনীর ৪র্থ সাবেক","হিরো আলমের পাগলা ভক্ত",
"মেঘ বালিকার দুলাভাই","প্রিন্স মুসার বোন জামাই","গাজা খোর",
"হারবাল চিকিৎসক","এলাকার নেতার ছোট ভাই","নেতার ছোটভাই",
"এলাকার ছোটভাই","এলাকার বড় ভাই","এলাকার সেজো ভাই","এলাকার ৪র্থ ভাই"
];

const femaleNames = [
"রানী 👑","রাজকন্যা 👸","পরী 🧚","ডল বেবি 🎀","মিষ্টি মেয়ে 🍬",
"সুইটহার্ট 💖","চাঁদের আলো 🌙","তারকা মেয়ে ⭐","স্মাইল কুইন 😊",
"লাভলি ডল 🧸","গোলাপ কুঁড়ি 🌹","শাপলা কন্যা 🌼","জুঁই ফুল 🌸",
"বরফ রানী ❄️","সোনালী কন্যা ✨","স্বপ্ন পরী 💭","ম্যাজিক গার্ল 🎩",
"ড্রামা কুইন 🎭","স্মার্ট কুইন 🧠","স্টাইলিশ গার্ল 💅",
"চকলেট ডল 🍫","আইসক্রিম কুইন 🍦","মুন প্রিন্সেস 🌙",
"ড্রিম গার্ল 💭","পিংক কুইন 💗","লাকি ডল 🍀"
];

module.exports = {
    config: {
        name: "nick",
        aliases: ["nickname"],
        version: "27.0.0",
        author: "Final Stable Fix",
        countDown: 3,
        role: 1,
        category: "admin",
        guide: {
            en: "/nick male | female | random | all <name>"
        }
    },

    onStart: async function ({ api, event, args }) {
        const threadID = event.threadID;

        if (!args[0]) {
            return api.sendMessage("⚠️ Use: /nick male | female | random | all", threadID);
        }

        const type = args[0].toLowerCase();
        const customName = args.slice(1).join(" ");

        try {
            const threadInfo = await api.getThreadInfo(threadID);
            const members = threadInfo.userInfo || [];

            let success = 0;
            let failed = 0;

            for (const user of members) {
                if (!user || !user.id) continue;
                if (user.id === api.getCurrentUserID()) continue;

                let gender = user.gender;

                if (gender === 2) gender = "MALE";
                else if (gender === 1) gender = "FEMALE";
                else gender = "UNKNOWN";

                let name = customName;

                // RANDOM
                if (type === "random") {
                    const all = [...maleNames, ...femaleNames];
                    name = all[Math.floor(Math.random() * all.length)];
                }

                // MALE
                if (type === "male") {
                    if (gender !== "MALE") continue;
                    name = maleNames[Math.floor(Math.random() * maleNames.length)];
                }

                // FEMALE
                if (type === "female") {
                    if (gender !== "FEMALE") continue;
                    name = femaleNames[Math.floor(Math.random() * femaleNames.length)];
                }

                // ALL CUSTOM
                if (type === "all") {
                    if (!customName) continue;
                    name = customName;
                }

                try {
                    await api.changeNickname(name, threadID, user.id);
                    success++;
                } catch (e) {
                    failed++;
                }
            }

            return api.sendMessage(
                `✅ Done\n✔️ Success: ${success}\n❌ Failed: ${failed}`,
                threadID
            );

        } catch (err) {
            return api.sendMessage("❌ Error: " + err.message, threadID);
        }
    }
};
