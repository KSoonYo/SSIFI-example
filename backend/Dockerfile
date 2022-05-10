FROM alpine
# ENV PYTHONDONTWRITEBUTECODE=1
# ENV PYTHONUNBUFFERED=1

WORKDIR /server
COPY . /server

RUN apt-get update
RUN apt-get install -y python3-pip python3-dev libsndfile1 git

RUN pip install virtualenv
RUN virtualenv venv
RUN . venv/bin/activate

RUN pip install -r requirements.txt
RUN pip install -r backend_requirements.txt

RUN python manage.py migrate
EXPOSE 8000

# CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]
# CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:8000", "wsgi:backend"]
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:8000", "backend.wsgi:application"]