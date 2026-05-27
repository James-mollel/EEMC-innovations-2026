from django.shortcuts import render
from UserData.serializers import InnovationIdeasSerializer
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework import generics, status
from UserData.models import IdeasModel
from rest_framework.parsers import FormParser, MultiPartParser, JSONParser



# Create your views here.


# FOR FISTS STEP 
class InnovationIdeaCreateStepOneViews(generics.CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = InnovationIdeasSerializer


# FOR OTHER STEPS
class InnovationIdeaUpdateNextStepsView(generics.UpdateAPIView):
    permission_classes = [AllowAny]
    queryset = IdeasModel.objects.all()
    serializer_class = InnovationIdeasSerializer
    parser_classes = [JSONParser,MultiPartParser, FormParser]
    lookup_field = "id"
