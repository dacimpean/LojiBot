FROM python:3.6.8
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
WORKDIR /opt/api
RUN pip install pipenv
COPY Pipfile* ./
RUN pipenv install --system --deploy
COPY . .
EXPOSE 8090
CMD ./bin/run-gunicorn.sh
