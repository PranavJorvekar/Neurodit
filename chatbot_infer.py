import os
import warnings
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
warnings.filterwarnings('ignore')

import tensorflow as tf
import pickle
import numpy as np
import re
from tensorflow.keras.preprocessing.sequence import pad_sequences

def clean_text(text):
    text = text.lower()
    text = re.sub(r'\s+', ' ', text)
    text = re.sub(r'[^a-zA-Z0-9\s.,!?]', '', text)
    return text.strip()

def load_model_and_tokenizer():
    try:
        model = tf.keras.models.load_model('models/chatbot_compile.h5')
        with open('models/tokenizer.pkl', 'rb') as f:
            tokenizer = pickle.load(f)
        return model, tokenizer
    except Exception as e:
        print(f"❌ Error loading model/tokenizer: {e}")
        return None, None

def generate_response(model, tokenizer, input_text, max_length=20):
    try:
        cleaned_input = clean_text(input_text)
        input_seq = tokenizer.texts_to_sequences([cleaned_input])
        input_padded = pad_sequences(input_seq, maxlen=max_length, padding='post', truncating='post')
        prediction = model.predict(input_padded, verbose=0)
        
        # Use temperature sampling instead of argmax for more diverse outputs
        temperature = 0.8
        prediction = prediction / temperature
        prediction = np.exp(prediction) / np.sum(np.exp(prediction), axis=-1, keepdims=True)
        
        # Sample from the distribution instead of taking argmax
        predicted_indices = []
        for i in range(prediction.shape[1]):
            if i < len(prediction[0]):
                # Sample from the probability distribution
                sampled_idx = np.random.choice(len(prediction[0][i]), p=prediction[0][i])
                predicted_indices.append(sampled_idx)
        
        index_word = {index: word for word, index in tokenizer.word_index.items()}
        
        # Filter out joining words and focus on content words
        joining_words = {'is', 'are', 'was', 'were', 'be', 'been', 'being', 'and', 'or', 'but', 'if', 'then', 'else', 'when', 'the', 'a', 'an', 'this', 'that', 'these', 'those', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'from', 'up', 'down', 'out', 'off', 'over', 'under', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them', 'my', 'your', 'his', 'her', 'its', 'our', 'their', 'am', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'can', 'could', 'should', 'may', 'might', 'not', 'very', 'really', 'quite', 'so'}
        
        response_words = []
        used_words = set()  # Prevent repetition
        
        for idx in predicted_indices:
            if idx != 0:  # Skip padding
                word = index_word.get(idx)
                if word and word != '<UNK>' and word != 'unk' and word not in used_words and word.lower() not in joining_words:
                    response_words.append(word)
                    used_words.add(word)
                    # Limit response length to prevent infinite loops
                    if len(response_words) >= 6:
                        break
        
        response = ' '.join(response_words)
        if not response or response.strip() == '' or response == 'the the the':
            return "I'm still learning to respond properly."
        return response
    except Exception as e:
        return f"Error: {e}"

def main():
    print("🤖 Chatbot Inference Mode (Neural Network Only)")
    print("Type 'quit' to exit.")
    model, tokenizer = load_model_and_tokenizer()
    if model is None or tokenizer is None:
        return
    while True:
        user_input = input("You: ").strip()
        if user_input.lower() in ['quit', 'exit', 'bye']:
            print("Chatbot: Goodbye!")
            break
        if not user_input:
            print("Chatbot: Please say something!")
            continue
        response = generate_response(model, tokenizer, user_input)
        print(f"Chatbot: {response}")

if __name__ == '__main__':
    main() 