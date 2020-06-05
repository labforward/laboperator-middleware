# laboperator-middleware

This repo is meant to be used as a dependency of specialized middleware between Laboperator and an external system.

By using it, each specialized middleware will be provided with:

- Laboperator API client (with authentication and common api helpers)
- express server
- mocha test runner (with api mock for offline development)

## Installation

- Install it as a dependency using:

  ```
  yarn add git+ssh://git@github.com:labforward/laboperator-middleware.git
  ```

- Run init:

  ```
  npx laboperator-middleware init
  ```

  Which will bootstrap your middleware with linters, tests, and sample routes.

- Replace the placeholder values in `config.yml` with actual values.
- Add the following to `package.json`:

  ```
  "importSort": {
    ".js, .jsx, .ts, .tsx": {
      "style": "labforward"
    }
  },
  ```

## Starting server

```
npx laboperator-middleware server
```

## Running test

```
npx laboperator-middleware test
```

You can also run it in watch mode:

```
npx laboperator-middleware test --watch
```
