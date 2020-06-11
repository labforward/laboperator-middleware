################################
# Stage: Builder
################################
FROM node:lts-alpine as builder

ARG environment=production
ENV NODE_ENV=$environment
ENV NODE_OPTIONS=--max_old_space_size=4096

RUN apk --update --no-cache add \
    build-base \
    git \
    yarn \
 && rm -rf /var/lib/apt/lists/*

RUN mkdir /middleware
WORKDIR /middleware

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --non-interactive

COPY . /middleware

################################
# Stage: Final (production/test)
################################
FROM node:8-alpine as final

ARG environment=production
ENV NODE_ENV=$environment

RUN apk --update --no-cache add \
    bash \
 && rm -rf /var/lib/apt/lists/*

# Copy app with gems from former build stage
COPY --from=Builder /middleware /middleware

WORKDIR /middleware

CMD ["npx", "laboperator-middleware", "server"]
