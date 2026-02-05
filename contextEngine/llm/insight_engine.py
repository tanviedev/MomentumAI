import json
from llm.prompt_templates import insight_prompt
from llm.ollama_client import query_ollama

def generate_insight(engine_output):
    prompt = insight_prompt(json.dumps(engine_output, indent=2))
    raw_response = query_ollama(prompt)

    try:
        return json.loads(raw_response)
    except json.JSONDecodeError:
        return {
            "content_id": engine_output["content_id"],
            "verdict": "error",
            "primary_reason": "LLM output invalid JSON",
            "raw_response": raw_response
        }
