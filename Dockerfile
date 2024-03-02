FROM --platform=linux/amd64 openjdk:21
LABEL maintainer="marcell.dechant@proton.me"
EXPOSE 8080
ADD backend/target/pnp-session-planer-app.jar pnp-session-planer-app.jar
CMD [ "sh", "-c", "java -jar /pnp-session-planer-app.jar" ]