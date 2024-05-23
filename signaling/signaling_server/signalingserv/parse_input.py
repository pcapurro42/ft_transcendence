import json
import re

def parse_input(input):
	regex = re.compile(r'^[A-Za-z0-9\-_]+$')
	if not regex.match(input):
		return False
	return True
