package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.DistributionList;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the DistributionList entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DistributionListRepository extends JpaRepository<DistributionList, Long> {

}
