# Hatua ya 1: Tumia picha thabiti ya Python ya Linux
FROM python:3.11-slim

# Hatua ya 2: Set mazingira ili Python isicheleweshe mafile ya log
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Hatua ya 3: Weka folda la kazi ndani ya server
WORKDIR /app

# Hatua ya 4: Sakinisha zana za mfumo zinazohitajika
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Hatua ya 5: Copy requirements na usakinishe maktaba zote
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Hatua ya 6: Copy mradi wako wote wa Django uingie kwenye server
COPY . /app/

# Hatua ya 7: Run collectstatic wakati wa build
RUN python manage.py collectstatic --no-input --clear

# Hatua ya 8: Bandika port ambayo Railway itaitumia (Default ni 8080)
EXPOSE 8080

# Hatua ya 9: Amri ya kuwasha server (Hapa hatuweki migrate ili isilete shida)
CMD ["gunicorn", "Innovation.wsgi:application", "--bind", "0.0.0.0:8080"]