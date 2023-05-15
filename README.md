# ix-apps

This is a [turborepo](https://turbo.build/repo) monorepo [nuxt 3](https://nuxt.com/) `layers` and `apps`.

## Structure

### Layers 

Layers are using [nuxt layers](https://nuxt.com/docs/guide/going-further/layers) that the `apps` can extend from. Right now there exists ix-base.

#### IX-base

This folder contains general composables, components and queries that can be useful for the ix-apps to use. For example, connecting the wallet, interacting with contracts, displaying token-connected data, parsing NFTs and so on.

### Apps 

Apps are extending the base and are built on top on ix-base. If you find yourself building something that can be useful for the whole ecosystem, be sure to move it to ix-base.


## Usage

### Pre-dependencies

Make sure you have `yarn` [installed](https://classic.yarnpkg.com/lang/en/docs/install/). Then install [turbo](https://turbo.build/repo) globally using `yarn global add turbo`

### Project setup

Clone the repo. `cd` into the root of the project. `yarn install` installs the packages for all sub-repos.

To fetch assets from testnet, create the following file `apps/marketplace-fullscreen/.env` containing:

````CHAIN_NET=test````

Start the project using `turbo dev`, it will start up `apps` and `layers` together on different ports.

Open `localhost:3000`

Enjoy 🌼