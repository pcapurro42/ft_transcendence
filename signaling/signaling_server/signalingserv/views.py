from django.http import JsonResponse, HttpResponseBadRequest, HttpResponse, HttpResponseServerError
from django.middleware.csrf import get_token
from http.client import HTTPSConnection
from urllib.parse import urlencode
from . import invitation_code
import json
import os

CLIENT_SECRET = os.environ.get('CLIENT_SECRET')
CLIENT_ID = os.environ.get('CLIENT_ID')
def home(request):
		return HttpResponse("test")

def signal(request):
		return HttpResponse(
			content= invitation_code.generate_code(request))

def sendToken(response):
	try:
		accessTokenJson = json.loads(response)
		accessToken = accessTokenJson['access_token']
		conn = HTTPSConnection('api.intra.42.fr')

		headers = {'Authorization' : f'Bearer {accessToken}'}
		conn.request('GET', '/v2/me', headers=headers)
		response = conn.getresponse().read().decode()
		return HttpResponse(response)


	except Exception as error:
			return HttpResponseServerError(str(error))

def token(request):
		try:

			data = {
				'client_id': CLIENT_ID,
				'code': request.body,
				'grant_type': 'authorization_code',
				'redirect_uri': 'https://127.0.0.1',
				'client_secret': CLIENT_SECRET,
			}

			conn = HTTPSConnection('api.intra.42.fr')
			headers = {'Content-Type': 'application/x-www-form-urlencoded'}
			form_data = urlencode(data)

			conn.request('POST', '/oauth/token', body=form_data, headers=headers)

			response = conn.getresponse().read().decode()
			return sendToken(response)

		except Exception as error:
			return HttpResponseServerError(str(error))


def csrf(request):
	csrf_token = get_token(request)
	return JsonResponse({'csrfToken': csrf_token})
