# Use a lightweight base image
FROM debian:bullseye-slim

# Install OpenSSL
RUN apt-get update && \
    apt-get install -y openssl && \
    apt-get clean

# Set the working directory
WORKDIR /certs

# Command to keep the container running
CMD ["bash"]
