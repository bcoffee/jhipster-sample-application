package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.UserOption;
import io.github.jhipster.application.repository.UserOptionRepository;
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
 * REST controller for managing UserOption.
 */
@RestController
@RequestMapping("/api")
public class UserOptionResource {

    private final Logger log = LoggerFactory.getLogger(UserOptionResource.class);

    private static final String ENTITY_NAME = "userOption";

    private final UserOptionRepository userOptionRepository;

    public UserOptionResource(UserOptionRepository userOptionRepository) {
        this.userOptionRepository = userOptionRepository;
    }

    /**
     * POST  /user-options : Create a new userOption.
     *
     * @param userOption the userOption to create
     * @return the ResponseEntity with status 201 (Created) and with body the new userOption, or with status 400 (Bad Request) if the userOption has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/user-options")
    @Timed
    public ResponseEntity<UserOption> createUserOption(@RequestBody UserOption userOption) throws URISyntaxException {
        log.debug("REST request to save UserOption : {}", userOption);
        if (userOption.getId() != null) {
            throw new BadRequestAlertException("A new userOption cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UserOption result = userOptionRepository.save(userOption);
        return ResponseEntity.created(new URI("/api/user-options/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /user-options : Updates an existing userOption.
     *
     * @param userOption the userOption to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated userOption,
     * or with status 400 (Bad Request) if the userOption is not valid,
     * or with status 500 (Internal Server Error) if the userOption couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/user-options")
    @Timed
    public ResponseEntity<UserOption> updateUserOption(@RequestBody UserOption userOption) throws URISyntaxException {
        log.debug("REST request to update UserOption : {}", userOption);
        if (userOption.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        UserOption result = userOptionRepository.save(userOption);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, userOption.getId().toString()))
            .body(result);
    }

    /**
     * GET  /user-options : get all the userOptions.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of userOptions in body
     */
    @GetMapping("/user-options")
    @Timed
    public List<UserOption> getAllUserOptions() {
        log.debug("REST request to get all UserOptions");
        return userOptionRepository.findAll();
    }

    /**
     * GET  /user-options/:id : get the "id" userOption.
     *
     * @param id the id of the userOption to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the userOption, or with status 404 (Not Found)
     */
    @GetMapping("/user-options/{id}")
    @Timed
    public ResponseEntity<UserOption> getUserOption(@PathVariable Long id) {
        log.debug("REST request to get UserOption : {}", id);
        Optional<UserOption> userOption = userOptionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(userOption);
    }

    /**
     * DELETE  /user-options/:id : delete the "id" userOption.
     *
     * @param id the id of the userOption to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/user-options/{id}")
    @Timed
    public ResponseEntity<Void> deleteUserOption(@PathVariable Long id) {
        log.debug("REST request to delete UserOption : {}", id);

        userOptionRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
