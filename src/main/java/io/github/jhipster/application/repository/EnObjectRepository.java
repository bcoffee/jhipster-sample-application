package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.EnObject;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the EnObject entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EnObjectRepository extends JpaRepository<EnObject, Long> {

}
