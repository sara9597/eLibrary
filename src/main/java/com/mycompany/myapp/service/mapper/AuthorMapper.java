package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.Author;
import com.mycompany.myapp.service.dto.AuthorDTO;
import java.util.Set;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Author} and its DTO {@link AuthorDTO}.
 */
@Mapper(componentModel = "spring", uses = { GenreMapper.class })
public interface AuthorMapper extends EntityMapper<AuthorDTO, Author> {
    @Mapping(target = "genres", source = "genres", qualifiedByName = "nameSet")
    AuthorDTO toDto(Author s);

    @Mapping(target = "removeGenres", ignore = true)
    Author toEntity(AuthorDTO authorDTO);

    @Named("fullname")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "fullname", source = "fullname")
    AuthorDTO toDtoFullname(Author author);
}
