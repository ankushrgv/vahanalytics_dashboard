from __future__ import unicode_literals

from django.db import models
from mongoengine import *

# Create your models here.

class Acceleration(EmbeddedDocument):
	time_axis = LongField()
	acc = FloatField()

class Event(EmbeddedDocument):
	label = StringField(max_length=20)
	value = IntField()

class Score(EmbeddedDocument):
	time_axis = LongField()
	score = IntField()

class Trip(Document):
	driver = StringField()
	acceleration = ListField(EmbeddedDocumentField(Acceleration))
	events = ListField(EmbeddedDocumentField(Event))
	scores = ListField(EmbeddedDocumentField(Score))

class Driver(Document):
	first_name = StringField(max_length=15)
	last_name = StringField(max_length=15)
	age = IntField()
	contact_no = StringField(max_length=10)
	city = StringField(max_length=25)