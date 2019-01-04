package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.NoteCategory;
import io.github.jhipster.application.repository.NoteCategoryRepository;
import io.github.jhipster.application.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.application.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing NoteCategory.
 */
@RestController
@RequestMapping("/api")
public class NoteCategoryResource {

    private final Logger log = LoggerFactory.getLogger(NoteCategoryResource.class);

    private static final String ENTITY_NAME = "noteCategory";

    private final NoteCategoryRepository noteCategoryRepository;

    public NoteCategoryResource(NoteCategoryRepository noteCategoryRepository) {
        this.noteCategoryRepository = noteCategoryRepository;
    }

    /**
     * POST  /note-categories : Create a new noteCategory.
     *
     * @param noteCategory the noteCategory to create
     * @return the ResponseEntity with status 201 (Created) and with body the new noteCategory, or with status 400 (Bad Request) if the noteCategory has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/note-categories")
    @Timed
    public ResponseEntity<NoteCategory> createNoteCategory(@RequestBody NoteCategory noteCategory) throws URISyntaxException {
        log.debug("REST request to save NoteCategory : {}", noteCategory);
        if (noteCategory.getId() != null) {
            throw new BadRequestAlertException("A new noteCategory cannot already have an ID", ENTITY_NAME, "idexists");
        }
        NoteCategory result = noteCategoryRepository.save(noteCategory);
        return ResponseEntity.created(new URI("/api/note-categories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /note-categories : Updates an existing noteCategory.
     *
     * @param noteCategory the noteCategory to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated noteCategory,
     * or with status 400 (Bad Request) if the noteCategory is not valid,
     * or with status 500 (Internal Server Error) if the noteCategory couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/note-categories")
    @Timed
    public ResponseEntity<NoteCategory> updateNoteCategory(@RequestBody NoteCategory noteCategory) throws URISyntaxException {
        log.debug("REST request to update NoteCategory : {}", noteCategory);
        if (noteCategory.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        NoteCategory result = noteCategoryRepository.save(noteCategory);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, noteCategory.getId().toString()))
            .body(result);
    }

    /**
     * GET  /note-categories : get all the noteCategories.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of noteCategories in body
     */
    @GetMapping("/note-categories")
    @Timed
    public List<NoteCategory> getAllNoteCategories() {
        log.debug("REST request to get all NoteCategories");
        return noteCategoryRepository.findAll();
    }

    /**
     * GET  /note-categories/:id : get the "id" noteCategory.
     *
     * @param id the id of the noteCategory to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the noteCategory, or with status 404 (Not Found)
     */
    @GetMapping("/note-categories/{id}")
    @Timed
    public ResponseEntity<NoteCategory> getNoteCategory(@PathVariable Long id) {
        log.debug("REST request to get NoteCategory : {}", id);
        Optional<NoteCategory> noteCategory = noteCategoryRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(noteCategory);
    }

    /**
     * DELETE  /note-categories/:id : delete the "id" noteCategory.
     *
     * @param id the id of the noteCategory to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/note-categories/{id}")
    @Timed
    public ResponseEntity<Void> deleteNoteCategory(@PathVariable Long id) {
        log.debug("REST request to delete NoteCategory : {}", id);

        noteCategoryRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
