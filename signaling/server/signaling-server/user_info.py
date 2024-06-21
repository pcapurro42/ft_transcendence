from .models import UserInfo
from django.core.exceptions import ObjectDoesNotExist
from django.core.serializers import serialize
from django.http import HttpResponse
import json
from django.http import JsonResponse, HttpResponse, HttpResponseServerError


def verifyUser(userJson):
	if UserInfo.objects.filter(login = userJson['login'], token = userJson['token']):
		return True
	return False

def getOrCreateUser(response):
	try:
		user_info = UserInfo.objects.get(login = response['login'])
		user_info.token = response['token']
		user_info.save()
	except ObjectDoesNotExist:
		user_info = UserInfo(
			login = response['login'],
			token = response['token'],
		)
		user_info.save()

	return serialize('json', [user_info])

def storeUserStatistics(request):
	request = json.loads(request.body.decode())
	if verifyUser(request) is True:
		user_info = UserInfo.objects.get(login = request['login'])
		user_info.ballDistance = request['ballDistance']
		user_info.ballReceived = request['ballReceived']
		user_info.ballReturned = request['ballReturned']
		user_info.bonusTaken = request['bonusTaken']
		user_info.bonusTotal = request['bonusTotal']
		user_info.gamesPlayedNb = request['gamesPlayedNb']
		user_info.gameHistory = request['gameHistory']
		user_info.loseGameNb = request['loseGameNb']
		user_info.wonGamesNb = request['wonGamesNb']
		user_info.save()
		return HttpResponse(status = 200)
	else:
		return HttpResponse(status = 500)

def retrieveUser(request):
	request = request.body.decode()
	requestJson = json.loads(request)
	if verifyUser(requestJson) is True:
		response = getOrCreateUser(requestJson)
		return HttpResponse(response, content_type = 'application/json', status=200)
	else:
		return HttpResponse(status=500)

def deleteUser(request):
	request = request.body.decode()
	requestJson = json.loads(request)
	if verifyUser(requestJson) is True:
		user = UserInfo.objects.get(login=requestJson['login'])
		user.delete()
		return HttpResponse(status=200)
	else:
		return HttpResponseServerError(status=404)

