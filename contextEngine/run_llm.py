import json
from backend.engine.load_all_data import load_all
from backend.engine.base_engine import run_base_engine
from backend.llm.insight_engine import generate_insight

TEST_CONTENT_IDS = ["cnt_002"]  # add more later


def run_llm():
    data = load_all()
    results = []

    for cid in TEST_CONTENT_IDS:
        if cid not in data["performance"]:
            print(f"Skipping missing content_id: {cid}")
            continue

        base_output = run_base_engine(cid, data)
        insight = generate_insight(base_output)
        results.append(insight)

    return results


if __name__ == "__main__":
    llm_results = run_llm()

    with open("outputs/llm_insights.json", "w") as f:
        json.dump(llm_results, f, indent=2)

    print(f"LLM insights generated for {len(llm_results)} posts")
