ARG NODE_VERSION="20-bullseye"
FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:0-${NODE_VERSION}

WORKDIR /app

COPY . .

RUN npm ci
RUN npm run build

EXPOSE 3000 5000
CMD ["npm", "start"]
