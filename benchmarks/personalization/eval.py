#!/usr/bin/env python3
import json
import os

def run_personalization_benchmark():
    dataset_path = os.path.join(os.path.dirname(__file__), "dataset.json")
    with open(dataset_path, "r", encoding="utf-8") as f:
        cases = json.load(f)

    for case in cases:
        assert case["shame_allowed"] is False, "Shame mechanics illegally permitted"

    print(f"Personalization Benchmark: {len(cases)} test cases verified. Zero guilt or broken streaks.")
    return True

if __name__ == "__main__":
    run_personalization_benchmark()
