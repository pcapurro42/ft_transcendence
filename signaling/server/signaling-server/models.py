from django.db import models

class UserInfo(models.Model):
	login = models.CharField(max_length=50)
	token = models.CharField(max_length=40)


	def __str__(self):
		return self.login
	class Meta:
		app_label = 'signaling'
