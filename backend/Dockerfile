FROM ubuntu:20.04

WORKDIR /server
COPY . /server

RUN apt-get update
RUN apt install -y python3-pip python3-dev libsndfile1 git
RUN apt install wget

RUN wget https://repo.anaconda.com/archive/Anaconda3-2019.07-Linux-x86_64.sh

RUN pip install virtualenv
RUN virtualenv venv
RUN . venv/bin/activate

# RUN conda install --yes --file requirements.txt
# RUN conda install --yes --file backend_requirements.txt

RUN pip install -r requirements.txt
RUN pip install -r backend_requirements.txt

RUN python3 manage.py migrate
RUN python3 manage.py makemigrations
RUN python3 manage.py collectstatic

RUN python3 ./NLP/save_model.py 

EXPOSE 8000

# CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]
# CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:8000", "wsgi:backend"]
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:8000", "backend.wsgi:application"]