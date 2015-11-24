#!/bin/bash
POSTGRESNAME=postgres1
# create docker image if i doesn't exist
docker ps -a | grep -qi "$POSTGRESNAME" || \
	docker run -p 5432:5432 --name "$POSTGRESNAME" -e POSTGRES_PASSWORD=password -d postgres && \
	sleep 5s

# start the docker container if it is not running
docker ps | grep -qi "$POSTGRESNAME" || docker start "$POSTGRESNAME" && sleep 5s

PGPASSWORD=password psql -h localhost -U postgres -f inserttest.sql
