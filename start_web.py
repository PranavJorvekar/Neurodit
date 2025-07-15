#!/usr/bin/env python3
"""
Catbot Web Application Startup Script
Run this to start the web interface for Catbot
"""

import sys
import os
import shutil

# --- New: Copy dist/ to static/dist/ before starting server ---
def copy_frontend_build():
    src = os.path.join(os.getcwd(), 'dist')
    dest = os.path.join(os.getcwd(), 'static', 'dist')
    if not os.path.exists(src):
        print(f"Frontend build directory not found: {src}")
        print("Please run 'npm run build' to generate the frontend build.")
        return False
    # Remove old build if exists
    if os.path.exists(dest):
        shutil.rmtree(dest)
    shutil.copytree(src, dest)
    print(f"Copied frontend build from {src} to {dest}")
    return True

# --- Existing checks ---
def check_dependencies():
    """Check if required packages are installed"""
    try:
        import flask
        import tensorflow
        import numpy
        print("All dependencies are installed!")
        return True
    except ImportError as e:
        print(f"Missing dependency: {e}")
        print("Please install dependencies with: pip install -r requirements_web.txt")
        return False

def check_model_files():
    """Check if model files exist"""
    model_file = "models/chatbot_compile.h5"  # Correct case
    tokenizer_file = "models/tokenizer.pkl"
    
    if not os.path.exists(model_file):
        print(f"Model file not found: {model_file}")
        print("Please train the model first using: python training/train_fixed.py")
        return False
    
    if not os.path.exists(tokenizer_file):
        print(f"Tokenizer file not found: {tokenizer_file}")
        print("Please train the model first using: python training/train_fixed.py")
        return False
    
    print("Model files found!")
    return True

def check_frontend_files():
    """Check if new frontend files exist"""
    index_file = "index.html"
    static_assets_dir = os.path.join("static", "assets")
    
    if not os.path.exists(index_file):
        print(f"Frontend entry file not found: {index_file}")
        print("Please ensure your frontend build outputs index.html to the project root.")
        return False
    if not os.path.exists(static_assets_dir):
        print(f"Static assets directory not found: {static_assets_dir}")
        print("Please ensure your frontend build outputs assets to static/assets/.")
        return False
    print("Frontend files found!")
    return True

def main():
    """Main startup function"""
    print("Starting Catbot Web Application...")
    print("=" * 50)
    
    # Check dependencies
    if not check_dependencies():
        sys.exit(1)
    
    # Check model files
    if not check_model_files():
        sys.exit(1)
    
    # Check frontend files
    if not check_frontend_files():
        sys.exit(1)
    
    # --- New: Copy frontend build to static/dist/ ---
    if not copy_frontend_build():
        sys.exit(1)
    
    print("Starting web server...")
    print("Open your browser and go to: http://localhost:5000")
    print("Press Ctrl+C to stop the server")
    print("=" * 50)
    
    # Import and run the Flask app
    try:
        from app import app
        app.run(debug=False, host='0.0.0.0', port=5000)
    except KeyboardInterrupt:
        print("\nServer stopped by user")
    except Exception as e:
        print(f"Error starting server: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main() 