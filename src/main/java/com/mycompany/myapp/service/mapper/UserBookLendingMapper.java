package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.UserBookLending;
import com.mycompany.myapp.service.dto.UserBookLendingDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link UserBookLending} and its DTO {@link UserBookLendingDTO}.
 */
@Mapper(componentModel = "spring", uses = { LibraryUserMapper.class, BookMapper.class })
public interface UserBookLendingMapper extends EntityMapper<UserBookLendingDTO, UserBookLending> {
    @Mapping(target = "user", source = "user", qualifiedByName = "fullname")
    @Mapping(target = "book", source = "book", qualifiedByName = "title")
    UserBookLendingDTO toDto(UserBookLending s);
}
