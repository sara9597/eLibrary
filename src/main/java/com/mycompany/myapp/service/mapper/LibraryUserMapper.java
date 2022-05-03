package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.LibraryUser;
import com.mycompany.myapp.service.dto.LibraryUserDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link LibraryUser} and its DTO {@link LibraryUserDTO}.
 */
@Mapper(componentModel = "spring", uses = { UserMapper.class })
public interface LibraryUserMapper extends EntityMapper<LibraryUserDTO, LibraryUser> {
    @Mapping(target = "user", source = "user", qualifiedByName = "id")
    LibraryUserDTO toDto(LibraryUser s);

    @Named("fullname")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "fullname", source = "fullname")
    LibraryUserDTO toDtoFullname(LibraryUser libraryUser);
}
