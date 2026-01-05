# -------- Build stage --------
FROM node:22 AS build
WORKDIR /app

# Copy package files first for caching
COPY package*.json ./
RUN npm config set registry https://registry.yarnpkg.com/ \
    && npm config set fetch-retries 5 \
    && npm config set fetch-retry-factor 2 \
    && npm config set fetch-retry-mintimeout 20000 \
    && npm config set fetch-retry-maxtimeout 120000 \
    && npm ci


# Copy the rest of the code
COPY . .

# Build Next.js app
RUN npm run build

# -------- Run stage --------
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy only necessary files from build stage
COPY --from=build /app/package*.json ./
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/node_modules ./node_modules

# Expose Next.js default port
EXPOSE 3000

# Run Next.js server
CMD ["npm", "start"]
