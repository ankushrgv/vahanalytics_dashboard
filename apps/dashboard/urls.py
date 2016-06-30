from django.conf.urls import url
# from django.contrib.auth.decorators import login_required

from apps.dashboard import views

urlpatterns = [
    url(r'^$',views.IndexView.as_view(), name='index'),
    url(r'^driverlist$',views.DriverList.as_view(), name='driverlist'),
    # url(r'^details/(?P<pk>[\w]+)$',views.DriverDetail.as_view(), name='driverdetails'),
    url(r'^triplist/(?P<pk>[\w]+)$',views.TripList.as_view(), name='triplist'),
    url(r'^tripdetails/(?P<pk>[\w]+)$',views.TripDetail.as_view(), name='tripdetails'),
    
]