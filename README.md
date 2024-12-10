# CrowdCTRL: Real-Time Occupancy Monitoring System

## Project Overview
**CrowdCTRL** is a real-time people counting system designed to help businesses manage space effectively and provide customers with live occupancy data. It combines a lightweight object detection model running on a Raspberry Pi 4 with a user-friendly mobile app to display real-time capacity information for venues like bars, restaurants, and event spaces. The project leverages computer vision, cloud-based data synchronization, and mobile app development to deliver a seamless user experience.

## Features
- **Real-Time Detection**: Detects and counts people in live video feeds using YOLOv5n.
- **Mobile App Integration**: Displays occupancy data in real time with an interactive map and venue list.
- **Edge Computing**: Runs efficiently on a Raspberry Pi 4 with an Arducam camera.
- **Cloud Synchronization**: Uses Firebase Firestore for real-time data updates between the Raspberry Pi and the mobile app.
- **User-Friendly Interface**: The mobile app provides occupancy information, directions, and venue details.

## Tech Stack
### Hardware
- **Raspberry Pi 4**: Handles image capture and object detection.
- **Arducam Camera**: Captures live video feeds.

### Software
- **YOLOv5n**: Lightweight object detection model for real-time person detection.
- **Firebase Firestore**: Cloud-based database for real-time data synchronization.
- **React-Native**: Framework for developing the mobile app.
- **Node.js**: Backend support for mobile app functionality.
- **ExpoGo**: Toolchain for building and testing the app.
- **Python**: Core logic and model inference on the Raspberry Pi.

### Datasets
- **COCO**: Used for initial model training.
- **INRIA Person Dataset**: Used for fine-tuning the model to focus on pedestrian detection.

## Installation and Setup
### Raspberry Pi
1. **Prepare the Raspberry Pi**:
   - Install the required dependencies:
     ```bash
     sudo apt update && sudo apt install python3-pip libatlas-base-dev
     pip3 install torch torchvision firebase-admin pillow
     ```
   - Clone the repository:
     ```bash
     git clone https://github.com/Grewestr/CrowdCTRL.git
     cd CrowdCTRL
     ```

2. **Configure Firebase**:
   - Add your Firebase credentials file (`firebase_credentials.json`) to the `CrowdCTRL` directory.
   - Update the Firestore paths in `Count2.py` to match your Firebase setup.

3. **Run the Detection Script**:
   - Make sure your camera is connected and enabled.
   - Start the program using:
     ```bash
     python3 Count2.py
     ```

### Mobile App
1. **Set Up the Environment**:
   - Install Node.js and Expo CLI:
     ```bash
     npm install -g expo-cli
     ```
   - Navigate to the `mobile_app` directory:
     ```bash
     cd mobile_app
     npm install
     ```

2. **Run the App**:
   - Start the development server:
     ```bash
     expo start
     ```
   - Scan the QR code using the Expo Go app on your mobile device to view the app.

## How It Works
1. The Raspberry Pi captures images using the Arducam camera.
2. Images are processed by the YOLOv5n model to detect and count people.
3. The detected count is updated in Firebase Firestore.
4. The mobile app fetches the data from Firestore and displays it in real time, providing users with occupancy details and navigation options.

## Challenges and Limitations
- **Hardware Constraints**: Limited computational power of the Raspberry Pi required the use of YOLOv5n, which trades some accuracy for efficiency.
- **Testing Conditions**: Limited testing environments; real-world scenarios with low light or large crowds were not thoroughly tested.
- **Performance Trade-offs**: Model accuracy could be improved with cloud-based inference or more powerful hardware.

## Future Improvements
- Offload detection to a cloud-based server for better accuracy and scalability.
- Explore alternative hardware, such as Nvidia Jetson, for higher performance.
- Enhance the mobile app with user accounts, social features, and additional metrics like seating availability.
- Optimize the system for challenging environments, such as low light or outdoor settings.

## Contributing
Contributions are welcome! Feel free to fork the repository, create issues, or submit pull requests. For major changes, please open an issue to discuss your ideas.

## License
This project is open-source and available for contribution.

## Contact
For any questions or suggestions, please reach out via the [GitHub repository](https://github.com/Grewestr/CrowdCTRL) or email at `gp0569@wayne.edu`.
