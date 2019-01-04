package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.ReportCategory;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ReportCategory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ReportCategoryRepository extends JpaRepository<ReportCategory, Long> {

}
