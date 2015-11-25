#!/bin/bash

OLDPWD=$(pwd)

cd psycopg
python makewords.py


cd $OLDPWD
