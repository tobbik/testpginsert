#!/bin/bash
OLDPWD=$(pwd)

# create the dictionary
if [ ! -d venv ]; then
	 virtualenv venv
fi
source $(dirname $0)/venv/bin/activate

pip3 install -r requirements.txt
python makewords.py


cd $OLDPWD
