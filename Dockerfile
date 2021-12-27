# Build stage
FROM node:16 AS builder

ENV HOST=http://localhost:4000
ENV BURDY_HOST=http://localhost:4000
ENV PREVIEW_BASE_URL=http://localhost:4000
ENV NEXT_PUBLIC_CMS_URL=http://localhost:4000
ENV NEXT_PUBLIC_HOST=https://localhost:4000
ENV ASSETS_CACHE_CONTROL="max-age=2592000"
ENV PUBLIC_ENABLE_PREVIEW_EDITOR=true

WORKDIR /build

COPY . .

RUN npm ci
RUN npm run db:make-migration
RUN npm run db:init
RUN npm run db:import
RUN npm run build


# Worker stage
FROM node:16 AS worker

ENV HOST=http://localhost:4000
ENV BURDY_HOST=http://localhost:4000
ENV PREVIEW_BASE_URL=http://localhost:4000
ENV NEXT_PUBLIC_CMS_URL=http://localhost:4000
ENV NEXT_PUBLIC_HOST=https://localhost:4000
ENV ASSETS_CACHE_CONTROL="max-age=2592000"
ENV PUBLIC_ENABLE_PREVIEW_EDITOR=true

WORKDIR /app

COPY --from=builder /build/node_modules ./node_modules
COPY --from=builder /build/.next ./.next
COPY --from=builder /build/burdy ./burdy
COPY --from=builder /build/package.json ./package.json

EXPOSE 4000

CMD npm run start
