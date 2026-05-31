import uuid

from django.db import models
from uuid6 import uuid7


# Create your models here.


class IdeasModel(models.Model):

    IDEA_TYPE = [
        ("Innovation","Innovation Idea"),
        ("Business","Business Idea"),
    ]

    STATUS = [
        ("Pending","Pending"),
        ("under_review","Under Review"),
        ("Approved","Approved"),
        ("Rejected","Rejected"),
       
    ]
    id = models.UUIDField (
        primary_key=True, 
        default=uuid7, 
        editable=False
    ) 

    status = models.CharField(max_length=25, choices=STATUS, default='Pending')
    
    submission_id = models.CharField(blank=True, null=True, unique=True, max_length=25)
    # 1. section one pi 
    full_name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=20)
    email_address = models.EmailField()
    institution_or_college = models.CharField(max_length=255)
    course_or_field_of_study = models.CharField(max_length=255)

    # 2. section two type of idea 
    type_of_idea = models.CharField(max_length=20, choices=IDEA_TYPE, blank=True, null=True)

    #3. Idea description 
    title_of_idea = models.CharField(max_length=255, blank=True, null=True)
    problem_statement = models.TextField(blank=True, null=True)
    solution_description = models.TextField(blank=True, null=True)
    target_users = models.TextField(blank=True, null=True)
    uniqueness_of_the_idea = models.TextField(blank=True, null=True)
    implementation_plan = models.TextField(blank=True, null=True)

    #4.busness potential (For Business Idea)
    estimated_cost_to_start = models.CharField(max_length=255, blank=True, null=True, help_text="For Innovation idea is null/empty")
    potential_market = models.TextField(blank=True, null=True, help_text="For Innovation idea is null/empty")
    expected_impact = models.TextField(blank=True, null=True, help_text="For Innovation idea is null/empty")




  
    

    current_step = models.IntegerField(default=1, help_text="User tracking steps ")
    is_complete = models.BooleanField(default=False, help_text="if user complete to fill a form or not")

    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.submission_id:
            while True:
                generated_id = f"EEMC-{uuid.uuid4().hex[:10].upper()}"
                
                if not IdeasModel.objects.filter(submission_id=generated_id).exists():
                    self.submission_id = generated_id
                    break
                 
        return super().save(*args, **kwargs)


    def __str__(self):
        return f" {self.full_name}'s Ideas"








