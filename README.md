# React BTC

_In this challenge we want you to build a simple app, using either ReactJS or React Native, which retrieves address and transaction information from the BTC blockchain. It also allows a user to subscribe for changes to specific hashes. Each subscribed hash should generate a notification on the UI. Furthermore, the user should be able to select in which currency the values should be displayed (USD, EUR or BTC)._

## Requirements

- node@^16
- yarn@^3

## Install

Be sure you're using `yarn@^3` before installing the dependencies.

```sh
yarn set version latest
```

Then you can install deps with

```sh
yarn
```

## Start

To run the app in "development" mode with `webpack-dev-server` _watching_ for changes

```sh
yarn develop
```

and the browser should open at [localhost:4002](http://localhost:4002)

## Build

The `NODE_ENV` value in `.env` is `development` and this cause the app to load local fixtures for blockchain entities. Changing the value of `NODE_ENV` to `production` will perform requests to `blockchain.info` and you may hit API rate limit.

If you want to test `blockchain.info`

```sh
yarn build:prod
```

If you want to play with development data

```sh
yarn build
```

After webpack has built the app you can serve the output with `yarn serve`.

## Test

Test are configured using [jest](https://jestjs.io/) and [ts-jest](https://kulshekhar.github.io/ts-jest/) to support TypeScript in test files.

To render and interact with react components I used [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro) and I mocked all the requests performed by [axios](https://axios-http.com/) with [jest-mock-axios](https://github.com/knee-cola/jest-mock-axios).

Run tests

```sh
yarn test
```

Run tests in watch mode

```sh
yarn test --watchAll
```

Run test with code coverage

```sh
yarn test --coverage
```
