package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.JhipsterSampleApplicationApp;

import io.github.jhipster.application.domain.Installation;
import io.github.jhipster.application.repository.InstallationRepository;
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
 * Test class for the InstallationResource REST controller.
 *
 * @see InstallationResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterSampleApplicationApp.class)
public class InstallationResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Language DEFAULT_LANGUAGE = Language.ENGLISH;
    private static final Language UPDATED_LANGUAGE = Language.SPANISH;

    private static final String DEFAULT_STREET_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_STREET_ADDRESS = "BBBBBBBBBB";

    private static final String DEFAULT_POSTAL_CODE = "AAAAAAAAAA";
    private static final String UPDATED_POSTAL_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_CITY = "AAAAAAAAAA";
    private static final String UPDATED_CITY = "BBBBBBBBBB";

    private static final String DEFAULT_STATE_PROVINCE = "AAAAAAAAAA";
    private static final String UPDATED_STATE_PROVINCE = "BBBBBBBBBB";

    private static final String DEFAULT_TIME_ZONE = "AAAAAAAAAA";
    private static final String UPDATED_TIME_ZONE = "BBBBBBBBBB";

    @Autowired
    private InstallationRepository installationRepository;

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

    private MockMvc restInstallationMockMvc;

    private Installation installation;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final InstallationResource installationResource = new InstallationResource(installationRepository);
        this.restInstallationMockMvc = MockMvcBuilders.standaloneSetup(installationResource)
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
    public static Installation createEntity(EntityManager em) {
        Installation installation = new Installation()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .language(DEFAULT_LANGUAGE)
            .streetAddress(DEFAULT_STREET_ADDRESS)
            .postalCode(DEFAULT_POSTAL_CODE)
            .city(DEFAULT_CITY)
            .stateProvince(DEFAULT_STATE_PROVINCE)
            .timeZone(DEFAULT_TIME_ZONE);
        return installation;
    }

    @Before
    public void initTest() {
        installation = createEntity(em);
    }

    @Test
    @Transactional
    public void createInstallation() throws Exception {
        int databaseSizeBeforeCreate = installationRepository.findAll().size();

        // Create the Installation
        restInstallationMockMvc.perform(post("/api/installations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(installation)))
            .andExpect(status().isCreated());

        // Validate the Installation in the database
        List<Installation> installationList = installationRepository.findAll();
        assertThat(installationList).hasSize(databaseSizeBeforeCreate + 1);
        Installation testInstallation = installationList.get(installationList.size() - 1);
        assertThat(testInstallation.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testInstallation.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testInstallation.getLanguage()).isEqualTo(DEFAULT_LANGUAGE);
        assertThat(testInstallation.getStreetAddress()).isEqualTo(DEFAULT_STREET_ADDRESS);
        assertThat(testInstallation.getPostalCode()).isEqualTo(DEFAULT_POSTAL_CODE);
        assertThat(testInstallation.getCity()).isEqualTo(DEFAULT_CITY);
        assertThat(testInstallation.getStateProvince()).isEqualTo(DEFAULT_STATE_PROVINCE);
        assertThat(testInstallation.getTimeZone()).isEqualTo(DEFAULT_TIME_ZONE);
    }

    @Test
    @Transactional
    public void createInstallationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = installationRepository.findAll().size();

        // Create the Installation with an existing ID
        installation.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restInstallationMockMvc.perform(post("/api/installations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(installation)))
            .andExpect(status().isBadRequest());

        // Validate the Installation in the database
        List<Installation> installationList = installationRepository.findAll();
        assertThat(installationList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllInstallations() throws Exception {
        // Initialize the database
        installationRepository.saveAndFlush(installation);

        // Get all the installationList
        restInstallationMockMvc.perform(get("/api/installations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(installation.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].language").value(hasItem(DEFAULT_LANGUAGE.toString())))
            .andExpect(jsonPath("$.[*].streetAddress").value(hasItem(DEFAULT_STREET_ADDRESS.toString())))
            .andExpect(jsonPath("$.[*].postalCode").value(hasItem(DEFAULT_POSTAL_CODE.toString())))
            .andExpect(jsonPath("$.[*].city").value(hasItem(DEFAULT_CITY.toString())))
            .andExpect(jsonPath("$.[*].stateProvince").value(hasItem(DEFAULT_STATE_PROVINCE.toString())))
            .andExpect(jsonPath("$.[*].timeZone").value(hasItem(DEFAULT_TIME_ZONE.toString())));
    }
    
    @Test
    @Transactional
    public void getInstallation() throws Exception {
        // Initialize the database
        installationRepository.saveAndFlush(installation);

        // Get the installation
        restInstallationMockMvc.perform(get("/api/installations/{id}", installation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(installation.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.language").value(DEFAULT_LANGUAGE.toString()))
            .andExpect(jsonPath("$.streetAddress").value(DEFAULT_STREET_ADDRESS.toString()))
            .andExpect(jsonPath("$.postalCode").value(DEFAULT_POSTAL_CODE.toString()))
            .andExpect(jsonPath("$.city").value(DEFAULT_CITY.toString()))
            .andExpect(jsonPath("$.stateProvince").value(DEFAULT_STATE_PROVINCE.toString()))
            .andExpect(jsonPath("$.timeZone").value(DEFAULT_TIME_ZONE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingInstallation() throws Exception {
        // Get the installation
        restInstallationMockMvc.perform(get("/api/installations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateInstallation() throws Exception {
        // Initialize the database
        installationRepository.saveAndFlush(installation);

        int databaseSizeBeforeUpdate = installationRepository.findAll().size();

        // Update the installation
        Installation updatedInstallation = installationRepository.findById(installation.getId()).get();
        // Disconnect from session so that the updates on updatedInstallation are not directly saved in db
        em.detach(updatedInstallation);
        updatedInstallation
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .language(UPDATED_LANGUAGE)
            .streetAddress(UPDATED_STREET_ADDRESS)
            .postalCode(UPDATED_POSTAL_CODE)
            .city(UPDATED_CITY)
            .stateProvince(UPDATED_STATE_PROVINCE)
            .timeZone(UPDATED_TIME_ZONE);

        restInstallationMockMvc.perform(put("/api/installations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedInstallation)))
            .andExpect(status().isOk());

        // Validate the Installation in the database
        List<Installation> installationList = installationRepository.findAll();
        assertThat(installationList).hasSize(databaseSizeBeforeUpdate);
        Installation testInstallation = installationList.get(installationList.size() - 1);
        assertThat(testInstallation.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testInstallation.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testInstallation.getLanguage()).isEqualTo(UPDATED_LANGUAGE);
        assertThat(testInstallation.getStreetAddress()).isEqualTo(UPDATED_STREET_ADDRESS);
        assertThat(testInstallation.getPostalCode()).isEqualTo(UPDATED_POSTAL_CODE);
        assertThat(testInstallation.getCity()).isEqualTo(UPDATED_CITY);
        assertThat(testInstallation.getStateProvince()).isEqualTo(UPDATED_STATE_PROVINCE);
        assertThat(testInstallation.getTimeZone()).isEqualTo(UPDATED_TIME_ZONE);
    }

    @Test
    @Transactional
    public void updateNonExistingInstallation() throws Exception {
        int databaseSizeBeforeUpdate = installationRepository.findAll().size();

        // Create the Installation

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restInstallationMockMvc.perform(put("/api/installations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(installation)))
            .andExpect(status().isBadRequest());

        // Validate the Installation in the database
        List<Installation> installationList = installationRepository.findAll();
        assertThat(installationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteInstallation() throws Exception {
        // Initialize the database
        installationRepository.saveAndFlush(installation);

        int databaseSizeBeforeDelete = installationRepository.findAll().size();

        // Get the installation
        restInstallationMockMvc.perform(delete("/api/installations/{id}", installation.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Installation> installationList = installationRepository.findAll();
        assertThat(installationList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Installation.class);
        Installation installation1 = new Installation();
        installation1.setId(1L);
        Installation installation2 = new Installation();
        installation2.setId(installation1.getId());
        assertThat(installation1).isEqualTo(installation2);
        installation2.setId(2L);
        assertThat(installation1).isNotEqualTo(installation2);
        installation1.setId(null);
        assertThat(installation1).isNotEqualTo(installation2);
    }
}
