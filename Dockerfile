ARG NODE_VERSION="20-bullseye"

FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:0-${NODE_VERSION}
    ENV APP_HOME="/app"

    WORKDIR ${APP_HOME}

    COPY . ${APP_HOME}/

    RUN --mount=type=secret,id=npm-token \
        export NPM_TOKEN=$(cat /run/secrets/npm-token) \
        && npm ci \ 
        && npm run build

    EXPOSE 3000

    CMD ["npm", "run", "start:prod"]
