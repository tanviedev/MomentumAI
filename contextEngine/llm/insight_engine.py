import requests
import json
from pathlib import Path

OLLAMA_URL = "http://localhost:11434/api/chat"
MODEL_NAME = "phi"  # stable + fast on CPU

PROMPT_PATH = Path(__file__).parent / "prompt.txt"


def load_prompt() -> str:
    """Load system reasoning prompt from file"""
    with open(PROMPT_PATH, "r", encoding="utf-8") as f:
        return f.read()


def generate_insight(base_output: dict) -> dict:
    """
    Takes base engine output and returns structured LLM insight.
    Safe, deterministic, and beginner-proof.
    """

    # --- Extract signal-level data only ---
    signal = {
        "performance_status": base_output["performance_status"],
        "engagement_rate": base_output["engagement_profile"]["engagement_rate"],
        "save_rate": base_output["engagement_profile"]["save_rate"],
        "share_rate": base_output["engagement_profile"]["share_rate"],
        "dominant_engagement": base_output["engagement_profile"]["dominant_engagement"],
        "content_value_type": base_output["content_value_type"],
        "hook_strength": base_output["hook_analysis"]["hook_strength"],
        "fatigue_level": base_output["topic_health"]["fatigue_level"],
        "intent_match": base_output["audience_alignment"]["intent_match"],
        "timing_quality": base_output["distribution_health"]["timing_quality"],
        "decay_pattern": base_output["distribution_health"]["decay_pattern"]
    }

    system_prompt = load_prompt()

    messages = [
        {
            "role": "system",
            "content": system_prompt
        },
        {
            "role": "user",
            "content": f"Signals:\n{json.dumps(signal, indent=2)}"
        }
    ]

    payload = {
        "model": MODEL_NAME,
        "messages": messages,
        "stream": False,
        "options": {
            "temperature": 0.2,
            "num_predict": 120
        }
    }

    try:
        response = requests.post(
            OLLAMA_URL,
            json=payload,
            timeout=180
        )
        response.raise_for_status()

        raw = response.json()["message"]["content"]

        # --- Safe JSON parsing ---
        try:
            parsed = json.loads(raw)
        except json.JSONDecodeError:
            parsed = {
                "failure_reason": None,
                "success_driver": None,
                "recommended_actions": [],
                "confidence_score": 0.0,
                "raw_llm_output": raw
            }

        return {
            "content_id": base_output["content_id"],
            "llm_insight": parsed
        }

    except Exception as e:
        return {
            "content_id": base_output["content_id"],
            "error": str(e)
        }
