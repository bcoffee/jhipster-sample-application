package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.DistributionList;
import io.github.jhipster.application.repository.DistributionListRepository;
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
 * REST controller for managing DistributionList.
 */
@RestController
@RequestMapping("/api")
public class DistributionListResource {

    private final Logger log = LoggerFactory.getLogger(DistributionListResource.class);

    private static final String ENTITY_NAME = "distributionList";

    private final DistributionListRepository distributionListRepository;

    public DistributionListResource(DistributionListRepository distributionListRepository) {
        this.distributionListRepository = distributionListRepository;
    }

    /**
     * POST  /distribution-lists : Create a new distributionList.
     *
     * @param distributionList the distributionList to create
     * @return the ResponseEntity with status 201 (Created) and with body the new distributionList, or with status 400 (Bad Request) if the distributionList has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/distribution-lists")
    @Timed
    public ResponseEntity<DistributionList> createDistributionList(@RequestBody DistributionList distributionList) throws URISyntaxException {
        log.debug("REST request to save DistributionList : {}", distributionList);
        if (distributionList.getId() != null) {
            throw new BadRequestAlertException("A new distributionList cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DistributionList result = distributionListRepository.save(distributionList);
        return ResponseEntity.created(new URI("/api/distribution-lists/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /distribution-lists : Updates an existing distributionList.
     *
     * @param distributionList the distributionList to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated distributionList,
     * or with status 400 (Bad Request) if the distributionList is not valid,
     * or with status 500 (Internal Server Error) if the distributionList couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/distribution-lists")
    @Timed
    public ResponseEntity<DistributionList> updateDistributionList(@RequestBody DistributionList distributionList) throws URISyntaxException {
        log.debug("REST request to update DistributionList : {}", distributionList);
        if (distributionList.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DistributionList result = distributionListRepository.save(distributionList);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, distributionList.getId().toString()))
            .body(result);
    }

    /**
     * GET  /distribution-lists : get all the distributionLists.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of distributionLists in body
     */
    @GetMapping("/distribution-lists")
    @Timed
    public List<DistributionList> getAllDistributionLists() {
        log.debug("REST request to get all DistributionLists");
        return distributionListRepository.findAll();
    }

    /**
     * GET  /distribution-lists/:id : get the "id" distributionList.
     *
     * @param id the id of the distributionList to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the distributionList, or with status 404 (Not Found)
     */
    @GetMapping("/distribution-lists/{id}")
    @Timed
    public ResponseEntity<DistributionList> getDistributionList(@PathVariable Long id) {
        log.debug("REST request to get DistributionList : {}", id);
        Optional<DistributionList> distributionList = distributionListRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(distributionList);
    }

    /**
     * DELETE  /distribution-lists/:id : delete the "id" distributionList.
     *
     * @param id the id of the distributionList to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/distribution-lists/{id}")
    @Timed
    public ResponseEntity<Void> deleteDistributionList(@PathVariable Long id) {
        log.debug("REST request to delete DistributionList : {}", id);

        distributionListRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
