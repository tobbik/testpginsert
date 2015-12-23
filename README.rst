Test Postgres DB insert Speed
=============================

Reason
------

Trying to compare Postgres driver performance in different languages/frameworks.
It tries to insert am vcertain amount of values into th database, utilizing and
requiring foreign key constraints, which requires to read results back befor
more inserting can be done.

Setup
-----

It requires a docker Setup to install a postgres DB or you provide your own
connectionstring.
   
   - run reset_db.sh to reinstall docker instance and start and wipe DB

Then run 'make setup' which does the following steps:

 - setup the nodejs environments (npm install)
 - setup the python virtualenv and downloads the needed packages (pip3 install)
 - be aware that the numpy install takes a long time (~10min) depending on your
   machine
 - create the common dictionary for the phrase generator


Run
---

   - in the psychopg directory activate the virtualenv and 'make run'
   - in node-* directries just run make run
