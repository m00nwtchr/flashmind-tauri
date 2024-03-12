FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build
RUN mkdir -p /usr/src/app
COPY package.json /usr/src/app
COPY pnpm-lock.yaml /usr/src/app
WORKDIR /usr/src/app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

COPY . /usr/src/app
RUN pnpm run build

EXPOSE 8080
CMD [ "pnpm", "run", "preview", "--port", "8080", "--host", "0.0.0.0" ]


# FROM lipanski/docker-static-website:latest
# WORKDIR /home/static
# COPY --from=build /usr/src/app/dist/ .
