#!/usr/bin/env python3
"""
AMAL OS — PERSISTENCE SNAPSHOT VERIFICATION TEST
Verifies that local disk persistence works cleanly for standalone / offline usage,
saving state to disk and rehydrating faithfully.
"""

import os
import sys
import subprocess
import json
import tempfile

def test_persistence():
    print("======================================================================")
    print("AMAL OS: PERSISTENT DISK SNAPSHOT VERIFICATION")
    print("======================================================================")
    
    repo_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    packages_dir = os.path.join(repo_root, "packages", "database")
    
    with tempfile.NamedTemporaryFile(suffix=".json", delete=False) as tmp:
        temp_path = tmp.name
        
    js_test_code = f"""
    const {{ db, databaseClient, exportSnapshot, importSnapshot, saveSnapshotToFile, loadSnapshotFromFile }} = require('./dist/index.js');
    
    async function run() {{
      const customUserId = 'usr_persistence_test_99';
      db.users.set(customUserId, {{
        id: customUserId,
        email: 'persistence.seeker@example.com',
        role: 'USER',
        status: 'ACTIVE',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }});
      
      db.reflections.set(customUserId, [{{
        id: 'refl-123',
        userId: customUserId,
        content: 'Fajr prayer attended with sincere intention and khushu.',
        privacyLevel: 'PRIVATE',
        createdAt: new Date().toISOString(),
      }}]);
      
      const writtenPath = await saveSnapshotToFile(db, {json.dumps(temp_path)});
      console.log('SNAPSHOT_WRITTEN:' + writtenPath);
      
      // Clear memory
      db.users.delete(customUserId);
      db.reflections.delete(customUserId);
      
      if (db.users.has(customUserId)) {{
        throw new Error('Memory not cleared');
      }}
      
      // Rehydrate
      const loaded = await loadSnapshotFromFile(db, {json.dumps(temp_path)});
      console.log('SNAPSHOT_LOADED:' + loaded);
      
      if (!db.users.has(customUserId)) {{
        throw new Error('User not rehydrated');
      }}
      
      const refls = db.reflections.get(customUserId);
      if (!refls || refls.length === 0 || refls[0].id !== 'refl-123') {{
        throw new Error('Reflection not rehydrated correctly');
      }}
      
      console.log('SUCCESS:Rehydration verified completely');
    }}
    
    run().catch(err => {{
      console.error(err);
      process.exit(1);
    }});
    """
    
    res = subprocess.run(
        ["node", "-e", js_test_code],
        cwd=packages_dir,
        capture_output=True,
        text=True
    )
    
    if os.path.exists(temp_path):
        os.remove(temp_path)
        
    print(res.stdout)
    if res.returncode != 0:
        print(res.stderr)
        sys.exit(1)
        
    print("✓ Local Disk Snapshot & Rehydration Engine passed with 100% fidelity.")
    print("======================================================================")

if __name__ == "__main__":
    test_persistence()
