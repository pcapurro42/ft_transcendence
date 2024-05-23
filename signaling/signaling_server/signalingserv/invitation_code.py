from datetime import datetime, timedelta
from django.http import JsonResponse, HttpResponseBadRequest, HttpResponse, HttpResponseNotFound
import secrets
import string
import json


invitation_codes = {}

def remove_expired_code():
	time = datetime.now()
	invitation_list = list(invitation_codes.keys())

	for i in range(len(invitation_list)):
		key = invitation_list[i]
		if time >= invitation_codes[key]['expires_at']:
			del invitation_codes[key]


def generate_code(request):
	alphabet = string.ascii_letters + (string.digits * 3)

	str = ''.join(secrets.choice(alphabet) for i in range(10))

	requestJson = json.loads(request.body)
	code = requestJson['login'] + '_' + str

	invitation_codes[code] = {
        'host_login': requestJson['login'],
		'guest_login': None,
		'offer': requestJson['offer'],
		'answer': None,
        'created_at': datetime.now(),
        'expires_at': datetime.now() + timedelta(minutes=10)
    }
	remove_expired_code()
	return code

def postAnswer(request):
	requestJson = json.loads(request.body)
	answerJson = json.loads(requestJson['answer'])
	if invitation_codes.get(requestJson['code']) != None:
		invitation_codes[requestJson['code']]['answer'] = requestJson['answer']
		invitation_codes[requestJson['code']]['guest_login'] = requestJson['login']

	return HttpResponse('Answer well-received.')


def getAnswer(request):
	code = request.body.decode('utf-8')

	if invitation_codes[code] != None and invitation_codes[code]['answer'] != None:
		responseJson = {
			'login': invitation_codes[code]['guest_login'],
			'answer': invitation_codes[code]['answer']
		}
		return JsonResponse(responseJson)
	else:
		return HttpResponseNotFound('Error: no answer received from guest.')

def getOffer(request):
	code = request.body.decode('utf-8')

	if invitation_codes[code] != None and invitation_codes[code]['offer'] != None:
		responseJson = {
			'login': invitation_codes[code]['host_login'],
			'offer': invitation_codes[code]['offer'],
		}
		return JsonResponse(responseJson)
	else:
		return HttpResponseNotFound('Error: offer not found.')
