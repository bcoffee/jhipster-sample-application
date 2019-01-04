package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.AttributeOption;
import io.github.jhipster.application.repository.AttributeOptionRepository;
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
 * REST controller for managing AttributeOption.
 */
@RestController
@RequestMapping("/api")
public class AttributeOptionResource {

    private final Logger log = LoggerFactory.getLogger(AttributeOptionResource.class);

    private static final String ENTITY_NAME = "attributeOption";

    private final AttributeOptionRepository attributeOptionRepository;

    public AttributeOptionResource(AttributeOptionRepository attributeOptionRepository) {
        this.attributeOptionRepository = attributeOptionRepository;
    }

    /**
     * POST  /attribute-options : Create a new attributeOption.
     *
     * @param attributeOption the attributeOption to create
     * @return the ResponseEntity with status 201 (Created) and with body the new attributeOption, or with status 400 (Bad Request) if the attributeOption has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/attribute-options")
    @Timed
    public ResponseEntity<AttributeOption> createAttributeOption(@RequestBody AttributeOption attributeOption) throws URISyntaxException {
        log.debug("REST request to save AttributeOption : {}", attributeOption);
        if (attributeOption.getId() != null) {
            throw new BadRequestAlertException("A new attributeOption cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AttributeOption result = attributeOptionRepository.save(attributeOption);
        return ResponseEntity.created(new URI("/api/attribute-options/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /attribute-options : Updates an existing attributeOption.
     *
     * @param attributeOption the attributeOption to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated attributeOption,
     * or with status 400 (Bad Request) if the attributeOption is not valid,
     * or with status 500 (Internal Server Error) if the attributeOption couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/attribute-options")
    @Timed
    public ResponseEntity<AttributeOption> updateAttributeOption(@RequestBody AttributeOption attributeOption) throws URISyntaxException {
        log.debug("REST request to update AttributeOption : {}", attributeOption);
        if (attributeOption.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AttributeOption result = attributeOptionRepository.save(attributeOption);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, attributeOption.getId().toString()))
            .body(result);
    }

    /**
     * GET  /attribute-options : get all the attributeOptions.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of attributeOptions in body
     */
    @GetMapping("/attribute-options")
    @Timed
    public List<AttributeOption> getAllAttributeOptions() {
        log.debug("REST request to get all AttributeOptions");
        return attributeOptionRepository.findAll();
    }

    /**
     * GET  /attribute-options/:id : get the "id" attributeOption.
     *
     * @param id the id of the attributeOption to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the attributeOption, or with status 404 (Not Found)
     */
    @GetMapping("/attribute-options/{id}")
    @Timed
    public ResponseEntity<AttributeOption> getAttributeOption(@PathVariable Long id) {
        log.debug("REST request to get AttributeOption : {}", id);
        Optional<AttributeOption> attributeOption = attributeOptionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(attributeOption);
    }

    /**
     * DELETE  /attribute-options/:id : delete the "id" attributeOption.
     *
     * @param id the id of the attributeOption to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/attribute-options/{id}")
    @Timed
    public ResponseEntity<Void> deleteAttributeOption(@PathVariable Long id) {
        log.debug("REST request to delete AttributeOption : {}", id);

        attributeOptionRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
