# run this file from project root
# docker build -f ./Dockerfile .

# BUILD
# docker build -t lodge-in:latest -f Dockerfile .

# RUN
# docker run -p 8080:8080 --name lodgein lodge-in:latest

FROM node:12-alpine

EXPOSE 8080

WORKDIR /opt/lodge-in

# COPY package.json /opt/snipper/package.json
COPY . .

RUN npm install && \
    npm run build

#CMD ["npm", "run", "start"]           # uncommend this line to run docker file. Run docker compose otherwise.