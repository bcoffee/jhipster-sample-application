package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.MessageMap;
import io.github.jhipster.application.repository.MessageMapRepository;
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
 * REST controller for managing MessageMap.
 */
@RestController
@RequestMapping("/api")
public class MessageMapResource {

    private final Logger log = LoggerFactory.getLogger(MessageMapResource.class);

    private static final String ENTITY_NAME = "messageMap";

    private final MessageMapRepository messageMapRepository;

    public MessageMapResource(MessageMapRepository messageMapRepository) {
        this.messageMapRepository = messageMapRepository;
    }

    /**
     * POST  /message-maps : Create a new messageMap.
     *
     * @param messageMap the messageMap to create
     * @return the ResponseEntity with status 201 (Created) and with body the new messageMap, or with status 400 (Bad Request) if the messageMap has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/message-maps")
    @Timed
    public ResponseEntity<MessageMap> createMessageMap(@RequestBody MessageMap messageMap) throws URISyntaxException {
        log.debug("REST request to save MessageMap : {}", messageMap);
        if (messageMap.getId() != null) {
            throw new BadRequestAlertException("A new messageMap cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MessageMap result = messageMapRepository.save(messageMap);
        return ResponseEntity.created(new URI("/api/message-maps/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /message-maps : Updates an existing messageMap.
     *
     * @param messageMap the messageMap to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated messageMap,
     * or with status 400 (Bad Request) if the messageMap is not valid,
     * or with status 500 (Internal Server Error) if the messageMap couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/message-maps")
    @Timed
    public ResponseEntity<MessageMap> updateMessageMap(@RequestBody MessageMap messageMap) throws URISyntaxException {
        log.debug("REST request to update MessageMap : {}", messageMap);
        if (messageMap.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MessageMap result = messageMapRepository.save(messageMap);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, messageMap.getId().toString()))
            .body(result);
    }

    /**
     * GET  /message-maps : get all the messageMaps.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of messageMaps in body
     */
    @GetMapping("/message-maps")
    @Timed
    public List<MessageMap> getAllMessageMaps() {
        log.debug("REST request to get all MessageMaps");
        return messageMapRepository.findAll();
    }

    /**
     * GET  /message-maps/:id : get the "id" messageMap.
     *
     * @param id the id of the messageMap to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the messageMap, or with status 404 (Not Found)
     */
    @GetMapping("/message-maps/{id}")
    @Timed
    public ResponseEntity<MessageMap> getMessageMap(@PathVariable Long id) {
        log.debug("REST request to get MessageMap : {}", id);
        Optional<MessageMap> messageMap = messageMapRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(messageMap);
    }

    /**
     * DELETE  /message-maps/:id : delete the "id" messageMap.
     *
     * @param id the id of the messageMap to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/message-maps/{id}")
    @Timed
    public ResponseEntity<Void> deleteMessageMap(@PathVariable Long id) {
        log.debug("REST request to delete MessageMap : {}", id);

        messageMapRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
