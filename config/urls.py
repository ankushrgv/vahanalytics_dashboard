"""
vahanalytics URL Configuration

"""

from django.conf.urls import url, include
from django.contrib import admin

urlpatterns = [

	## Apps urls
	url(r'^', include('apps.dashboard.urls', namespace='dashboard')),

	## Admin urls
    url(r'^admin/', admin.site.urls),
]
