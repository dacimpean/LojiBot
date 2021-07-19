## Loji
To start working with the project, please do the following:
- setup [docker](https://www.docker.com/get-started)
- setup [docker-compose](https://docs.docker.com/compose/install/)

You can pass various environment variables to docker containers to extend behaviour

We use `8080` port for the frontend application, `8081` for the website and `8090` for the backend api service.

#### Comands

- to run the project
```bash
docker-compose up -d --build
```

- to stop the project
```bash
docker-compose down
```

- to restart any service
```bash
docker-compose restart [name_of_service]
```
it can be `api`, `app` or any other service in the project

#### API docs

* Swagger

`//<api_url>/swagger/`

* Redoc 

`//<api_url>/redoc/`

* Django's Docs

`//<api_url>/docs/`
