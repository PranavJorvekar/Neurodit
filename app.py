from flask import Flask, render_template, request, jsonify, send_from_directory
import os
import warnings
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
warnings.filterwarnings('ignore')

import tensorflow as tf
import pickle
import numpy as np
import re

app = Flask(__name__, static_folder='static', static_url_path='/static')

# Global variables for model and tokenizer
model = None
tokenizer = None

def clean_text(text):
    """Clean and normalize text"""
    text = text.lower()
    text = re.sub(r'\s+', ' ', text)
    text = re.sub(r'[^a-zA-Z0-9\s.,!?]', '', text)
    return text.strip()

def load_model_and_tokenizer():
    """Load the trained model and tokenizer"""
    global model, tokenizer
    try:
        print("Attempting to load model...")
        model = tf.keras.models.load_model('models/chatbot_compile.h5')
        print("Model loaded successfully")
        
        print("Attempting to load tokenizer...")
        with open('models/tokenizer.pkl', 'rb') as f:
            tokenizer = pickle.load(f)
        print("Tokenizer loaded successfully")
        
        return True
    except Exception as e:
        print(f"Error loading model/tokenizer: {e}")
        print(f"Error type: {type(e).__name__}")
        import traceback
        traceback.print_exc()
        return False

# Load model when app is created
print("Loading Catbot model...")
if load_model_and_tokenizer():
    print("Model loaded successfully!")
else:
    print("Failed to load model!")

def generate_response(input_text, max_length=20):
    """Generate chatbot response"""
    try:
        if model is None or tokenizer is None:
            return "Sorry, the model is not loaded properly."
        
        cleaned_input = clean_text(input_text)
        input_seq = tokenizer.texts_to_sequences([cleaned_input])
        input_padded = tf.keras.preprocessing.sequence.pad_sequences(input_seq, maxlen=max_length, padding='post', truncating='post')
        prediction = model.predict(input_padded, verbose=0)
        
        # Use temperature sampling for more diverse outputs
        temperature = 0.8
        prediction = prediction / temperature
        prediction = np.exp(prediction) / np.sum(np.exp(prediction), axis=-1, keepdims=True)
        
        # Generate response word by word with better sampling
        predicted_indices = []
        for i in range(prediction.shape[1]):
            if i < len(prediction[0]):
                # Get top-k predictions and sample from them
                top_k = 10
                top_indices = np.argsort(prediction[0][i])[-top_k:]
                top_probs = prediction[0][i][top_indices]
                top_probs = top_probs / np.sum(top_probs)  # Renormalize
                
                # Sample from top-k
                sampled_idx = np.random.choice(top_indices, p=top_probs)
                predicted_indices.append(sampled_idx)
        
        index_word = {index: word for word, index in tokenizer.word_index.items()}
        
        # Define joining words that should be used less frequently
        joining_words = {'is', 'are', 'was', 'were', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'from', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'am', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'can', 'could', 'should', 'may', 'might'}
        
        # Define filler words to avoid
        filler_words = {'the', 'a', 'an', 'very', 'really', 'quite', 'so', 'just', 'only', 'even', 'still', 'also', 'too', 'as', 'like', 'such', 'much', 'many', 'few', 'some', 'any', 'all', 'every', 'each', 'both', 'either', 'neither', 'other', 'another'}
        
        response_words = []
        used_words = set()  # Prevent repetition
        joining_word_count = 0  # Track joining word usage
        
        for idx in predicted_indices:
            if idx != 0:  # Skip padding
                word = index_word.get(idx)
                if word and word != '<UNK>' and word != 'unk' and word not in used_words:
                    word_lower = word.lower()
                    
                    # Check if it's a joining word
                    if word_lower in joining_words:
                        # Limit joining words to max 2 per response
                        if joining_word_count < 2:
                            response_words.append(word)
                            used_words.add(word)
                            joining_word_count += 1
                    # Check if it's a filler word
                    elif word_lower not in filler_words:
                        response_words.append(word)
                        used_words.add(word)
                    
                    # Limit response length
                    if len(response_words) >= 8:
                        break
        
        response = ' '.join(response_words)
        # Clean up special tokens
        response = re.sub(r'newlinechar|<OOV>', ' ', response).strip()
        response = re.sub(r'\s+', ' ', response)
        if not response or response.strip() == '' or len(response.split()) < 2:
            return "I'm still learning to respond properly."
        return response
        
    except Exception as e:
        return f"Sorry, I encountered an error: {str(e)}"

@app.route('/')
def index():
    # Serve the new SPA index.html from the project root
    return send_from_directory('.', 'index.html')

@app.route('/static/<path:filename>')
def static_files(filename):
    # Serve static files from the static directory
    return send_from_directory('static', filename)

@app.route('/webchat')
def webchat():
    # Optionally serve chat.html if still needed
    return send_from_directory('templates', 'chat.html')

@app.route('/chat', methods=['POST'])
def chat():
    """Handle chat requests"""
    try:
        data = request.get_json()
        user_message = data.get('message', '').strip()
        
        if not user_message:
            return jsonify({'response': 'Please enter a message.'})
        
        # Generate response
        bot_response = generate_response(user_message)
        
        return jsonify({'response': bot_response})
        
    except Exception as e:
        return jsonify({'response': f'Sorry, an error occurred: {str(e)}'})

@app.route('/status')
def status():
    """Check if model is loaded"""
    if model is not None and tokenizer is not None:
        return jsonify({'status': 'ready', 'message': 'Model loaded successfully'})
    else:
        return jsonify({'status': 'error', 'message': 'Model not loaded'})

if __name__ == '__main__':
    print("Starting web server...")
    app.run(debug=True, host='0.0.0.0', port=5000) 