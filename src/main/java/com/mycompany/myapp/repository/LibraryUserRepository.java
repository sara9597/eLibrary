package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.LibraryUser;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the LibraryUser entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LibraryUserRepository extends JpaRepository<LibraryUser, Long> {}
