package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.EnObjectType;
import io.github.jhipster.application.repository.EnObjectTypeRepository;
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
 * REST controller for managing EnObjectType.
 */
@RestController
@RequestMapping("/api")
public class EnObjectTypeResource {

    private final Logger log = LoggerFactory.getLogger(EnObjectTypeResource.class);

    private static final String ENTITY_NAME = "enObjectType";

    private final EnObjectTypeRepository enObjectTypeRepository;

    public EnObjectTypeResource(EnObjectTypeRepository enObjectTypeRepository) {
        this.enObjectTypeRepository = enObjectTypeRepository;
    }

    /**
     * POST  /en-object-types : Create a new enObjectType.
     *
     * @param enObjectType the enObjectType to create
     * @return the ResponseEntity with status 201 (Created) and with body the new enObjectType, or with status 400 (Bad Request) if the enObjectType has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/en-object-types")
    @Timed
    public ResponseEntity<EnObjectType> createEnObjectType(@RequestBody EnObjectType enObjectType) throws URISyntaxException {
        log.debug("REST request to save EnObjectType : {}", enObjectType);
        if (enObjectType.getId() != null) {
            throw new BadRequestAlertException("A new enObjectType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EnObjectType result = enObjectTypeRepository.save(enObjectType);
        return ResponseEntity.created(new URI("/api/en-object-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /en-object-types : Updates an existing enObjectType.
     *
     * @param enObjectType the enObjectType to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated enObjectType,
     * or with status 400 (Bad Request) if the enObjectType is not valid,
     * or with status 500 (Internal Server Error) if the enObjectType couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/en-object-types")
    @Timed
    public ResponseEntity<EnObjectType> updateEnObjectType(@RequestBody EnObjectType enObjectType) throws URISyntaxException {
        log.debug("REST request to update EnObjectType : {}", enObjectType);
        if (enObjectType.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        EnObjectType result = enObjectTypeRepository.save(enObjectType);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, enObjectType.getId().toString()))
            .body(result);
    }

    /**
     * GET  /en-object-types : get all the enObjectTypes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of enObjectTypes in body
     */
    @GetMapping("/en-object-types")
    @Timed
    public List<EnObjectType> getAllEnObjectTypes() {
        log.debug("REST request to get all EnObjectTypes");
        return enObjectTypeRepository.findAll();
    }

    /**
     * GET  /en-object-types/:id : get the "id" enObjectType.
     *
     * @param id the id of the enObjectType to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the enObjectType, or with status 404 (Not Found)
     */
    @GetMapping("/en-object-types/{id}")
    @Timed
    public ResponseEntity<EnObjectType> getEnObjectType(@PathVariable Long id) {
        log.debug("REST request to get EnObjectType : {}", id);
        Optional<EnObjectType> enObjectType = enObjectTypeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(enObjectType);
    }

    /**
     * DELETE  /en-object-types/:id : delete the "id" enObjectType.
     *
     * @param id the id of the enObjectType to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/en-object-types/{id}")
    @Timed
    public ResponseEntity<Void> deleteEnObjectType(@PathVariable Long id) {
        log.debug("REST request to delete EnObjectType : {}", id);

        enObjectTypeRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
