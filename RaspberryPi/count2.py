import time
import subprocess
from io import BytesIO
from PIL import Image
import torch
import firebase_admin
from firebase_admin import credentials, firestore

# Initialize Firebase
cred = credentials.Certificate("/home/gp0569/scripts/firebase_credentials.json")  # Update with the actual path to your credentials
firebase_admin.initialize_app(cred)
db = firestore.client()

# Load YOLO model
model = torch.hub.load('ultralytics/yolov5', 'yolov5n')

# Firestore document reference
doc_ref = db.collection("rooms").document("RaspberryPi")

def capture_and_detect():
    # Capture image with libcamera
    result = subprocess.run(
        ["libcamera-still", "-t", "1000", "--width", "320", "--height", "240", "--nopreview", "-o", "-"],
        stdout=subprocess.PIPE
    )
    image_data = result.stdout

    # Convert the image data to a PIL image
    frame_pil = Image.open(BytesIO(image_data))

    # Run YOLO model on the frame
    results = model(frame_pil)
    people = [detection for detection in results.xyxy[0] if int(detection[5]) == 0]  # Filter for "person" class

    # Count number of people
    people_count = len(people)

    # Update Firestore document
    try:
        doc_ref.update({"people_count": people_count})
        print(f"Uploaded people count: {people_count}")
    except Exception as e:
        print(f"Failed to update Firebase: {e}")

# Main loop: Capture and upload every 15 seconds
if __name__ == "__main__":
    while True:
        capture_and_detect()
        time.sleep(15)
