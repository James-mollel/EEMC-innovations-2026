from UserData.views import InnovationIdeaCreateStepOneViews, InnovationIdeaUpdateNextStepsView
from django.urls import path

urlpatterns = [
    path("create/idea/", InnovationIdeaCreateStepOneViews.as_view(), name="create_new_idea_step_one" ),
    path("update/idea/<uuid:id>/", InnovationIdeaUpdateNextStepsView.as_view(), name="create_new_idea_step_one" ),
] 