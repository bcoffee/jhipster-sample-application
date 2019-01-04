package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.JhipsterSampleApplicationApp;

import io.github.jhipster.application.domain.AttributeOption;
import io.github.jhipster.application.repository.AttributeOptionRepository;
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
 * Test class for the AttributeOptionResource REST controller.
 *
 * @see AttributeOptionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterSampleApplicationApp.class)
public class AttributeOptionResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_VALUE = "AAAAAAAAAA";
    private static final String UPDATED_VALUE = "BBBBBBBBBB";

    @Autowired
    private AttributeOptionRepository attributeOptionRepository;

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

    private MockMvc restAttributeOptionMockMvc;

    private AttributeOption attributeOption;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AttributeOptionResource attributeOptionResource = new AttributeOptionResource(attributeOptionRepository);
        this.restAttributeOptionMockMvc = MockMvcBuilders.standaloneSetup(attributeOptionResource)
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
    public static AttributeOption createEntity(EntityManager em) {
        AttributeOption attributeOption = new AttributeOption()
            .name(DEFAULT_NAME)
            .value(DEFAULT_VALUE);
        return attributeOption;
    }

    @Before
    public void initTest() {
        attributeOption = createEntity(em);
    }

    @Test
    @Transactional
    public void createAttributeOption() throws Exception {
        int databaseSizeBeforeCreate = attributeOptionRepository.findAll().size();

        // Create the AttributeOption
        restAttributeOptionMockMvc.perform(post("/api/attribute-options")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(attributeOption)))
            .andExpect(status().isCreated());

        // Validate the AttributeOption in the database
        List<AttributeOption> attributeOptionList = attributeOptionRepository.findAll();
        assertThat(attributeOptionList).hasSize(databaseSizeBeforeCreate + 1);
        AttributeOption testAttributeOption = attributeOptionList.get(attributeOptionList.size() - 1);
        assertThat(testAttributeOption.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testAttributeOption.getValue()).isEqualTo(DEFAULT_VALUE);
    }

    @Test
    @Transactional
    public void createAttributeOptionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = attributeOptionRepository.findAll().size();

        // Create the AttributeOption with an existing ID
        attributeOption.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAttributeOptionMockMvc.perform(post("/api/attribute-options")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(attributeOption)))
            .andExpect(status().isBadRequest());

        // Validate the AttributeOption in the database
        List<AttributeOption> attributeOptionList = attributeOptionRepository.findAll();
        assertThat(attributeOptionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllAttributeOptions() throws Exception {
        // Initialize the database
        attributeOptionRepository.saveAndFlush(attributeOption);

        // Get all the attributeOptionList
        restAttributeOptionMockMvc.perform(get("/api/attribute-options?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(attributeOption.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].value").value(hasItem(DEFAULT_VALUE.toString())));
    }
    
    @Test
    @Transactional
    public void getAttributeOption() throws Exception {
        // Initialize the database
        attributeOptionRepository.saveAndFlush(attributeOption);

        // Get the attributeOption
        restAttributeOptionMockMvc.perform(get("/api/attribute-options/{id}", attributeOption.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(attributeOption.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.value").value(DEFAULT_VALUE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAttributeOption() throws Exception {
        // Get the attributeOption
        restAttributeOptionMockMvc.perform(get("/api/attribute-options/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAttributeOption() throws Exception {
        // Initialize the database
        attributeOptionRepository.saveAndFlush(attributeOption);

        int databaseSizeBeforeUpdate = attributeOptionRepository.findAll().size();

        // Update the attributeOption
        AttributeOption updatedAttributeOption = attributeOptionRepository.findById(attributeOption.getId()).get();
        // Disconnect from session so that the updates on updatedAttributeOption are not directly saved in db
        em.detach(updatedAttributeOption);
        updatedAttributeOption
            .name(UPDATED_NAME)
            .value(UPDATED_VALUE);

        restAttributeOptionMockMvc.perform(put("/api/attribute-options")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAttributeOption)))
            .andExpect(status().isOk());

        // Validate the AttributeOption in the database
        List<AttributeOption> attributeOptionList = attributeOptionRepository.findAll();
        assertThat(attributeOptionList).hasSize(databaseSizeBeforeUpdate);
        AttributeOption testAttributeOption = attributeOptionList.get(attributeOptionList.size() - 1);
        assertThat(testAttributeOption.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testAttributeOption.getValue()).isEqualTo(UPDATED_VALUE);
    }

    @Test
    @Transactional
    public void updateNonExistingAttributeOption() throws Exception {
        int databaseSizeBeforeUpdate = attributeOptionRepository.findAll().size();

        // Create the AttributeOption

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAttributeOptionMockMvc.perform(put("/api/attribute-options")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(attributeOption)))
            .andExpect(status().isBadRequest());

        // Validate the AttributeOption in the database
        List<AttributeOption> attributeOptionList = attributeOptionRepository.findAll();
        assertThat(attributeOptionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAttributeOption() throws Exception {
        // Initialize the database
        attributeOptionRepository.saveAndFlush(attributeOption);

        int databaseSizeBeforeDelete = attributeOptionRepository.findAll().size();

        // Get the attributeOption
        restAttributeOptionMockMvc.perform(delete("/api/attribute-options/{id}", attributeOption.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<AttributeOption> attributeOptionList = attributeOptionRepository.findAll();
        assertThat(attributeOptionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AttributeOption.class);
        AttributeOption attributeOption1 = new AttributeOption();
        attributeOption1.setId(1L);
        AttributeOption attributeOption2 = new AttributeOption();
        attributeOption2.setId(attributeOption1.getId());
        assertThat(attributeOption1).isEqualTo(attributeOption2);
        attributeOption2.setId(2L);
        assertThat(attributeOption1).isNotEqualTo(attributeOption2);
        attributeOption1.setId(null);
        assertThat(attributeOption1).isNotEqualTo(attributeOption2);
    }
}
