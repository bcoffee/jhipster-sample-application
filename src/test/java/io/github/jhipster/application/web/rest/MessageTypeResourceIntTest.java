package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.JhipsterSampleApplicationApp;

import io.github.jhipster.application.domain.MessageType;
import io.github.jhipster.application.repository.MessageTypeRepository;
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
 * Test class for the MessageTypeResource REST controller.
 *
 * @see MessageTypeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterSampleApplicationApp.class)
public class MessageTypeResourceIntTest {

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_DEFINITION = "AAAAAAAAAA";
    private static final String UPDATED_DEFINITION = "BBBBBBBBBB";

    private static final Boolean DEFAULT_IS_PRODUCTION_STOP = false;
    private static final Boolean UPDATED_IS_PRODUCTION_STOP = true;

    @Autowired
    private MessageTypeRepository messageTypeRepository;

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

    private MockMvc restMessageTypeMockMvc;

    private MessageType messageType;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MessageTypeResource messageTypeResource = new MessageTypeResource(messageTypeRepository);
        this.restMessageTypeMockMvc = MockMvcBuilders.standaloneSetup(messageTypeResource)
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
    public static MessageType createEntity(EntityManager em) {
        MessageType messageType = new MessageType()
            .code(DEFAULT_CODE)
            .description(DEFAULT_DESCRIPTION)
            .definition(DEFAULT_DEFINITION)
            .isProductionStop(DEFAULT_IS_PRODUCTION_STOP);
        return messageType;
    }

    @Before
    public void initTest() {
        messageType = createEntity(em);
    }

    @Test
    @Transactional
    public void createMessageType() throws Exception {
        int databaseSizeBeforeCreate = messageTypeRepository.findAll().size();

        // Create the MessageType
        restMessageTypeMockMvc.perform(post("/api/message-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(messageType)))
            .andExpect(status().isCreated());

        // Validate the MessageType in the database
        List<MessageType> messageTypeList = messageTypeRepository.findAll();
        assertThat(messageTypeList).hasSize(databaseSizeBeforeCreate + 1);
        MessageType testMessageType = messageTypeList.get(messageTypeList.size() - 1);
        assertThat(testMessageType.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testMessageType.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testMessageType.getDefinition()).isEqualTo(DEFAULT_DEFINITION);
        assertThat(testMessageType.isIsProductionStop()).isEqualTo(DEFAULT_IS_PRODUCTION_STOP);
    }

    @Test
    @Transactional
    public void createMessageTypeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = messageTypeRepository.findAll().size();

        // Create the MessageType with an existing ID
        messageType.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMessageTypeMockMvc.perform(post("/api/message-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(messageType)))
            .andExpect(status().isBadRequest());

        // Validate the MessageType in the database
        List<MessageType> messageTypeList = messageTypeRepository.findAll();
        assertThat(messageTypeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllMessageTypes() throws Exception {
        // Initialize the database
        messageTypeRepository.saveAndFlush(messageType);

        // Get all the messageTypeList
        restMessageTypeMockMvc.perform(get("/api/message-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(messageType.getId().intValue())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].definition").value(hasItem(DEFAULT_DEFINITION.toString())))
            .andExpect(jsonPath("$.[*].isProductionStop").value(hasItem(DEFAULT_IS_PRODUCTION_STOP.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getMessageType() throws Exception {
        // Initialize the database
        messageTypeRepository.saveAndFlush(messageType);

        // Get the messageType
        restMessageTypeMockMvc.perform(get("/api/message-types/{id}", messageType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(messageType.getId().intValue()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.definition").value(DEFAULT_DEFINITION.toString()))
            .andExpect(jsonPath("$.isProductionStop").value(DEFAULT_IS_PRODUCTION_STOP.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingMessageType() throws Exception {
        // Get the messageType
        restMessageTypeMockMvc.perform(get("/api/message-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMessageType() throws Exception {
        // Initialize the database
        messageTypeRepository.saveAndFlush(messageType);

        int databaseSizeBeforeUpdate = messageTypeRepository.findAll().size();

        // Update the messageType
        MessageType updatedMessageType = messageTypeRepository.findById(messageType.getId()).get();
        // Disconnect from session so that the updates on updatedMessageType are not directly saved in db
        em.detach(updatedMessageType);
        updatedMessageType
            .code(UPDATED_CODE)
            .description(UPDATED_DESCRIPTION)
            .definition(UPDATED_DEFINITION)
            .isProductionStop(UPDATED_IS_PRODUCTION_STOP);

        restMessageTypeMockMvc.perform(put("/api/message-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMessageType)))
            .andExpect(status().isOk());

        // Validate the MessageType in the database
        List<MessageType> messageTypeList = messageTypeRepository.findAll();
        assertThat(messageTypeList).hasSize(databaseSizeBeforeUpdate);
        MessageType testMessageType = messageTypeList.get(messageTypeList.size() - 1);
        assertThat(testMessageType.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testMessageType.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testMessageType.getDefinition()).isEqualTo(UPDATED_DEFINITION);
        assertThat(testMessageType.isIsProductionStop()).isEqualTo(UPDATED_IS_PRODUCTION_STOP);
    }

    @Test
    @Transactional
    public void updateNonExistingMessageType() throws Exception {
        int databaseSizeBeforeUpdate = messageTypeRepository.findAll().size();

        // Create the MessageType

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMessageTypeMockMvc.perform(put("/api/message-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(messageType)))
            .andExpect(status().isBadRequest());

        // Validate the MessageType in the database
        List<MessageType> messageTypeList = messageTypeRepository.findAll();
        assertThat(messageTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMessageType() throws Exception {
        // Initialize the database
        messageTypeRepository.saveAndFlush(messageType);

        int databaseSizeBeforeDelete = messageTypeRepository.findAll().size();

        // Get the messageType
        restMessageTypeMockMvc.perform(delete("/api/message-types/{id}", messageType.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<MessageType> messageTypeList = messageTypeRepository.findAll();
        assertThat(messageTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MessageType.class);
        MessageType messageType1 = new MessageType();
        messageType1.setId(1L);
        MessageType messageType2 = new MessageType();
        messageType2.setId(messageType1.getId());
        assertThat(messageType1).isEqualTo(messageType2);
        messageType2.setId(2L);
        assertThat(messageType1).isNotEqualTo(messageType2);
        messageType1.setId(null);
        assertThat(messageType1).isNotEqualTo(messageType2);
    }
}
