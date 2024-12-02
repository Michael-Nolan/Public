# Use an official Go image as a parent image
FROM golang:1.21

# Install additional tools
RUN apt-get update && apt-get install -y \
    git \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Set up a working directory
WORKDIR /workspace

# Ensure Go modules are enabled
ENV GO111MODULE=on
