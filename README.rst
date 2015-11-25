Test Postgres DB access Speed
=============================

Reason
------

Trying to compare Postgres driver performance in different languages/frameworks.
It tries to insert am vcertain amount of values into th database, utilizing and
requiring foreign key constraints, which requires to read results back befor
more inserting can be done.




Run
---

It requires a docker Setup to install a postgres DB or you provide your own
connectionstring.
   
   - run reset_db.sh to reinstall docker instance and start and wipe DB
   - run prepare.sh to prepare the environments in the directories
     (virtualenv, node_modules, etc. )
