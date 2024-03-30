from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)

# Load the trained model
model = joblib.load('model.pkl')

@app.route('/predict', methods=['GET'])
def get_prediction():
    return jsonify({'message': "Hello" })

@app.route('/predict', methods=['POST'])
def post_prediction():
    # Get the input data from the request
    data = request.json
    
    # Ensure the input data is a 1D array
    feature = np.array(data['feature']).reshape(1, -1)
    
    # Perform prediction using the loaded model
    prediction = model.predict(feature)
    
    # Return the prediction as JSON response
    return jsonify({'prediction': prediction.tolist()})

if __name__ == '__main__':
    app.run(debug=True)
