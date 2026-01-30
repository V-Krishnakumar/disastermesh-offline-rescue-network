
const initSqlJs = require('sql.js');
const fs = require('fs');
const path = require('path');

async function main() {
    try {
        const SQL = await initSqlJs();
        const dbPath = path.join(__dirname, 'server', 'resqueue.db');
        console.log('Reading DB at:', dbPath);

        if (fs.existsSync(dbPath)) {
            const fileBuffer = fs.readFileSync(dbPath);
            const db = new SQL.Database(fileBuffer);
            const res = db.exec("SELECT * FROM sos");
            if (res.length > 0) {
                console.log("Row Count:", res[0].values.length);
                console.log("Rows:", JSON.stringify(res[0].values));
            } else {
                console.log("Table 'sos' found but empty.");
            }
        } else {
            console.log("DB file not found on disk at " + dbPath);
        }
    } catch (e) {
        console.error("Error:", e);
    }
}
main();
