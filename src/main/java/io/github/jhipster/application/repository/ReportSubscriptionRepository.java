package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.ReportSubscription;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ReportSubscription entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ReportSubscriptionRepository extends JpaRepository<ReportSubscription, Long> {

}
