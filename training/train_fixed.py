import tensorflow as tf
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Embedding, LSTM, Dense, Dropout
from tensorflow.keras.callbacks import EarlyStopping, ReduceLROnPlateau
import numpy as np
import pickle
import random

# SCALED UP Parameters for enhanced performance
TRAIN_FROM = 'data/train.from'
TRAIN_TO = 'data/train.to'
TEST_FROM = 'data/test.from'
TEST_TO = 'data/test.to'
MAX_VOCAB_SIZE = 15000  # Increased vocabulary for better coverage
MAX_SEQUENCE_LENGTH = 25  # Longer sequences for more context
EMBEDDING_DIM = 96  # Larger embeddings for better representation
BATCH_SIZE = 256  # Larger batch size for better gradients
EPOCHS = 5  # More epochs for better convergence
TRAIN_LIMIT =10000000  # Much larger dataset for better learning
VAL_LIMIT = 250000

# Optimized learning rate for larger model
LEARNING_RATE = 0.001
MIN_LEARNING_RATE = 1e-7

# Read data from files with better preprocessing
def clean_text(text):
    """Clean and normalize text"""
    import re
    # Convert to lowercase
    text = text.lower()
    # Remove extra whitespace
    text = re.sub(r'\s+', ' ', text)
    # Remove special characters but keep basic punctuation
    text = re.sub(r'[^a-zA-Z0-9\s.,!?]', '', text)
    return text.strip()

def read_lines(filename, limit=None):
    try:
        with open(filename, encoding='utf-8') as f:
            lines = [clean_text(line.strip()) for line in f if line.strip()]
            if limit:
                lines = lines[:limit]
        return lines
    except FileNotFoundError:
        print(f"❌ Error: File {filename} not found!")
        return []
    except Exception as e:
        print(f"❌ Error reading {filename}: {e}")
        return []



def load_data():
    print('📂 Loading training data...')
    train_from = read_lines(TRAIN_FROM, limit=TRAIN_LIMIT)
    train_to = read_lines(TRAIN_TO, limit=TRAIN_LIMIT)
    
    if not train_from or not train_to:
        print("❌ No training data found!")
        return None, None, None, None
    
    # Filter out very short or very long sequences
    filtered_from, filtered_to = [], []
    for f, t in zip(train_from, train_to):
        f_words, t_words = len(f.split()), len(t.split())
        if 2 <= f_words <= 15 and 2 <= t_words <= 15:
            filtered_from.append(f)
            filtered_to.append(t)
    
    print(f"✅ Loaded {len(filtered_from)} filtered training pairs (from {len(train_from)})")
    
    print('📂 Loading validation data...')
    test_from = read_lines(TEST_FROM, limit=VAL_LIMIT)
    test_to = read_lines(TEST_TO, limit=VAL_LIMIT)
    
    if not test_from or not test_to:
        print("❌ No validation data found!")
        return None, None, None, None
    
    # Filter validation data too
    filtered_test_from, filtered_test_to = [], []
    for f, t in zip(test_from, test_to):
        f_words, t_words = len(f.split()), len(t.split())
        if 2 <= f_words <= 15 and 2 <= t_words <= 15:
            filtered_test_from.append(f)
            filtered_test_to.append(t)
    
    print(f"✅ Loaded {len(filtered_test_from)} filtered validation pairs (from {len(test_from)})")
    
    # Data quality metrics
    print(f"📊 Average input length: {np.mean([len(x.split()) for x in filtered_from]):.1f} words")
    print(f"📊 Average output length: {np.mean([len(x.split()) for x in filtered_to]):.1f} words")
    
    return filtered_from, filtered_to, filtered_test_from, filtered_test_to

def create_tokenizer(texts, vocab_size):
    # Remove OOV token completely - no <UNK> allowed
    # Keep important joining words and common words
    tokenizer = Tokenizer(num_words=vocab_size, filters='')
    tokenizer.fit_on_texts(texts)
    
    # Ensure meaningful content words are in vocabulary (avoid common joining words)
    essential_words = [
        'hi', 'hello', 'hey', 'goodbye', 'bye', 'thanks', 'thank',
        'what', 'when', 'where', 'why', 'how', 'who', 'which',
        'yes', 'no', 'maybe', 'okay', 'sure', 'right', 'wrong',
        'good', 'bad', 'great', 'awesome', 'cool', 'nice', 'fun',
        'help', 'helpful', 'useful', 'important', 'interesting',
        'computer', 'program', 'code', 'software', 'technology',
        'learn', 'learning', 'study', 'understand', 'know',
        'think', 'believe', 'feel', 'want', 'need', 'like',
        'work', 'play', 'read', 'write', 'talk', 'speak',
        'time', 'day', 'night', 'morning', 'evening',
        'people', 'person', 'friend', 'family', 'home',
        'problem', 'solution', 'answer', 'question', 'idea'
    ]
    
    # Add essential words to vocabulary if not already present
    for word in essential_words:
        if word not in tokenizer.word_index:
            # Find the next available index
            next_index = len(tokenizer.word_index) + 1
            if next_index < vocab_size:
                tokenizer.word_index[word] = next_index
    
    return tokenizer

def preprocess(tokenizer, texts, max_length):
    seqs = tokenizer.texts_to_sequences(texts)
    padded = pad_sequences(seqs, maxlen=max_length, padding='post')
    return padded

def build_model(vocab_size, embedding_dim, max_length):
    from tensorflow.keras.optimizers import Adam
    from tensorflow.keras.layers import BatchNormalization, Bidirectional, TimeDistributed
    from tensorflow.keras.regularizers import l2
    
    model = Sequential([
        # Enhanced embedding layer with larger dimensions
        Embedding(vocab_size, embedding_dim, input_length=max_length, 
                 embeddings_initializer='glorot_uniform'),
        
        # First bidirectional LSTM layer - much larger
        Bidirectional(LSTM(256, return_sequences=True, dropout=0.3, recurrent_dropout=0.3)),
        BatchNormalization(),
        
        # Second bidirectional LSTM layer
        Bidirectional(LSTM(128, return_sequences=True, dropout=0.3, recurrent_dropout=0.3)),
        BatchNormalization(),
        
        # Third LSTM layer for sequence understanding
        LSTM(64, return_sequences=True, dropout=0.2, recurrent_dropout=0.2),
        BatchNormalization(),
        
        # Fourth LSTM layer - keep sequences for sequence-to-sequence
        LSTM(32, return_sequences=True, dropout=0.2, recurrent_dropout=0.2),
        BatchNormalization(),
        
        # Time-distributed dense layers for sequence output
        TimeDistributed(Dense(128, activation='relu', kernel_regularizer=l2(0.01))),
        BatchNormalization(),
        Dropout(0.3),
        
        TimeDistributed(Dense(64, activation='relu', kernel_regularizer=l2(0.01))),
        BatchNormalization(),
        Dropout(0.2),
        
        # Output layer - time distributed for sequence output
        TimeDistributed(Dense(vocab_size, activation='softmax'))
    ])
    
    # Optimized optimizer for larger model
    optimizer = Adam(learning_rate=LEARNING_RATE, clipnorm=1.0, beta_1=0.9, beta_2=0.999)
    model.compile(
        optimizer=optimizer,
        loss='sparse_categorical_crossentropy',
        metrics=['accuracy']
    )
    return model

def main():
    print('🚀 Training SCALED-UP chatbot')
    print(f"📋 Enhanced Hyperparameters:")
    print(f"   - Vocab size: {MAX_VOCAB_SIZE} (increased for better coverage)")
    print(f"   - Sequence length: {MAX_SEQUENCE_LENGTH} (longer for more context)")
    print(f"   - Embedding dim: {EMBEDDING_DIM} (larger for better representation)")
    print(f"   - Batch size: {BATCH_SIZE} (larger for better gradients)")
    print(f"   - Epochs: {EPOCHS} (more for better convergence)")
    print(f"   - Training samples: {TRAIN_LIMIT} (much larger dataset)")
    print(f"   - Learning rate: {LEARNING_RATE} (optimized for larger model)")
    print(f"   - Bidirectional LSTM layers for better understanding")
    print(f"   - Enhanced architecture with more capacity")
    print(f"   - Content words guaranteed: hi, hello, what, help, learn, etc.")
    
    # Load data
    train_from, train_to, test_from, test_to = load_data()
    if train_from is None:
        print("❌ Failed to load data. Exiting.")
        return
    
    print('🔤 Fitting tokenizer...')
    all_texts = train_from + train_to + test_from + test_to
    tokenizer = create_tokenizer(all_texts, MAX_VOCAB_SIZE)
    vocab_size = min(MAX_VOCAB_SIZE, len(tokenizer.word_index) + 1)
    print(f'✅ Vocabulary size: {vocab_size}')
    print(f"📊 Vocabulary coverage: {len(tokenizer.word_index)} unique words")
    
    print('⚙️ Preprocessing sequences...')
    X_train = preprocess(tokenizer, train_from, MAX_SEQUENCE_LENGTH)
    y_train = preprocess(tokenizer, train_to, MAX_SEQUENCE_LENGTH)
    X_val = preprocess(tokenizer, test_from, MAX_SEQUENCE_LENGTH)
    y_val = preprocess(tokenizer, test_to, MAX_SEQUENCE_LENGTH)
    
    if X_train is None or y_train is None:
        print("❌ Preprocessing failed. Exiting.")
        return
    
    print(f'✅ Training samples: {X_train.shape[0]}, Validation samples: {X_val.shape[0]}')
    print('🏗️ Building optimized model...')
    model = build_model(vocab_size, EMBEDDING_DIM, MAX_SEQUENCE_LENGTH)
    model.summary()
    
    # Enhanced callbacks for larger model
    callbacks = [
        EarlyStopping(
            monitor='val_accuracy',  # Monitor accuracy instead of loss
            patience=12,  # More patience for larger model
            restore_best_weights=True,
            verbose=1
        ),
        ReduceLROnPlateau(
            monitor='val_accuracy',
            factor=0.8,  # Less aggressive reduction for stability
            patience=6,
            min_lr=MIN_LEARNING_RATE,
            verbose=1
        )
    ]
    
    print('🎯 Starting training...')
    try:
        history = model.fit(
            X_train,
            y_train,
            batch_size=BATCH_SIZE,
            epochs=EPOCHS,
            validation_data=(X_val, y_val),
            callbacks=callbacks,
            verbose=1,
            shuffle=True
        )
        
        print('💾 Saving model and tokenizer...')
        model.save('models/chatbot_optimized_fixed.h5')
        with open('models/tokenizer.pkl', 'wb') as handle:
            pickle.dump(tokenizer, handle, protocol=pickle.HIGHEST_PROTOCOL)
        
        print('✅ Training complete!')
        print(f"📊 Final training accuracy: {history.history['accuracy'][-1]:.4f}")
        print(f"📊 Final validation accuracy: {history.history['val_accuracy'][-1]:.4f}")
        print(f"📊 Best validation accuracy: {max(history.history['val_accuracy']):.4f}")
        
        # Show improvement
        initial_acc = history.history['accuracy'][0]
        final_acc = history.history['accuracy'][-1]
        improvement = ((final_acc - initial_acc) / initial_acc) * 100
        print(f"📈 Accuracy improvement: {improvement:.1f}%")
        
    except Exception as e:
        print(f"❌ Training failed: {e}")
        print("💡 Try reducing TRAIN_LIMIT or BATCH_SIZE if you're running out of memory")

if __name__ == '__main__':
    main() 