#!/usr/bin/env python3
"""
Model Download Script for Catbot

This script helps download the required model files from external storage.
"""

import os
import sys
import requests
import zipfile
from pathlib import Path

# Model file URLs (replace with your actual URLs)
MODEL_URLS = {
    "chatbot_merged_final.h5": "YOUR_GOOGLE_DRIVE_DIRECT_LINK",
    "tokenizer.pkl": "YOUR_GOOGLE_DRIVE_DIRECT_LINK"
}

def create_models_directory():
    """Create the models directory if it doesn't exist."""
    models_dir = Path("models")
    models_dir.mkdir(exist_ok=True)
    return models_dir

def download_file(url, filename, models_dir):
    """Download a file from URL."""
    filepath = models_dir / filename
    
    if filepath.exists():
        print(f"✅ {filename} already exists, skipping download.")
        return True
    
    print(f"📥 Downloading {filename}...")
    
    try:
        response = requests.get(url, stream=True)
        response.raise_for_status()
        
        total_size = int(response.headers.get('content-length', 0))
        downloaded = 0
        
        with open(filepath, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                if chunk:
                    f.write(chunk)
                    downloaded += len(chunk)
                    
                    # Progress bar
                    if total_size > 0:
                        percent = (downloaded / total_size) * 100
                        sys.stdout.write(f"\rProgress: {percent:.1f}%")
                        sys.stdout.flush()
        
        print(f"\n✅ Successfully downloaded {filename}")
        return True
        
    except Exception as e:
        print(f"\n❌ Error downloading {filename}: {e}")
        return False

def download_from_huggingface():
    """Download models from Hugging Face Hub."""
    try:
        from huggingface_hub import hf_hub_download
        
        print("🤗 Downloading from Hugging Face Hub...")
        
        models_dir = create_models_directory()
        
        # Replace with your actual Hugging Face repository
        repo_id = "YOUR_USERNAME/YOUR_MODEL_REPO"
        
        # Download model files
        model_file = hf_hub_download(
            repo_id=repo_id,
            filename="chatbot_merged_final.h5",
            local_dir=models_dir
        )
        
        tokenizer_file = hf_hub_download(
            repo_id=repo_id,
            filename="tokenizer.pkl",
            local_dir=models_dir
        )
        
        print("✅ Successfully downloaded all model files from Hugging Face!")
        return True
        
    except ImportError:
        print("❌ huggingface_hub not installed. Install with: pip install huggingface_hub")
        return False
    except Exception as e:
        print(f"❌ Error downloading from Hugging Face: {e}")
        return False

def download_from_direct_links():
    """Download models from direct download links."""
    print("🌐 Downloading from direct links...")
    
    models_dir = create_models_directory()
    success_count = 0
    
    for filename, url in MODEL_URLS.items():
        if url == "YOUR_GOOGLE_DRIVE_DIRECT_LINK":
            print(f"⚠️  Please update the download URL for {filename} in this script.")
            continue
            
        if download_file(url, filename, models_dir):
            success_count += 1
    
    return success_count == len([url for url in MODEL_URLS.values() if url != "YOUR_GOOGLE_DRIVE_DIRECT_LINK"])

def main():
    """Main function."""
    print("🤖 Catbot Model Downloader")
    print("=" * 40)
    
    # Check if models already exist
    models_dir = Path("models")
    if models_dir.exists() and any(models_dir.glob("*.h5")) and any(models_dir.glob("*.pkl")):
        print("✅ Model files already exist!")
        return
    
    print("Choose download method:")
    print("1. Hugging Face Hub (recommended)")
    print("2. Direct download links")
    print("3. Manual download instructions")
    
    choice = input("\nEnter your choice (1-3): ").strip()
    
    if choice == "1":
        success = download_from_huggingface()
    elif choice == "2":
        success = download_from_direct_links()
    elif choice == "3":
        print_manual_instructions()
        return
    else:
        print("❌ Invalid choice.")
        return
    
    if success:
        print("\n🎉 All model files downloaded successfully!")
        print("You can now run the chatbot with: python app.py")
    else:
        print("\n❌ Some files failed to download.")
        print_manual_instructions()

def print_manual_instructions():
    """Print manual download instructions."""
    print("\n📋 Manual Download Instructions:")
    print("=" * 40)
    print("1. Download the model files from:")
    print("   - Google Drive: [YOUR_GOOGLE_DRIVE_LINK]")
    print("   - Hugging Face: [YOUR_HUGGINGFACE_LINK]")
    print("   - Direct links: [YOUR_DIRECT_LINKS]")
    print("\n2. Create a 'models' directory in the project root")
    print("3. Place the following files in the 'models' directory:")
    print("   - chatbot_merged_final.h5")
    print("   - tokenizer.pkl")
    print("\n4. Run the chatbot: python app.py")

if __name__ == "__main__":
    main() 