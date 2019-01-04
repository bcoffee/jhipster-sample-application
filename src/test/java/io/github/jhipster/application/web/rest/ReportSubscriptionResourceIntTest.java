package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.JhipsterSampleApplicationApp;

import io.github.jhipster.application.domain.ReportSubscription;
import io.github.jhipster.application.repository.ReportSubscriptionRepository;
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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;


import static io.github.jhipster.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import io.github.jhipster.application.domain.enumeration.Language;
/**
 * Test class for the ReportSubscriptionResource REST controller.
 *
 * @see ReportSubscriptionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterSampleApplicationApp.class)
public class ReportSubscriptionResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Language DEFAULT_LANGUAGE = Language.ENGLISH;
    private static final Language UPDATED_LANGUAGE = Language.SPANISH;

    private static final LocalDate DEFAULT_START_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_START_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_RANGE = "AAAAAAAAAA";
    private static final String UPDATED_RANGE = "BBBBBBBBBB";

    private static final Integer DEFAULT_RANGE_N = 1;
    private static final Integer UPDATED_RANGE_N = 2;

    private static final Boolean DEFAULT_ACTIVE = false;
    private static final Boolean UPDATED_ACTIVE = true;

    private static final String DEFAULT_EMAIL_MESSAGE = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL_MESSAGE = "BBBBBBBBBB";

    @Autowired
    private ReportSubscriptionRepository reportSubscriptionRepository;

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

    private MockMvc restReportSubscriptionMockMvc;

    private ReportSubscription reportSubscription;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ReportSubscriptionResource reportSubscriptionResource = new ReportSubscriptionResource(reportSubscriptionRepository);
        this.restReportSubscriptionMockMvc = MockMvcBuilders.standaloneSetup(reportSubscriptionResource)
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
    public static ReportSubscription createEntity(EntityManager em) {
        ReportSubscription reportSubscription = new ReportSubscription()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .language(DEFAULT_LANGUAGE)
            .startDate(DEFAULT_START_DATE)
            .range(DEFAULT_RANGE)
            .rangeN(DEFAULT_RANGE_N)
            .active(DEFAULT_ACTIVE)
            .emailMessage(DEFAULT_EMAIL_MESSAGE);
        return reportSubscription;
    }

    @Before
    public void initTest() {
        reportSubscription = createEntity(em);
    }

    @Test
    @Transactional
    public void createReportSubscription() throws Exception {
        int databaseSizeBeforeCreate = reportSubscriptionRepository.findAll().size();

        // Create the ReportSubscription
        restReportSubscriptionMockMvc.perform(post("/api/report-subscriptions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reportSubscription)))
            .andExpect(status().isCreated());

        // Validate the ReportSubscription in the database
        List<ReportSubscription> reportSubscriptionList = reportSubscriptionRepository.findAll();
        assertThat(reportSubscriptionList).hasSize(databaseSizeBeforeCreate + 1);
        ReportSubscription testReportSubscription = reportSubscriptionList.get(reportSubscriptionList.size() - 1);
        assertThat(testReportSubscription.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testReportSubscription.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testReportSubscription.getLanguage()).isEqualTo(DEFAULT_LANGUAGE);
        assertThat(testReportSubscription.getStartDate()).isEqualTo(DEFAULT_START_DATE);
        assertThat(testReportSubscription.getRange()).isEqualTo(DEFAULT_RANGE);
        assertThat(testReportSubscription.getRangeN()).isEqualTo(DEFAULT_RANGE_N);
        assertThat(testReportSubscription.isActive()).isEqualTo(DEFAULT_ACTIVE);
        assertThat(testReportSubscription.getEmailMessage()).isEqualTo(DEFAULT_EMAIL_MESSAGE);
    }

    @Test
    @Transactional
    public void createReportSubscriptionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = reportSubscriptionRepository.findAll().size();

        // Create the ReportSubscription with an existing ID
        reportSubscription.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restReportSubscriptionMockMvc.perform(post("/api/report-subscriptions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reportSubscription)))
            .andExpect(status().isBadRequest());

        // Validate the ReportSubscription in the database
        List<ReportSubscription> reportSubscriptionList = reportSubscriptionRepository.findAll();
        assertThat(reportSubscriptionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllReportSubscriptions() throws Exception {
        // Initialize the database
        reportSubscriptionRepository.saveAndFlush(reportSubscription);

        // Get all the reportSubscriptionList
        restReportSubscriptionMockMvc.perform(get("/api/report-subscriptions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(reportSubscription.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].language").value(hasItem(DEFAULT_LANGUAGE.toString())))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(DEFAULT_START_DATE.toString())))
            .andExpect(jsonPath("$.[*].range").value(hasItem(DEFAULT_RANGE.toString())))
            .andExpect(jsonPath("$.[*].rangeN").value(hasItem(DEFAULT_RANGE_N)))
            .andExpect(jsonPath("$.[*].active").value(hasItem(DEFAULT_ACTIVE.booleanValue())))
            .andExpect(jsonPath("$.[*].emailMessage").value(hasItem(DEFAULT_EMAIL_MESSAGE.toString())));
    }
    
    @Test
    @Transactional
    public void getReportSubscription() throws Exception {
        // Initialize the database
        reportSubscriptionRepository.saveAndFlush(reportSubscription);

        // Get the reportSubscription
        restReportSubscriptionMockMvc.perform(get("/api/report-subscriptions/{id}", reportSubscription.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(reportSubscription.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.language").value(DEFAULT_LANGUAGE.toString()))
            .andExpect(jsonPath("$.startDate").value(DEFAULT_START_DATE.toString()))
            .andExpect(jsonPath("$.range").value(DEFAULT_RANGE.toString()))
            .andExpect(jsonPath("$.rangeN").value(DEFAULT_RANGE_N))
            .andExpect(jsonPath("$.active").value(DEFAULT_ACTIVE.booleanValue()))
            .andExpect(jsonPath("$.emailMessage").value(DEFAULT_EMAIL_MESSAGE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingReportSubscription() throws Exception {
        // Get the reportSubscription
        restReportSubscriptionMockMvc.perform(get("/api/report-subscriptions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateReportSubscription() throws Exception {
        // Initialize the database
        reportSubscriptionRepository.saveAndFlush(reportSubscription);

        int databaseSizeBeforeUpdate = reportSubscriptionRepository.findAll().size();

        // Update the reportSubscription
        ReportSubscription updatedReportSubscription = reportSubscriptionRepository.findById(reportSubscription.getId()).get();
        // Disconnect from session so that the updates on updatedReportSubscription are not directly saved in db
        em.detach(updatedReportSubscription);
        updatedReportSubscription
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .language(UPDATED_LANGUAGE)
            .startDate(UPDATED_START_DATE)
            .range(UPDATED_RANGE)
            .rangeN(UPDATED_RANGE_N)
            .active(UPDATED_ACTIVE)
            .emailMessage(UPDATED_EMAIL_MESSAGE);

        restReportSubscriptionMockMvc.perform(put("/api/report-subscriptions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedReportSubscription)))
            .andExpect(status().isOk());

        // Validate the ReportSubscription in the database
        List<ReportSubscription> reportSubscriptionList = reportSubscriptionRepository.findAll();
        assertThat(reportSubscriptionList).hasSize(databaseSizeBeforeUpdate);
        ReportSubscription testReportSubscription = reportSubscriptionList.get(reportSubscriptionList.size() - 1);
        assertThat(testReportSubscription.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testReportSubscription.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testReportSubscription.getLanguage()).isEqualTo(UPDATED_LANGUAGE);
        assertThat(testReportSubscription.getStartDate()).isEqualTo(UPDATED_START_DATE);
        assertThat(testReportSubscription.getRange()).isEqualTo(UPDATED_RANGE);
        assertThat(testReportSubscription.getRangeN()).isEqualTo(UPDATED_RANGE_N);
        assertThat(testReportSubscription.isActive()).isEqualTo(UPDATED_ACTIVE);
        assertThat(testReportSubscription.getEmailMessage()).isEqualTo(UPDATED_EMAIL_MESSAGE);
    }

    @Test
    @Transactional
    public void updateNonExistingReportSubscription() throws Exception {
        int databaseSizeBeforeUpdate = reportSubscriptionRepository.findAll().size();

        // Create the ReportSubscription

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restReportSubscriptionMockMvc.perform(put("/api/report-subscriptions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reportSubscription)))
            .andExpect(status().isBadRequest());

        // Validate the ReportSubscription in the database
        List<ReportSubscription> reportSubscriptionList = reportSubscriptionRepository.findAll();
        assertThat(reportSubscriptionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteReportSubscription() throws Exception {
        // Initialize the database
        reportSubscriptionRepository.saveAndFlush(reportSubscription);

        int databaseSizeBeforeDelete = reportSubscriptionRepository.findAll().size();

        // Get the reportSubscription
        restReportSubscriptionMockMvc.perform(delete("/api/report-subscriptions/{id}", reportSubscription.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ReportSubscription> reportSubscriptionList = reportSubscriptionRepository.findAll();
        assertThat(reportSubscriptionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ReportSubscription.class);
        ReportSubscription reportSubscription1 = new ReportSubscription();
        reportSubscription1.setId(1L);
        ReportSubscription reportSubscription2 = new ReportSubscription();
        reportSubscription2.setId(reportSubscription1.getId());
        assertThat(reportSubscription1).isEqualTo(reportSubscription2);
        reportSubscription2.setId(2L);
        assertThat(reportSubscription1).isNotEqualTo(reportSubscription2);
        reportSubscription1.setId(null);
        assertThat(reportSubscription1).isNotEqualTo(reportSubscription2);
    }
}
