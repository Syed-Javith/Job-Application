from math import radians, cos, sin, asin, sqrt
from geopy.geocoders import Nominatim

def haversine(lon1, lat1, lon2, lat2):
    """
    Calculate the great circle distance in kilometers between two points 
    on the earth (specified in decimal degrees)
    """
    lon1, lat1, lon2, lat2 = map(radians, [lon1, lat1, lon2, lat2])

    dlon = lon2 - lon1 
    dlat = lat2 - lat1 
    a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlon/2)**2
    c = 2 * asin(sqrt(a)) 
    r = 6371 
    return c * r

def get_lat_lon(place):
  geolocator = Nominatim(user_agent="MyApp")
  location = geolocator.geocode(place)
  return (location.latitude , location.longitude)

def generate_recommendations(similarity_matrix, job_posts, current_user, users):
    job_post_ids = job_posts['_id']
    job_post_titles = job_posts['title']  
    recommendations = {}

    user_recommendations = {}
    top_job_posts_indices = similarity_matrix[0].argsort()[-5:][::-1]  
    top_job_posts_ids = [job_post_ids[j] for j in top_job_posts_indices]
    top_job_post_titles = [job_post_titles[j] for j in top_job_posts_indices]  
    user_recommendations[current_user] = list(zip(top_job_posts_ids, top_job_post_titles)) 
    recommendations.update(user_recommendations)

    return recommendations