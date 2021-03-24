#!/bin/bash

cp --recursive /usr/src/cache/node_modules/. /usr/src/app/node_modules/
npm run build
/wait && npm run develop
