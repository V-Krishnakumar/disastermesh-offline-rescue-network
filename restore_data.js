
import initSqlJs from 'sql.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, 'server', 'resqueue.db');

async function main() {
    try {
        const SQL = await initSqlJs();
        console.log('Restoring DB at:', dbPath);

        let db;
        if (fs.existsSync(dbPath)) {
            const fileBuffer = fs.readFileSync(dbPath);
            db = new SQL.Database(fileBuffer);
        } else {
            db = new SQL.Database();
            // Schema would be needed if file didn't exist, but we assume it does or server handles it.
            // For safety, we rely on server.js having created the table.
        }

        // 1. Clear existing SOS data
        db.exec("DELETE FROM sos");
        // Reset sequence? 
        db.exec("DELETE FROM sqlite_sequence WHERE name='sos'");

        // 2. Insert Data from Screenshot
        const stmt = db.prepare("INSERT INTO sos (id, status, location, latitude, longitude, people, need, message, timestamp, resolved) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

        const data = [
            [1, "CRITICAL", "13.0082912,80.0056371", 13.0082912, 80.0056371, 2, "WATER", "amrith", "2026-01-29 20:14:01", 0],
            [2, "CRITICAL", "13.0082819,80.0056344", 13.0082819, 80.0056344, 2, "WATER", "message", "2026-01-29 20:21:12", 0],
            [3, "CRITICAL", "13.0083095,80.005647", 13.0083095, 80.005647, 1, "WATER", "Hi", "2026-01-29 22:07:29", 0],
            [4, "CRITICAL", "13.0083101,80.0056512", 13.0083101, 80.0056512, 1, "WATER", "Hi", "2026-01-29 22:07:41", 0],
            [5, "CRITICAL", "13.0083147,80.0056453", 13.0083147, 80.0056453, 1, "WATER", "Hi", "2026-01-29 22:08:05", 0],
            [6, "CRITICAL", "0,00", 0.0, 0.0, 2, "MEDICAL", "Rec", "2026-01-29 22:10:34", 0],
            [7, "CRITICAL", "13.0082921,80.0056364", 13.0082921, 80.0056364, 1, "WATER", "Hi", "2026-01-29 22:20:34", 0],
            [8, "CRITICAL", "13.0082782,80.0056535", 13.0082782, 80.0056535, 1, "WATER", "Hi", "2026-01-29 22:20:42", 0],
            [9, "CRITICAL", "13.0083154,80.005643", 13.0083154, 80.005643, 4, "FOOD", "kk nagar", "2026-01-30 02:47:21", 0]
        ];

        data.forEach(row => {
            stmt.run(row);
        });
        stmt.free();

        // Save
        const binary = db.export();
        fs.writeFileSync(dbPath, Buffer.from(binary));
        console.log("Restored 9 SOS items.");

    } catch (e) {
        console.error(e);
    }
}
main();
