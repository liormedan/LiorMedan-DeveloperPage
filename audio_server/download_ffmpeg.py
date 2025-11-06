"""
Script to download FFmpeg static build for the current platform
Run: python download_ffmpeg.py
"""

import os
import sys
import platform
import zipfile
import tarfile
import urllib.request
import ssl
from pathlib import Path

# Disable SSL verification for download (not recommended for production)
ssl._create_default_https_context = ssl._create_unverified_context

def get_ffmpeg_url():
    """Get FFmpeg download URL based on platform"""
    system = platform.system().lower()
    machine = platform.machine().lower()
    
    base_url = "https://www.gyan.dev/ffmpeg/builds/ffmpeg-release-essentials.zip"
    
    if system == "windows":
        if "64" in machine or "x86_64" in machine:
            return "https://www.gyan.dev/ffmpeg/builds/ffmpeg-release-essentials.zip"
        else:
            return "https://www.gyan.dev/ffmpeg/builds/ffmpeg-release-essentials.zip"
    elif system == "darwin":  # macOS
        if "arm" in machine or "aarch64" in machine:
            # Apple Silicon
            return "https://evermeet.cx/ffmpeg/ffmpeg-7.0.zip"
        else:
            # Intel Mac
            return "https://evermeet.cx/ffmpeg/ffmpeg-7.0.zip"
    else:  # Linux
        if "64" in machine or "x86_64" in machine:
            return "https://johnvansickle.com/ffmpeg/releases/ffmpeg-release-amd64-static.tar.xz"
        else:
            return "https://johnvansickle.com/ffmpeg/releases/ffmpeg-release-i686-static.tar.xz"

def download_file(url, dest_path):
    """Download file from URL"""
    print(f"Downloading FFmpeg from {url}...")
    print(f"This may take a few minutes...")
    
    def reporthook(count, block_size, total_size):
        percent = int(count * block_size * 100 / total_size)
        sys.stdout.write(f"\rProgress: {percent}%")
        sys.stdout.flush()
    
    urllib.request.urlretrieve(url, dest_path, reporthook)
    print("\nDownload complete!")

def extract_windows(zip_path, extract_to):
    """Extract Windows ZIP file"""
    print("Extracting FFmpeg...")
    with zipfile.ZipFile(zip_path, 'r') as zip_ref:
        # Find the ffmpeg.exe in the zip
        for member in zip_ref.namelist():
            if member.endswith('ffmpeg.exe'):
                # Extract to our target directory
                zip_ref.extract(member, extract_to)
                # Move to expected location
                extracted_path = Path(extract_to) / member
                target_dir = Path(extract_to) / "ffmpeg" / "bin"
                target_dir.mkdir(parents=True, exist_ok=True)
                extracted_path.rename(target_dir / "ffmpeg.exe")
                print(f"Extracted to {target_dir / 'ffmpeg.exe'}")
                return
    # If not found, extract all and find it
    zip_ref.extractall(extract_to)
    # Find ffmpeg.exe in extracted files
    for root, dirs, files in os.walk(extract_to):
        if "ffmpeg.exe" in files:
            source = Path(root) / "ffmpeg.exe"
            target_dir = Path(extract_to) / "ffmpeg" / "bin"
            target_dir.mkdir(parents=True, exist_ok=True)
            source.rename(target_dir / "ffmpeg.exe")
            print(f"Extracted to {target_dir / 'ffmpeg.exe'}")
            return

def extract_linux(tar_path, extract_to):
    """Extract Linux TAR file"""
    print("Extracting FFmpeg...")
    with tarfile.open(tar_path, 'r:xz') as tar_ref:
        tar_ref.extractall(extract_to)
        # Find ffmpeg binary
        for root, dirs, files in os.walk(extract_to):
            if "ffmpeg" in files and not root.endswith("doc"):
                source = Path(root) / "ffmpeg"
                if source.is_file() and os.access(source, os.X_OK):
                    target_dir = Path(extract_to) / "ffmpeg" / "bin"
                    target_dir.mkdir(parents=True, exist_ok=True)
                    source.rename(target_dir / "ffmpeg")
                    print(f"Extracted to {target_dir / 'ffmpeg'}")
                    return

def main():
    """Download and extract FFmpeg"""
    base_dir = Path(__file__).parent
    ffmpeg_dir = base_dir / "ffmpeg" / "bin"
    
    # Check if already exists
    if ffmpeg_dir.exists():
        files = list(ffmpeg_dir.glob("ffmpeg*"))
        if files:
            print(f"FFmpeg already exists at {ffmpeg_dir}")
            response = input("Do you want to re-download? (y/n): ")
            if response.lower() != 'y':
                return
    
    # Get download URL
    url = get_ffmpeg_url()
    
    # Download
    system = platform.system().lower()
    if system == "windows":
        download_path = base_dir / "ffmpeg.zip"
    else:
        download_path = base_dir / "ffmpeg.tar.xz"
    
    try:
        download_file(url, download_path)
        
        # Extract
        if system == "windows":
            extract_windows(download_path, base_dir)
        else:
            extract_linux(download_path, base_dir)
        
        # Clean up
        download_path.unlink()
        
        # Verify
        if system == "windows":
            exe_path = ffmpeg_dir / "ffmpeg.exe"
        else:
            exe_path = ffmpeg_dir / "ffmpeg"
        
        if exe_path.exists():
            print(f"\n[OK] FFmpeg successfully installed to {exe_path}")
            print(f"  Size: {exe_path.stat().st_size / 1024 / 1024:.1f} MB")
        else:
            print(f"\n[ERROR] FFmpeg not found at {exe_path}")
            print("  Please extract manually or use system FFmpeg")
    
    except Exception as e:
        print(f"\n[ERROR] {e}")
        print("\nAlternative: You can manually download FFmpeg from:")
        print("  Windows: https://www.gyan.dev/ffmpeg/builds/")
        print("  macOS: https://evermeet.cx/ffmpeg/")
        print("  Linux: https://johnvansickle.com/ffmpeg/")
        print(f"\nAnd place it in: {ffmpeg_dir}")

if __name__ == "__main__":
    main()

