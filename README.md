# YAPA (Yet Another Podcast App)

## Running Locally

### Prerequisites

- git (Preinstalled on most mac and linux machines)
- node (I recommend [nvm](https://github.com/nvm-sh/nvm) for handling multiple
node versions and upgrading node when the time comes)
<!-- TODO: confirm if docker install comes with docker-compose -->
- [docker](https://docs.docker.com/get-docker/) (and docker-compose, which I'm
  pretty sure just comes with Docker)

### Run

_Start in the directory you wish for the project to live_

1. clone the repo (i.e. `git clone git@github.com:sambigelow/yapa.git`)
2. From the project root (`cd ./yapa`)
   1. spin up the nginx docker container
      1. Make sure docker is already running
      2. `docker-compose up`
3. From the api (`cd ./api`)
   1. install dependencies (`npm i`)
   2. start the server (`npm start`)
4. From the frontend (`cd ../frontend`)
   1. install dependencies (`npm i`)
   2. start the dev server (`npm run dev`)
5. It's running! visit `http://localhost:8080` for "Hello, World!"
