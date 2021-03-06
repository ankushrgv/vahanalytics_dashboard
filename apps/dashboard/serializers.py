from rest_framework import serializers
from rest_framework_mongoengine.serializers import DocumentSerializer
from rest_framework_mongoengine.serializers import EmbeddedDocumentSerializer

from apps.dashboard.models import Driver, Trip, Acceleration, Score, Event


class AccelerationSerializer(EmbeddedDocumentSerializer):

	class Meta:
		model = Acceleration


class EventSerializer(EmbeddedDocumentSerializer):

	class Meta:
		model = Event

class ScoreSerializer(EmbeddedDocumentSerializer):

	class Meta:
		model = Score


class TripListSerializer(DocumentSerializer):

	class Meta:
		model = Trip
		fields = ('id', 'driver')


class TripDetailSerializer(DocumentSerializer):

	acceleration = AccelerationSerializer(many=True)
	events = EventSerializer(many=True)
	scores = ScoreSerializer(many=True)

	class Meta:
		model = Trip
		fields = ('id','acceleration','events', 'scores')


class DriverListSerializer(DocumentSerializer):

	class Meta:
		model = Driver
		fields = ('id','first_name', 'last_name', 'age')


class DriverDetailSerializer(DocumentSerializer):

	class Meta:
		model = Driver
		fields = ('id', 'first_name', 'last_name', 'age', 'contact_no', 'city')