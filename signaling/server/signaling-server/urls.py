"""signaling-server URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path
from . import views
from . import invitation_code
from . import user_info
urlpatterns = [
	path('csrf/', views.csrf),
	path('token/', views.token),
	path('sendtoken/', views.sendToken),
    path('signal/', views.signal),

	path('retrieve-user/', user_info.retrieveUser),
	path('delete-user/', user_info.deleteUser),
	path('store-stats/', user_info.storeUserStatistics),
	path('signal/getAnswer/', invitation_code.getAnswer),
	path('signal/getOffer/', invitation_code.getOffer),
]
