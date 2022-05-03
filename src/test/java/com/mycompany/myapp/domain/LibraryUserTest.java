package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class LibraryUserTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(LibraryUser.class);
        LibraryUser libraryUser1 = new LibraryUser();
        libraryUser1.setId(1L);
        LibraryUser libraryUser2 = new LibraryUser();
        libraryUser2.setId(libraryUser1.getId());
        assertThat(libraryUser1).isEqualTo(libraryUser2);
        libraryUser2.setId(2L);
        assertThat(libraryUser1).isNotEqualTo(libraryUser2);
        libraryUser1.setId(null);
        assertThat(libraryUser1).isNotEqualTo(libraryUser2);
    }
}
