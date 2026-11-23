# Build stage
FROM node:22-alpine AS build
WORKDIR /app
ARG VITE_APP_TITLE
ARG VITE_APP_DEFAULT_THEME
ENV VITE_APP_TITLE=$VITE_APP_TITLE
ENV VITE_APP_DEFAULT_THEME=$VITE_APP_DEFAULT_THEME
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Serve stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
