# train_model_script.py

import numpy as np
from sklearn.linear_model import LinearRegression
import joblib  # For saving the trained model

# Sample data (replace this with your actual data)
X = np.array([[1], [2], [3], [4], [5]])
y = np.array([2, 4, 6, 8, 10])

# Define and train the model
model = LinearRegression()
model.fit(X, y)

# Save the trained model
joblib.dump(model, 'ML/model.pkl')