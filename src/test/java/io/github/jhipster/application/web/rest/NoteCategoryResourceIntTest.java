package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.JhipsterSampleApplicationApp;

import io.github.jhipster.application.domain.NoteCategory;
import io.github.jhipster.application.repository.NoteCategoryRepository;
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
 * Test class for the NoteCategoryResource REST controller.
 *
 * @see NoteCategoryResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterSampleApplicationApp.class)
public class NoteCategoryResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Language DEFAULT_LANGUAGE = Language.ENGLISH;
    private static final Language UPDATED_LANGUAGE = Language.SPANISH;

    private static final String DEFAULT_MESSAGE = "AAAAAAAAAA";
    private static final String UPDATED_MESSAGE = "BBBBBBBBBB";

    @Autowired
    private NoteCategoryRepository noteCategoryRepository;

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

    private MockMvc restNoteCategoryMockMvc;

    private NoteCategory noteCategory;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final NoteCategoryResource noteCategoryResource = new NoteCategoryResource(noteCategoryRepository);
        this.restNoteCategoryMockMvc = MockMvcBuilders.standaloneSetup(noteCategoryResource)
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
    public static NoteCategory createEntity(EntityManager em) {
        NoteCategory noteCategory = new NoteCategory()
            .name(DEFAULT_NAME)
            .language(DEFAULT_LANGUAGE)
            .message(DEFAULT_MESSAGE);
        return noteCategory;
    }

    @Before
    public void initTest() {
        noteCategory = createEntity(em);
    }

    @Test
    @Transactional
    public void createNoteCategory() throws Exception {
        int databaseSizeBeforeCreate = noteCategoryRepository.findAll().size();

        // Create the NoteCategory
        restNoteCategoryMockMvc.perform(post("/api/note-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(noteCategory)))
            .andExpect(status().isCreated());

        // Validate the NoteCategory in the database
        List<NoteCategory> noteCategoryList = noteCategoryRepository.findAll();
        assertThat(noteCategoryList).hasSize(databaseSizeBeforeCreate + 1);
        NoteCategory testNoteCategory = noteCategoryList.get(noteCategoryList.size() - 1);
        assertThat(testNoteCategory.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testNoteCategory.getLanguage()).isEqualTo(DEFAULT_LANGUAGE);
        assertThat(testNoteCategory.getMessage()).isEqualTo(DEFAULT_MESSAGE);
    }

    @Test
    @Transactional
    public void createNoteCategoryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = noteCategoryRepository.findAll().size();

        // Create the NoteCategory with an existing ID
        noteCategory.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restNoteCategoryMockMvc.perform(post("/api/note-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(noteCategory)))
            .andExpect(status().isBadRequest());

        // Validate the NoteCategory in the database
        List<NoteCategory> noteCategoryList = noteCategoryRepository.findAll();
        assertThat(noteCategoryList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllNoteCategories() throws Exception {
        // Initialize the database
        noteCategoryRepository.saveAndFlush(noteCategory);

        // Get all the noteCategoryList
        restNoteCategoryMockMvc.perform(get("/api/note-categories?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(noteCategory.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].language").value(hasItem(DEFAULT_LANGUAGE.toString())))
            .andExpect(jsonPath("$.[*].message").value(hasItem(DEFAULT_MESSAGE.toString())));
    }
    
    @Test
    @Transactional
    public void getNoteCategory() throws Exception {
        // Initialize the database
        noteCategoryRepository.saveAndFlush(noteCategory);

        // Get the noteCategory
        restNoteCategoryMockMvc.perform(get("/api/note-categories/{id}", noteCategory.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(noteCategory.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.language").value(DEFAULT_LANGUAGE.toString()))
            .andExpect(jsonPath("$.message").value(DEFAULT_MESSAGE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingNoteCategory() throws Exception {
        // Get the noteCategory
        restNoteCategoryMockMvc.perform(get("/api/note-categories/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateNoteCategory() throws Exception {
        // Initialize the database
        noteCategoryRepository.saveAndFlush(noteCategory);

        int databaseSizeBeforeUpdate = noteCategoryRepository.findAll().size();

        // Update the noteCategory
        NoteCategory updatedNoteCategory = noteCategoryRepository.findById(noteCategory.getId()).get();
        // Disconnect from session so that the updates on updatedNoteCategory are not directly saved in db
        em.detach(updatedNoteCategory);
        updatedNoteCategory
            .name(UPDATED_NAME)
            .language(UPDATED_LANGUAGE)
            .message(UPDATED_MESSAGE);

        restNoteCategoryMockMvc.perform(put("/api/note-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedNoteCategory)))
            .andExpect(status().isOk());

        // Validate the NoteCategory in the database
        List<NoteCategory> noteCategoryList = noteCategoryRepository.findAll();
        assertThat(noteCategoryList).hasSize(databaseSizeBeforeUpdate);
        NoteCategory testNoteCategory = noteCategoryList.get(noteCategoryList.size() - 1);
        assertThat(testNoteCategory.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testNoteCategory.getLanguage()).isEqualTo(UPDATED_LANGUAGE);
        assertThat(testNoteCategory.getMessage()).isEqualTo(UPDATED_MESSAGE);
    }

    @Test
    @Transactional
    public void updateNonExistingNoteCategory() throws Exception {
        int databaseSizeBeforeUpdate = noteCategoryRepository.findAll().size();

        // Create the NoteCategory

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restNoteCategoryMockMvc.perform(put("/api/note-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(noteCategory)))
            .andExpect(status().isBadRequest());

        // Validate the NoteCategory in the database
        List<NoteCategory> noteCategoryList = noteCategoryRepository.findAll();
        assertThat(noteCategoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteNoteCategory() throws Exception {
        // Initialize the database
        noteCategoryRepository.saveAndFlush(noteCategory);

        int databaseSizeBeforeDelete = noteCategoryRepository.findAll().size();

        // Get the noteCategory
        restNoteCategoryMockMvc.perform(delete("/api/note-categories/{id}", noteCategory.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<NoteCategory> noteCategoryList = noteCategoryRepository.findAll();
        assertThat(noteCategoryList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(NoteCategory.class);
        NoteCategory noteCategory1 = new NoteCategory();
        noteCategory1.setId(1L);
        NoteCategory noteCategory2 = new NoteCategory();
        noteCategory2.setId(noteCategory1.getId());
        assertThat(noteCategory1).isEqualTo(noteCategory2);
        noteCategory2.setId(2L);
        assertThat(noteCategory1).isNotEqualTo(noteCategory2);
        noteCategory1.setId(null);
        assertThat(noteCategory1).isNotEqualTo(noteCategory2);
    }
}
