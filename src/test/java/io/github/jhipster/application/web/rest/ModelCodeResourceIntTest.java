package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.JhipsterSampleApplicationApp;

import io.github.jhipster.application.domain.ModelCode;
import io.github.jhipster.application.repository.ModelCodeRepository;
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
 * Test class for the ModelCodeResource REST controller.
 *
 * @see ModelCodeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterSampleApplicationApp.class)
public class ModelCodeResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private ModelCodeRepository modelCodeRepository;

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

    private MockMvc restModelCodeMockMvc;

    private ModelCode modelCode;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ModelCodeResource modelCodeResource = new ModelCodeResource(modelCodeRepository);
        this.restModelCodeMockMvc = MockMvcBuilders.standaloneSetup(modelCodeResource)
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
    public static ModelCode createEntity(EntityManager em) {
        ModelCode modelCode = new ModelCode()
            .name(DEFAULT_NAME);
        return modelCode;
    }

    @Before
    public void initTest() {
        modelCode = createEntity(em);
    }

    @Test
    @Transactional
    public void createModelCode() throws Exception {
        int databaseSizeBeforeCreate = modelCodeRepository.findAll().size();

        // Create the ModelCode
        restModelCodeMockMvc.perform(post("/api/model-codes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(modelCode)))
            .andExpect(status().isCreated());

        // Validate the ModelCode in the database
        List<ModelCode> modelCodeList = modelCodeRepository.findAll();
        assertThat(modelCodeList).hasSize(databaseSizeBeforeCreate + 1);
        ModelCode testModelCode = modelCodeList.get(modelCodeList.size() - 1);
        assertThat(testModelCode.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createModelCodeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = modelCodeRepository.findAll().size();

        // Create the ModelCode with an existing ID
        modelCode.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restModelCodeMockMvc.perform(post("/api/model-codes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(modelCode)))
            .andExpect(status().isBadRequest());

        // Validate the ModelCode in the database
        List<ModelCode> modelCodeList = modelCodeRepository.findAll();
        assertThat(modelCodeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllModelCodes() throws Exception {
        // Initialize the database
        modelCodeRepository.saveAndFlush(modelCode);

        // Get all the modelCodeList
        restModelCodeMockMvc.perform(get("/api/model-codes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(modelCode.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }
    
    @Test
    @Transactional
    public void getModelCode() throws Exception {
        // Initialize the database
        modelCodeRepository.saveAndFlush(modelCode);

        // Get the modelCode
        restModelCodeMockMvc.perform(get("/api/model-codes/{id}", modelCode.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(modelCode.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingModelCode() throws Exception {
        // Get the modelCode
        restModelCodeMockMvc.perform(get("/api/model-codes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateModelCode() throws Exception {
        // Initialize the database
        modelCodeRepository.saveAndFlush(modelCode);

        int databaseSizeBeforeUpdate = modelCodeRepository.findAll().size();

        // Update the modelCode
        ModelCode updatedModelCode = modelCodeRepository.findById(modelCode.getId()).get();
        // Disconnect from session so that the updates on updatedModelCode are not directly saved in db
        em.detach(updatedModelCode);
        updatedModelCode
            .name(UPDATED_NAME);

        restModelCodeMockMvc.perform(put("/api/model-codes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedModelCode)))
            .andExpect(status().isOk());

        // Validate the ModelCode in the database
        List<ModelCode> modelCodeList = modelCodeRepository.findAll();
        assertThat(modelCodeList).hasSize(databaseSizeBeforeUpdate);
        ModelCode testModelCode = modelCodeList.get(modelCodeList.size() - 1);
        assertThat(testModelCode.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingModelCode() throws Exception {
        int databaseSizeBeforeUpdate = modelCodeRepository.findAll().size();

        // Create the ModelCode

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restModelCodeMockMvc.perform(put("/api/model-codes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(modelCode)))
            .andExpect(status().isBadRequest());

        // Validate the ModelCode in the database
        List<ModelCode> modelCodeList = modelCodeRepository.findAll();
        assertThat(modelCodeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteModelCode() throws Exception {
        // Initialize the database
        modelCodeRepository.saveAndFlush(modelCode);

        int databaseSizeBeforeDelete = modelCodeRepository.findAll().size();

        // Get the modelCode
        restModelCodeMockMvc.perform(delete("/api/model-codes/{id}", modelCode.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ModelCode> modelCodeList = modelCodeRepository.findAll();
        assertThat(modelCodeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ModelCode.class);
        ModelCode modelCode1 = new ModelCode();
        modelCode1.setId(1L);
        ModelCode modelCode2 = new ModelCode();
        modelCode2.setId(modelCode1.getId());
        assertThat(modelCode1).isEqualTo(modelCode2);
        modelCode2.setId(2L);
        assertThat(modelCode1).isNotEqualTo(modelCode2);
        modelCode1.setId(null);
        assertThat(modelCode1).isNotEqualTo(modelCode2);
    }
}
