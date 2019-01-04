package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.NotificationParameter;
import io.github.jhipster.application.repository.NotificationParameterRepository;
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
 * REST controller for managing NotificationParameter.
 */
@RestController
@RequestMapping("/api")
public class NotificationParameterResource {

    private final Logger log = LoggerFactory.getLogger(NotificationParameterResource.class);

    private static final String ENTITY_NAME = "notificationParameter";

    private final NotificationParameterRepository notificationParameterRepository;

    public NotificationParameterResource(NotificationParameterRepository notificationParameterRepository) {
        this.notificationParameterRepository = notificationParameterRepository;
    }

    /**
     * POST  /notification-parameters : Create a new notificationParameter.
     *
     * @param notificationParameter the notificationParameter to create
     * @return the ResponseEntity with status 201 (Created) and with body the new notificationParameter, or with status 400 (Bad Request) if the notificationParameter has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/notification-parameters")
    @Timed
    public ResponseEntity<NotificationParameter> createNotificationParameter(@RequestBody NotificationParameter notificationParameter) throws URISyntaxException {
        log.debug("REST request to save NotificationParameter : {}", notificationParameter);
        if (notificationParameter.getId() != null) {
            throw new BadRequestAlertException("A new notificationParameter cannot already have an ID", ENTITY_NAME, "idexists");
        }
        NotificationParameter result = notificationParameterRepository.save(notificationParameter);
        return ResponseEntity.created(new URI("/api/notification-parameters/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /notification-parameters : Updates an existing notificationParameter.
     *
     * @param notificationParameter the notificationParameter to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated notificationParameter,
     * or with status 400 (Bad Request) if the notificationParameter is not valid,
     * or with status 500 (Internal Server Error) if the notificationParameter couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/notification-parameters")
    @Timed
    public ResponseEntity<NotificationParameter> updateNotificationParameter(@RequestBody NotificationParameter notificationParameter) throws URISyntaxException {
        log.debug("REST request to update NotificationParameter : {}", notificationParameter);
        if (notificationParameter.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        NotificationParameter result = notificationParameterRepository.save(notificationParameter);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, notificationParameter.getId().toString()))
            .body(result);
    }

    /**
     * GET  /notification-parameters : get all the notificationParameters.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of notificationParameters in body
     */
    @GetMapping("/notification-parameters")
    @Timed
    public List<NotificationParameter> getAllNotificationParameters() {
        log.debug("REST request to get all NotificationParameters");
        return notificationParameterRepository.findAll();
    }

    /**
     * GET  /notification-parameters/:id : get the "id" notificationParameter.
     *
     * @param id the id of the notificationParameter to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the notificationParameter, or with status 404 (Not Found)
     */
    @GetMapping("/notification-parameters/{id}")
    @Timed
    public ResponseEntity<NotificationParameter> getNotificationParameter(@PathVariable Long id) {
        log.debug("REST request to get NotificationParameter : {}", id);
        Optional<NotificationParameter> notificationParameter = notificationParameterRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(notificationParameter);
    }

    /**
     * DELETE  /notification-parameters/:id : delete the "id" notificationParameter.
     *
     * @param id the id of the notificationParameter to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/notification-parameters/{id}")
    @Timed
    public ResponseEntity<Void> deleteNotificationParameter(@PathVariable Long id) {
        log.debug("REST request to delete NotificationParameter : {}", id);

        notificationParameterRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
