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
    yarn

RUN mkdir /middleware
WORKDIR /middleware

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --non-interactive

RUN cp ./node_modules/laboperator-middleware/docker-entrypoint.sh ./
COPY . /middleware

################################
# Stage: Final (production/test)
################################
FROM node:lts-alpine as final

ARG environment=production
ENV NODE_ENV=$environment
# https://nodejs.org/api/cli.html#cli_node_extra_ca_certs_file
ENV NODE_EXTRA_CA_CERTS=/etc/ssl/certs/ca-certificates.crt

RUN apk --update --no-cache add \
    bash \
    ca-certificates \
 && rm -rf /var/lib/apt/lists/* \
 && rm -rf /var/cache/apk/*

COPY --from=Builder /middleware /middleware

WORKDIR /middleware

ENTRYPOINT ["sh", "docker-entrypoint.sh"]
CMD ["npx", "laboperator-middleware", "server"]
