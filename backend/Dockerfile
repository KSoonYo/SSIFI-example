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

# AI 함수사용을 위해 압축된 파일 해제
WORKDIR /server/NLP
RUN python3 save_model.py
WORKDIR /server

# 미리 학습된 모델들 옮기기
RUN mv ai_files/checkpoint ./NLP/models/wellnessbot/

RUN mv ai_files/comedy_model ./NLP/models/writerbot
RUN mv ai_files/drama_model ./NLP/models/writerbot
RUN mv ai_files/news_model ./NLP/models/writerbot

RUN mv ai_files/beauty_model ./NLP/models/reporterbot
RUN mv ai_files/economy_model ./NLP/models/reporterbot
RUN mv ai_files/entertainments_model ./NLP/models/reporterbot
RUN mv ai_files/IT_model ./NLP/models/reporterbot
RUN mv ai_files/society_model ./NLP/models/reporterbot

# celery 실행
RUN celery -A backend worker --pool=threads --loglevel=info

# 서버 내부 8000번 포트 개방
EXPOSE 8000
CMD ["gunicorn", "--config", "gunicorn-cfg.py", "backend.wsgi:application", "--reload", "--timeout=240"]
# CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:8000", "backend.wsgi:application", "--timeout=240"]