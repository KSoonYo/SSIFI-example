FROM python:3.7
ENV PYTHONDONTWRITEBUTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /server
COPY . /server

RUN apt-get update
RUN apt-get install -y libsndfile1

RUN pip3 install -r requirements.txt
RUN pip3 install -r backend_requirements.txt
RUN python manage.py migrate
EXPOSE 8000

# CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:8000", "wsgi:backend"]