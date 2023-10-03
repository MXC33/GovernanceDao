# IX-apps

This is a [yarn workspace](https://classic.yarnpkg.com/lang/en/docs/workspaces/) monorepo [nuxt 3](https://nuxt.com/) `layers` and `apps`.

## Structure

### Layers 

Layers are using [nuxt layers](https://nuxt.com/docs/guide/going-further/layers) that the `apps` can extend from. Right now there exists ix-base.

#### IX-base

This folder contains general composables, components and queries that can be useful for the ix-apps to use. For example, connecting the wallet, interacting with contracts, displaying token-connected data, parsing NFTs and so on.

### Apps 

Apps are extending the base and are built on top on ix-base. If you find yourself building something that can be useful for the whole ecosystem, be sure to move it to ix-base.


## Word of caution

Since we are using shared components and logics from `ix-base` in the apps, make sure that any changes to these files are thoruoughly tested and only submitted through a PR for review before merging into `dev` or `main`.

If you know that you are working with logic or components that could affect other apps, start them up to have a look that the same logic still works as expected there.


## Usage

### Pre-dependencies

Make sure you have `yarn` [installed](https://classic.yarnpkg.com/lang/en/docs/install/). 


### Project setup

Clone the repo. `cd` into the root of the project. `yarn install` installs the packages for all sub-repos.

#### .env

All the `apps` needs `.env`-files. Most common is the `CHAIN_NET` that informs the APIs and the contracts if we're using testnet or mainnet data.

To fetch assets from testnet, create the following file, for all apps, `apps/[APP]/.env` containing:

````CHAIN_NET=test````

For mainnet, use:

````CHAIN_NET=main````

Mission-control needs the INFURA_ID configured, set it to:

````INFURA_ID=8e5cebf5c2304f8a88989bee0c59210b````

#### Start all projects
Start the project using `yarn dev`, it will start up `apps` and `layers` together on different ports. The terminal will read which port each app starts on. 

#### Start a specific project

To start a specific app (along with layers/ix-base) use `yarn dev:[app]`. For example `yarn dev:mc`

Enjoy 🌼