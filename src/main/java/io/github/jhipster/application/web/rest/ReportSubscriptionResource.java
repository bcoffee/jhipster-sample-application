package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.ReportSubscription;
import io.github.jhipster.application.repository.ReportSubscriptionRepository;
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
 * REST controller for managing ReportSubscription.
 */
@RestController
@RequestMapping("/api")
public class ReportSubscriptionResource {

    private final Logger log = LoggerFactory.getLogger(ReportSubscriptionResource.class);

    private static final String ENTITY_NAME = "reportSubscription";

    private final ReportSubscriptionRepository reportSubscriptionRepository;

    public ReportSubscriptionResource(ReportSubscriptionRepository reportSubscriptionRepository) {
        this.reportSubscriptionRepository = reportSubscriptionRepository;
    }

    /**
     * POST  /report-subscriptions : Create a new reportSubscription.
     *
     * @param reportSubscription the reportSubscription to create
     * @return the ResponseEntity with status 201 (Created) and with body the new reportSubscription, or with status 400 (Bad Request) if the reportSubscription has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/report-subscriptions")
    @Timed
    public ResponseEntity<ReportSubscription> createReportSubscription(@RequestBody ReportSubscription reportSubscription) throws URISyntaxException {
        log.debug("REST request to save ReportSubscription : {}", reportSubscription);
        if (reportSubscription.getId() != null) {
            throw new BadRequestAlertException("A new reportSubscription cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ReportSubscription result = reportSubscriptionRepository.save(reportSubscription);
        return ResponseEntity.created(new URI("/api/report-subscriptions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /report-subscriptions : Updates an existing reportSubscription.
     *
     * @param reportSubscription the reportSubscription to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated reportSubscription,
     * or with status 400 (Bad Request) if the reportSubscription is not valid,
     * or with status 500 (Internal Server Error) if the reportSubscription couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/report-subscriptions")
    @Timed
    public ResponseEntity<ReportSubscription> updateReportSubscription(@RequestBody ReportSubscription reportSubscription) throws URISyntaxException {
        log.debug("REST request to update ReportSubscription : {}", reportSubscription);
        if (reportSubscription.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ReportSubscription result = reportSubscriptionRepository.save(reportSubscription);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, reportSubscription.getId().toString()))
            .body(result);
    }

    /**
     * GET  /report-subscriptions : get all the reportSubscriptions.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of reportSubscriptions in body
     */
    @GetMapping("/report-subscriptions")
    @Timed
    public List<ReportSubscription> getAllReportSubscriptions() {
        log.debug("REST request to get all ReportSubscriptions");
        return reportSubscriptionRepository.findAll();
    }

    /**
     * GET  /report-subscriptions/:id : get the "id" reportSubscription.
     *
     * @param id the id of the reportSubscription to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the reportSubscription, or with status 404 (Not Found)
     */
    @GetMapping("/report-subscriptions/{id}")
    @Timed
    public ResponseEntity<ReportSubscription> getReportSubscription(@PathVariable Long id) {
        log.debug("REST request to get ReportSubscription : {}", id);
        Optional<ReportSubscription> reportSubscription = reportSubscriptionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(reportSubscription);
    }

    /**
     * DELETE  /report-subscriptions/:id : delete the "id" reportSubscription.
     *
     * @param id the id of the reportSubscription to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/report-subscriptions/{id}")
    @Timed
    public ResponseEntity<Void> deleteReportSubscription(@PathVariable Long id) {
        log.debug("REST request to delete ReportSubscription : {}", id);

        reportSubscriptionRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
