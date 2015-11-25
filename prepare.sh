#!/bin/bash

OLDPWD=$(pwd)

# create the dictionary
cd psycopg
if [ ! -d venv ]; then
	 virtualenv venv
fi

source venv/bin/activate
pip3 install -r requirements.txt
python makewords.py

cd ../node-libpq
rm -rf node_modules
npm install


cd $OLDPWD
