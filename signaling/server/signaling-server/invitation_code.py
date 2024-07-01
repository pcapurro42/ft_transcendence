from datetime import datetime, timedelta
from django.http import JsonResponse, HttpResponseServerError, HttpResponse, HttpResponseNotFound
import secrets
import string
import json
import threading
import time
from . import user_info
from . import utils

invitation_codes = {}

def remove_expired_code():
	time = datetime.now()
	invitation_list = list(invitation_codes.keys())

	for i in range(len(invitation_list)):
		key = invitation_list[i]
		if time >= invitation_codes[key]['expires_at']:
			del invitation_codes[key]

def removeCodePlanner():
	while True:
		remove_expired_code()
		time.sleep(60)

cleanup_thread = threading.Thread(target=removeCodePlanner, daemon=True)
cleanup_thread.start()


def generate_code(request):
	alphabet = string.ascii_letters + (string.digits * 3)

	while True:
		str = ''.join(secrets.choice(alphabet) for i in range(10))
		requestJson = json.loads(request.body)
		code = requestJson['login'] + '_' + str

		if code not in invitation_codes:
			break
	if utils.parse_input(requestJson["login"]) is False:
		return 1

	invitation_codes[code] = {
        'host_login': requestJson['login'],
		'hashLogin' : requestJson['hashLogin'],
		'guest_login': None,
		'offer': requestJson['offer'],
		'answer': None,
        'created_at': datetime.now(),
        'expires_at': datetime.now() + timedelta(minutes=5)
    }
	return code

def postAnswer(request):
	requestJson = json.loads(request.body)
	answerJson = json.loads(requestJson['answer'])
	if invitation_codes.get(requestJson['code']) != None:
		if invitation_codes[requestJson['code']]['hashLogin'] == requestJson['hashLogin']:
			return HttpResponseServerError("Same Player Error")
		invitation_codes[requestJson['code']]['answer'] = requestJson['answer']
		invitation_codes[requestJson['code']]['guest_login'] = requestJson['login']

	return HttpResponse('Answer well-received.')


def getAnswer(request):
	reqJson = json.loads(request.body.decode('utf-8'))

	if user_info.verifyUser(reqJson) is False:
		return HttpResponseServerError('Error: Could not verify user identity.')

	if invitation_codes[reqJson['code']] != None and invitation_codes[reqJson['code']]['answer'] != None:
		responseJson = {
			'login': invitation_codes[reqJson['code']]['guest_login'],
			'answer': invitation_codes[reqJson['code']]['answer']
		}
		return JsonResponse(responseJson)
	else:
		return HttpResponseNotFound('Error: no answer received from guest.')

def getOffer(request):
	reqJson =  json.loads(request.body.decode('utf-8'))

	if user_info.verifyUser(reqJson) is False:
		return HttpResponseServerError('Error: Could not verify user identity.')

	if invitation_codes[reqJson['code']] != None and invitation_codes[reqJson['code']]['offer'] != None:
		responseJson = {
			'login': invitation_codes[reqJson['code']]['host_login'],
			'offer': invitation_codes[reqJson['code']]['offer'],
		}
		return JsonResponse(responseJson)
	else:
		return HttpResponseNotFound('Error: offer not found.')


