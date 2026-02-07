from engine.loader import load_json
from engine.data_indexer import index_by_content_id

def load_all():
    return {
        "metadata": index_by_content_id(load_json("data/content_metadata.json")),
        "intent": index_by_content_id(load_json("data/contextual_intent.json")),
        "temporal": index_by_content_id(load_json("data/temporal_distribution.json")),
        "performance": index_by_content_id(load_json("data/performance_metrics.json")),
        "relative": index_by_content_id(load_json("data/relative_performance.json")),
        "history": index_by_content_id(load_json("data/historical_memory.json")),
        "qualitative": index_by_content_id(load_json("data/qualitative_signals.json"))
    }
