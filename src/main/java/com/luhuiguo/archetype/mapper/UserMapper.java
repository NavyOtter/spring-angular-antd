package com.luhuiguo.archetype.mapper;

import com.luhuiguo.archetype.domain.User;
import com.luhuiguo.archetype.model.UserModel;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring", uses = {})
public interface UserMapper {

  UserModel entityToModel(User entity);

  User modelToEntity(UserModel model);

  void updateEntityFromModel(UserModel model, @MappingTarget User entity);

}
