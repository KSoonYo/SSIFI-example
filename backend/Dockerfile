FROM ubuntu:20.04
# ENV PYTHONDONTWRITEBUTECODE=1
# ENV PYTHONUNBUFFERED=1
SHELL ["/bin/bash", "-c"]

WORKDIR /server
COPY . /server

RUN apt-get update
RUN apt-get install -y python3-pip python3-dev libsndfile1

RUN pip3 install virtualenv
RUN virtualenv venv
RUN source venv/bin/activate

RUN pip3 install -r requirements.txt
RUN pip3 install -r backend_requirements.txt

RUN pip3 install gunicorn
RUN python manage.py migrate
EXPOSE 8000

# CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]
# CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:8000", "wsgi:backend"]
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:8000", "backend.wsgi:application"]