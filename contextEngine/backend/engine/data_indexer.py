def index_by_content_id(data_list):
    """
    Converts a list of objects into a dictionary:
    {
        content_id: full_object
    }
    """
    index = {}
    for item in data_list:
        index[item["content_id"]] = item
    return index
