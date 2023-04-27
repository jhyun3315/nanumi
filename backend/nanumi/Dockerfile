FROM adoptopenjdk/openjdk11:alpine-jre
WORKDIR /opt/app
ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} app.jar 
ENV TZ=Asia/Seoul
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app.jar"]