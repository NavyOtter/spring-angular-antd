package com.luhuiguo.archetype.web.rest.error;


public class UsernameAlreadyUsedException extends BadRequestAlertException {

  public UsernameAlreadyUsedException() {
    super(ErrorConstants.LOGIN_ALREADY_USED_TYPE, "Username already in use", "userManagement", "userexists");
  }
}
