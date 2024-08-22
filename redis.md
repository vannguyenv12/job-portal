### Install Redis

docker run -d --name redis-stack-server -p 6380:6379 redis/redis-stack-server:latest

### Connect Redis CLI

docker exec -it redis-stack-server redis-cli

### Stop running redis

docker container stop redis-stack-server

### Remove existing redis server

docker container rm redis-stack-server
