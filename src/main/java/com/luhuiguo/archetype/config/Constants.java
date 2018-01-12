package com.luhuiguo.archetype.config;


/**
 * Constants.
 */
public final class Constants {

  public static final String USERNAME_REGEX = "^[_'.@A-Za-z0-9-]*$";
  public static final int PASSWORD_MIN_LENGTH = 4;
  public static final int PASSWORD_MAX_LENGTH = 100;

  public static final String SYSTEM_ACCOUNT = "system";
  public static final String ANONYMOUS_USER = "anonymousUser";
  public static final String DEFAULT_LANGUAGE = "zh-cn";

  private Constants() {
  }
}
