package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.JhipsterSampleApplicationApp;

import io.github.jhipster.application.domain.DistributionList;
import io.github.jhipster.application.repository.DistributionListRepository;
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
 * Test class for the DistributionListResource REST controller.
 *
 * @see DistributionListResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterSampleApplicationApp.class)
public class DistributionListResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private DistributionListRepository distributionListRepository;

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

    private MockMvc restDistributionListMockMvc;

    private DistributionList distributionList;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DistributionListResource distributionListResource = new DistributionListResource(distributionListRepository);
        this.restDistributionListMockMvc = MockMvcBuilders.standaloneSetup(distributionListResource)
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
    public static DistributionList createEntity(EntityManager em) {
        DistributionList distributionList = new DistributionList()
            .name(DEFAULT_NAME);
        return distributionList;
    }

    @Before
    public void initTest() {
        distributionList = createEntity(em);
    }

    @Test
    @Transactional
    public void createDistributionList() throws Exception {
        int databaseSizeBeforeCreate = distributionListRepository.findAll().size();

        // Create the DistributionList
        restDistributionListMockMvc.perform(post("/api/distribution-lists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(distributionList)))
            .andExpect(status().isCreated());

        // Validate the DistributionList in the database
        List<DistributionList> distributionListList = distributionListRepository.findAll();
        assertThat(distributionListList).hasSize(databaseSizeBeforeCreate + 1);
        DistributionList testDistributionList = distributionListList.get(distributionListList.size() - 1);
        assertThat(testDistributionList.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createDistributionListWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = distributionListRepository.findAll().size();

        // Create the DistributionList with an existing ID
        distributionList.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDistributionListMockMvc.perform(post("/api/distribution-lists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(distributionList)))
            .andExpect(status().isBadRequest());

        // Validate the DistributionList in the database
        List<DistributionList> distributionListList = distributionListRepository.findAll();
        assertThat(distributionListList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllDistributionLists() throws Exception {
        // Initialize the database
        distributionListRepository.saveAndFlush(distributionList);

        // Get all the distributionListList
        restDistributionListMockMvc.perform(get("/api/distribution-lists?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(distributionList.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }
    
    @Test
    @Transactional
    public void getDistributionList() throws Exception {
        // Initialize the database
        distributionListRepository.saveAndFlush(distributionList);

        // Get the distributionList
        restDistributionListMockMvc.perform(get("/api/distribution-lists/{id}", distributionList.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(distributionList.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDistributionList() throws Exception {
        // Get the distributionList
        restDistributionListMockMvc.perform(get("/api/distribution-lists/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDistributionList() throws Exception {
        // Initialize the database
        distributionListRepository.saveAndFlush(distributionList);

        int databaseSizeBeforeUpdate = distributionListRepository.findAll().size();

        // Update the distributionList
        DistributionList updatedDistributionList = distributionListRepository.findById(distributionList.getId()).get();
        // Disconnect from session so that the updates on updatedDistributionList are not directly saved in db
        em.detach(updatedDistributionList);
        updatedDistributionList
            .name(UPDATED_NAME);

        restDistributionListMockMvc.perform(put("/api/distribution-lists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDistributionList)))
            .andExpect(status().isOk());

        // Validate the DistributionList in the database
        List<DistributionList> distributionListList = distributionListRepository.findAll();
        assertThat(distributionListList).hasSize(databaseSizeBeforeUpdate);
        DistributionList testDistributionList = distributionListList.get(distributionListList.size() - 1);
        assertThat(testDistributionList.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingDistributionList() throws Exception {
        int databaseSizeBeforeUpdate = distributionListRepository.findAll().size();

        // Create the DistributionList

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDistributionListMockMvc.perform(put("/api/distribution-lists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(distributionList)))
            .andExpect(status().isBadRequest());

        // Validate the DistributionList in the database
        List<DistributionList> distributionListList = distributionListRepository.findAll();
        assertThat(distributionListList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDistributionList() throws Exception {
        // Initialize the database
        distributionListRepository.saveAndFlush(distributionList);

        int databaseSizeBeforeDelete = distributionListRepository.findAll().size();

        // Get the distributionList
        restDistributionListMockMvc.perform(delete("/api/distribution-lists/{id}", distributionList.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<DistributionList> distributionListList = distributionListRepository.findAll();
        assertThat(distributionListList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DistributionList.class);
        DistributionList distributionList1 = new DistributionList();
        distributionList1.setId(1L);
        DistributionList distributionList2 = new DistributionList();
        distributionList2.setId(distributionList1.getId());
        assertThat(distributionList1).isEqualTo(distributionList2);
        distributionList2.setId(2L);
        assertThat(distributionList1).isNotEqualTo(distributionList2);
        distributionList1.setId(null);
        assertThat(distributionList1).isNotEqualTo(distributionList2);
    }
}
