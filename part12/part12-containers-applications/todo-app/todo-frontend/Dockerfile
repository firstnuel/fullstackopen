FROM node@sha256:330fa0342b6ad2cbdab30ac44195660af5a1f298cc499d8cbdf7496b02ea17d8 AS builder

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci

# Run tests
RUN npm test

RUN npm run build

FROM nginx:1.25-alpine

# Copy the build output from the builder stage
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]