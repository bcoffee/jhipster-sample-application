package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.ModelCode;
import io.github.jhipster.application.repository.ModelCodeRepository;
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
 * REST controller for managing ModelCode.
 */
@RestController
@RequestMapping("/api")
public class ModelCodeResource {

    private final Logger log = LoggerFactory.getLogger(ModelCodeResource.class);

    private static final String ENTITY_NAME = "modelCode";

    private final ModelCodeRepository modelCodeRepository;

    public ModelCodeResource(ModelCodeRepository modelCodeRepository) {
        this.modelCodeRepository = modelCodeRepository;
    }

    /**
     * POST  /model-codes : Create a new modelCode.
     *
     * @param modelCode the modelCode to create
     * @return the ResponseEntity with status 201 (Created) and with body the new modelCode, or with status 400 (Bad Request) if the modelCode has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/model-codes")
    @Timed
    public ResponseEntity<ModelCode> createModelCode(@RequestBody ModelCode modelCode) throws URISyntaxException {
        log.debug("REST request to save ModelCode : {}", modelCode);
        if (modelCode.getId() != null) {
            throw new BadRequestAlertException("A new modelCode cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ModelCode result = modelCodeRepository.save(modelCode);
        return ResponseEntity.created(new URI("/api/model-codes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /model-codes : Updates an existing modelCode.
     *
     * @param modelCode the modelCode to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated modelCode,
     * or with status 400 (Bad Request) if the modelCode is not valid,
     * or with status 500 (Internal Server Error) if the modelCode couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/model-codes")
    @Timed
    public ResponseEntity<ModelCode> updateModelCode(@RequestBody ModelCode modelCode) throws URISyntaxException {
        log.debug("REST request to update ModelCode : {}", modelCode);
        if (modelCode.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ModelCode result = modelCodeRepository.save(modelCode);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, modelCode.getId().toString()))
            .body(result);
    }

    /**
     * GET  /model-codes : get all the modelCodes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of modelCodes in body
     */
    @GetMapping("/model-codes")
    @Timed
    public List<ModelCode> getAllModelCodes() {
        log.debug("REST request to get all ModelCodes");
        return modelCodeRepository.findAll();
    }

    /**
     * GET  /model-codes/:id : get the "id" modelCode.
     *
     * @param id the id of the modelCode to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the modelCode, or with status 404 (Not Found)
     */
    @GetMapping("/model-codes/{id}")
    @Timed
    public ResponseEntity<ModelCode> getModelCode(@PathVariable Long id) {
        log.debug("REST request to get ModelCode : {}", id);
        Optional<ModelCode> modelCode = modelCodeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(modelCode);
    }

    /**
     * DELETE  /model-codes/:id : delete the "id" modelCode.
     *
     * @param id the id of the modelCode to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/model-codes/{id}")
    @Timed
    public ResponseEntity<Void> deleteModelCode(@PathVariable Long id) {
        log.debug("REST request to delete ModelCode : {}", id);

        modelCodeRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
