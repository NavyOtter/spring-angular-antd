package com.luhuiguo.archetype.service;


import com.luhuiguo.archetype.config.ApplicationConstants;
import com.luhuiguo.archetype.domain.User;
import com.luhuiguo.archetype.domain.criteria.UserCriteria;
import com.luhuiguo.archetype.domain.specification.UserSpecification;
import com.luhuiguo.archetype.mapper.UserMapper;
import com.luhuiguo.archetype.model.UserModel;
import com.luhuiguo.archetype.repository.UserRepository;
import com.luhuiguo.archetype.security.AuthorityConstants;
import com.luhuiguo.archetype.security.SecurityUtils;
import com.luhuiguo.archetype.util.RandomUtils;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service class for managing users.
 */
@Slf4j
@Service
@Transactional
public class UserService {

  private final UserRepository userRepository;

  private final PasswordEncoder passwordEncoder;

  private final UserMapper userMapper;

  public UserService(UserRepository userRepository,
    PasswordEncoder passwordEncoder, UserMapper userMapper) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
    this.userMapper = userMapper;
  }

  public Optional<User> activateRegistration(String key) {
    log.debug("Activating user for activation key {}", key);
    return userRepository.findOneByActivationKey(key)
      .map(user -> {
        // activate given user for the registration key.
        user.setActivated(true);
        user.setActivationKey(null);
        log.debug("Activated user: {}", user);
        return user;
      });
  }

  public Optional<User> completePasswordReset(String newPassword, String key) {
    log.debug("Reset user password for reset key {}", key);

    return userRepository.findOneByResetKey(key)
      .filter(user -> user.getResetDate().isAfter(Instant.now().minusSeconds(86400)))
      .map(user -> {
        user.setPassword(passwordEncoder.encode(newPassword));
        user.setResetKey(null);
        user.setResetDate(null);
        return user;
      });
  }

  public Optional<User> requestPasswordReset(String mail) {
    return userRepository.findOneByEmailIgnoreCase(mail)
      .filter(User::isActivated)
      .map(user -> {
        user.setResetKey(RandomUtils.generateResetKey());
        user.setResetDate(Instant.now());
        return user;
      });
  }

  public User registerUser(UserModel userModel, String password) {

    User newUser = userMapper.modelToEntity(userModel);
    String encryptedPassword = passwordEncoder.encode(password);
    newUser.setPassword(encryptedPassword);
    // new user is not active
    newUser.setActivated(false);
    // new user gets registration key
    newUser.setActivationKey(RandomUtils.generateActivationKey());
    Set<String> authorities = new HashSet<>();
    authorities.add(AuthorityConstants.USER);
    newUser.setAuthorities(authorities);
    userRepository.save(newUser);
    log.debug("Created Information for User: {}", newUser);
    return newUser;
  }

  public User createUser(UserModel userModel) {

    User user = userMapper.modelToEntity(userModel);
    String encryptedPassword = passwordEncoder.encode(RandomUtils.generatePassword());
    user.setPassword(encryptedPassword);
    user.setResetKey(RandomUtils.generateResetKey());
    user.setResetDate(Instant.now());
    user.setActivated(true);
    userRepository.save(user);
    log.debug("Created Information for User: {}", user);
    return user;
  }

  /**
   * Update basic information (first name, last name, email, language) for the current user.
   *
   * @param nickname nickname of user
   * @param name name of user
   * @param email email id of user
   * @param phone phone number of user
   * @param langKey language key
   * @param avatar avatar URL of user
   */
  public void updateUser(String nickname, String name, String email, String phone, String langKey,
    String avatar) {
    SecurityUtils.getCurrentUsername()
      .flatMap(userRepository::findOneByUsername)
      .ifPresent(user -> {
        user.setNickname(nickname);
        user.setName(name);
        user.setEmail(email);
        user.setPhone(phone);
        user.setLangKey(langKey);
        user.setAvatar(avatar);
        log.debug("Changed Information for User: {}", user);
      });
  }

  /**
   * Update all information for a specific user, and return the modified user.
   *
   * @param userModel user to update
   * @return updated user
   */
  public Optional<UserModel> updateUser(UserModel userModel) {
    return userRepository
      .findById(userModel.getId())
      .map(user -> {
        userMapper.updateEntityFromModel(userModel, user);

        log.debug("Changed Information for User: {}", user);
        return user;
      })
      .map(userMapper::entityToModel);
  }

  public void deleteUser(String username) {
    userRepository.findOneByUsername(username).ifPresent(user -> {
      userRepository.delete(user);
      log.debug("Deleted User: {}", user);
    });
  }

  public void deleteUser(Long id) {
    userRepository.findOneById(id).ifPresent(user -> {
      userRepository.delete(user);
      log.debug("Deleted User: {}", user);
    });
  }

  public void changePassword(String password) {
    SecurityUtils.getCurrentUsername()
      .flatMap(userRepository::findOneByUsername)
      .ifPresent(user -> {
        String encryptedPassword = passwordEncoder.encode(password);
        user.setPassword(encryptedPassword);
        log.debug("Changed password for User: {}", user);
      });
  }

  @Transactional(readOnly = true)
  public Page<UserModel> query(UserCriteria criteria, Pageable pageable) {
    return userRepository.findAll(new UserSpecification(criteria), pageable)
      .map(userMapper::entityToModel);
  }

  @Transactional(readOnly = true)
  public Page<UserModel> getAllManagedUsers(Pageable pageable) {
    return userRepository.findAllByUsernameNot(pageable, ApplicationConstants.ANONYMOUS_USER)
      .map(userMapper::entityToModel);
  }

  @Transactional(readOnly = true)
  public Optional<User> getUserWithAuthoritiesByUsername(String username) {
    return userRepository.findOneWithAuthoritiesByUsername(username);
  }

  @Transactional(readOnly = true)
  public Optional<User> getUserWithAuthorities(Long id) {
    return userRepository.findOneWithAuthoritiesById(id);
  }

  @Transactional(readOnly = true)
  public Optional<User> getUserWithAuthorities() {
    return SecurityUtils.getCurrentUsername()
      .flatMap(userRepository::findOneWithAuthoritiesByUsername);
  }


  @Scheduled(cron = "0 0 1 * * ?")
  public void removeNotActivatedUsers() {
    userRepository
      .findAllByActivatedIsFalseAndCreatedDateBefore(Instant.now().minus(3, ChronoUnit.DAYS))
      .stream()
      .forEach(user -> {
        log.debug("Deleting not activated user {}", user.getUsername());
        userRepository.delete(user);
      });
  }

}
