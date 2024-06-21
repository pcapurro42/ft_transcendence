from .models import UserInfo
from django.core.exceptions import ObjectDoesNotExist

def storeUserCredentials(response):
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

	return

def verifyUser(userJson):
	if UserInfo.objects.filter(login = userJson['login'], token = userJson['token']):
		return True
	return False
