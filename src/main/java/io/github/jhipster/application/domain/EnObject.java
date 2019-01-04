package io.github.jhipster.application.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import io.github.jhipster.application.domain.enumeration.Language;

/**
 * A EnObject.
 */
@Entity
@Table(name = "en_object")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class EnObject implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "language")
    private Language language;

    @OneToOne    @JoinColumn(unique = true)
    private EnObjectType objectType;

    @OneToOne    @JoinColumn(unique = true)
    private EnObject objectParent;

    @OneToMany(mappedBy = "enObject")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Attribute> objectAttributes = new HashSet<>();
    @ManyToOne
    @JsonIgnoreProperties("messageObjects")
    private MessageMap messageMap;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public EnObject name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public EnObject description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Language getLanguage() {
        return language;
    }

    public EnObject language(Language language) {
        this.language = language;
        return this;
    }

    public void setLanguage(Language language) {
        this.language = language;
    }

    public EnObjectType getObjectType() {
        return objectType;
    }

    public EnObject objectType(EnObjectType enObjectType) {
        this.objectType = enObjectType;
        return this;
    }

    public void setObjectType(EnObjectType enObjectType) {
        this.objectType = enObjectType;
    }

    public EnObject getObjectParent() {
        return objectParent;
    }

    public EnObject objectParent(EnObject enObject) {
        this.objectParent = enObject;
        return this;
    }

    public void setObjectParent(EnObject enObject) {
        this.objectParent = enObject;
    }

    public Set<Attribute> getObjectAttributes() {
        return objectAttributes;
    }

    public EnObject objectAttributes(Set<Attribute> attributes) {
        this.objectAttributes = attributes;
        return this;
    }

    public EnObject addObjectAttributes(Attribute attribute) {
        this.objectAttributes.add(attribute);
        attribute.setEnObject(this);
        return this;
    }

    public EnObject removeObjectAttributes(Attribute attribute) {
        this.objectAttributes.remove(attribute);
        attribute.setEnObject(null);
        return this;
    }

    public void setObjectAttributes(Set<Attribute> attributes) {
        this.objectAttributes = attributes;
    }

    public MessageMap getMessageMap() {
        return messageMap;
    }

    public EnObject messageMap(MessageMap messageMap) {
        this.messageMap = messageMap;
        return this;
    }

    public void setMessageMap(MessageMap messageMap) {
        this.messageMap = messageMap;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        EnObject enObject = (EnObject) o;
        if (enObject.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), enObject.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "EnObject{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", language='" + getLanguage() + "'" +
            "}";
    }
}
