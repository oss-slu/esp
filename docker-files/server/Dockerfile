FROM python:3.8-slim-buster
WORKDIR /python-docker
COPY . .
RUN pip3 install -r requirements.txt
RUN chmod +x run_dev_server.sh
CMD ["./run_dev_server.sh"]
EXPOSE 5001
