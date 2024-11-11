# syntax=docker/dockerfile:1

ARG NODE_VERSION=20.12.2

FROM node:${NODE_VERSION}-alpine as base

WORKDIR /usr/src/app

################################################################################
# Stage for installing production dependencies.
FROM base as deps

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

################################################################################
# Stage for building the application.
FROM deps as build

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci

COPY . .

RUN npm run build

################################################################################
# Final stage for running the application
FROM base as final

ENV NODE_ENV production

COPY package.json .

COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist

COPY entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh

EXPOSE 3000 3001

# Switch to node user after all operations that require root
USER node

ENTRYPOINT ["./entrypoint.sh"]