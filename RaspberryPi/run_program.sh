#!/bin/bash

# Wait until the internet is connected
until ping -c 1 google.com &>/dev/null; do
    echo "Waiting for network..."
    sleep 5
done

echo "Network connected."

#start venv
cd /home/gp0569

# Activate the virtual environment
source venv/bin/activate

# Navigate to your script directory
cd /home/gp0569/scripts


# Run the Python script
python count2.py
