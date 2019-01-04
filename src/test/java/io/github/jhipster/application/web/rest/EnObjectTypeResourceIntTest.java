package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.JhipsterSampleApplicationApp;

import io.github.jhipster.application.domain.EnObjectType;
import io.github.jhipster.application.repository.EnObjectTypeRepository;
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
 * Test class for the EnObjectTypeResource REST controller.
 *
 * @see EnObjectTypeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterSampleApplicationApp.class)
public class EnObjectTypeResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private EnObjectTypeRepository enObjectTypeRepository;

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

    private MockMvc restEnObjectTypeMockMvc;

    private EnObjectType enObjectType;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EnObjectTypeResource enObjectTypeResource = new EnObjectTypeResource(enObjectTypeRepository);
        this.restEnObjectTypeMockMvc = MockMvcBuilders.standaloneSetup(enObjectTypeResource)
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
    public static EnObjectType createEntity(EntityManager em) {
        EnObjectType enObjectType = new EnObjectType()
            .name(DEFAULT_NAME);
        return enObjectType;
    }

    @Before
    public void initTest() {
        enObjectType = createEntity(em);
    }

    @Test
    @Transactional
    public void createEnObjectType() throws Exception {
        int databaseSizeBeforeCreate = enObjectTypeRepository.findAll().size();

        // Create the EnObjectType
        restEnObjectTypeMockMvc.perform(post("/api/en-object-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(enObjectType)))
            .andExpect(status().isCreated());

        // Validate the EnObjectType in the database
        List<EnObjectType> enObjectTypeList = enObjectTypeRepository.findAll();
        assertThat(enObjectTypeList).hasSize(databaseSizeBeforeCreate + 1);
        EnObjectType testEnObjectType = enObjectTypeList.get(enObjectTypeList.size() - 1);
        assertThat(testEnObjectType.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createEnObjectTypeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = enObjectTypeRepository.findAll().size();

        // Create the EnObjectType with an existing ID
        enObjectType.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEnObjectTypeMockMvc.perform(post("/api/en-object-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(enObjectType)))
            .andExpect(status().isBadRequest());

        // Validate the EnObjectType in the database
        List<EnObjectType> enObjectTypeList = enObjectTypeRepository.findAll();
        assertThat(enObjectTypeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllEnObjectTypes() throws Exception {
        // Initialize the database
        enObjectTypeRepository.saveAndFlush(enObjectType);

        // Get all the enObjectTypeList
        restEnObjectTypeMockMvc.perform(get("/api/en-object-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(enObjectType.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }
    
    @Test
    @Transactional
    public void getEnObjectType() throws Exception {
        // Initialize the database
        enObjectTypeRepository.saveAndFlush(enObjectType);

        // Get the enObjectType
        restEnObjectTypeMockMvc.perform(get("/api/en-object-types/{id}", enObjectType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(enObjectType.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEnObjectType() throws Exception {
        // Get the enObjectType
        restEnObjectTypeMockMvc.perform(get("/api/en-object-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEnObjectType() throws Exception {
        // Initialize the database
        enObjectTypeRepository.saveAndFlush(enObjectType);

        int databaseSizeBeforeUpdate = enObjectTypeRepository.findAll().size();

        // Update the enObjectType
        EnObjectType updatedEnObjectType = enObjectTypeRepository.findById(enObjectType.getId()).get();
        // Disconnect from session so that the updates on updatedEnObjectType are not directly saved in db
        em.detach(updatedEnObjectType);
        updatedEnObjectType
            .name(UPDATED_NAME);

        restEnObjectTypeMockMvc.perform(put("/api/en-object-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEnObjectType)))
            .andExpect(status().isOk());

        // Validate the EnObjectType in the database
        List<EnObjectType> enObjectTypeList = enObjectTypeRepository.findAll();
        assertThat(enObjectTypeList).hasSize(databaseSizeBeforeUpdate);
        EnObjectType testEnObjectType = enObjectTypeList.get(enObjectTypeList.size() - 1);
        assertThat(testEnObjectType.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingEnObjectType() throws Exception {
        int databaseSizeBeforeUpdate = enObjectTypeRepository.findAll().size();

        // Create the EnObjectType

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEnObjectTypeMockMvc.perform(put("/api/en-object-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(enObjectType)))
            .andExpect(status().isBadRequest());

        // Validate the EnObjectType in the database
        List<EnObjectType> enObjectTypeList = enObjectTypeRepository.findAll();
        assertThat(enObjectTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEnObjectType() throws Exception {
        // Initialize the database
        enObjectTypeRepository.saveAndFlush(enObjectType);

        int databaseSizeBeforeDelete = enObjectTypeRepository.findAll().size();

        // Get the enObjectType
        restEnObjectTypeMockMvc.perform(delete("/api/en-object-types/{id}", enObjectType.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<EnObjectType> enObjectTypeList = enObjectTypeRepository.findAll();
        assertThat(enObjectTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EnObjectType.class);
        EnObjectType enObjectType1 = new EnObjectType();
        enObjectType1.setId(1L);
        EnObjectType enObjectType2 = new EnObjectType();
        enObjectType2.setId(enObjectType1.getId());
        assertThat(enObjectType1).isEqualTo(enObjectType2);
        enObjectType2.setId(2L);
        assertThat(enObjectType1).isNotEqualTo(enObjectType2);
        enObjectType1.setId(null);
        assertThat(enObjectType1).isNotEqualTo(enObjectType2);
    }
}
