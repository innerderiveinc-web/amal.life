import * as fs from 'fs';
import * as path from 'path';
import { MASTER_CANONICAL_CORPUS } from '../packages/evidence/src/corpus/index.js';

function escapeSql(str: string): string {
  return str.replace(/'/g, "''");
}

async function run() {
  const sirahSqlPath = path.resolve('packages/database/src/schema-sirah-shamail.sql');
  const sirahSql = fs.readFileSync(sirahSqlPath, 'utf8');

  let sql = `-- =========================================================================\n`;
  sql += `-- AMAL OS — MIGRATION 018: MASTER CANONICAL CORPUS (76 WORKS) & SIRAH GRAPH\n`;
  sql += `-- Epistemic Invariant: QURAN != HADITH != TAFSIR != FIQH != SIRAH != TAZKIYAH\n`;
  sql += `-- 100% Traditional Ahl al-Sunnah wa al-Jama'ah (Sawad al-A'zam)\n`;
  sql += `-- =========================================================================\n\n`;

  // Append Sirah Schema DDL
  sql += sirahSql;
  sql += `\n\n`;

  // Canonical Master Corpus Table
  sql += `-- =========================================================================\n`;
  sql += `-- 26. CANONICAL MASTER CORPUS (76 REAL CLASSICAL WORKS)\n`;
  sql += `-- =========================================================================\n`;
  sql += `CREATE TABLE IF NOT EXISTS canonical_master_corpus (\n`;
  sql += `    work_id VARCHAR(64) PRIMARY KEY,\n`;
  sql += `    title_arabic VARCHAR(255) NOT NULL,\n`;
  sql += `    title_transliterated VARCHAR(255) NOT NULL,\n`;
  sql += `    author_name VARCHAR(255) NOT NULL,\n`;
  sql += `    author_death_hijri INT NOT NULL DEFAULT 0,\n`;
  sql += `    discipline VARCHAR(64) NOT NULL,\n`;
  sql += `    edition_publisher VARCHAR(255) NOT NULL,\n`;
  sql += `    publication_city VARCHAR(128) NOT NULL,\n`;
  sql += `    critical_editor_muhaqqiq VARCHAR(255) NOT NULL,\n`;
  sql += `    volume_count INT NOT NULL DEFAULT 1,\n`;
  sql += `    rights_status VARCHAR(64) NOT NULL DEFAULT 'PUBLIC_DOMAIN_CONFIRMED',\n`;
  sql += `    provenance_sha256 VARCHAR(64) NOT NULL,\n`;
  sql += `    scholarly_authority_level VARCHAR(64) NOT NULL,\n`;
  sql += `    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,\n`;
  sql += `    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP\n`;
  sql += `);\n\n`;

  sql += `-- SEED 76 CANONICAL MASTERWORKS\n`;
  for (const work of MASTER_CANONICAL_CORPUS) {
    sql += `INSERT INTO canonical_master_corpus (\n`;
    sql += `    work_id, title_arabic, title_transliterated, author_name, author_death_hijri,\n`;
    sql += `    discipline, edition_publisher, publication_city, critical_editor_muhaqqiq,\n`;
    sql += `    volume_count, rights_status, provenance_sha256, scholarly_authority_level\n`;
    sql += `) VALUES (\n`;
    sql += `    '${escapeSql(work.work_id)}',\n`;
    sql += `    '${escapeSql(work.title_arabic)}',\n`;
    sql += `    '${escapeSql(work.title_transliterated)}',\n`;
    sql += `    '${escapeSql(work.author_name)}',\n`;
    sql += `    ${work.author_death_hijri},\n`;
    sql += `    '${escapeSql(work.discipline)}',\n`;
    sql += `    '${escapeSql(work.edition_publisher)}',\n`;
    sql += `    '${escapeSql(work.publication_city)}',\n`;
    sql += `    '${escapeSql(work.critical_editor_muhaqqiq)}',\n`;
    sql += `    ${work.volume_count},\n`;
    sql += `    '${escapeSql(work.rights_status)}',\n`;
    sql += `    '${escapeSql(work.provenance_sha256)}',\n`;
    sql += `    '${escapeSql(work.scholarly_authority_level)}'\n`;
    sql += `) ON CONFLICT (work_id) DO UPDATE SET\n`;
    sql += `    title_arabic = EXCLUDED.title_arabic,\n`;
    sql += `    title_transliterated = EXCLUDED.title_transliterated,\n`;
    sql += `    author_name = EXCLUDED.author_name,\n`;
    sql += `    author_death_hijri = EXCLUDED.author_death_hijri,\n`;
    sql += `    discipline = EXCLUDED.discipline,\n`;
    sql += `    edition_publisher = EXCLUDED.edition_publisher,\n`;
    sql += `    publication_city = EXCLUDED.publication_city,\n`;
    sql += `    critical_editor_muhaqqiq = EXCLUDED.critical_editor_muhaqqiq,\n`;
    sql += `    volume_count = EXCLUDED.volume_count,\n`;
    sql += `    provenance_sha256 = EXCLUDED.provenance_sha256,\n`;
    sql += `    updated_at = CURRENT_TIMESTAMP;\n\n`;
  }

  const outPath = path.resolve('packages/database/migrations/018_canonical_master_corpus_and_sirah_graph.sql');
  fs.writeFileSync(outPath, sql, 'utf8');
  console.log(`✅ Migration 018 generated at: ${outPath} (${MASTER_CANONICAL_CORPUS.length} works seeded)`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
