# 🤖 Chatbot Project Structure

## 📁 Organized Folder Layout

```
Chatbot/
├── 🤖 chatbot.py                    # Main chatbot application
├── 📁 models/                       # Trained models and tokenizers
│   ├── chatbot_merged_final.h5      # Final merged model (14MB)
│   ├── chatbot_optimized_fixed.h5   # Best trained model (14MB)
│   └── tokenizer.pkl                # Tokenizer for text processing (62MB)
├── 📁 data/                         # Training and test data
│   ├── train.from                   # Training input data (279MB)
│   ├── train.to                     # Training output data (255MB)
│   ├── test.from                    # Test input data (851KB)
│   ├── test.to                      # Test output data (993KB)
│   ├── 2008-01.db                   # Database files
│   ├── 2008-05.db
│   ├── 2015-01.db                   # Large database (2.2GB)
│   └── 2015-05.db
├── 📁 training/                     # Training scripts
│   └── train_fixed.py               # Optimized training script
├── 📁 docs/                         # Documentation
│   ├── README.md                    # Main project documentation
│   ├── PROJECT_EXPLAINED.md         # Detailed project explanation
│   └── README_Progress.md           # Progress tracking
├── 📁 scripts/                      # Configuration and utilities
│   ├── requirements.txt             # Python dependencies
│   └── intents.json                 # Intent definitions (5MB)
├── 📁 reddit_data/                  # Reddit data collection
├── 📁 model/                        # Additional model files
├── 📁 venv/                         # Virtual environment
└── 📁 .venv/                        # Alternative virtual environment
```

## 🚀 How to Use

### 1. **Run the Chatbot**
```bash
python chatbot.py
```

### 2. **Retrain the Model**
```bash
cd training
python train_fixed.py
```

### 3. **Access Documentation**
- Check `docs/README.md` for setup instructions
- Check `docs/PROJECT_EXPLAINED.md` for technical details
- Check `docs/README_Progress.md` for development progress

## 📊 Model Information

- **Best Model:** `models/chatbot_merged_final.h5`
- **Training Accuracy:** 64.98%
- **Validation Accuracy:** 60.95%
- **Vocabulary Size:** 32,433 words
- **Architecture:** LSTM-based sequence-to-sequence

## 🎯 Key Features

✅ **Organized Structure:** Clean folder organization
✅ **Optimized Training:** Best hyperparameters for learning
✅ **Neural Responses:** Pure neural network responses (no predefined rules)
✅ **Easy Deployment:** Simple main script for running
✅ **Complete Documentation:** Detailed project documentation

## 🔧 Technical Details

- **Framework:** TensorFlow/Keras
- **Architecture:** LSTM with Embedding layers
- **Data Processing:** Custom tokenization and text cleaning
- **Training:** Optimized hyperparameters for better learning
- **Response Generation:** Neural network predictions only

## 📈 Performance

- **Training Time:** ~27 seconds per epoch
- **Model Size:** 14MB (optimized)
- **Memory Usage:** Efficient for deployment
- **Response Quality:** Neural network generated responses

This organized structure makes the project easy to maintain, understand, and deploy! 🎉 