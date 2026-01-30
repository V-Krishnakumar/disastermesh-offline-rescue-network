import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, 'server/resqueue.db');

console.log(`Attempting to delete: ${dbPath}`);

try {
    if (fs.existsSync(dbPath)) {
        fs.unlinkSync(dbPath);
        console.log('Successfully deleted resqueue.db');
    } else {
        console.log('resqueue.db does not exist');
    }
} catch (error) {
    console.error('Error deleting file:', error);
}
