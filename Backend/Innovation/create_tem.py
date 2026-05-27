import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "Innovation.settings")
django.setup()

from django.contrib.auth import get_user_model

User = get_user_model()


username = "eemc_elisha"
email = "eemc@elisha.com"
password = "Elisha@EEMC@123"  

if not User.objects.filter(username=username).exists():
    print("Createa elisha account...")
    User.objects.create_superuser(username=username, email=email, password=password)
    print("Elisha account created!")
else:
    print("Elisha already created!")



