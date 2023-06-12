# SMS Simulation App Client

## How to run

Before running the below steps, start the backend container. Once the backend service starts,
note the url and provide that in the Dockerfile. Example:

`ENV REACT_APP_API_URL 'http://127.0.0.1:5000/'`
(currently this is the default)

#### Step 1: Build Docker image

`docker build -f Dockerfile -t sim-client .`

#### Step 2: Run Docker image

`docker run -it -d -p 3000:80 sim-client`