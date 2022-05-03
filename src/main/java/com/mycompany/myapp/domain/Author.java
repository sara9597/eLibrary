package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Author.
 */
@Entity
@Table(name = "author")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Author implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Size(min = 2, max = 40)
    @Column(name = "fullname", length = 40, nullable = false)
    private String fullname;

    @Max(value = 2010)
    @Column(name = "birthyear")
    private Integer birthyear;

    @Max(value = 2022)
    @Column(name = "deathyear")
    private Integer deathyear;

    @Size(max = 200)
    @Column(name = "note", length = 200)
    private String note;

    @OneToMany(mappedBy = "author")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "userBookLendings", "genres", "author" }, allowSetters = true)
    private Set<Book> books = new HashSet<>();

    @ManyToMany
    @NotNull
    @JoinTable(
        name = "rel_author__genres",
        joinColumns = @JoinColumn(name = "author_id"),
        inverseJoinColumns = @JoinColumn(name = "genres_id")
    )
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "authors", "books" }, allowSetters = true)
    private Set<Genre> genres = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Author id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullname() {
        return this.fullname;
    }

    public Author fullname(String fullname) {
        this.setFullname(fullname);
        return this;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public Integer getBirthyear() {
        return this.birthyear;
    }

    public Author birthyear(Integer birthyear) {
        this.setBirthyear(birthyear);
        return this;
    }

    public void setBirthyear(Integer birthyear) {
        this.birthyear = birthyear;
    }

    public Integer getDeathyear() {
        return this.deathyear;
    }

    public Author deathyear(Integer deathyear) {
        this.setDeathyear(deathyear);
        return this;
    }

    public void setDeathyear(Integer deathyear) {
        this.deathyear = deathyear;
    }

    public String getNote() {
        return this.note;
    }

    public Author note(String note) {
        this.setNote(note);
        return this;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public Set<Book> getBooks() {
        return this.books;
    }

    public void setBooks(Set<Book> books) {
        if (this.books != null) {
            this.books.forEach(i -> i.setAuthor(null));
        }
        if (books != null) {
            books.forEach(i -> i.setAuthor(this));
        }
        this.books = books;
    }

    public Author books(Set<Book> books) {
        this.setBooks(books);
        return this;
    }

    public Author addBook(Book book) {
        this.books.add(book);
        book.setAuthor(this);
        return this;
    }

    public Author removeBook(Book book) {
        this.books.remove(book);
        book.setAuthor(null);
        return this;
    }

    public Set<Genre> getGenres() {
        return this.genres;
    }

    public void setGenres(Set<Genre> genres) {
        this.genres = genres;
    }

    public Author genres(Set<Genre> genres) {
        this.setGenres(genres);
        return this;
    }

    public Author addGenres(Genre genre) {
        this.genres.add(genre);
        genre.getAuthors().add(this);
        return this;
    }

    public Author removeGenres(Genre genre) {
        this.genres.remove(genre);
        genre.getAuthors().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Author)) {
            return false;
        }
        return id != null && id.equals(((Author) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Author{" +
            "id=" + getId() +
            ", fullname='" + getFullname() + "'" +
            ", birthyear=" + getBirthyear() +
            ", deathyear=" + getDeathyear() +
            ", note='" + getNote() + "'" +
            "}";
    }
}
