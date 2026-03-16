# ---- Stage 1: Build the application ----
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the application
RUN npm run build

# ---- Stage 2: Serve the application in production ----
FROM nginx:1.23-alpine AS production

# Nginx is a lightweight, production-ready web server.

# Copy the build output from the previous stage
# The `dist` directory contains all the optimized static files (HTML, CSS, JS)
COPY --from=build /app/dist /usr/share/nginx/html

# Copy our custom Nginx configuration
# We will create this file next.
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 to the outside world
EXPOSE 80

# Start Nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]