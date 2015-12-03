#!/bin/bash
OLDPWD=$(pwd)

source $(dirname $0)/venv/bin/activate
time python ingester.py

cd $OLDPWD
