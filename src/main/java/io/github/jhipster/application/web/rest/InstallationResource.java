package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.Installation;
import io.github.jhipster.application.repository.InstallationRepository;
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
 * REST controller for managing Installation.
 */
@RestController
@RequestMapping("/api")
public class InstallationResource {

    private final Logger log = LoggerFactory.getLogger(InstallationResource.class);

    private static final String ENTITY_NAME = "installation";

    private final InstallationRepository installationRepository;

    public InstallationResource(InstallationRepository installationRepository) {
        this.installationRepository = installationRepository;
    }

    /**
     * POST  /installations : Create a new installation.
     *
     * @param installation the installation to create
     * @return the ResponseEntity with status 201 (Created) and with body the new installation, or with status 400 (Bad Request) if the installation has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/installations")
    @Timed
    public ResponseEntity<Installation> createInstallation(@RequestBody Installation installation) throws URISyntaxException {
        log.debug("REST request to save Installation : {}", installation);
        if (installation.getId() != null) {
            throw new BadRequestAlertException("A new installation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Installation result = installationRepository.save(installation);
        return ResponseEntity.created(new URI("/api/installations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /installations : Updates an existing installation.
     *
     * @param installation the installation to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated installation,
     * or with status 400 (Bad Request) if the installation is not valid,
     * or with status 500 (Internal Server Error) if the installation couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/installations")
    @Timed
    public ResponseEntity<Installation> updateInstallation(@RequestBody Installation installation) throws URISyntaxException {
        log.debug("REST request to update Installation : {}", installation);
        if (installation.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Installation result = installationRepository.save(installation);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, installation.getId().toString()))
            .body(result);
    }

    /**
     * GET  /installations : get all the installations.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of installations in body
     */
    @GetMapping("/installations")
    @Timed
    public List<Installation> getAllInstallations() {
        log.debug("REST request to get all Installations");
        return installationRepository.findAll();
    }

    /**
     * GET  /installations/:id : get the "id" installation.
     *
     * @param id the id of the installation to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the installation, or with status 404 (Not Found)
     */
    @GetMapping("/installations/{id}")
    @Timed
    public ResponseEntity<Installation> getInstallation(@PathVariable Long id) {
        log.debug("REST request to get Installation : {}", id);
        Optional<Installation> installation = installationRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(installation);
    }

    /**
     * DELETE  /installations/:id : delete the "id" installation.
     *
     * @param id the id of the installation to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/installations/{id}")
    @Timed
    public ResponseEntity<Void> deleteInstallation(@PathVariable Long id) {
        log.debug("REST request to delete Installation : {}", id);

        installationRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
