console.log("Running post-build...");
const fs = require("fs");
fs.writeFileSync("./build/CNAME", "lox.jan-prochazka.eu");
console.log("Done");