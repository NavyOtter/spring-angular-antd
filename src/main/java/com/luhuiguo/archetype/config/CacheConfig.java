package com.luhuiguo.archetype.config;

import javax.cache.CacheManager;
import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableCaching
public class CacheConfig implements JCacheManagerCustomizer {

  @Override
  public void customize(CacheManager cacheManager) {

  }
}
