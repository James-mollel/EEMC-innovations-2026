from rest_framework import serializers
import re
from UserData.models import IdeasModel


class InnovationIdeasSerializer(serializers.ModelSerializer):
    class Meta:
        model = IdeasModel
        fields = (
            "id", 


            "full_name", "phone_number",
            "email_address", "institution_or_college",
            "course_or_field_of_study",


            "type_of_idea",


            "title_of_idea", "problem_statement",
            "solution_description", "target_users",
            "uniqueness_of_the_idea", "implementation_plan",


            "estimated_cost_to_start", "potential_market",
            "expected_impact",


            "current_step", "is_complete", "submission_id"
        )

        read_only_fields = ["id"]

    def validate(self, attrs):
        instance = self.instance

        # 1. step
        current_step = attrs.get("current_step", instance.current_step if instance else 1)

        # Section 1: Personal Information 
        phone_number = attrs.get("phone_number", instance.phone_number if instance else None)
        full_name = attrs.get("full_name", instance.full_name if instance else None)
        
        if current_step >= 1:
            if not full_name or len(full_name.strip()) < 3:
                raise serializers.ValidationError({"full_name": "Please enter a valid full name."})
                
            if phone_number:
                phone_regex = r'^\+255[6726]\d{8}$'
                if not re.match(phone_regex, phone_number):
                    raise serializers.ValidationError({"phone_number": "Enter a valid phone number starting with +255"})
            else:
                raise serializers.ValidationError({"phone_number": "Phone number is required."})


        # Section 2: Type of Idea
        type_of_idea = attrs.get("type_of_idea", instance.type_of_idea if instance else None)

        if current_step >= 2:
            if not type_of_idea:
                raise serializers.ValidationError({"type_of_idea": "You must select an idea type to continue."})
            if type_of_idea not in ["Innovation", "Business"]:
                raise serializers.ValidationError({"type_of_idea": "Invalid idea type."})

        # Section 3: Idea Description Validation
        if current_step >= 3:
            title = attrs.get("title_of_idea", instance.title_of_idea if instance else None)
            if not title or len(title.strip()) < 5:
                raise serializers.ValidationError({"title_of_idea": "Enter a valid title."})

            p_statement = attrs.get("problem_statement", instance.problem_statement if instance else None)
            if not p_statement or len(p_statement.strip()) < 10:
                raise serializers.ValidationError({"problem_statement": "Please enter a valid problem statement (at least 10 characters)."})
            
            s_desc = attrs.get("solution_description", instance.solution_description if instance else None)
            if not s_desc or len(s_desc.strip()) < 10:
                raise serializers.ValidationError({"solution_description": "Please enter a valid solution description."})
            
            t_users = attrs.get("target_users", instance.target_users if instance else None)
            if not t_users or len(t_users.strip()) < 3:
                raise serializers.ValidationError({"target_users": "Please enter target users."})

            unq_idea = attrs.get("uniqueness_of_the_idea", instance.uniqueness_of_the_idea if instance else None)
            if not unq_idea or len(unq_idea.strip()) < 10:
                raise serializers.ValidationError({"uniqueness_of_the_idea": "Please enter valid uniqueness of your idea."})

            imp_plan = attrs.get("implementation_plan", instance.implementation_plan if instance else None)
            if not imp_plan or len(imp_plan.strip()) < 10:
                raise serializers.ValidationError({"implementation_plan": "Please enter a valid implementation plan."})

        # Section 4: Business Potential (Inakaguliwa TU kama aina ni Business na amefika step 4)
        if type_of_idea == "Business" and current_step >= 4:
            estimated_cost = attrs.get("estimated_cost_to_start", instance.estimated_cost_to_start if instance else None)
            potential_market = attrs.get("potential_market", instance.potential_market if instance else None)
            expected_impact = attrs.get("expected_impact", instance.expected_impact if instance else None)

            if not estimated_cost:
                raise serializers.ValidationError({"estimated_cost_to_start": "Please enter an estimated cost to start."})
            if not potential_market:
                raise serializers.ValidationError({"potential_market": "Please enter a potential market."})
            if not expected_impact:
                raise serializers.ValidationError({"expected_impact": "Please enter an expected impact."})

     
        return attrs 