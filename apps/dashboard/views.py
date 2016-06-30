from django.shortcuts import render
from django.views.generic.base import TemplateView

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.dashboard import models
from apps.dashboard import serializers  



class IndexView(TemplateView):

	template_name = 'index.html'

	def get_context_data(self, **kwargs):

		context = super(IndexView, self).get_context_data(**kwargs)
		
		return context


class DriverList(APIView):
	"""
	List all snippets, or create a new snippet.
	"""
	def get(self, request, format=None):
		drivers = models.Driver.objects.all()
		serializer = serializers.DriverListSerializer(drivers, many=True)
		print "driver serializer data = ",serializer.data
		return Response(serializer.data)


class DriverDetail(APIView):
	"""
	Retrieve, update or delete a snippet instance.
	"""
	def get_object(self, pk):
		try:
			return models.Driver.objects.get(pk=pk)
		except models.Driver.DoesNotExist:
			raise Http404

	def get(self, request, pk, format=None):
		driver = self.get_object(pk)
		serializer = serializers.DriverDetailSerializer(driver)
		return Response(serializer.data)


class TripList(APIView):
	"""
	List all snippets, or create a new snippet.
	"""
	def get(self, request, pk, format=None):

		trips = models.Trip.objects.filter(driver=pk)
		serializer = serializers.TripListSerializer(trips, many=True)
		print "trip serializer data = ",serializer.data
		return Response(serializer.data)

class TripDetail(APIView):
	"""
	Retrieve, update or delete a snippet instance.
	"""
	def get_object(self, pk):
		try:
			return models.Trip.objects.get(pk=pk)
		except models.Trip.DoesNotExist:
			raise Http404

	def get(self, request, pk, format=None):
		trip = self.get_object(pk)
		serializer = serializers.TripDetailSerializer(trip)
		return Response(serializer.data)

