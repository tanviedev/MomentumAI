def generate_insight(row: dict, reasoning: dict):
    engagement_rate = float(row.get("engagement_rate", 0))

    return {
        "content_id": str(row.get("content_id")),
        "performance": str(row.get("performance_label")),
        "success_driver": str(reasoning["success_driver"]),
        "recommendations": list(reasoning["recommendations"]),
        "confidence": float(min(engagement_rate, 1.0) * 100)
    }
