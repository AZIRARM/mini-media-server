From node:18-alpine3.14


# Update system
RUN apk update

# Install unzip
RUN apk add unzip

# Install wget to downoad mini-cloud-config
RUN apk add  wget


# Create folder if not exists
RUN mkdir -p /app
RUN mkdir -p /tmp

# Download mini-    api-gateway and unzip it
WORKDIR /tmp

RUN wget https://github.com/AZIRARM/mini-media-server/archive/refs/tags/0.0.1.zip -P /tmp/
RUN unzip 0.0.1.zip -d /app
RUN rm -f 0.0.1.zip

RUN mv /app/mini-media-server-0.0.1 /app/mini-media-server

RUN mkdir /app/data


WORKDIR /app/mini-media-server

#Build application
RUN npm install

#Expose port
expose 9000

#Run
CMD [ "node", "/app/mini-media-server/server.js" ]