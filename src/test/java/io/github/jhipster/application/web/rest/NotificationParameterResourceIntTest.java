package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.JhipsterSampleApplicationApp;

import io.github.jhipster.application.domain.NotificationParameter;
import io.github.jhipster.application.repository.NotificationParameterRepository;
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

/**
 * Test class for the NotificationParameterResource REST controller.
 *
 * @see NotificationParameterResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterSampleApplicationApp.class)
public class NotificationParameterResourceIntTest {

    private static final String DEFAULT_MEASURE = "AAAAAAAAAA";
    private static final String UPDATED_MEASURE = "BBBBBBBBBB";

    private static final Float DEFAULT_DURATION = 1F;
    private static final Float UPDATED_DURATION = 2F;

    private static final Float DEFAULT_DURATION_TRACK = 1F;
    private static final Float UPDATED_DURATION_TRACK = 2F;

    private static final Integer DEFAULT_COUNT = 1;
    private static final Integer UPDATED_COUNT = 2;

    private static final Integer DEFAULT_COUNT_TRACK = 1;
    private static final Integer UPDATED_COUNT_TRACK = 2;

    private static final LocalDate DEFAULT_SCANE_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_SCANE_DATE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private NotificationParameterRepository notificationParameterRepository;

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

    private MockMvc restNotificationParameterMockMvc;

    private NotificationParameter notificationParameter;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final NotificationParameterResource notificationParameterResource = new NotificationParameterResource(notificationParameterRepository);
        this.restNotificationParameterMockMvc = MockMvcBuilders.standaloneSetup(notificationParameterResource)
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
    public static NotificationParameter createEntity(EntityManager em) {
        NotificationParameter notificationParameter = new NotificationParameter()
            .measure(DEFAULT_MEASURE)
            .duration(DEFAULT_DURATION)
            .durationTrack(DEFAULT_DURATION_TRACK)
            .count(DEFAULT_COUNT)
            .countTrack(DEFAULT_COUNT_TRACK)
            .scaneDate(DEFAULT_SCANE_DATE);
        return notificationParameter;
    }

    @Before
    public void initTest() {
        notificationParameter = createEntity(em);
    }

    @Test
    @Transactional
    public void createNotificationParameter() throws Exception {
        int databaseSizeBeforeCreate = notificationParameterRepository.findAll().size();

        // Create the NotificationParameter
        restNotificationParameterMockMvc.perform(post("/api/notification-parameters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(notificationParameter)))
            .andExpect(status().isCreated());

        // Validate the NotificationParameter in the database
        List<NotificationParameter> notificationParameterList = notificationParameterRepository.findAll();
        assertThat(notificationParameterList).hasSize(databaseSizeBeforeCreate + 1);
        NotificationParameter testNotificationParameter = notificationParameterList.get(notificationParameterList.size() - 1);
        assertThat(testNotificationParameter.getMeasure()).isEqualTo(DEFAULT_MEASURE);
        assertThat(testNotificationParameter.getDuration()).isEqualTo(DEFAULT_DURATION);
        assertThat(testNotificationParameter.getDurationTrack()).isEqualTo(DEFAULT_DURATION_TRACK);
        assertThat(testNotificationParameter.getCount()).isEqualTo(DEFAULT_COUNT);
        assertThat(testNotificationParameter.getCountTrack()).isEqualTo(DEFAULT_COUNT_TRACK);
        assertThat(testNotificationParameter.getScaneDate()).isEqualTo(DEFAULT_SCANE_DATE);
    }

    @Test
    @Transactional
    public void createNotificationParameterWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = notificationParameterRepository.findAll().size();

        // Create the NotificationParameter with an existing ID
        notificationParameter.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restNotificationParameterMockMvc.perform(post("/api/notification-parameters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(notificationParameter)))
            .andExpect(status().isBadRequest());

        // Validate the NotificationParameter in the database
        List<NotificationParameter> notificationParameterList = notificationParameterRepository.findAll();
        assertThat(notificationParameterList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllNotificationParameters() throws Exception {
        // Initialize the database
        notificationParameterRepository.saveAndFlush(notificationParameter);

        // Get all the notificationParameterList
        restNotificationParameterMockMvc.perform(get("/api/notification-parameters?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(notificationParameter.getId().intValue())))
            .andExpect(jsonPath("$.[*].measure").value(hasItem(DEFAULT_MEASURE.toString())))
            .andExpect(jsonPath("$.[*].duration").value(hasItem(DEFAULT_DURATION.doubleValue())))
            .andExpect(jsonPath("$.[*].durationTrack").value(hasItem(DEFAULT_DURATION_TRACK.doubleValue())))
            .andExpect(jsonPath("$.[*].count").value(hasItem(DEFAULT_COUNT)))
            .andExpect(jsonPath("$.[*].countTrack").value(hasItem(DEFAULT_COUNT_TRACK)))
            .andExpect(jsonPath("$.[*].scaneDate").value(hasItem(DEFAULT_SCANE_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getNotificationParameter() throws Exception {
        // Initialize the database
        notificationParameterRepository.saveAndFlush(notificationParameter);

        // Get the notificationParameter
        restNotificationParameterMockMvc.perform(get("/api/notification-parameters/{id}", notificationParameter.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(notificationParameter.getId().intValue()))
            .andExpect(jsonPath("$.measure").value(DEFAULT_MEASURE.toString()))
            .andExpect(jsonPath("$.duration").value(DEFAULT_DURATION.doubleValue()))
            .andExpect(jsonPath("$.durationTrack").value(DEFAULT_DURATION_TRACK.doubleValue()))
            .andExpect(jsonPath("$.count").value(DEFAULT_COUNT))
            .andExpect(jsonPath("$.countTrack").value(DEFAULT_COUNT_TRACK))
            .andExpect(jsonPath("$.scaneDate").value(DEFAULT_SCANE_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingNotificationParameter() throws Exception {
        // Get the notificationParameter
        restNotificationParameterMockMvc.perform(get("/api/notification-parameters/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateNotificationParameter() throws Exception {
        // Initialize the database
        notificationParameterRepository.saveAndFlush(notificationParameter);

        int databaseSizeBeforeUpdate = notificationParameterRepository.findAll().size();

        // Update the notificationParameter
        NotificationParameter updatedNotificationParameter = notificationParameterRepository.findById(notificationParameter.getId()).get();
        // Disconnect from session so that the updates on updatedNotificationParameter are not directly saved in db
        em.detach(updatedNotificationParameter);
        updatedNotificationParameter
            .measure(UPDATED_MEASURE)
            .duration(UPDATED_DURATION)
            .durationTrack(UPDATED_DURATION_TRACK)
            .count(UPDATED_COUNT)
            .countTrack(UPDATED_COUNT_TRACK)
            .scaneDate(UPDATED_SCANE_DATE);

        restNotificationParameterMockMvc.perform(put("/api/notification-parameters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedNotificationParameter)))
            .andExpect(status().isOk());

        // Validate the NotificationParameter in the database
        List<NotificationParameter> notificationParameterList = notificationParameterRepository.findAll();
        assertThat(notificationParameterList).hasSize(databaseSizeBeforeUpdate);
        NotificationParameter testNotificationParameter = notificationParameterList.get(notificationParameterList.size() - 1);
        assertThat(testNotificationParameter.getMeasure()).isEqualTo(UPDATED_MEASURE);
        assertThat(testNotificationParameter.getDuration()).isEqualTo(UPDATED_DURATION);
        assertThat(testNotificationParameter.getDurationTrack()).isEqualTo(UPDATED_DURATION_TRACK);
        assertThat(testNotificationParameter.getCount()).isEqualTo(UPDATED_COUNT);
        assertThat(testNotificationParameter.getCountTrack()).isEqualTo(UPDATED_COUNT_TRACK);
        assertThat(testNotificationParameter.getScaneDate()).isEqualTo(UPDATED_SCANE_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingNotificationParameter() throws Exception {
        int databaseSizeBeforeUpdate = notificationParameterRepository.findAll().size();

        // Create the NotificationParameter

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restNotificationParameterMockMvc.perform(put("/api/notification-parameters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(notificationParameter)))
            .andExpect(status().isBadRequest());

        // Validate the NotificationParameter in the database
        List<NotificationParameter> notificationParameterList = notificationParameterRepository.findAll();
        assertThat(notificationParameterList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteNotificationParameter() throws Exception {
        // Initialize the database
        notificationParameterRepository.saveAndFlush(notificationParameter);

        int databaseSizeBeforeDelete = notificationParameterRepository.findAll().size();

        // Get the notificationParameter
        restNotificationParameterMockMvc.perform(delete("/api/notification-parameters/{id}", notificationParameter.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<NotificationParameter> notificationParameterList = notificationParameterRepository.findAll();
        assertThat(notificationParameterList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(NotificationParameter.class);
        NotificationParameter notificationParameter1 = new NotificationParameter();
        notificationParameter1.setId(1L);
        NotificationParameter notificationParameter2 = new NotificationParameter();
        notificationParameter2.setId(notificationParameter1.getId());
        assertThat(notificationParameter1).isEqualTo(notificationParameter2);
        notificationParameter2.setId(2L);
        assertThat(notificationParameter1).isNotEqualTo(notificationParameter2);
        notificationParameter1.setId(null);
        assertThat(notificationParameter1).isNotEqualTo(notificationParameter2);
    }
}
