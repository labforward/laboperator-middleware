# middleware

This repo is meant to be used as a dependency of specialized middleware between Laboperator and an external system.

By using it, each specialized middleware will be provided with:

- Laboperator API client (with authentication and common api helpers)
- express server
- jest test runner (with api mock for offline development)

## Installation

- Install it as a dependency using:

  ```
  yarn add --dev laboperator-gmbh/middleware-development
  ```

- Run init:

  ```
  yarn middleware init
  ```

  Which will bootstrap your middleware with linters, tests, and sample routes.

- Replace the placeholder values in `config.yml` with actual values.

## Starting server

```
yarn middleware server
```

## Running test

```
yarn middleware test
```

## Building server

The library come with a utility for building the middleware into docker image. To do so, you can run

```
yarn middleware build <tag>
```

on which `tag` is the docker image tag that you would like to use for that specific build, e.g. `special-middleware:v1.0.0`.

You can then find the build in `build/special-middleware-v1.0.0.tar`
