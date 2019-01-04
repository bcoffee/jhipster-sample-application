package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.EnObject;
import io.github.jhipster.application.repository.EnObjectRepository;
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
 * REST controller for managing EnObject.
 */
@RestController
@RequestMapping("/api")
public class EnObjectResource {

    private final Logger log = LoggerFactory.getLogger(EnObjectResource.class);

    private static final String ENTITY_NAME = "enObject";

    private final EnObjectRepository enObjectRepository;

    public EnObjectResource(EnObjectRepository enObjectRepository) {
        this.enObjectRepository = enObjectRepository;
    }

    /**
     * POST  /en-objects : Create a new enObject.
     *
     * @param enObject the enObject to create
     * @return the ResponseEntity with status 201 (Created) and with body the new enObject, or with status 400 (Bad Request) if the enObject has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/en-objects")
    @Timed
    public ResponseEntity<EnObject> createEnObject(@RequestBody EnObject enObject) throws URISyntaxException {
        log.debug("REST request to save EnObject : {}", enObject);
        if (enObject.getId() != null) {
            throw new BadRequestAlertException("A new enObject cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EnObject result = enObjectRepository.save(enObject);
        return ResponseEntity.created(new URI("/api/en-objects/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /en-objects : Updates an existing enObject.
     *
     * @param enObject the enObject to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated enObject,
     * or with status 400 (Bad Request) if the enObject is not valid,
     * or with status 500 (Internal Server Error) if the enObject couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/en-objects")
    @Timed
    public ResponseEntity<EnObject> updateEnObject(@RequestBody EnObject enObject) throws URISyntaxException {
        log.debug("REST request to update EnObject : {}", enObject);
        if (enObject.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        EnObject result = enObjectRepository.save(enObject);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, enObject.getId().toString()))
            .body(result);
    }

    /**
     * GET  /en-objects : get all the enObjects.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of enObjects in body
     */
    @GetMapping("/en-objects")
    @Timed
    public List<EnObject> getAllEnObjects() {
        log.debug("REST request to get all EnObjects");
        return enObjectRepository.findAll();
    }

    /**
     * GET  /en-objects/:id : get the "id" enObject.
     *
     * @param id the id of the enObject to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the enObject, or with status 404 (Not Found)
     */
    @GetMapping("/en-objects/{id}")
    @Timed
    public ResponseEntity<EnObject> getEnObject(@PathVariable Long id) {
        log.debug("REST request to get EnObject : {}", id);
        Optional<EnObject> enObject = enObjectRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(enObject);
    }

    /**
     * DELETE  /en-objects/:id : delete the "id" enObject.
     *
     * @param id the id of the enObject to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/en-objects/{id}")
    @Timed
    public ResponseEntity<Void> deleteEnObject(@PathVariable Long id) {
        log.debug("REST request to delete EnObject : {}", id);

        enObjectRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
