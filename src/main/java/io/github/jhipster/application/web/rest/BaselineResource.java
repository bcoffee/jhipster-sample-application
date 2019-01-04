package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.Baseline;
import io.github.jhipster.application.repository.BaselineRepository;
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
 * REST controller for managing Baseline.
 */
@RestController
@RequestMapping("/api")
public class BaselineResource {

    private final Logger log = LoggerFactory.getLogger(BaselineResource.class);

    private static final String ENTITY_NAME = "baseline";

    private final BaselineRepository baselineRepository;

    public BaselineResource(BaselineRepository baselineRepository) {
        this.baselineRepository = baselineRepository;
    }

    /**
     * POST  /baselines : Create a new baseline.
     *
     * @param baseline the baseline to create
     * @return the ResponseEntity with status 201 (Created) and with body the new baseline, or with status 400 (Bad Request) if the baseline has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/baselines")
    @Timed
    public ResponseEntity<Baseline> createBaseline(@RequestBody Baseline baseline) throws URISyntaxException {
        log.debug("REST request to save Baseline : {}", baseline);
        if (baseline.getId() != null) {
            throw new BadRequestAlertException("A new baseline cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Baseline result = baselineRepository.save(baseline);
        return ResponseEntity.created(new URI("/api/baselines/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /baselines : Updates an existing baseline.
     *
     * @param baseline the baseline to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated baseline,
     * or with status 400 (Bad Request) if the baseline is not valid,
     * or with status 500 (Internal Server Error) if the baseline couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/baselines")
    @Timed
    public ResponseEntity<Baseline> updateBaseline(@RequestBody Baseline baseline) throws URISyntaxException {
        log.debug("REST request to update Baseline : {}", baseline);
        if (baseline.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Baseline result = baselineRepository.save(baseline);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, baseline.getId().toString()))
            .body(result);
    }

    /**
     * GET  /baselines : get all the baselines.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of baselines in body
     */
    @GetMapping("/baselines")
    @Timed
    public List<Baseline> getAllBaselines() {
        log.debug("REST request to get all Baselines");
        return baselineRepository.findAll();
    }

    /**
     * GET  /baselines/:id : get the "id" baseline.
     *
     * @param id the id of the baseline to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the baseline, or with status 404 (Not Found)
     */
    @GetMapping("/baselines/{id}")
    @Timed
    public ResponseEntity<Baseline> getBaseline(@PathVariable Long id) {
        log.debug("REST request to get Baseline : {}", id);
        Optional<Baseline> baseline = baselineRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(baseline);
    }

    /**
     * DELETE  /baselines/:id : delete the "id" baseline.
     *
     * @param id the id of the baseline to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/baselines/{id}")
    @Timed
    public ResponseEntity<Void> deleteBaseline(@PathVariable Long id) {
        log.debug("REST request to delete Baseline : {}", id);

        baselineRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
