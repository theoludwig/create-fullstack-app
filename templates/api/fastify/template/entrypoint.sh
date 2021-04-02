#!/bin/bash

cp --recursive /usr/src/cache/node_modules/. /usr/src/api/node_modules/
npm run build
npm run develop
