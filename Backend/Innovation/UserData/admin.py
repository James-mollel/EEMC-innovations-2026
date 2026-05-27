from django.contrib import admin
from . models import IdeasModel
import csv
from django.http import HttpResponse
from django.utils.html import format_html



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
    list_display = ["full_name", "phone_number", "type_of_idea", "submission_id", "status", "created_at"]
    list_filter = ["status", "type_of_idea", "created_at"]
    search_fields = ["submission_id", "title_of_idea", "full_name"]
    ordering = ["-created_at"]
    
    # Hapa tunafafanua kuwa hizi ni readonly na zitakuwepo kwenye form view pekee
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
    show_prototype_preview.short_description = "Prototype Picture Preview (Click kuikuza)"

    def show_diagram_preview(self, obj):
        if obj.diagram:
            return format_html('<a href="{}" target="_blank"><img src="{}" style="max-height: 200px; border-radius: 8px; border: 1px solid #ddd;" /></a>', obj.diagram.url, obj.diagram.url)
        return "Hakuna Diagram"
    show_diagram_preview.short_description = "Diagram Preview (Click kuikuza)"

    # Tofauti na ulivyoishia mwanzo, hapa tunaziweka kwenye fieldsets vizuri
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
    

    actions = [export_ideas_to_csv]