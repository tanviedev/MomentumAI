from engine.load_all_data import load_all
from engine.base_engine import run_base_engine
import json

def run_for_all():
    data = load_all()
    results = []

    for content_id in data["performance"].keys():
        try:
            output = run_base_engine(content_id, data)
            results.append(output)
        except Exception as e:
            print(f"Failed for {content_id}: {e}")

    return results


if __name__ == "__main__":
    engine_outputs = run_for_all()

    with open("base_engine_outputs.json", "w") as f:
        json.dump(engine_outputs, f, indent=2)

    print(f"Generated outputs for {len(engine_outputs)} posts")
