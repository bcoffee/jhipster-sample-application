package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.NotificationParameter;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the NotificationParameter entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NotificationParameterRepository extends JpaRepository<NotificationParameter, Long> {

}
