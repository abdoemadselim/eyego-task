# ==============================================================================
# STAGE 1: Dependencies
# ==============================================================================
# This stage installs all dependencies needed for building the application

# a node image built on top of alpine linux image (node v20)
FROM node:20-alpine AS deps

# Install libc6-compat for compatibility with some Node.js native modules like bcrypt
# --no-cache: don't store the package index in the container (discard it after installing the package)
RUN apk add --no-cache libc6-compat

# Set the working directory inside the container
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Copy vendor directory (contains local xlsx package)
COPY vendor ./vendor

# npm ci is faster and more reliable than npm install for CI/CD
# it removes the node_modules folder and reinstalls the dependencies
# it doesn't modify the package-lock.json file at all 
RUN npm ci --legacy-peer-deps

# Why multi-stage build?
# 1. Reduce the size of the final image
# 2. Reduce the build time (because we don't need to install the dependencies again if no change happens to source code for each deployment)
# 3. The build image wouldn't have the npm cache
# ==============================================================================
# STAGE 2: Builder
# ==============================================================================
# This stage builds the Next.js application
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependencies from the deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy all source files needed for the build
COPY . .

# Pass API_URL as build-time ARG (comes from docker-compose) (required for next.js rewrite)
ARG API_URL
ENV API_URL=${API_URL}

# NEXT_TELEMETRY_DISABLED=1 disables Next.js telemetry
# NODE_ENV=production optimizes the build for production
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Build the Next.js application
RUN npm run build

# ==============================================================================
# STAGE 3: Runner (Final Production Image)
# ==============================================================================
# This stage creates a minimal production image
# So the final image contain only the necessary files for the production server (no original source code, no dev dependencies, no build tools, just build files)
FROM node:20-alpine AS runner

WORKDIR /app

# Set production environment
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create a non-root user for security
# Running as non-root is a security best practice
RUN addgroup --system --gid 1001 eyego && \
    adduser --system --uid 1001 eyego

# Copy necessary files from builder stage
# public folder contains static assets
COPY --from=builder /app/public ./public

# Copy the standalone build output
# Next.js standalone mode creates a minimal production server
COPY --from=builder --chown=eyego:eyego /app/.next/standalone ./
COPY --from=builder --chown=eyego:eyego /app/.next/static ./.next/static

# Switch to non-root user
USER eyego

# Expose port 3000 (default Next.js port)
EXPOSE 3000

# Set the port environment variable
ENV PORT=3000

# Start the Next.js production server
CMD ["node", "server.js"]

