docker build -f Dockerfile -t sim-client .
docker run -it -d -p 3000:80 sim-client