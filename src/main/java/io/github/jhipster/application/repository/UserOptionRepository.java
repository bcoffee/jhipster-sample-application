package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.UserOption;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the UserOption entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserOptionRepository extends JpaRepository<UserOption, Long> {

}
