FROM openjdk:8-jre

ADD @project.build.finalName@.war /opt/@project.artifactId@/@project.build.finalName@.war

RUN mkdir /opt/@project.artifactId@/work

VOLUME /opt/@project.artifactId@/work

EXPOSE 8080

ENTRYPOINT ["/usr/bin/java", "-jar", "/opt/@project.artifactId@/@project.build.finalName@.war"]
