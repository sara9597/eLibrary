package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.Genre;
import com.mycompany.myapp.service.dto.GenreDTO;
import java.util.Set;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Genre} and its DTO {@link GenreDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface GenreMapper extends EntityMapper<GenreDTO, Genre> {
    @Named("nameSet")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "name", source = "name")
    Set<GenreDTO> toDtoNameSet(Set<Genre> genre);
}
