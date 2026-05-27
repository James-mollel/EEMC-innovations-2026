import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "Innovation.settings")
django.setup()

from django.contrib.auth import get_user_model

User = get_user_model()

# Badilisha hapa uweke Username na Password unazotaka wewe!
username = "admin"
email = "admin@eemc.com"
password = "MollelPassword2026!"  # Weka password yako ya siri hapa

if not User.objects.filter(username=username).exists():
    print("Inatengeneza akaunti ya Admin...")
    User.objects.create_superuser(username=username, email=email, password=password)
    print("Admin ametengenezwa kinyamani kabisa!")
else:
    print("Admin tayari yupo kwenye database!")