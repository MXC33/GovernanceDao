# ix-apps

This is a yarn workspace app with `layers` and `apps`

## Structure

### Layers 

Layers are using [nuxt layers](https://nuxt.com/docs/guide/going-further/layers) that the `apps` can extend from. Right now there exists ix-base.

#### IX-base

This folder contains general composables, components and queries that can be useful for the ix-apps to use. For example, connecting the wallet, interacting with contracts, displaying token-connected data, parsing NFTs and so on.

### Apps 

Apps are extending the base and are built on top on ix-base. If you find yourself building something that can be useful for the whole ecosystem, be sure to move it to ix-base.


## Usave

Clone the repo. `cd` into the root of the project. `yarn install` installs the packages for all sub-repos.

To run `ix-base`. use `yarn run:layers`. To run `apps/marketplace`, use `yarn dev`. It's recommended to run both to keep things in sync. 

````
yarn install
````
