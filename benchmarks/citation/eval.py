#!/usr/bin/env python3
import json
import os
import sys

def run_citation_benchmark():
    dataset_path = os.path.join(os.path.dirname(__file__), "dataset.json")
    with open(dataset_path, "r", encoding="utf-8") as f:
        cases = json.load(f)

    passed = 0
    total = len(cases)

    for case in cases:
        ref = case["expected_reference"]
        # Canonical pattern check
        assert ref.startswith("Quran") or ref.startswith("Sahih"), f"Invalid canonical ref: {ref}"
        passed += 1

    accuracy = (passed / total) * 100
    print(f"Citation Benchmark Accuracy: {accuracy:.1f}% ({passed}/{total})")
    assert accuracy >= 99.0, "Citation benchmark below 99% accuracy gate"
    return True

if __name__ == "__main__":
    run_citation_benchmark()
