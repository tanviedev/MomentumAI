from engine.rules import performance_status, hook_strength, fatigue_level

def run_base_engine(content_id, data):
    perf = data["performance"].get(content_id, {})
    rel = data["relative"].get(content_id, {})
    hist = data["history"].get(content_id, {})
    qual = data["qualitative"].get(content_id, {})
    intent = data["intent"].get(content_id, {})
    temporal = data["temporal"].get(content_id, {})

    impressions = max(perf.get("impressions", 1), 1)

    likes = perf.get("likes", 0)
    comments = perf.get("comments", 0)
    shares = perf.get("shares", 0)
    saves = perf.get("saves", 0)

    total_engagement = likes + comments + shares + saves
    engagement_rate = total_engagement / impressions
    save_rate = saves / impressions
    share_rate = shares / impressions

    dominant_engagement = max(
        ["likes", "comments", "shares", "saves"],
        key=lambda x: perf.get(x, 0)
    )

    perf_status = performance_status(rel.get("performance_vs_avg", 1))

    content_value = (
        "educational" if save_rate > 0.02 else
        "viral" if share_rate > 0.015 else
        "discussion" if dominant_engagement == "comments" else
        "inspirational" if dominant_engagement == "likes" else
        "weak"
    )

    hook = hook_strength(
        perf.get("dropoff_rate"),
        rel.get("engagement_velocity")
    )

    fatigue = fatigue_level(
        hist.get("topic_fatigue_score", 0),
        hist.get("similar_past_posts", 0)
    )

    intent_match = (
        "misaligned"
        if qual.get("comment_sentiment") in ["negative", "mixed"]
        and intent.get("emotional_intent") == "inspire"
        else "aligned"
    )

    # Timing
    timing_quality = "average"
    posting_dt = temporal.get("posting_datetime")

    if posting_dt:
        posted_hour = int(posting_dt.split("T")[1][:2])
        for slot in hist.get("best_time_slots", []):
            start, end = slot.split("-")
            if int(start[:2]) <= posted_hour < int(end[:2]):
                timing_quality = "good"
                break

    return {
        "content_id": content_id,
        "performance_status": perf_status,
        "engagement_profile": {
            "engagement_rate": round(engagement_rate, 4),
            "save_rate": round(save_rate, 4),
            "share_rate": round(share_rate, 4),
            "dominant_engagement": dominant_engagement
        },
        "content_value_type": content_value,
        "hook_analysis": {
            "hook_strength": hook,
            "dropoff_flag": bool(perf.get("dropoff_rate") and perf.get("dropoff_rate") > 0.4)
        },
        "topic_health": {
            "fatigue_level": fatigue,
            "overposting_flag": hist.get("similar_past_posts", 0) > 6
        },
        "audience_alignment": {
            "intent_match": intent_match,
            "comment_sentiment": qual.get("comment_sentiment", "unknown")
        },
        "distribution_health": {
            "timing_quality": timing_quality,
            "decay_pattern": rel.get("decay_rate", "unknown")
        }
    }
