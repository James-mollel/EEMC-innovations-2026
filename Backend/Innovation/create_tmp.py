import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "Innovation.settings")
django.setup()

from django.contrib.auth import get_user_model

User = get_user_model()

# Weka Username mpya kabisa na Password ngumu hapa kiongozi!
username = "default"
email = "default@gmail.com"
password_ya_chuma = "MollelSenior$ACB2026!"  

if not User.objects.filter(username=username).exists():
    print("Inatengeneza akaunti ya Admin...")
    # Tunaunda user wa kawaida kwanza
    user = User.objects.create_user(username=username, email=email)
    # Tunamlazimisha kuwa Superuser na Staff
    user.is_superuser = True
    user.is_staff = True
    # Hapa ndio tunasimba password kinyamani ili Django iitambue!
    user.set_password(password_ya_chuma)
    user.save()
    print("Admin ametengenezwa na kusimbwa kwa usalama wa 100%!")
else:
    print("Admin huyu tayari yupo! Tafadhali badilisha 'username' juu uweke nyingine ili itengeneze mpya.")