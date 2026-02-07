#engine/rules.py 

def performance_status(perf_vs_avg):
    if perf_vs_avg < 0.8:
        return "underperforming"
    elif perf_vs_avg <= 1.2:
        return "average"
    else:
        return "outperforming"


def hook_strength(dropoff_rate, velocity):
    if dropoff_rate and dropoff_rate > 0.4:
        return "weak"
    if velocity == "fast":
        return "strong"
    return "medium"


def fatigue_level(score, similar_posts):
    if score > 0.5 or similar_posts > 6:
        return "high"
    if score > 0.3:
        return "medium"
    return "low"
