# SMS Simulation App Client

## How to run

Before running the below steps, start the backend container.

#### Step 1: Build Docker image

`docker build -f Dockerfile -t sim-client .`

#### Step 2: Run Docker image

`docker run -it -d -p 3000:80 sim-client`