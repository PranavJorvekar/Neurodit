# Catbot - AI Chatbot by Pranav Jorvekar

An advanced AI chatbot trained on Reddit conversations, built with React frontend and Flask backend.

## 🚀 Features

- **AI-Powered Chat**: Real-time conversations with a deep learning model
- **Modern UI**: Beautiful React interface with shadcn/ui components
- **Full-Stack**: Flask backend with TensorFlow/Keras AI model
- **Automated Setup**: Single npm command to start everything
- **Development & Production**: Both modes supported

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **shadcn/ui** for beautiful components
- **Tailwind CSS** for styling

### Backend
- **Flask** web framework
- **TensorFlow/Keras** for AI model
- **Python** with NumPy for data processing

### AI Model
- **Deep Learning**: LSTM-based sequence model
- **Training Data**: Reddit conversations (2008-2015)
- **Response Generation**: Temperature sampling with top-k selection

## 📦 Quick Start

### Prerequisites
- **Node.js & npm** - [Install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- **Python 3.8+** with pip
- **TensorFlow** and other Python dependencies

### Installation

1. **Clone the repository**
   ```bash
   git clone <YOUR_GIT_URL>
   cd Chatbot
   ```

2. **Install dependencies**
   ```bash
   # Frontend dependencies
   npm install
   
   # Backend dependencies (if requirements.txt exists)
   pip install -r requirements.txt
   ```

3. **Start the application**
   ```bash
   # Development mode (frontend + backend)
   npm run start:dev
   
   # Production mode (built frontend + backend)
   npm run start
   ```

4. **Open your browser**
   - Development: [http://localhost:8082](http://localhost:8082) (or port shown in terminal)
   - Production: [http://localhost:5000](http://localhost:5000)

## 🎯 Available Commands

```bash
# Development
npm run start:dev    # Start both frontend and backend
npm run dev          # Frontend only (Vite dev server)
npm run backend:dev  # Backend only (Flask with debug)

# Production
npm run start        # Build frontend + start backend
npm run build        # Build frontend only
npm run backend      # Backend only (production mode)

# Utilities
npm run lint         # Run ESLint
npm run preview      # Preview built frontend
```

## 🏗️ Project Structure

```
Chatbot/
├── src/                    # React frontend source
│   ├── components/         # React components
│   │   ├── CatbotInterface.tsx  # Main chat interface
│   │   └── ui/            # shadcn/ui components
│   ├── pages/             # Page components
│   ├── lib/               # Utilities
│   └── main.tsx           # App entry point
├── models/                # AI model files
│   ├── chatbot_compile.h5 # Trained model
│   └── tokenizer.pkl      # Text tokenizer
├── static/                # Static assets
│   └── dist/              # Built frontend (auto-copied)
├── app.py                 # Flask backend
├── start_web.py           # Backend launcher
├── index.html             # Frontend entry point
└── package.json           # NPM scripts and dependencies
```

## 🤖 AI Model Details

- **Architecture**: Bidirectional LSTM → LSTM → Dense layers
- **Training**: 10M+ Reddit comments with score ≥ 2
- **Vocabulary**: Optimized with frequency filtering
- **Response Generation**: Temperature sampling (0.8) with top-k (10)
- **Performance**: 67.3% validation accuracy

## 🔧 Development

### Frontend Development
- Hot reload with Vite
- TypeScript for type safety
- shadcn/ui component library
- Tailwind CSS for styling

### Backend Development
- Flask debug mode for development
- API endpoints: `/chat`, `/status`
- Automatic model loading
- Error handling and logging

### API Endpoints

- `POST /chat` - Send message, get AI response
- `GET /status` - Check model loading status
- `GET /` - Serve frontend application

## 🚀 Deployment

### Local Production
```bash
npm run start
```

### Cloud Deployment
1. Build the frontend: `npm run build`
2. Deploy Flask backend to your preferred platform
3. Ensure model files are accessible
4. Configure environment variables if needed

## 📚 Documentation

- [Dataset Documentation](docs/DATASET_DOCUMENTATION.md) - Training data details
- [Project Explained](docs/PROJECT_EXPLAINED.md) - Technical architecture
- [Progress Log](docs/README_Progress.md) - Development history

## 👨‍💻 Author

**Pranav Jorvekar** - AI enthusiast and developer

## 📄 License

This project is for educational and demonstration purposes.

---

**Happy chatting with Catbot! 🤖✨**
