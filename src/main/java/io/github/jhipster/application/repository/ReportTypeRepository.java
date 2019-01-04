package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.ReportType;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ReportType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ReportTypeRepository extends JpaRepository<ReportType, Long> {

}
