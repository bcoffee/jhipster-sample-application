package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.NoteCategory;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the NoteCategory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NoteCategoryRepository extends JpaRepository<NoteCategory, Long> {

}
