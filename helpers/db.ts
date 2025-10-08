import { type SQLiteDatabase } from "expo-sqlite";

export async function initDb(db: SQLiteDatabase) {
	await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS recipes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            ingredients TEXT NOT NULL,
            instructions TEXT NOT NULL,
            isStarred BOOLEAN DEFAULT 0
        );
    `);

	const firstRow = await db.getFirstAsync("SELECT * FROM recipes");
	if (!firstRow) {
		await db.runAsync(
			"INSERT INTO recipes (title, ingredients, instructions, isStarred) VALUES (?, ?, ?, ?)",
			"Sample Recipe",
			"Ingredient 1, Ingredient 2",
			"Step 1, Step 2",
			1
		);
		console.log("Database initialized and table ensured.");
	}
}

export async function deleteRecipe(db: SQLiteDatabase, id: string) {
	const response = await db.runAsync("DELETE FROM recipes WHERE id = ?", id);
	return response.changes > 0;
}

export async function changeStarredStatus(
	db: SQLiteDatabase,
	id: string,
	isStarred: boolean
) {
	const response = await db.runAsync(
		"UPDATE recipes SET isStarred = ? WHERE id = ?",
		[isStarred, id]
	);
	return response.changes > 0;
}
