FROM ubuntu:20.04
# ubuntu 환경으로 BE 컨테이너 구성
WORKDIR /server
COPY . /server

# python, pip 다운 및 필요한 모듈, 가상환경 다운
RUN apt-get update
RUN apt install -y python3-pip python3-dev libsndfile1 git wget
# 가상환경 실행(gunicorn)
RUN pip install virtualenv
RUN virtualenv venv
RUN . venv/bin/activate

# pip 설치
RUN pip install -r all_requirements.txt
RUN pip install numba

# django서버 선언
RUN python3 manage.py makemigrations
RUN python3 manage.py migrate
RUN python3 manage.py collectstatic


# 서버 내부 8000번 포트 개방
EXPOSE 8000
CMD ["gunicorn", "--config", "gunicorn-cfg.py", "backend.wsgi:application", "--reload", "--timeout=240"]