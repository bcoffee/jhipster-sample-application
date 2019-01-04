package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.ModelCode;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ModelCode entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ModelCodeRepository extends JpaRepository<ModelCode, Long> {

}
