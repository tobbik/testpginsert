Setup
=====

Reason
------

Trying to compare Postgres driver performance in different languages/frameworks.
It tries to insert am vcertain amount of values into th database, utilizing and
requiring foreign key constraints, which requires to read results back befor
more inserting can be done.




installation
------------

 - install virtualenv (eg. pacman -S python-virtualenv)
 - setup virtualenv

   - virtualenv venv
   - source ./venv/bin/activate
   - pip3 install -r requirements.txt
