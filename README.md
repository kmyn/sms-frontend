# SMS Simulation App Client

## How to run

Before running the below steps, start the backend container. Once the backend service starts,
note the url and provide that in the Dockerfile. Example:

`ENV REACT_APP_API_URL 'http://127.0.0.1:5000/'`
(currently this is the default)

#### Step 1: Run script to build and run docker image

`sh run.sh`

#### Step 2: In browser open

`http://localhost:3000/` (localhost can be replaced by the system IP where the container is running)