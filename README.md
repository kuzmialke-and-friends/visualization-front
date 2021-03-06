# Visualization Front

[![Build Status](https://travis-ci.com/kuzmialke-and-friends/visualization-front.svg?branch=main)](https://travis-ci.com/kuzmialke-and-friends/visualization-front)

[Overly Dramatic Youtube Preview](https://youtu.be/TgPR_HpLWsI)
Since the app is not deployed to production the V1 can be checked out as a video preview.

_Note_: I didn't mean to record sound, but I guess the preview is overly dramatic now.
_Note_: app takes long time to fetch as it's fairly unoptimized

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Core Concepts](#core-concepts)
- [Getting started](#getting-started)

## Core Concepts

Visualization Front is a React app that uses D3 to visualize data. It uses [Visualization API](https://github.com/kuzmialke-and-friends/visualization-api) to fetch data, prepare and configure it so VF can render proper visualizations.

// TODO: define concepts in more detail

It can be previewed as a Lambda, but it is not currently deployed as such. In special cases we can deploy it for a short while if there is interest to preview. It might be slow at start as Heroku services warm up.

It was created thanks to the [Serverless React Boilerplate](https://github.com/arabold/serverless-react-boilerplate).

## Getting started

For local testing run the following command and open your web browser at http://localhost:4000/dev (with `dev` being the `stage` name configured in your `serverless.yml`).

```sh
BACKEND_URL=https://knf-visualization-api.herokuapp.com npm start
```

Testing is set up as well, using Jest and will execute all `*.test.ts` and `*.test.tsx` ffiles in the `src/` directory:

```sh
npm test
```

To deploy run:

```sh
npx sls deploy
```

To remove all AWS resources again run:

```sh
npx sls remove
```
