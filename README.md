# Catbot - Neural Network Chatbot

A neural network-based conversational AI trained on Reddit data, featuring a modern web interface with Next.js frontend and Flask backend.

## 🚀 Features

- **Neural Network Model**: Bidirectional LSTM with attention mechanism
- **Modern Web Interface**: Next.js frontend with Tailwind CSS
- **Flask Backend**: RESTful API for model inference
- **Real-time Chat**: WebSocket support for live conversations
- **Responsive Design**: Mobile-friendly chat interface

## 📁 Project Structure

```
Chatbot/
├── app/                    # Next.js app directory
├── components/             # React components
│   └── ui/                # Shadcn/ui components
├── lib/                   # Utility functions
├── public/                # Static assets
├── styles/                # CSS styles
├── templates/             # Flask templates
├── training/              # Training scripts
├── data/                  # Training data (not in repo)
├── models/                # Model files (not in repo)
├── app.py                 # Flask backend
├── chatbot_infer.py       # Model inference
└── requirements_web.txt   # Python dependencies
```

## 🛠️ Setup Instructions

### Prerequisites

- Python 3.8+
- Node.js 18+
- npm or pnpm

### 1. Clone the Repository

```bash
git clone https://github.com/PranavJorvekar/Neurodit.git
cd Neurodit
```

### 2. Download Model Files

**⚠️ Important**: The model files are too large for GitHub. Download them from external storage:

#### Option A: Google Drive
- [Download Model Files](https://drive.google.com/drive/folders/YOUR_FOLDER_ID)
- Extract to `models/` directory

#### Option B: Hugging Face Hub
```bash
# Install huggingface_hub
pip install huggingface_hub

# Download model files
huggingface-cli download YOUR_USERNAME/YOUR_MODEL_REPO --local-dir ./models
```

#### Option C: Direct Download Links
- [chatbot_merged_final.h5](YOUR_DOWNLOAD_LINK)
- [tokenizer.pkl](YOUR_DOWNLOAD_LINK)

### 3. Setup Python Backend

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements_web.txt

# Additional dependencies for model inference
pip install tensorflow keras h5py numpy
```

### 4. Setup Next.js Frontend

```bash
# Install dependencies
npm install

# Build the project
npm run build
```

## 🚀 Running the Application

### Development Mode

1. **Start Flask Backend**:
```bash
python app.py
```
Backend will run on: http://localhost:5000

2. **Start Next.js Frontend**:
```bash
npm run dev
```
Frontend will run on: http://localhost:3000

### Production Mode

1. **Build Frontend**:
```bash
npm run build
```

2. **Start Production Server**:
```bash
npm start
```

## 📊 Model Information

- **Architecture**: Bidirectional LSTM with attention
- **Vocabulary Size**: 50,000 tokens
- **Sequence Length**: 100 tokens
- **Training Data**: Reddit conversations (2008-2015)
- **Model Size**: ~500MB

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
FLASK_ENV=production
MODEL_PATH=./models/chatbot_merged_final.h5
TOKENIZER_PATH=./models/tokenizer.pkl
```

### Model Parameters

You can adjust model parameters in `chatbot_infer.py`:

```python
MAX_SEQUENCE_LENGTH = 100
TEMPERATURE = 0.8
TOP_K = 50
```

## 🌐 Deployment

### Vercel (Frontend)

1. Connect your GitHub repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `.next`
4. Deploy

### Railway/Heroku (Backend)

1. Create `Procfile`:
```
web: python app.py
```

2. Set environment variables in your deployment platform
3. Deploy the Flask app

### Docker Deployment

```dockerfile
FROM python:3.9-slim

WORKDIR /app
COPY requirements_web.txt .
RUN pip install -r requirements_web.txt

COPY . .
EXPOSE 5000

CMD ["python", "app.py"]
```

## 📝 API Endpoints

### POST /api/chat
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
  "response": "I'm doing well, thank you for asking! How about you?",
  "confidence": 0.85
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Reddit for providing the training data
- TensorFlow/Keras for the neural network framework
- Next.js and React for the frontend framework
- Flask for the backend API

## 📞 Support

If you encounter any issues:

1. Check the [Issues](https://github.com/PranavJorvekar/Neurodit/issues) page
2. Create a new issue with detailed information
3. Include error messages and system information

---

**Note**: Make sure to download the model files before running the application. The model files are not included in the repository due to size limitations. 