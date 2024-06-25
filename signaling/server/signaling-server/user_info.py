from . import utils
from .models import UserInfo
from django.core.exceptions import ObjectDoesNotExist
from django.core.serializers import serialize
from django.http import HttpResponse
import json
import os
from django.http import HttpResponse, HttpResponseServerError

#
def verifyUser(userJson):

	if UserInfo.objects.filter(hashLogin = userJson['hashLogin'], token = userJson['token']):
		return True
	return False

def getOrCreateUser(response):
	try:
		if utils.parse_input(response['hashLogin']) is not True:
			return HttpResponseServerError("Error: Forbidden characters in request.\n")
		user_info = UserInfo.objects.get(hashLogin = response['hashLogin'])
		if user_info.isAnonymized is True:
			user_info.login = "Anon"
		else:
			if 'login' in response:
				user_info.login = response['login']
				if utils.parse_input(response['login']) is not True:
					return HttpResponseServerError("Error: Forbidden characters in request.\n")
		user_info.token = response['token']
		if utils.parse_input(response['token']) is not True:
			return HttpResponseServerError("Error: Forbidden characters in request.\n")
		user_info.save()
	except ObjectDoesNotExist:
		user_info = UserInfo(
			hashLogin = response['hashLogin'],
			login = response['login'],
			token = response['token'],
		)
		user_info.save()

	return serialize('json', [user_info])

def storeUserStatistics(request):
	request = request.body.decode()
	requestJson = json.loads(request)
	if utils.sanitizeRequest(requestJson) is not True:
		return HttpResponseServerError(utils.sanitizeRequest(request))

	if verifyUser(requestJson) is True:
		user_info = UserInfo.objects.get(hashLogin = requestJson['hashLogin'])
		user_info.ballDistance += requestJson['ballDistance']
		user_info.ballReceived += requestJson['ballReceived']
		user_info.ballReturned += requestJson['ballReturned']
		user_info.bonusTaken += requestJson['bonusTaken']
		user_info.bonusTotal += requestJson['bonusTotal']
		user_info.gamesPlayedNb += requestJson['gamesPlayedNb']
		user_info.gameHistory = requestJson['gameHistory']
		user_info.loseGameNb += requestJson['loseGameNb']
		user_info.wonGamesNb += requestJson['wonGamesNb']
		user_info.save()
		return HttpResponse(status = 200)
	else:
		return HttpResponse(status = 500)

def retrieveUser(request):
	request = request.body.decode()
	requestJson = json.loads(request)

	if utils.sanitizeRequest(requestJson) is not True:
		return HttpResponse(utils.sanitizeRequest(requestJson))

	if verifyUser(requestJson) is True:
		user = UserInfo.objects.get(hashLogin=requestJson['hashLogin'])
		response = getOrCreateUser(requestJson)
		if user.gameHistory is not None:
			user.gameHistory = utils.updateGameHistory(user.gameHistory, user.login)
			user.save()
		return HttpResponse(response, content_type = 'application/json', status=200)
	else:
		return HttpResponse(status=500)

def unanonymizeUser(request):
	requestJson = json.loads(request.body.decode())
	if utils.sanitizeRequest(requestJson) is False:
		return HttpResponseServerError("Error: Forbidden characters in request.\n")

	if verifyUser(requestJson) is True:
		user = UserInfo.objects.get(hashLogin=requestJson['hashLogin'])
		user.isAnonymized = False
		user.save()
		return HttpResponse(status=200)
	else:
		return HttpResponse(status=500)

def anonymizeUser(request):
	requestJson = json.loads(request.body.decode())
	if utils.sanitizeRequest(requestJson) is False:
		return HttpResponseServerError("Error: Forbidden characters in request.\n")

	if verifyUser(requestJson) is True:
		user = UserInfo.objects.get(hashLogin=requestJson['hashLogin'])
		user.login = "Anon"
		user.isAnonymized = True
		if user.gameHistory is not None:
			user.gameHistory = utils.updateGameHistory(user.gameHistory, user.login)
		user.save()
		return HttpResponse(status=200)
	else:
			return HttpResponse(status=500)

def deleteUser(request):
	request = request.body.decode()
	requestJson = json.loads(request)
	if utils.sanitizeRequest(requestJson) is False:
		return HttpResponseServerError("Error: Forbidden characters in request.\n")
	if verifyUser(requestJson) is True:
		user = UserInfo.objects.get(hashLogin=requestJson['hashLogin'])
		user.delete()
		return HttpResponse(status=200)
	else:
		return HttpResponse(status=404)

