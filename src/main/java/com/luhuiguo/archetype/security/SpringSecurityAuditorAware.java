package com.luhuiguo.archetype.security;

import com.luhuiguo.archetype.config.Constants;
import org.springframework.data.domain.AuditorAware;
import org.springframework.stereotype.Component;

/**
 * Implementation of AuditorAware based on Spring Security.
 */
@Component
public class SpringSecurityAuditorAware implements AuditorAware<String> {

  @Override
  public String getCurrentAuditor() {
    return SecurityUtils.getCurrentUsername().orElse(Constants.SYSTEM_ACCOUNT);
  }
}
