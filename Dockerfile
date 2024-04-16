FROM debian:buster

USER root

RUN apt-get -y update ; \
    apt-get -y install python3

COPY srcs/ ./

WORKDIR /home/

EXPOSE 8080

CMD ["python3.7", "-m", "http.server", "8080"]