FROM adoptopenjdk/openjdk11:alpine-jre
ARG JAR_FILE=build/libs/nanumi-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar
ENV TZ=Asia/Seoul
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app.jar"]