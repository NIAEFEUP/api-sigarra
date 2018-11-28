#!/bin/bash

docker-compose up --exit-code-from test $1 test mongo 
