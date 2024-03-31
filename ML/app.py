from flask import Flask, request, jsonify
import joblib
import numpy as np
from model import recommend_jobs
app = Flask(__name__)

@app.route('/predict', methods=['GET'])
def get_prediction():
    return jsonify({'message': "Hello" })

@app.route('/predict', methods=['POST'])
def post_prediction():
    data = request.json
    current_user=data['user_id']
    current_user='6607bb049555c10badf7e468'
    recommendations=recommend_jobs(current_user)
    return jsonify({'jobs':  recommendations })

if __name__ == '__main__':
    app.run(debug=True)
