package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.Book;
import com.mycompany.myapp.service.dto.BookDTO;
import java.util.Set;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Book} and its DTO {@link BookDTO}.
 */
@Mapper(componentModel = "spring", uses = { GenreMapper.class, AuthorMapper.class })
public interface BookMapper extends EntityMapper<BookDTO, Book> {
    @Mapping(target = "genres", source = "genres", qualifiedByName = "nameSet")
    @Mapping(target = "author", source = "author", qualifiedByName = "fullname")
    BookDTO toDto(Book s);

    @Mapping(target = "removeGenres", ignore = true)
    Book toEntity(BookDTO bookDTO);

    @Named("title")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "title", source = "title")
    BookDTO toDtoTitle(Book book);
}
