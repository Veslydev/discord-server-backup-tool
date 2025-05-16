import Discord from "discord.js-selfbot-v13";
import readline from "readline-sync";
import SQL from "./sql.js";
import fs from "fs";
import path from "path";

console.log("------------------------------------------")
console.log("|andreweathan's server backup import tool|")
console.log("------------------------------------------")
console.log()

await import ("dotenv/config")

let token = process.env.TOKEN
if (!token || token.length <= 0)
    token = readline.question("Insert token > ");

let bot = new Discord.Client({
    intents: Discord.Intents.ALL,
    checkUpdate: false
});

function askFolder() {
    let folder = readline.question("Backup folder to import from > ");
    if (!fs.existsSync(folder) || !fs.statSync(folder).isDirectory()) {
        console.log("Folder does not exist or is not a directory.");
        process.exit(1);
    }
    return folder;
}

async function selectGuild(bot) {
    let guilds = await bot.guilds.fetch();
    let list = [];
    let i = 1;
    for (let [id, guild] of guilds) {
        console.log(`${i}: ${guild.name}`);
        list[i] = guild;
        i++;
    }
    let idx = Number(readline.question("Select target guild by number > "));
    return list[idx];
}

bot.on("ready", async () => {
    console.log("Logged in as " + bot.user.tag);
    let folder = askFolder();
    let targetGuild = await selectGuild(bot);
    console.log("Selected guild: " + targetGuild.name);
    // TODO: Import steps here
    console.log("Import tool is under construction.\nThis is the initial skeleton.\nNext steps: read backup DBs and recreate server structure.");
    process.exit();
});

bot.login(token);
