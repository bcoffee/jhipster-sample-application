package io.github.jhipster.application.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

import io.github.jhipster.application.domain.enumeration.Language;

/**
 * A Report.
 */
@Entity
@Table(name = "report")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Report implements Serializable {

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

    @Column(name = "instructions")
    private String instructions;

    @Lob
    @Column(name = "layout")
    private byte[] layout;

    @Column(name = "layout_content_type")
    private String layoutContentType;

    @OneToOne    @JoinColumn(unique = true)
    private ReportType reportType;

    @OneToOne    @JoinColumn(unique = true)
    private User reportOwner;

    @OneToOne    @JoinColumn(unique = true)
    private ReportCategory reportCategory;

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

    public Report name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public Report description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Language getLanguage() {
        return language;
    }

    public Report language(Language language) {
        this.language = language;
        return this;
    }

    public void setLanguage(Language language) {
        this.language = language;
    }

    public String getInstructions() {
        return instructions;
    }

    public Report instructions(String instructions) {
        this.instructions = instructions;
        return this;
    }

    public void setInstructions(String instructions) {
        this.instructions = instructions;
    }

    public byte[] getLayout() {
        return layout;
    }

    public Report layout(byte[] layout) {
        this.layout = layout;
        return this;
    }

    public void setLayout(byte[] layout) {
        this.layout = layout;
    }

    public String getLayoutContentType() {
        return layoutContentType;
    }

    public Report layoutContentType(String layoutContentType) {
        this.layoutContentType = layoutContentType;
        return this;
    }

    public void setLayoutContentType(String layoutContentType) {
        this.layoutContentType = layoutContentType;
    }

    public ReportType getReportType() {
        return reportType;
    }

    public Report reportType(ReportType reportType) {
        this.reportType = reportType;
        return this;
    }

    public void setReportType(ReportType reportType) {
        this.reportType = reportType;
    }

    public User getReportOwner() {
        return reportOwner;
    }

    public Report reportOwner(User user) {
        this.reportOwner = user;
        return this;
    }

    public void setReportOwner(User user) {
        this.reportOwner = user;
    }

    public ReportCategory getReportCategory() {
        return reportCategory;
    }

    public Report reportCategory(ReportCategory reportCategory) {
        this.reportCategory = reportCategory;
        return this;
    }

    public void setReportCategory(ReportCategory reportCategory) {
        this.reportCategory = reportCategory;
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
        Report report = (Report) o;
        if (report.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), report.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Report{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", language='" + getLanguage() + "'" +
            ", instructions='" + getInstructions() + "'" +
            ", layout='" + getLayout() + "'" +
            ", layoutContentType='" + getLayoutContentType() + "'" +
            "}";
    }
}
