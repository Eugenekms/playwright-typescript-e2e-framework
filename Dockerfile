# Base image with pre-installed Linux, Node.js, and Playwright browsers
FROM mcr.microsoft.com/playwright:v1.61.0-jammy

# Set the working directory inside the container
WORKDIR /app

# Copy package dependencies first to leverage Docker cache
COPY package*.json ./

# Install dependencies cleanly
RUN npm ci

# Copy the rest of the project files
COPY . .

# Run Playwright tests in headless mode by default
CMD ["npx", "playwright", "test"]