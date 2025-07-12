#!/usr/bin/env python3
"""
Catbot Web Application Startup Script
Run this to start the web interface for Catbot
"""

import sys
import os

def check_dependencies():
    """Check if required packages are installed"""
    try:
        import flask
        import tensorflow
        import numpy
        print("✅ All dependencies are installed!")
        return True
    except ImportError as e:
        print(f"❌ Missing dependency: {e}")
        print("📦 Please install dependencies with: pip install -r requirements_web.txt")
        return False

def check_model_files():
    """Check if model files exist"""
    model_file = "models/Catbot_compile.h5"
    tokenizer_file = "models/tokenizer.pkl"
    
    if not os.path.exists(model_file):
        print(f"❌ Model file not found: {model_file}")
        print("🤖 Please train the model first using: python training/train_fixed.py")
        return False
    
    if not os.path.exists(tokenizer_file):
        print(f"❌ Tokenizer file not found: {tokenizer_file}")
        print("🤖 Please train the model first using: python training/train_fixed.py")
        return False
    
    print("✅ Model files found!")
    return True

def main():
    """Main startup function"""
    print("🚀 Starting Catbot Web Application...")
    print("=" * 50)
    
    # Check dependencies
    if not check_dependencies():
        sys.exit(1)
    
    # Check model files
    if not check_model_files():
        sys.exit(1)
    
    print("🌐 Starting web server...")
    print("📱 Open your browser and go to: http://localhost:5000")
    print("🛑 Press Ctrl+C to stop the server")
    print("=" * 50)
    
    # Import and run the Flask app
    try:
        from app import app
        app.run(debug=False, host='0.0.0.0', port=5000)
    except KeyboardInterrupt:
        print("\n👋 Server stopped by user")
    except Exception as e:
        print(f"❌ Error starting server: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main() 