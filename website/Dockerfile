FROM python:3.6.8
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
WORKDIR /opt/website
RUN pip3 install pipenv
COPY Pipfile* ./
RUN pipenv install --system --deploy
CMD python manage.py runserver 0.0.0.0:8081
