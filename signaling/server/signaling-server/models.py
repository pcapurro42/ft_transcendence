from django.db import models

class UserInfo(models.Model):
	hashLogin = models.CharField(max_length=255)
	login = models.CharField(max_length=255)
	token = models.CharField(max_length=40)

	isAnonymized = models.BooleanField(default=False)

	gamesPlayedNb = models.IntegerField(default=0)
	wonGamesNb = models.IntegerField(default=0)
	loseGameNb = models.IntegerField(default=0)
	ballDistance = models.IntegerField(default=0)
	ballReturned = models.IntegerField(default=0)
	ballReceived = models.IntegerField(default=0)
	bonusTaken = models.IntegerField(default=0)
	bonusTotal = models.IntegerField(default=0)
	gameHistory = models.JSONField(default = None, null=True)

	def __str__(self):
		return self.login
	class Meta:
		app_label = 'signaling'
