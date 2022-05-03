package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.UserBookLending;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the UserBookLending entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserBookLendingRepository extends JpaRepository<UserBookLending, Long> {}
