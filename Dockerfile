# Use an Ubuntu-based Node image to easily install compilers
FROM node:20-bullseye

# Install necessary compilers for the coding problems feature (Python, C++, Java)
RUN apt-get update && apt-get install -y \
    python3 \
    g++ \
    default-jdk \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Build the Vite React app for production
RUN npm run build

# Expose port (Render/Railway will automatically map process.env.PORT)
EXPOSE 3000

# Start the server using the new production start script
CMD ["npm", "start"]
