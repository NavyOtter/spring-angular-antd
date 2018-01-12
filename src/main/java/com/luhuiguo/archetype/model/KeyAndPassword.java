package com.luhuiguo.archetype.model;

import com.luhuiguo.archetype.config.Constants;
import javax.validation.constraints.Size;
import lombok.Data;

@Data
public class KeyAndPassword {

  private String key;

  @Size(min = Constants.PASSWORD_MIN_LENGTH, max = Constants.PASSWORD_MAX_LENGTH)
  private String newPassword;
}
