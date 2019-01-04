package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.JhipsterSampleApplicationApp;

import io.github.jhipster.application.domain.EnObject;
import io.github.jhipster.application.repository.EnObjectRepository;
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

import io.github.jhipster.application.domain.enumeration.Language;
/**
 * Test class for the EnObjectResource REST controller.
 *
 * @see EnObjectResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterSampleApplicationApp.class)
public class EnObjectResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Language DEFAULT_LANGUAGE = Language.ENGLISH;
    private static final Language UPDATED_LANGUAGE = Language.SPANISH;

    @Autowired
    private EnObjectRepository enObjectRepository;

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

    private MockMvc restEnObjectMockMvc;

    private EnObject enObject;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EnObjectResource enObjectResource = new EnObjectResource(enObjectRepository);
        this.restEnObjectMockMvc = MockMvcBuilders.standaloneSetup(enObjectResource)
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
    public static EnObject createEntity(EntityManager em) {
        EnObject enObject = new EnObject()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .language(DEFAULT_LANGUAGE);
        return enObject;
    }

    @Before
    public void initTest() {
        enObject = createEntity(em);
    }

    @Test
    @Transactional
    public void createEnObject() throws Exception {
        int databaseSizeBeforeCreate = enObjectRepository.findAll().size();

        // Create the EnObject
        restEnObjectMockMvc.perform(post("/api/en-objects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(enObject)))
            .andExpect(status().isCreated());

        // Validate the EnObject in the database
        List<EnObject> enObjectList = enObjectRepository.findAll();
        assertThat(enObjectList).hasSize(databaseSizeBeforeCreate + 1);
        EnObject testEnObject = enObjectList.get(enObjectList.size() - 1);
        assertThat(testEnObject.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testEnObject.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testEnObject.getLanguage()).isEqualTo(DEFAULT_LANGUAGE);
    }

    @Test
    @Transactional
    public void createEnObjectWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = enObjectRepository.findAll().size();

        // Create the EnObject with an existing ID
        enObject.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEnObjectMockMvc.perform(post("/api/en-objects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(enObject)))
            .andExpect(status().isBadRequest());

        // Validate the EnObject in the database
        List<EnObject> enObjectList = enObjectRepository.findAll();
        assertThat(enObjectList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllEnObjects() throws Exception {
        // Initialize the database
        enObjectRepository.saveAndFlush(enObject);

        // Get all the enObjectList
        restEnObjectMockMvc.perform(get("/api/en-objects?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(enObject.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].language").value(hasItem(DEFAULT_LANGUAGE.toString())));
    }
    
    @Test
    @Transactional
    public void getEnObject() throws Exception {
        // Initialize the database
        enObjectRepository.saveAndFlush(enObject);

        // Get the enObject
        restEnObjectMockMvc.perform(get("/api/en-objects/{id}", enObject.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(enObject.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.language").value(DEFAULT_LANGUAGE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEnObject() throws Exception {
        // Get the enObject
        restEnObjectMockMvc.perform(get("/api/en-objects/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEnObject() throws Exception {
        // Initialize the database
        enObjectRepository.saveAndFlush(enObject);

        int databaseSizeBeforeUpdate = enObjectRepository.findAll().size();

        // Update the enObject
        EnObject updatedEnObject = enObjectRepository.findById(enObject.getId()).get();
        // Disconnect from session so that the updates on updatedEnObject are not directly saved in db
        em.detach(updatedEnObject);
        updatedEnObject
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .language(UPDATED_LANGUAGE);

        restEnObjectMockMvc.perform(put("/api/en-objects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEnObject)))
            .andExpect(status().isOk());

        // Validate the EnObject in the database
        List<EnObject> enObjectList = enObjectRepository.findAll();
        assertThat(enObjectList).hasSize(databaseSizeBeforeUpdate);
        EnObject testEnObject = enObjectList.get(enObjectList.size() - 1);
        assertThat(testEnObject.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testEnObject.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testEnObject.getLanguage()).isEqualTo(UPDATED_LANGUAGE);
    }

    @Test
    @Transactional
    public void updateNonExistingEnObject() throws Exception {
        int databaseSizeBeforeUpdate = enObjectRepository.findAll().size();

        // Create the EnObject

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEnObjectMockMvc.perform(put("/api/en-objects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(enObject)))
            .andExpect(status().isBadRequest());

        // Validate the EnObject in the database
        List<EnObject> enObjectList = enObjectRepository.findAll();
        assertThat(enObjectList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEnObject() throws Exception {
        // Initialize the database
        enObjectRepository.saveAndFlush(enObject);

        int databaseSizeBeforeDelete = enObjectRepository.findAll().size();

        // Get the enObject
        restEnObjectMockMvc.perform(delete("/api/en-objects/{id}", enObject.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<EnObject> enObjectList = enObjectRepository.findAll();
        assertThat(enObjectList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EnObject.class);
        EnObject enObject1 = new EnObject();
        enObject1.setId(1L);
        EnObject enObject2 = new EnObject();
        enObject2.setId(enObject1.getId());
        assertThat(enObject1).isEqualTo(enObject2);
        enObject2.setId(2L);
        assertThat(enObject1).isNotEqualTo(enObject2);
        enObject1.setId(null);
        assertThat(enObject1).isNotEqualTo(enObject2);
    }
}
