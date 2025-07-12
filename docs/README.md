# Catbot: Advanced Neural Network Chatbot

## Overview
This project implements a sophisticated sequence-to-sequence chatbot using TensorFlow/Keras, trained on Reddit conversation data. The model features bidirectional LSTM layers, advanced preprocessing, and intelligent response generation.

## 🚀 Key Features

### **Enhanced Model Architecture**
- **Bidirectional LSTM Layers**: Better context understanding
- **Time-Distributed Dense Layers**: Proper sequence-to-sequence output
- **Advanced Regularization**: Dropout, BatchNormalization, and L2 regularization
- **Optimized Training**: Early stopping, learning rate scheduling, gradient clipping

### **Smart Data Processing**
- **Large Dataset**: Up to 10M training samples for comprehensive learning
- **Intelligent Filtering**: Removes very short/long sequences for quality
- **Essential Vocabulary**: Guarantees important words are included
- **Clean Preprocessing**: Text normalization and cleaning

### **Improved Response Generation**
- **Temperature Sampling**: More diverse and natural responses
- **Top-K Sampling**: Better word selection from top predictions
- **Smart Word Filtering**: Balances content words with joining words
- **Repetition Prevention**: Avoids duplicate words in responses

## 📊 Model Specifications

### **Training Parameters**
- **Vocabulary Size**: 15,000 words (increased coverage)
- **Sequence Length**: 25 tokens (more context)
- **Embedding Dimensions**: 96 (better word representations)
- **Batch Size**: 256 (optimized for stability)
- **Training Samples**: 10M (massive dataset)
- **Validation Samples**: 250K (comprehensive evaluation)

### **Architecture Details**
```
Input → Embedding(96) → Bidirectional LSTM(256) → Bidirectional LSTM(128) 
→ LSTM(64) → LSTM(32) → TimeDistributed Dense(128) → TimeDistributed Dense(64) 
→ TimeDistributed Dense(vocab_size)
```

## 🛠️ Usage

### **Training**
```bash
cd training
python train_fixed.py
```

### **Chatting**
```bash
python chatbot_infer.py
```

### **Model Files**
- **Model**: `models/Catbot_compile.h5`
- **Tokenizer**: `models/tokenizer.pkl`

## 📈 Performance Metrics

### **Loss Function**: Sparse Categorical Crossentropy
Optimized for multi-class word prediction with integer targets.

### **Accuracy Metric**
Measures token-level prediction accuracy across sequences.

### **Training Features**
- **Early Stopping**: Prevents overfitting with patience=12
- **Learning Rate Scheduling**: Adaptive reduction based on validation accuracy
- **Gradient Clipping**: Prevents exploding gradients (clipnorm=1.0)

## 🔧 Technical Improvements

### **Data Quality**
- **Score Filtering**: Only high-quality Reddit comments (score ≥ 2)
- **Length Filtering**: 2-15 words per sequence for optimal training
- **Text Cleaning**: Lowercase, whitespace normalization, special character removal

### **Model Optimization**
- **Bidirectional Processing**: Captures context from both directions
- **Batch Normalization**: Stabilizes training across layers
- **Regularization**: Prevents overfitting with dropout and L2 penalties
- **Optimized Sampling**: Top-k + temperature for better response diversity

## 🎯 Response Quality

### **Natural Language Features**
- **Joining Words**: Includes essential connectors (is, and, for, to, etc.)
- **Content Words**: Prioritizes meaningful vocabulary
- **Grammar Awareness**: Smart word selection for coherent sentences
- **Length Control**: 6-10 words per response for optimal readability

### **Sampling Strategy**
- **Temperature**: 0.8 for balanced creativity/coherence
- **Top-K**: Samples from top 10 predictions for quality
- **Repetition Control**: Prevents duplicate words in responses

## 📁 Project Structure
```
Chatbot/
├── training/
│   └── train_fixed.py          # Enhanced training script
├── models/
│   ├── Catbot_compile.h5       # Trained model
│   └── tokenizer.pkl           # Word tokenizer
├── data/
│   ├── train.from              # Training inputs
│   ├── train.to                # Training outputs
│   ├── test.from               # Validation inputs
│   └── test.to                 # Validation outputs
├── chatbot_infer.py            # Interactive chat interface
└── docs/                       # Documentation
```

## 🚀 Getting Started

1. **Install Dependencies**: `pip install tensorflow numpy pickle`
2. **Prepare Data**: Ensure training files are in `data/` directory
3. **Train Model**: Run `python training/train_fixed.py`
4. **Start Chatting**: Run `python chatbot_infer.py`

## 🔮 Future Enhancements

- **Transformer Architecture**: Upgrade to modern attention-based models
- **Multi-turn Conversations**: Support for conversation history
- **Intent Recognition**: Hybrid approach with predefined responses
- **Web Interface**: User-friendly chat interface
- **Model Fine-tuning**: Domain-specific adaptation

---

*This chatbot represents a significant advancement in neural network-based conversation systems, combining large-scale data training with sophisticated architecture for natural language generation.*
