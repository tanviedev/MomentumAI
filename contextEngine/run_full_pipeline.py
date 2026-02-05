import json
from run_all import run_for_all
from llm.insight_engine import generate_insight

base_outputs = run_for_all()
llm_results = []

for output in base_outputs:
    insight = generate_insight(output)
    llm_results.append(insight)

with open("outputs/llm_insights.json", "w") as f:
    json.dump(llm_results, f, indent=2)

print("LLM insights generated successfully.")
