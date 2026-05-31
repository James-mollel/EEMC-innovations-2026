import csv
from django import forms
from django.contrib import admin
from django.contrib import messages
from django.core.mail import send_mail
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.utils.html import format_html
from .models import IdeasModel

# --- Badilisha Kichwa cha Django Admin Kuwa EEMC DODOMA ---
admin.site.site_header = "EEMC DODOMA Admin Portal"
admin.site.site_title = "EEMC DODOMA"
admin.site.index_title = "Usimamizi wa Ideas na Maombi"


# --- 1. Fomu ya Kuandika Email ---
class SendEmailForm(forms.Form):
    subject = forms.CharField(
        max_length=255, 
        required=True, 
        widget=forms.TextInput(attrs={'style': 'width: 100%; padding: 8px; box-sizing: border-box;'})
    )
    message = forms.CharField(
        widget=forms.Textarea(attrs={'rows': 10, 'cols': 80, 'style': 'width: 100%; padding: 8px; box-sizing: border-box;'}), 
        required=True
    )


# --- 2. Action ya Ku-export CSV ---
def export_ideas_to_csv(modeladmin, request, queryset):
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="EEMC_DODOMA_Ideas_Export.csv"'
    
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


# --- 3. Admin Registration ---
@admin.register(IdeasModel)
class AdminIdeas(admin.ModelAdmin):
    list_display = ["full_name", "phone_number", "type_of_idea", "submission_id", "status", "created_at"]
    list_filter = ["status", "type_of_idea", "created_at"]
    search_fields = ["submission_id", "title_of_idea", "full_name"]
    ordering = ["-created_at"]
    
    # Sajili ACTIONS zote mbili hapa kwa pamoja!
    actions = [export_ideas_to_csv, 'send_custom_email_action']
    
    readonly_fields = ('show_document_link', 'show_prototype_preview', 'show_diagram_preview')

    def show_document_link(self, obj):
        if obj.document:
            return format_html('<a href="{}" target="_blank" style="font-weight: bold; color: #264b5d;">📄 Fungua Document (Tab Mpya)</a>', obj.document.url)
        return "Hakuna Document"
    show_document_link.short_description = "Supporting Document"

    def show_prototype_preview(self, obj):
        if obj.prototype_picture:
            return format_html('<a href="{}" target="_blank"><img src="{}" style="max-height: 200px; border-radius: 8px; border: 1px solid #ddd;" /></a>', obj.prototype_picture.url, obj.prototype_picture.url)
        return "Hakuna Picha"
    show_prototype_preview.short_description = "Prototype Picture Preview"

    def show_diagram_preview(self, obj):
        if obj.diagram:
            return format_html('<a href="{}" target="_blank"><img src="{}" style="max-height: 200px; border-radius: 8px; border: 1px solid #ddd;" /></a>', obj.diagram.url, obj.diagram.url)
        return "Hakuna Diagram"
    show_diagram_preview.short_description = "Diagram Preview"

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
        ('Nyaraka na Picha original (Kwa ajili ya Upload Mpya)', {
            'fields': ('document', 'prototype_picture', 'diagram'),
        }),
        ('Muonekano wa Nyaraka na Picha (Previews)', {
            'fields': ('show_document_link', 'show_prototype_preview', 'show_diagram_preview'),
        }),
    )

    # Logic ya Kutuma Email kutoka Django Admin
    def send_custom_email_action(self, request, queryset):
        if 'apply' in request.POST:
            form = SendEmailForm(request.POST)
            if form.is_valid():
                subject = form.cleaned_data['subject']
                message_template = form.cleaned_data['message']
                email_count = 0
            
                for obj in queryset:
                    if obj.email_address:
                        personalized_message = f"Hello {obj.full_name},\n\n{message_template}"
                        try:
                            send_mail(
                                subject=subject,
                                message=personalized_message,
                                from_email=None, 
                                recipient_list=[obj.email_address],
                                fail_silently=False,
                            )
                            email_count += 1
                        except Exception as e:
                            self.message_user(request, f"Fail to send email to {obj.email_address}: {str(e)}", messages.ERROR)

                self.message_user(request, f"Email was successfully sent to {email_count} users!", messages.SUCCESS)
                return HttpResponseRedirect(request.get_full_path())
        else:
            form = SendEmailForm()
            
        return render(
            request,
            'admin/send_email_form.html',
            context={
                'objects': queryset,
                'form': form,
                'title': f"Send emails to {queryset.count()} users"
            }
        )
    
    send_custom_email_action.short_description = "✉️ Send customized email to selected candidates"