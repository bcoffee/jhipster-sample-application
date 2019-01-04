package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.MessageMap;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the MessageMap entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MessageMapRepository extends JpaRepository<MessageMap, Long> {

}
