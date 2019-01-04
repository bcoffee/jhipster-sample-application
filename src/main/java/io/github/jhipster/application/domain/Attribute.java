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

/**
 * A Attribute.
 */
@Entity
@Table(name = "attribute")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Attribute implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "is_system")
    private Boolean isSystem;

    @Column(name = "jhi_type")
    private String type;

    @ManyToOne
    @JsonIgnoreProperties("objectAttributes")
    private EnObject enObject;

    @OneToMany(mappedBy = "attribute")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<AttributeOption> objectOptions = new HashSet<>();
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

    public Attribute name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public Attribute description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean isIsSystem() {
        return isSystem;
    }

    public Attribute isSystem(Boolean isSystem) {
        this.isSystem = isSystem;
        return this;
    }

    public void setIsSystem(Boolean isSystem) {
        this.isSystem = isSystem;
    }

    public String getType() {
        return type;
    }

    public Attribute type(String type) {
        this.type = type;
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

    public EnObject getEnObject() {
        return enObject;
    }

    public Attribute enObject(EnObject enObject) {
        this.enObject = enObject;
        return this;
    }

    public void setEnObject(EnObject enObject) {
        this.enObject = enObject;
    }

    public Set<AttributeOption> getObjectOptions() {
        return objectOptions;
    }

    public Attribute objectOptions(Set<AttributeOption> attributeOptions) {
        this.objectOptions = attributeOptions;
        return this;
    }

    public Attribute addObjectOptions(AttributeOption attributeOption) {
        this.objectOptions.add(attributeOption);
        attributeOption.setAttribute(this);
        return this;
    }

    public Attribute removeObjectOptions(AttributeOption attributeOption) {
        this.objectOptions.remove(attributeOption);
        attributeOption.setAttribute(null);
        return this;
    }

    public void setObjectOptions(Set<AttributeOption> attributeOptions) {
        this.objectOptions = attributeOptions;
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
        Attribute attribute = (Attribute) o;
        if (attribute.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), attribute.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Attribute{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", isSystem='" + isIsSystem() + "'" +
            ", type='" + getType() + "'" +
            "}";
    }
}
