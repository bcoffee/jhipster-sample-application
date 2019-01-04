package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.MessageType;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the MessageType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MessageTypeRepository extends JpaRepository<MessageType, Long> {

}
