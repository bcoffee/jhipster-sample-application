package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.ReportCategory;
import io.github.jhipster.application.repository.ReportCategoryRepository;
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
 * REST controller for managing ReportCategory.
 */
@RestController
@RequestMapping("/api")
public class ReportCategoryResource {

    private final Logger log = LoggerFactory.getLogger(ReportCategoryResource.class);

    private static final String ENTITY_NAME = "reportCategory";

    private final ReportCategoryRepository reportCategoryRepository;

    public ReportCategoryResource(ReportCategoryRepository reportCategoryRepository) {
        this.reportCategoryRepository = reportCategoryRepository;
    }

    /**
     * POST  /report-categories : Create a new reportCategory.
     *
     * @param reportCategory the reportCategory to create
     * @return the ResponseEntity with status 201 (Created) and with body the new reportCategory, or with status 400 (Bad Request) if the reportCategory has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/report-categories")
    @Timed
    public ResponseEntity<ReportCategory> createReportCategory(@RequestBody ReportCategory reportCategory) throws URISyntaxException {
        log.debug("REST request to save ReportCategory : {}", reportCategory);
        if (reportCategory.getId() != null) {
            throw new BadRequestAlertException("A new reportCategory cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ReportCategory result = reportCategoryRepository.save(reportCategory);
        return ResponseEntity.created(new URI("/api/report-categories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /report-categories : Updates an existing reportCategory.
     *
     * @param reportCategory the reportCategory to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated reportCategory,
     * or with status 400 (Bad Request) if the reportCategory is not valid,
     * or with status 500 (Internal Server Error) if the reportCategory couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/report-categories")
    @Timed
    public ResponseEntity<ReportCategory> updateReportCategory(@RequestBody ReportCategory reportCategory) throws URISyntaxException {
        log.debug("REST request to update ReportCategory : {}", reportCategory);
        if (reportCategory.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ReportCategory result = reportCategoryRepository.save(reportCategory);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, reportCategory.getId().toString()))
            .body(result);
    }

    /**
     * GET  /report-categories : get all the reportCategories.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of reportCategories in body
     */
    @GetMapping("/report-categories")
    @Timed
    public List<ReportCategory> getAllReportCategories() {
        log.debug("REST request to get all ReportCategories");
        return reportCategoryRepository.findAll();
    }

    /**
     * GET  /report-categories/:id : get the "id" reportCategory.
     *
     * @param id the id of the reportCategory to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the reportCategory, or with status 404 (Not Found)
     */
    @GetMapping("/report-categories/{id}")
    @Timed
    public ResponseEntity<ReportCategory> getReportCategory(@PathVariable Long id) {
        log.debug("REST request to get ReportCategory : {}", id);
        Optional<ReportCategory> reportCategory = reportCategoryRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(reportCategory);
    }

    /**
     * DELETE  /report-categories/:id : delete the "id" reportCategory.
     *
     * @param id the id of the reportCategory to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/report-categories/{id}")
    @Timed
    public ResponseEntity<Void> deleteReportCategory(@PathVariable Long id) {
        log.debug("REST request to delete ReportCategory : {}", id);

        reportCategoryRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
