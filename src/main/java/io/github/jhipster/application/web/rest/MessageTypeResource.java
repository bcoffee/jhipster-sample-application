package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.MessageType;
import io.github.jhipster.application.repository.MessageTypeRepository;
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
 * REST controller for managing MessageType.
 */
@RestController
@RequestMapping("/api")
public class MessageTypeResource {

    private final Logger log = LoggerFactory.getLogger(MessageTypeResource.class);

    private static final String ENTITY_NAME = "messageType";

    private final MessageTypeRepository messageTypeRepository;

    public MessageTypeResource(MessageTypeRepository messageTypeRepository) {
        this.messageTypeRepository = messageTypeRepository;
    }

    /**
     * POST  /message-types : Create a new messageType.
     *
     * @param messageType the messageType to create
     * @return the ResponseEntity with status 201 (Created) and with body the new messageType, or with status 400 (Bad Request) if the messageType has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/message-types")
    @Timed
    public ResponseEntity<MessageType> createMessageType(@RequestBody MessageType messageType) throws URISyntaxException {
        log.debug("REST request to save MessageType : {}", messageType);
        if (messageType.getId() != null) {
            throw new BadRequestAlertException("A new messageType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MessageType result = messageTypeRepository.save(messageType);
        return ResponseEntity.created(new URI("/api/message-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /message-types : Updates an existing messageType.
     *
     * @param messageType the messageType to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated messageType,
     * or with status 400 (Bad Request) if the messageType is not valid,
     * or with status 500 (Internal Server Error) if the messageType couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/message-types")
    @Timed
    public ResponseEntity<MessageType> updateMessageType(@RequestBody MessageType messageType) throws URISyntaxException {
        log.debug("REST request to update MessageType : {}", messageType);
        if (messageType.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MessageType result = messageTypeRepository.save(messageType);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, messageType.getId().toString()))
            .body(result);
    }

    /**
     * GET  /message-types : get all the messageTypes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of messageTypes in body
     */
    @GetMapping("/message-types")
    @Timed
    public List<MessageType> getAllMessageTypes() {
        log.debug("REST request to get all MessageTypes");
        return messageTypeRepository.findAll();
    }

    /**
     * GET  /message-types/:id : get the "id" messageType.
     *
     * @param id the id of the messageType to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the messageType, or with status 404 (Not Found)
     */
    @GetMapping("/message-types/{id}")
    @Timed
    public ResponseEntity<MessageType> getMessageType(@PathVariable Long id) {
        log.debug("REST request to get MessageType : {}", id);
        Optional<MessageType> messageType = messageTypeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(messageType);
    }

    /**
     * DELETE  /message-types/:id : delete the "id" messageType.
     *
     * @param id the id of the messageType to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/message-types/{id}")
    @Timed
    public ResponseEntity<Void> deleteMessageType(@PathVariable Long id) {
        log.debug("REST request to delete MessageType : {}", id);

        messageTypeRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
