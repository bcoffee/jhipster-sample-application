package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.EnObjectType;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the EnObjectType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EnObjectTypeRepository extends JpaRepository<EnObjectType, Long> {

}
