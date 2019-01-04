package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.JhipsterSampleApplicationApp;

import io.github.jhipster.application.domain.MessageMap;
import io.github.jhipster.application.repository.MessageMapRepository;
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
 * Test class for the MessageMapResource REST controller.
 *
 * @see MessageMapResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterSampleApplicationApp.class)
public class MessageMapResourceIntTest {

    private static final String DEFAULT_MESSAGE = "AAAAAAAAAA";
    private static final String UPDATED_MESSAGE = "BBBBBBBBBB";

    private static final Integer DEFAULT_BIT = 1;
    private static final Integer UPDATED_BIT = 2;

    private static final Boolean DEFAULT_IS_ACTIVE = false;
    private static final Boolean UPDATED_IS_ACTIVE = true;

    private static final String DEFAULT_IOE = "AAAAAAAAAA";
    private static final String UPDATED_IOE = "BBBBBBBBBB";

    private static final String DEFAULT_CIP_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_CIP_ADDRESS = "BBBBBBBBBB";

    @Autowired
    private MessageMapRepository messageMapRepository;

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

    private MockMvc restMessageMapMockMvc;

    private MessageMap messageMap;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MessageMapResource messageMapResource = new MessageMapResource(messageMapRepository);
        this.restMessageMapMockMvc = MockMvcBuilders.standaloneSetup(messageMapResource)
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
    public static MessageMap createEntity(EntityManager em) {
        MessageMap messageMap = new MessageMap()
            .message(DEFAULT_MESSAGE)
            .bit(DEFAULT_BIT)
            .isActive(DEFAULT_IS_ACTIVE)
            .ioe(DEFAULT_IOE)
            .cipAddress(DEFAULT_CIP_ADDRESS);
        return messageMap;
    }

    @Before
    public void initTest() {
        messageMap = createEntity(em);
    }

    @Test
    @Transactional
    public void createMessageMap() throws Exception {
        int databaseSizeBeforeCreate = messageMapRepository.findAll().size();

        // Create the MessageMap
        restMessageMapMockMvc.perform(post("/api/message-maps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(messageMap)))
            .andExpect(status().isCreated());

        // Validate the MessageMap in the database
        List<MessageMap> messageMapList = messageMapRepository.findAll();
        assertThat(messageMapList).hasSize(databaseSizeBeforeCreate + 1);
        MessageMap testMessageMap = messageMapList.get(messageMapList.size() - 1);
        assertThat(testMessageMap.getMessage()).isEqualTo(DEFAULT_MESSAGE);
        assertThat(testMessageMap.getBit()).isEqualTo(DEFAULT_BIT);
        assertThat(testMessageMap.isIsActive()).isEqualTo(DEFAULT_IS_ACTIVE);
        assertThat(testMessageMap.getIoe()).isEqualTo(DEFAULT_IOE);
        assertThat(testMessageMap.getCipAddress()).isEqualTo(DEFAULT_CIP_ADDRESS);
    }

    @Test
    @Transactional
    public void createMessageMapWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = messageMapRepository.findAll().size();

        // Create the MessageMap with an existing ID
        messageMap.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMessageMapMockMvc.perform(post("/api/message-maps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(messageMap)))
            .andExpect(status().isBadRequest());

        // Validate the MessageMap in the database
        List<MessageMap> messageMapList = messageMapRepository.findAll();
        assertThat(messageMapList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllMessageMaps() throws Exception {
        // Initialize the database
        messageMapRepository.saveAndFlush(messageMap);

        // Get all the messageMapList
        restMessageMapMockMvc.perform(get("/api/message-maps?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(messageMap.getId().intValue())))
            .andExpect(jsonPath("$.[*].message").value(hasItem(DEFAULT_MESSAGE.toString())))
            .andExpect(jsonPath("$.[*].bit").value(hasItem(DEFAULT_BIT)))
            .andExpect(jsonPath("$.[*].isActive").value(hasItem(DEFAULT_IS_ACTIVE.booleanValue())))
            .andExpect(jsonPath("$.[*].ioe").value(hasItem(DEFAULT_IOE.toString())))
            .andExpect(jsonPath("$.[*].cipAddress").value(hasItem(DEFAULT_CIP_ADDRESS.toString())));
    }
    
    @Test
    @Transactional
    public void getMessageMap() throws Exception {
        // Initialize the database
        messageMapRepository.saveAndFlush(messageMap);

        // Get the messageMap
        restMessageMapMockMvc.perform(get("/api/message-maps/{id}", messageMap.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(messageMap.getId().intValue()))
            .andExpect(jsonPath("$.message").value(DEFAULT_MESSAGE.toString()))
            .andExpect(jsonPath("$.bit").value(DEFAULT_BIT))
            .andExpect(jsonPath("$.isActive").value(DEFAULT_IS_ACTIVE.booleanValue()))
            .andExpect(jsonPath("$.ioe").value(DEFAULT_IOE.toString()))
            .andExpect(jsonPath("$.cipAddress").value(DEFAULT_CIP_ADDRESS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingMessageMap() throws Exception {
        // Get the messageMap
        restMessageMapMockMvc.perform(get("/api/message-maps/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMessageMap() throws Exception {
        // Initialize the database
        messageMapRepository.saveAndFlush(messageMap);

        int databaseSizeBeforeUpdate = messageMapRepository.findAll().size();

        // Update the messageMap
        MessageMap updatedMessageMap = messageMapRepository.findById(messageMap.getId()).get();
        // Disconnect from session so that the updates on updatedMessageMap are not directly saved in db
        em.detach(updatedMessageMap);
        updatedMessageMap
            .message(UPDATED_MESSAGE)
            .bit(UPDATED_BIT)
            .isActive(UPDATED_IS_ACTIVE)
            .ioe(UPDATED_IOE)
            .cipAddress(UPDATED_CIP_ADDRESS);

        restMessageMapMockMvc.perform(put("/api/message-maps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMessageMap)))
            .andExpect(status().isOk());

        // Validate the MessageMap in the database
        List<MessageMap> messageMapList = messageMapRepository.findAll();
        assertThat(messageMapList).hasSize(databaseSizeBeforeUpdate);
        MessageMap testMessageMap = messageMapList.get(messageMapList.size() - 1);
        assertThat(testMessageMap.getMessage()).isEqualTo(UPDATED_MESSAGE);
        assertThat(testMessageMap.getBit()).isEqualTo(UPDATED_BIT);
        assertThat(testMessageMap.isIsActive()).isEqualTo(UPDATED_IS_ACTIVE);
        assertThat(testMessageMap.getIoe()).isEqualTo(UPDATED_IOE);
        assertThat(testMessageMap.getCipAddress()).isEqualTo(UPDATED_CIP_ADDRESS);
    }

    @Test
    @Transactional
    public void updateNonExistingMessageMap() throws Exception {
        int databaseSizeBeforeUpdate = messageMapRepository.findAll().size();

        // Create the MessageMap

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMessageMapMockMvc.perform(put("/api/message-maps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(messageMap)))
            .andExpect(status().isBadRequest());

        // Validate the MessageMap in the database
        List<MessageMap> messageMapList = messageMapRepository.findAll();
        assertThat(messageMapList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMessageMap() throws Exception {
        // Initialize the database
        messageMapRepository.saveAndFlush(messageMap);

        int databaseSizeBeforeDelete = messageMapRepository.findAll().size();

        // Get the messageMap
        restMessageMapMockMvc.perform(delete("/api/message-maps/{id}", messageMap.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<MessageMap> messageMapList = messageMapRepository.findAll();
        assertThat(messageMapList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MessageMap.class);
        MessageMap messageMap1 = new MessageMap();
        messageMap1.setId(1L);
        MessageMap messageMap2 = new MessageMap();
        messageMap2.setId(messageMap1.getId());
        assertThat(messageMap1).isEqualTo(messageMap2);
        messageMap2.setId(2L);
        assertThat(messageMap1).isNotEqualTo(messageMap2);
        messageMap1.setId(null);
        assertThat(messageMap1).isNotEqualTo(messageMap2);
    }
}
