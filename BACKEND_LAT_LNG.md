# Backend: Add latitude & longitude for SOS

So the dashboard can show SOS markers automatically (e.g. 13.0083245, 80.0056367) without manual pinning, add these to your Res-Queue backend.

## 1. Database: add columns

Run this once (e.g. in Node or a SQLite client):

```sql
ALTER TABLE sos ADD COLUMN latitude REAL;
ALTER TABLE sos ADD COLUMN longitude REAL;
```

Or recreate the table with the new columns:

```sql
CREATE TABLE IF NOT EXISTS sos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  status TEXT,
  location TEXT,
  people INTEGER,
  need TEXT,
  message TEXT,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  resolved INTEGER DEFAULT 0,
  latitude REAL,
  longitude REAL
);
```

## 2. POST /api/sos: accept lat/lng

In your `app.post("/api/sos", ...)` handler, read optional `latitude` and `longitude` from `req.body` and insert them:

```js
const { status, location, people, need, message, latitude, longitude } = req.body;

const query = `
  INSERT INTO sos (status, location, people, need, message, latitude, longitude)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`;
db.run(query, [status, location, people, need, message || '', latitude ?? null, longitude ?? null], function (err) {
  // ...
});
```

## 3. GET /api/sos

Your existing `SELECT * FROM sos` already returns all columns, so once `latitude` and `longitude` exist in the table, the API response will include them. No code change needed for GET.

---

After this, any SOS sent with `latitude: 13.0083245, longitude: 80.0056367` will show on the map automatically. Operators can still "Re-pin" to correct the position if needed.
