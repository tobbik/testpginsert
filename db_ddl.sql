\connect inserttest

-- Drop tables in (reversed) dependency order
DROP TABLE IF EXISTS sublevel;
DROP TABLE IF EXISTS toplevel;
DROP TABLE IF EXISTS toplevelj;


CREATE TABLE toplevel (
	toplevel_id     serial                        PRIMARY KEY,
	name            TEXT                ,--NOT NULL,
	tag1            TEXT                ,--NOT NULL,
	tag2            TEXT                ,--NOT NULL,
	groups          INTEGER             ,--NOT NULL,
	upc             TEXT                ,--NOT NULL,
	valid_since     TIMESTAMP,
	has_feature     BOOLEAN             ,--NOT NULL,
	owner           TEXT                ,--NOT NULL,
	master_tag      TEXT                ,--NOT NULL,
	description1    TEXT                ,--NOT NULL,
	description2    TEXT                ,--NOT NULL,
	created_at      TIMESTAMP
);


CREATE TABLE sublevel (
	sublevel_id     serial                        PRIMARY KEY,
	toplevel_id     INTEGER    REFERENCES toplevel( toplevel_id ) NOT NULL,
	grouping        INTEGER             ,--NOT NULL,
	order_number    INTEGER             ,--NOT NULL,
	is_valid        BOOLEAN             ,--NOT NULL,
	upc             TEXT                ,--NOT NULL,
	name            TEXT                ,--NOT NULL,
	tag1            TEXT                ,--NOT NULL,
	tag2            TEXT                ,--NOT NULL,
	owner           TEXT                ,--NOT NULL,
	master_tag      TEXT                ,--NOT NULL,
	description2    TEXT                ,--NOT NULL,
	description1    TEXT                ,--NOT NULL,
	length          INTEGER
);



CREATE TABLE toplevelj (
	toplevel_id     serial                        PRIMARY KEY,
	groups          INTEGER              NOT NULL,
	upc             TEXT                 NOT NULL,
	value           jsonb                NOT NULL,
	created_at      TIMESTAMP	          NOT NULL
);

