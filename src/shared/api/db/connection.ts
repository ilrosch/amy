import * as SQLite from 'expo-sqlite';
import type { SQLiteDatabase } from 'expo-sqlite';
import { migrations } from './migrations/migrations';

const DB_NAME = 'amy.db';
let dbInstance: SQLiteDatabase | null = null;

export const getDB = async (): Promise<SQLiteDatabase> => {
  if (dbInstance) return dbInstance;

  try {
    const db = await SQLite.openDatabaseAsync(DB_NAME);
    await db.execAsync('PRAGMA foreign_keys = ON;');
    await applyMigrations(db);
    dbInstance = db;
    return db;
  } catch (err) {
    console.error('failed to init db:', err);
    throw err;
  }
};

const applyMigrations = async (db: SQLiteDatabase) => {
  try {
    if (migrations.length === 0) return;

    await db.withExclusiveTransactionAsync(async (tx) => {
      for (const sql of migrations) {
        await tx.execAsync(sql);
      }
    });
  } catch (err) {
    console.error('failed to apply migrations:', err);
    throw err;
  }
};

export const closeDB = async () => {
  try {
    if (dbInstance) {
      await dbInstance.closeAsync();
      dbInstance = null;
    }
  } catch (err) {
    console.error('failed to close db', err);
    throw err;
  }
};

export const withDB = async <T>(callback: (db: SQLiteDatabase) => Promise<T>): Promise<T> => {
  const db = await getDB();
  return callback(db);
};

export const withTx = async <T>(callback: (tx: SQLiteDatabase) => Promise<T>): Promise<T> => {
  const db = await getDB();

  let result: T | undefined;

  await db.withExclusiveTransactionAsync(async (tx) => {
    result = await callback(tx);
  });

  return result as T;
};
