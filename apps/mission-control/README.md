# Mission Control

Look at the [nuxt 3 documentation](https://v3.nuxtjs.org) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install
```

Add a `.env`-file in root with the following config

```bash
CHAIN_NET=test
INFURA_ID=8e5cebf5c2304f8a88989bee0c59210b
```

## Development Server

Start the development server on http://localhost:3000

```bash
yarn run dev
```

## Release

Netlify deploying continously from `master`

Staging is released continously from `develop` on https://ix-mission-control-staging.netlify.app/
