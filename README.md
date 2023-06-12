# SMS Simulation App Client

## How to run

Before running the below steps, start the backend container. Once the backend service starts,
note the url and provide that in the Dockerfile. Example:

`ENV REACT_APP_API_URL 'http://127.0.0.1:5000/'`
(currently this is the default)

#### Step 1: Build Docker image

`docker build -f Dockerfile -t sim-client .`

#### Step 2: Run Docker image

`docker run -it -d --name simclient -p 3000:80 sim-client`


#### Step 3: In browser open

`http://localhost:3000/` (localhost can be replaced by the system IP where the container is running)

#### Step 4: To stop client

`docker stop simclient`