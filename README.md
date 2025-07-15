# Catbot - Neural Network Chatbot (Backend Only)

A neural network-based conversational AI trained on Reddit data, featuring a Flask backend for model inference and a simple web chat interface.

## 🚀 Features

- **Neural Network Model**: Bidirectional LSTM with attention mechanism
- **Flask Backend**: RESTful API for model inference
- **Web Chat Interface**: Simple, modern chat UI at `/webchat`
- **Easy Deployment**: Run everything with Python and Flask

## 📁 Project Structure

```
Chatbot/
├── app.py                 # Flask backend (serves API and web interface)
├── chatbot_infer.py       # Model inference script (CLI)
├── models/                # Model files (not in repo)
│   ├── chatbot_compile.h5 # Trained model
│   └── tokenizer.pkl      # Tokenizer
├── data/                  # Training/test data
├── training/              # Training scripts
├── templates/             # Flask HTML templates (chat.html)
├── requirements_web.txt   # Python dependencies
├── docs/                  # Documentation
└── ...
```

## 🛠️ Setup Instructions

### Prerequisites
- Python 3.8+

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd Chatbot
```

### 2. Download Model Files
- Place your trained model as `models/chatbot_compile.h5`
- Place your tokenizer as `models/tokenizer.pkl`

### 3. Setup Python Backend
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements_web.txt
```

## 🚀 Running the Application

### 1. **Start Flask Backend**
```bash
python app.py
```
- Backend will run on: http://localhost:5000

### 2. **Access the Web Chat Interface**
- Open your browser and go to: [http://localhost:5000/webchat](http://localhost:5000/webchat)

## 📝 API Endpoints

### POST /chat
Send a message to the chatbot.

**Request**:
```json
{
  "message": "Hello, how are you?"
}
```
**Response**:
```json
{
  "response": "I'm doing well, thank you for asking! How about you?"
}
```

## 🧠 Model Information
- **Architecture**: Bidirectional LSTM with attention
- **Training Data**: Reddit conversations (2008-2015)
- **Model File**: `models/chatbot_compile.h5`
- **Tokenizer**: `models/tokenizer.pkl`

## 🛠️ Development & Training
- See `training/` for scripts to retrain the model
- See `chatbot_infer.py` for CLI-based chat

## 📄 Documentation
- See `docs/` for detailed explanations, dataset info, and progress

## 📣 Support
If you encounter any issues:
1. Check the [Issues] page (if using GitHub)
2. Create a new issue with detailed information
3. Include error messages and system information

---
**Note**: Make sure to download the model files before running the application. The model files are not included in the repository due to size limitations. 