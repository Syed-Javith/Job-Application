import numpy as np
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import MultiLabelBinarizer, OneHotEncoder
from sklearn.preprocessing import MinMaxScaler
from utils import haversine, get_lat_lon,generate_recommendations
from pymongo import MongoClient
from sklearn.feature_extraction.text import CountVectorizer

def recommend_jobs(current_user='66090c577048d5d007b0261b'):
    client = MongoClient('mongodb://localhost:27017/')  
    db = client['job-db']  

    collection = db['users'] 
    cursor = collection.find({}) 
    df = pd.DataFrame(list(cursor))
    df.to_csv('users.csv', index=False)

    collection = db['jobposts'] 
    cursor = collection.find({}) 
    df = pd.DataFrame(list(cursor))
    df.to_csv('jobposts.csv', index=False)
    client.close()

    users = pd.read_csv('users.csv')
    job_posts = pd.read_csv('jobposts.csv')

    # ////////// #
    users['skills'] = users['skills'].apply(lambda x: eval(x))
    job_posts['skillsRequired'] = job_posts['skillsRequired'].apply(lambda x: eval(x))

    mlb = MultiLabelBinarizer()
    user_skills_encoded = pd.DataFrame(mlb.fit_transform(users['skills']), columns=mlb.classes_, index=users.index)
    job_post_skills_encoded = pd.DataFrame(mlb.transform(job_posts['skillsRequired']), columns=mlb.classes_, index=job_posts.index)

    # ////////// #

    similarity_matrix= cosine_similarity(user_skills_encoded, job_post_skills_encoded)


    job_posts['lat'] = job_posts['location'].apply(lambda x : get_lat_lon(x)[0])
    job_posts['lon'] = job_posts['location'].apply(lambda x : get_lat_lon(x)[1])

    user_lat , user_lon = get_lat_lon(users[users[ '_id' ] == current_user]['location'].values[0])

    scaler = MinMaxScaler()
    job_posts['distance'] = job_posts.apply(lambda x: haversine(user_lat, user_lon, x['lat'], x['lon']), axis=1)
    job_posts['distance'] = scaler.fit_transform(job_posts['distance'].values.reshape(-1, 1))

    job_posts = job_posts.sort_values(by='distance')

    recommendations = generate_recommendations(similarity_matrix, job_posts, current_user, users)
    recommend_jobs_id_list = []
    for user_id, recommended_job_posts in recommendations.items():
        print(f"Recommended job postings for user {user_id}:")
        for job_post_id, job_post_title in recommended_job_posts:
            print(f"{job_post_id}: {job_post_title}")
            recommend_jobs_id_list.append(job_post_id)
    return recommend_jobs_id_list
recommend_jobs()

# '6607bb049555c10badf7e468'