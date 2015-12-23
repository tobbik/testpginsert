VENV=venv

setup:
	bash activate.sh

run:
	bash run.sh
	#$(shell bash -c 'source $(dirname $0)/venv/bin/activate')
	#$(shell bash -c 'time python ingester.py')

clean:
	rm -rf $(VENV)
	rm -rf __pycache__
	rm -f ../words.txt
