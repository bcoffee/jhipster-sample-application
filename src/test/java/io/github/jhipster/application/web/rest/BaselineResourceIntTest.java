package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.JhipsterSampleApplicationApp;

import io.github.jhipster.application.domain.Baseline;
import io.github.jhipster.application.repository.BaselineRepository;
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
 * Test class for the BaselineResource REST controller.
 *
 * @see BaselineResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterSampleApplicationApp.class)
public class BaselineResourceIntTest {

    private static final Float DEFAULT_CYCLE_LENGTH = 1F;
    private static final Float UPDATED_CYCLE_LENGTH = 2F;

    private static final Float DEFAULT_MIN_TOLERANCE = 1F;
    private static final Float UPDATED_MIN_TOLERANCE = 2F;

    private static final Float DEFAULT_MAX_TOLERANCE = 1F;
    private static final Float UPDATED_MAX_TOLERANCE = 2F;

    private static final Float DEFAULT_MIN_NORMAL_TOLERANCE = 1F;
    private static final Float UPDATED_MIN_NORMAL_TOLERANCE = 2F;

    private static final Float DEFAULT_MAX_NORMAL_TOLERANCE = 1F;
    private static final Float UPDATED_MAX_NORMAL_TOLERANCE = 2F;

    @Autowired
    private BaselineRepository baselineRepository;

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

    private MockMvc restBaselineMockMvc;

    private Baseline baseline;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BaselineResource baselineResource = new BaselineResource(baselineRepository);
        this.restBaselineMockMvc = MockMvcBuilders.standaloneSetup(baselineResource)
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
    public static Baseline createEntity(EntityManager em) {
        Baseline baseline = new Baseline()
            .cycleLength(DEFAULT_CYCLE_LENGTH)
            .minTolerance(DEFAULT_MIN_TOLERANCE)
            .maxTolerance(DEFAULT_MAX_TOLERANCE)
            .minNormalTolerance(DEFAULT_MIN_NORMAL_TOLERANCE)
            .maxNormalTolerance(DEFAULT_MAX_NORMAL_TOLERANCE);
        return baseline;
    }

    @Before
    public void initTest() {
        baseline = createEntity(em);
    }

    @Test
    @Transactional
    public void createBaseline() throws Exception {
        int databaseSizeBeforeCreate = baselineRepository.findAll().size();

        // Create the Baseline
        restBaselineMockMvc.perform(post("/api/baselines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(baseline)))
            .andExpect(status().isCreated());

        // Validate the Baseline in the database
        List<Baseline> baselineList = baselineRepository.findAll();
        assertThat(baselineList).hasSize(databaseSizeBeforeCreate + 1);
        Baseline testBaseline = baselineList.get(baselineList.size() - 1);
        assertThat(testBaseline.getCycleLength()).isEqualTo(DEFAULT_CYCLE_LENGTH);
        assertThat(testBaseline.getMinTolerance()).isEqualTo(DEFAULT_MIN_TOLERANCE);
        assertThat(testBaseline.getMaxTolerance()).isEqualTo(DEFAULT_MAX_TOLERANCE);
        assertThat(testBaseline.getMinNormalTolerance()).isEqualTo(DEFAULT_MIN_NORMAL_TOLERANCE);
        assertThat(testBaseline.getMaxNormalTolerance()).isEqualTo(DEFAULT_MAX_NORMAL_TOLERANCE);
    }

    @Test
    @Transactional
    public void createBaselineWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = baselineRepository.findAll().size();

        // Create the Baseline with an existing ID
        baseline.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBaselineMockMvc.perform(post("/api/baselines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(baseline)))
            .andExpect(status().isBadRequest());

        // Validate the Baseline in the database
        List<Baseline> baselineList = baselineRepository.findAll();
        assertThat(baselineList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllBaselines() throws Exception {
        // Initialize the database
        baselineRepository.saveAndFlush(baseline);

        // Get all the baselineList
        restBaselineMockMvc.perform(get("/api/baselines?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(baseline.getId().intValue())))
            .andExpect(jsonPath("$.[*].cycleLength").value(hasItem(DEFAULT_CYCLE_LENGTH.doubleValue())))
            .andExpect(jsonPath("$.[*].minTolerance").value(hasItem(DEFAULT_MIN_TOLERANCE.doubleValue())))
            .andExpect(jsonPath("$.[*].maxTolerance").value(hasItem(DEFAULT_MAX_TOLERANCE.doubleValue())))
            .andExpect(jsonPath("$.[*].minNormalTolerance").value(hasItem(DEFAULT_MIN_NORMAL_TOLERANCE.doubleValue())))
            .andExpect(jsonPath("$.[*].maxNormalTolerance").value(hasItem(DEFAULT_MAX_NORMAL_TOLERANCE.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getBaseline() throws Exception {
        // Initialize the database
        baselineRepository.saveAndFlush(baseline);

        // Get the baseline
        restBaselineMockMvc.perform(get("/api/baselines/{id}", baseline.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(baseline.getId().intValue()))
            .andExpect(jsonPath("$.cycleLength").value(DEFAULT_CYCLE_LENGTH.doubleValue()))
            .andExpect(jsonPath("$.minTolerance").value(DEFAULT_MIN_TOLERANCE.doubleValue()))
            .andExpect(jsonPath("$.maxTolerance").value(DEFAULT_MAX_TOLERANCE.doubleValue()))
            .andExpect(jsonPath("$.minNormalTolerance").value(DEFAULT_MIN_NORMAL_TOLERANCE.doubleValue()))
            .andExpect(jsonPath("$.maxNormalTolerance").value(DEFAULT_MAX_NORMAL_TOLERANCE.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingBaseline() throws Exception {
        // Get the baseline
        restBaselineMockMvc.perform(get("/api/baselines/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBaseline() throws Exception {
        // Initialize the database
        baselineRepository.saveAndFlush(baseline);

        int databaseSizeBeforeUpdate = baselineRepository.findAll().size();

        // Update the baseline
        Baseline updatedBaseline = baselineRepository.findById(baseline.getId()).get();
        // Disconnect from session so that the updates on updatedBaseline are not directly saved in db
        em.detach(updatedBaseline);
        updatedBaseline
            .cycleLength(UPDATED_CYCLE_LENGTH)
            .minTolerance(UPDATED_MIN_TOLERANCE)
            .maxTolerance(UPDATED_MAX_TOLERANCE)
            .minNormalTolerance(UPDATED_MIN_NORMAL_TOLERANCE)
            .maxNormalTolerance(UPDATED_MAX_NORMAL_TOLERANCE);

        restBaselineMockMvc.perform(put("/api/baselines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedBaseline)))
            .andExpect(status().isOk());

        // Validate the Baseline in the database
        List<Baseline> baselineList = baselineRepository.findAll();
        assertThat(baselineList).hasSize(databaseSizeBeforeUpdate);
        Baseline testBaseline = baselineList.get(baselineList.size() - 1);
        assertThat(testBaseline.getCycleLength()).isEqualTo(UPDATED_CYCLE_LENGTH);
        assertThat(testBaseline.getMinTolerance()).isEqualTo(UPDATED_MIN_TOLERANCE);
        assertThat(testBaseline.getMaxTolerance()).isEqualTo(UPDATED_MAX_TOLERANCE);
        assertThat(testBaseline.getMinNormalTolerance()).isEqualTo(UPDATED_MIN_NORMAL_TOLERANCE);
        assertThat(testBaseline.getMaxNormalTolerance()).isEqualTo(UPDATED_MAX_NORMAL_TOLERANCE);
    }

    @Test
    @Transactional
    public void updateNonExistingBaseline() throws Exception {
        int databaseSizeBeforeUpdate = baselineRepository.findAll().size();

        // Create the Baseline

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBaselineMockMvc.perform(put("/api/baselines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(baseline)))
            .andExpect(status().isBadRequest());

        // Validate the Baseline in the database
        List<Baseline> baselineList = baselineRepository.findAll();
        assertThat(baselineList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteBaseline() throws Exception {
        // Initialize the database
        baselineRepository.saveAndFlush(baseline);

        int databaseSizeBeforeDelete = baselineRepository.findAll().size();

        // Get the baseline
        restBaselineMockMvc.perform(delete("/api/baselines/{id}", baseline.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Baseline> baselineList = baselineRepository.findAll();
        assertThat(baselineList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Baseline.class);
        Baseline baseline1 = new Baseline();
        baseline1.setId(1L);
        Baseline baseline2 = new Baseline();
        baseline2.setId(baseline1.getId());
        assertThat(baseline1).isEqualTo(baseline2);
        baseline2.setId(2L);
        assertThat(baseline1).isNotEqualTo(baseline2);
        baseline1.setId(null);
        assertThat(baseline1).isNotEqualTo(baseline2);
    }
}
