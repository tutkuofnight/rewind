import Database from "better-sqlite3"

const db = new Database("db/rewind.db", {})

db.pragma('journal_mode = WAL');

db.prepare(`
CREATE TABLE IF NOT EXISTS songs (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    artist TEXT NOT NULL,
    featurings TEXT,
    song TEXT
)    
`).run()

db.prepare(`
CREATE TABLE IF NOT EXISTS playlist (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL
)
`).run()

db.prepare(`
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    image TEXT,
    playlistId TEXT
)
`).run()

export default db