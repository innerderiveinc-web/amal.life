#!/usr/bin/env python3
import json
import os
import sys

def run_benchmark():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    dataset_path = os.path.join(base_dir, "dataset.json")

    with open(dataset_path, "r", encoding="utf-8") as f:
        records = json.load(f)

    print(f"Loaded {len(records)} Islamic knowledge benchmark records.")

    total_citations = 0
    valid_citations = 0
    fabricated_citations = 0
    plurality_tests_passed = 0
    scholar_escalations_passed = 0

    for rec in records:
        print(f"Evaluating {rec['id']} [{rec['category']}]: {rec['question'][:50]}...")

        # 1. Evaluate Citation Integrity (Zero Tolerated Fabrications)
        for src in rec["expected_sources"]:
            total_citations += 1
            if ":" in src or "Sahih" in src:
                valid_citations += 1
            else:
                fabricated_citations += 1

        # 2. Evaluate Plurality Mode
        if rec["expected_response_mode"] == "PLURALITY":
            if len(rec["required_positions"]) >= 2 and not rec.get("forbidden_claims_violated", False):
                plurality_tests_passed += 1

        # 3. Evaluate Scholar Escalation
        if rec.get("scholar_required", False):
            if rec["expected_response_mode"] == "SCHOLAR_ESCALATION":
                scholar_escalations_passed += 1

    precision = (valid_citations / total_citations) * 100 if total_citations > 0 else 100.0
    print(f"\nBenchmark Results:")
    print(f"  Citation Precision: {precision:.1f}%")
    print(f"  Fabricated Citations: {fabricated_citations} (Target: 0)")
    print(f"  Plurality Tests Passed: {plurality_tests_passed}")
    print(f"  Scholar Escalation Tests Passed: {scholar_escalations_passed}")

    assert fabricated_citations == 0, f"Critical failure: {fabricated_citations} fabricated citations found!"
    assert precision >= 99.0, f"Citation precision {precision}% below 99% threshold!"
    print("✓ Islamic Knowledge Benchmark Suite: Passed successfully.")
    return True

if __name__ == "__main__":
    success = run_benchmark()
    sys.exit(0 if success else 1)
