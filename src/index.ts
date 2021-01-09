import { connect } from "trilogy";
import { createLogger } from "./utils/createLogger";
import { loadEnv } from "./utils/loadEnv";

const log = createLogger("tscb", "debug");

// load the environment variables
loadEnv();

async function main() {
    const db = connect("test.sqlite",{ client: "sql.js" });
    const posts = await db.model("posts", {
        id: "increments",
        username: String,
        comment: String,
        date: Date,
    })

    const promises: Array<Promise<any>> = [];
    for (let i = 0; i < 50; i++) {
        promises.push(posts.create({ username: "Hello", comment: "World", date: new Date(Date.now())}))
    }
    await Promise.all(promises);
}

main();
