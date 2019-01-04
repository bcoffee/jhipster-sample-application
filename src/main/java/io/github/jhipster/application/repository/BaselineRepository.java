package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.Baseline;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Baseline entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BaselineRepository extends JpaRepository<Baseline, Long> {

}
