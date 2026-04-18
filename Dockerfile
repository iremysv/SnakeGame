# Base python image
FROM python:3.9-slim

# Set non-interactive timezone and env variables
ENV DEBIAN_FRONTEND=noninteractive
ENV PYTHONUNBUFFERED=1

# Install X11 and Tkinter dependencies (required for turtle graphics)
RUN apt-get update && apt-get install -y \
    python3-tk \
    xvfb \
    x11-apps \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy application files
COPY . .

# IMPORTANT: Running a Turtle GUI app inside a Docker container requires X Server forwarding
# Example run command: 
# docker run -d --rm -e DISPLAY=$DISPLAY -v /tmp/.X11-unix:/tmp/.X11-unix snake-game

CMD ["python", "main.py"]
