package com.luhuiguo.archetype.model;

import com.luhuiguo.archetype.config.Constants;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import lombok.Data;

@Data
public class Login {

  @Pattern(regexp = Constants.USERNAME_REGEX)
  @NotNull
  @Size(min = 1, max = 50)
  private String username;

  @NotNull
  @Size(min = Constants.PASSWORD_MIN_LENGTH, max = Constants.PASSWORD_MAX_LENGTH)
  private String password;

  private Boolean rememberMe;

}
