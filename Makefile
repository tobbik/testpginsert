NODE_PG=node-pg
NODE_PQ=node-pq
PSYCOPG=psycopg

setup:
	$(MAKE) -C $(NODE_PG) setup
	$(MAKE) -C $(NODE_PQ) setup
	$(MAKE) -C $(PSYCOPG) setup

run:
	$(MAKE) -C $(NODE_PG) run
	$(MAKE) -C $(NODE_PQ) run
	$(MAKE) -C $(PSYCOPG) run


clean:
	$(MAKE) -C $(NODE_PG) clean
	$(MAKE) -C $(NODE_PQ) clean
	$(MAKE) -C $(PSYCOPG) clean
