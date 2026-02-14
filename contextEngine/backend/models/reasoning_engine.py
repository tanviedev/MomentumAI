def generate_reasoning(row: dict):
    reasons = []
    actions = []

    engagement_intensity = float(row.get("engagement_intensity", 0))
    conversation_ratio = float(row.get("conversation_ratio", 0))
    save_intent_score = float(row.get("save_intent_score", 0))
    shareability_score = float(row.get("shareability_score", 0))

    if engagement_intensity > 0.4 and conversation_ratio < 0.1:
        reasons.append("Strong emotional hook but weak CTA")
        actions.append("Add a clearer call-to-action")

    if save_intent_score > shareability_score:
        reasons.append("Content valued but not shareable")
        actions.append("Make takeaway more explicit or visual")

    return {
        "success_driver": reasons[0] if reasons else "Baseline engagement",
        "recommendations": actions or ["Experiment with hook and CTA"]
    }

def generate_hint(row: dict):
    save_intent = float(row.get("save_intent_score", 0))
    shareability = float(row.get("shareability_score", 0))
    conversation = float(row.get("conversation_ratio", 0))

    if save_intent > shareability:
        return "Low shareability"

    if conversation < 0.1:
        return "Weak CTA"

    return "Needs optimization"
