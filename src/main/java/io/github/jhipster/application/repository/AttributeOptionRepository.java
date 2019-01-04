package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.AttributeOption;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the AttributeOption entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AttributeOptionRepository extends JpaRepository<AttributeOption, Long> {

}
