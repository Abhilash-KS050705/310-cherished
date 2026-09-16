/**
 * Publisher data-access helpers.
 *
 * This module provides build-time queries for reading publisher records from the
 * local SQLite database used by the Astro site.
 */
import { asc } from 'drizzle-orm';
import type { Database } from './db';
import { publishers } from '../../db/schema';
import type { Publisher } from '../types/game';

/**
 * Return every publisher as a lightweight summary object containing its id and name.
 *
 * @param db - The database connection used to read publisher rows.
 * @returns A list of publishers ordered alphabetically by name.
 */
export async function getAllPublishers(db: Database): Promise<Publisher[]> {
    const rows = await db
        .select({ id: publishers.id, name: publishers.name })
        .from(publishers)
        .orderBy(asc(publishers.name));

    return rows.map((row) => ({ id: row.id, name: row.name }));
}
