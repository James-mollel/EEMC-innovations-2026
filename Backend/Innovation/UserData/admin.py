import csv
from django import forms
from django.contrib import admin
from django.contrib import messages
from django.core.mail import send_mail
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.utils.html import format_html
from .models import IdeasModel
from django.conf import settings

admin.site.site_header = "EEMC DODOMA Admin Portal"
admin.site.site_title = "EEMC DODOMA"
admin.site.index_title = "Usimamizi wa Ideas na Maombi"

class SendEmailForm(forms.Form):
    subject = forms.CharField(max_length=255, required=True, widget=forms.TextInput(attrs={'style': 'width: 100%; padding: 8px; box-sizing: border-box;'}))
    message = forms.CharField(widget=forms.Textarea(attrs={'rows': 10, 'cols': 80, 'style': 'width: 100%; padding: 8px; box-sizing: border-box;'}), required=True)

def export_ideas_to_csv(modeladmin, request, queryset):
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="EEMC_DODOMA_Ideas_Export.csv"'
    writer = csv.writer(response)
    writer.writerow(['Submission ID', 'Full Name', 'Phone Number', 'Email Address', 'Institution/College', 'Course', 'Idea Type', 'Title of Idea', 'Status', 'Submission Date'])
    for idea in queryset:
        date_str = idea.created_at.strftime('%Y-%m-%d %H:%M') if idea.created_at else "N/A"
        writer.writerow([idea.submission_id, idea.full_name, idea.phone_number, idea.email_address, idea.institution_or_college, idea.course_or_field_of_study, idea.type_of_idea, idea.title_of_idea, idea.status, date_str])
    return response
export_ideas_to_csv.short_description = "📥 Export Selected Ideas to CSV (Excel)"

@admin.register(IdeasModel)
class AdminIdeas(admin.ModelAdmin):
    list_display = ["full_name", "phone_number","email_address","institution_or_college","course_or_field_of_study", "type_of_idea","title_of_idea", "submission_id", "status", "created_at"]
    list_filter = ["status", "type_of_idea", "created_at"]
    search_fields = ["submission_id", "title_of_idea", "full_name"]
    ordering = ["-created_at"]
    actions = [export_ideas_to_csv, 'send_custom_email_action']
    
    # TUMEONDOA readonly_fields za picha na document kwa sababu hazipo kwenye Model

    fieldsets = (
        ('Taarifa Binafsi', {
            'fields': ('status', 'submission_id', 'full_name', 'phone_number', 'email_address', 'institution_or_college', 'course_or_field_of_study')
        }),
        ('Aina ya Wazo', {
            'fields': ('type_of_idea', 'title_of_idea', 'problem_statement', 'solution_description', 'target_users', 'uniqueness_of_the_idea', 'implementation_plan')
        }),
        ('Uwezo wa Biashara', {
            'fields': ('estimated_cost_to_start', 'potential_market', 'expected_impact')
        }),
        # TUMEONDOA sehemu ya Nyaraka na Picha kwa sababu hazipo kwenye Models.py
    )

    def send_custom_email_action(self, request, queryset):
        if 'apply' in request.POST:
            subject = request.POST.get('subject')
            message_template = request.POST.get('message')
            email_count = 0
            if subject and message_template:
                for obj in queryset:
                    if obj.email_address:
                        personalized_message = f"Hello {obj.full_name},\n\n{message_template}"
                        try:
                            send_mail(subject=subject, message=personalized_message, from_email=settings.DEFAULT_FROM_EMAIL, recipient_list=[obj.email_address], fail_silently=False)
                            email_count += 1
                        except Exception as e:
                            self.message_user(request, f"Failed to send email to {obj.email_address}: {str(e)}", messages.ERROR)
                self.message_user(request, f"🎉 Email was successfully sent to {email_count} users!", messages.SUCCESS)
                return HttpResponseRedirect(request.get_full_path())
        else:
            return render(request, 'admin/send_email_form.html', context={'objects': queryset, 'title': f"Send emails to {queryset.count()} users", 'action_checkbox_name': admin.helpers.ACTION_CHECKBOX_NAME})
    send_custom_email_action.short_description = "✉️ Send customized email to selected candidates"