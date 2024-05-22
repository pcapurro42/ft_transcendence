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
        'from': requestJson['login'],
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
	return HttpResponse('Answer well-received.')


def getAnswer(request):
	if invitation_codes[request.body.decode('utf-8')] != None and invitation_codes[request.body.decode('utf-8')]['answer'] != None:
		return HttpResponse(invitation_codes[request.body.decode('utf-8')]['answer'])
	else:
		return HttpResponseNotFound('Error: no answer received from guest.')

def getOffer(request):
	if invitation_codes[request.body.decode('utf-8')] != None and invitation_codes[request.body.decode('utf-8')]['offer'] != None:
		return HttpResponse(invitation_codes[request.body.decode('utf-8')]['offer'])
	else:
		return HttpResponseNotFound('Error: offer not found.')
