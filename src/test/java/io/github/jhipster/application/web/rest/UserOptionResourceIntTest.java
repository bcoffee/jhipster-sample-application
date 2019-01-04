package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.JhipsterSampleApplicationApp;

import io.github.jhipster.application.domain.UserOption;
import io.github.jhipster.application.repository.UserOptionRepository;
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
 * Test class for the UserOptionResource REST controller.
 *
 * @see UserOptionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterSampleApplicationApp.class)
public class UserOptionResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_VALUE = "AAAAAAAAAA";
    private static final String UPDATED_VALUE = "BBBBBBBBBB";

    private static final String DEFAULT_CATEGORY = "AAAAAAAAAA";
    private static final String UPDATED_CATEGORY = "BBBBBBBBBB";

    @Autowired
    private UserOptionRepository userOptionRepository;

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

    private MockMvc restUserOptionMockMvc;

    private UserOption userOption;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final UserOptionResource userOptionResource = new UserOptionResource(userOptionRepository);
        this.restUserOptionMockMvc = MockMvcBuilders.standaloneSetup(userOptionResource)
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
    public static UserOption createEntity(EntityManager em) {
        UserOption userOption = new UserOption()
            .name(DEFAULT_NAME)
            .value(DEFAULT_VALUE)
            .category(DEFAULT_CATEGORY);
        return userOption;
    }

    @Before
    public void initTest() {
        userOption = createEntity(em);
    }

    @Test
    @Transactional
    public void createUserOption() throws Exception {
        int databaseSizeBeforeCreate = userOptionRepository.findAll().size();

        // Create the UserOption
        restUserOptionMockMvc.perform(post("/api/user-options")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userOption)))
            .andExpect(status().isCreated());

        // Validate the UserOption in the database
        List<UserOption> userOptionList = userOptionRepository.findAll();
        assertThat(userOptionList).hasSize(databaseSizeBeforeCreate + 1);
        UserOption testUserOption = userOptionList.get(userOptionList.size() - 1);
        assertThat(testUserOption.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testUserOption.getValue()).isEqualTo(DEFAULT_VALUE);
        assertThat(testUserOption.getCategory()).isEqualTo(DEFAULT_CATEGORY);
    }

    @Test
    @Transactional
    public void createUserOptionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = userOptionRepository.findAll().size();

        // Create the UserOption with an existing ID
        userOption.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUserOptionMockMvc.perform(post("/api/user-options")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userOption)))
            .andExpect(status().isBadRequest());

        // Validate the UserOption in the database
        List<UserOption> userOptionList = userOptionRepository.findAll();
        assertThat(userOptionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllUserOptions() throws Exception {
        // Initialize the database
        userOptionRepository.saveAndFlush(userOption);

        // Get all the userOptionList
        restUserOptionMockMvc.perform(get("/api/user-options?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(userOption.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].value").value(hasItem(DEFAULT_VALUE.toString())))
            .andExpect(jsonPath("$.[*].category").value(hasItem(DEFAULT_CATEGORY.toString())));
    }
    
    @Test
    @Transactional
    public void getUserOption() throws Exception {
        // Initialize the database
        userOptionRepository.saveAndFlush(userOption);

        // Get the userOption
        restUserOptionMockMvc.perform(get("/api/user-options/{id}", userOption.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(userOption.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.value").value(DEFAULT_VALUE.toString()))
            .andExpect(jsonPath("$.category").value(DEFAULT_CATEGORY.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingUserOption() throws Exception {
        // Get the userOption
        restUserOptionMockMvc.perform(get("/api/user-options/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUserOption() throws Exception {
        // Initialize the database
        userOptionRepository.saveAndFlush(userOption);

        int databaseSizeBeforeUpdate = userOptionRepository.findAll().size();

        // Update the userOption
        UserOption updatedUserOption = userOptionRepository.findById(userOption.getId()).get();
        // Disconnect from session so that the updates on updatedUserOption are not directly saved in db
        em.detach(updatedUserOption);
        updatedUserOption
            .name(UPDATED_NAME)
            .value(UPDATED_VALUE)
            .category(UPDATED_CATEGORY);

        restUserOptionMockMvc.perform(put("/api/user-options")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedUserOption)))
            .andExpect(status().isOk());

        // Validate the UserOption in the database
        List<UserOption> userOptionList = userOptionRepository.findAll();
        assertThat(userOptionList).hasSize(databaseSizeBeforeUpdate);
        UserOption testUserOption = userOptionList.get(userOptionList.size() - 1);
        assertThat(testUserOption.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testUserOption.getValue()).isEqualTo(UPDATED_VALUE);
        assertThat(testUserOption.getCategory()).isEqualTo(UPDATED_CATEGORY);
    }

    @Test
    @Transactional
    public void updateNonExistingUserOption() throws Exception {
        int databaseSizeBeforeUpdate = userOptionRepository.findAll().size();

        // Create the UserOption

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUserOptionMockMvc.perform(put("/api/user-options")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userOption)))
            .andExpect(status().isBadRequest());

        // Validate the UserOption in the database
        List<UserOption> userOptionList = userOptionRepository.findAll();
        assertThat(userOptionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteUserOption() throws Exception {
        // Initialize the database
        userOptionRepository.saveAndFlush(userOption);

        int databaseSizeBeforeDelete = userOptionRepository.findAll().size();

        // Get the userOption
        restUserOptionMockMvc.perform(delete("/api/user-options/{id}", userOption.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<UserOption> userOptionList = userOptionRepository.findAll();
        assertThat(userOptionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UserOption.class);
        UserOption userOption1 = new UserOption();
        userOption1.setId(1L);
        UserOption userOption2 = new UserOption();
        userOption2.setId(userOption1.getId());
        assertThat(userOption1).isEqualTo(userOption2);
        userOption2.setId(2L);
        assertThat(userOption1).isNotEqualTo(userOption2);
        userOption1.setId(null);
        assertThat(userOption1).isNotEqualTo(userOption2);
    }
}
