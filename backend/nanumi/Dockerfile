FROM openjdk:11
VOLUME /tmp
ARG JAR_FILE=build/libs/nanumi-1.0-SNAPSHOT.jar
EXPOSE 8080
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
ENV TZ=Asia/Seoul
RUN apt-get install -y