package com.luhuiguo.archetype.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;


/**
 * Application configuration properties
 */
@Data
@Component
@ConfigurationProperties(prefix = "application")
public class ApplicationProperties {

  private final Mail mail = new Mail();

  private final Security security = new Security();

  @Data
  public static class Mail {

    private String from = ApplicationDefaults.Mail.from;

    private String baseUrl = ApplicationDefaults.Mail.baseUrl;
  }

  @Data
  public static class Security {

    private final Authentication authentication = new Authentication();

    @Data
    public static class Authentication {

      private final Jwt jwt = new Jwt();

      @Data
      public static class Jwt {

        private String secret = ApplicationDefaults.Security.Authentication.Jwt.secret;

        private long tokenValidityInSeconds = ApplicationDefaults.Security.Authentication.Jwt.tokenValidityInSeconds;

        private long tokenValidityInSecondsForRememberMe = ApplicationDefaults.Security.Authentication.Jwt.tokenValidityInSecondsForRememberMe;

      }

    }


  }

}
