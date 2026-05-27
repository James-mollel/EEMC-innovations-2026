# 1. Tumia picha thabiti ya Python
FROM python:3.11-slim

# 2. Set mazingira ya Python
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# 3. Weka folda kuu la kazi ndani ya server
WORKDIR /app

# 4. Sakinisha zana za Linux zinazohitajika
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# 5. Copy requirements kutoka kwenye njia yake sahihi na usakinishe
COPY Backend/Innovation/requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# 6. Copy mradi wote (pamoja na ma-folder ya Backend na Frontend) uingie kwenye server
COPY . /app/

# 7. Badilisha folda la kazi liwe lile lenye manage.py ili amri zifuatazo zieleweke
WORKDIR /app/Backend/Innovation

# 8. Run collectstatic
RUN python manage.py collectstatic --no-input --clear

# 9. Fungua port 8080
EXPOSE 8080

# 10. Amri ya kuwasha server kwa kutumia Gunicorn
CMD ["gunicorn", "Innovation.wsgi:application", "--bind", "0.0.0.0:8080"]