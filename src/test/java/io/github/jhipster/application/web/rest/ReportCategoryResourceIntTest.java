package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.JhipsterSampleApplicationApp;

import io.github.jhipster.application.domain.ReportCategory;
import io.github.jhipster.application.repository.ReportCategoryRepository;
import io.github.jhipster.application.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;


import static io.github.jhipster.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ReportCategoryResource REST controller.
 *
 * @see ReportCategoryResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterSampleApplicationApp.class)
public class ReportCategoryResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private ReportCategoryRepository reportCategoryRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restReportCategoryMockMvc;

    private ReportCategory reportCategory;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ReportCategoryResource reportCategoryResource = new ReportCategoryResource(reportCategoryRepository);
        this.restReportCategoryMockMvc = MockMvcBuilders.standaloneSetup(reportCategoryResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ReportCategory createEntity(EntityManager em) {
        ReportCategory reportCategory = new ReportCategory()
            .name(DEFAULT_NAME);
        return reportCategory;
    }

    @Before
    public void initTest() {
        reportCategory = createEntity(em);
    }

    @Test
    @Transactional
    public void createReportCategory() throws Exception {
        int databaseSizeBeforeCreate = reportCategoryRepository.findAll().size();

        // Create the ReportCategory
        restReportCategoryMockMvc.perform(post("/api/report-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reportCategory)))
            .andExpect(status().isCreated());

        // Validate the ReportCategory in the database
        List<ReportCategory> reportCategoryList = reportCategoryRepository.findAll();
        assertThat(reportCategoryList).hasSize(databaseSizeBeforeCreate + 1);
        ReportCategory testReportCategory = reportCategoryList.get(reportCategoryList.size() - 1);
        assertThat(testReportCategory.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createReportCategoryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = reportCategoryRepository.findAll().size();

        // Create the ReportCategory with an existing ID
        reportCategory.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restReportCategoryMockMvc.perform(post("/api/report-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reportCategory)))
            .andExpect(status().isBadRequest());

        // Validate the ReportCategory in the database
        List<ReportCategory> reportCategoryList = reportCategoryRepository.findAll();
        assertThat(reportCategoryList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllReportCategories() throws Exception {
        // Initialize the database
        reportCategoryRepository.saveAndFlush(reportCategory);

        // Get all the reportCategoryList
        restReportCategoryMockMvc.perform(get("/api/report-categories?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(reportCategory.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }
    
    @Test
    @Transactional
    public void getReportCategory() throws Exception {
        // Initialize the database
        reportCategoryRepository.saveAndFlush(reportCategory);

        // Get the reportCategory
        restReportCategoryMockMvc.perform(get("/api/report-categories/{id}", reportCategory.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(reportCategory.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingReportCategory() throws Exception {
        // Get the reportCategory
        restReportCategoryMockMvc.perform(get("/api/report-categories/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateReportCategory() throws Exception {
        // Initialize the database
        reportCategoryRepository.saveAndFlush(reportCategory);

        int databaseSizeBeforeUpdate = reportCategoryRepository.findAll().size();

        // Update the reportCategory
        ReportCategory updatedReportCategory = reportCategoryRepository.findById(reportCategory.getId()).get();
        // Disconnect from session so that the updates on updatedReportCategory are not directly saved in db
        em.detach(updatedReportCategory);
        updatedReportCategory
            .name(UPDATED_NAME);

        restReportCategoryMockMvc.perform(put("/api/report-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedReportCategory)))
            .andExpect(status().isOk());

        // Validate the ReportCategory in the database
        List<ReportCategory> reportCategoryList = reportCategoryRepository.findAll();
        assertThat(reportCategoryList).hasSize(databaseSizeBeforeUpdate);
        ReportCategory testReportCategory = reportCategoryList.get(reportCategoryList.size() - 1);
        assertThat(testReportCategory.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingReportCategory() throws Exception {
        int databaseSizeBeforeUpdate = reportCategoryRepository.findAll().size();

        // Create the ReportCategory

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restReportCategoryMockMvc.perform(put("/api/report-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reportCategory)))
            .andExpect(status().isBadRequest());

        // Validate the ReportCategory in the database
        List<ReportCategory> reportCategoryList = reportCategoryRepository.findAll();
        assertThat(reportCategoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteReportCategory() throws Exception {
        // Initialize the database
        reportCategoryRepository.saveAndFlush(reportCategory);

        int databaseSizeBeforeDelete = reportCategoryRepository.findAll().size();

        // Get the reportCategory
        restReportCategoryMockMvc.perform(delete("/api/report-categories/{id}", reportCategory.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ReportCategory> reportCategoryList = reportCategoryRepository.findAll();
        assertThat(reportCategoryList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ReportCategory.class);
        ReportCategory reportCategory1 = new ReportCategory();
        reportCategory1.setId(1L);
        ReportCategory reportCategory2 = new ReportCategory();
        reportCategory2.setId(reportCategory1.getId());
        assertThat(reportCategory1).isEqualTo(reportCategory2);
        reportCategory2.setId(2L);
        assertThat(reportCategory1).isNotEqualTo(reportCategory2);
        reportCategory1.setId(null);
        assertThat(reportCategory1).isNotEqualTo(reportCategory2);
    }
}
