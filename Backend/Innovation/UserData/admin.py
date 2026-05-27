from django.contrib import admin
from . models import IdeasModel
import csv
from django.http import HttpResponse



def export_ideas_to_csv(modeladmin, request, queryset):
 
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="EEMC_UDOM_Ideas_Export.csv"'
    
    writer = csv.writer(response)
    

    writer.writerow([
        'Submission ID', 'Full Name', 'Phone Number', 'Email Address', 
        'Institution/College', 'Course', 'Idea Type', 'Title of Idea', 
        'Status', 'Submission Date'
    ])
    
   
    for idea in queryset:
        writer.writerow([
            idea.submission_id,
            idea.full_name,
            idea.phone_number,
            idea.email_address,
            idea.institution_or_college,
            idea.course_or_field_of_study,
            idea.type_of_idea,
            idea.title_of_idea,
            idea.status,
            idea.created_at.strftime('%Y-%m-%d %H:%M') 
        ])
        
    return response

export_ideas_to_csv.short_description = "📥 Export Selected Ideas to CSV (Excel)"





@admin.register(IdeasModel)
class AdminIdeas(admin.ModelAdmin):
    list_display = ["full_name","phone_number","type_of_idea","submission_id","status","created_at"]
    list_filter = ["status","type_of_idea","created_at"]
    search_fields = ["submission_id","title_of_idea","full_name"]
    ordering = ["-created_at"]
    exclude = ['current_step', 'is_complete']
    actions = [export_ideas_to_csv]

