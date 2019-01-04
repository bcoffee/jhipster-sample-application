package io.github.jhipster.application.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

import io.github.jhipster.application.domain.enumeration.Language;

/**
 * A ReportSubscription.
 */
@Entity
@Table(name = "report_subscription")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ReportSubscription implements Serializable {

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

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "jhi_range")
    private String range;

    @Column(name = "range_n")
    private Integer rangeN;

    @Column(name = "active")
    private Boolean active;

    @Column(name = "email_message")
    private String emailMessage;

    @OneToOne    @JoinColumn(unique = true)
    private Report subscriptionReport;

    @OneToOne    @JoinColumn(unique = true)
    private DistributionList subscriptionDistributionList;

    @OneToOne    @JoinColumn(unique = true)
    private User subscriptionUser;

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

    public ReportSubscription name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public ReportSubscription description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Language getLanguage() {
        return language;
    }

    public ReportSubscription language(Language language) {
        this.language = language;
        return this;
    }

    public void setLanguage(Language language) {
        this.language = language;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public ReportSubscription startDate(LocalDate startDate) {
        this.startDate = startDate;
        return this;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public String getRange() {
        return range;
    }

    public ReportSubscription range(String range) {
        this.range = range;
        return this;
    }

    public void setRange(String range) {
        this.range = range;
    }

    public Integer getRangeN() {
        return rangeN;
    }

    public ReportSubscription rangeN(Integer rangeN) {
        this.rangeN = rangeN;
        return this;
    }

    public void setRangeN(Integer rangeN) {
        this.rangeN = rangeN;
    }

    public Boolean isActive() {
        return active;
    }

    public ReportSubscription active(Boolean active) {
        this.active = active;
        return this;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public String getEmailMessage() {
        return emailMessage;
    }

    public ReportSubscription emailMessage(String emailMessage) {
        this.emailMessage = emailMessage;
        return this;
    }

    public void setEmailMessage(String emailMessage) {
        this.emailMessage = emailMessage;
    }

    public Report getSubscriptionReport() {
        return subscriptionReport;
    }

    public ReportSubscription subscriptionReport(Report report) {
        this.subscriptionReport = report;
        return this;
    }

    public void setSubscriptionReport(Report report) {
        this.subscriptionReport = report;
    }

    public DistributionList getSubscriptionDistributionList() {
        return subscriptionDistributionList;
    }

    public ReportSubscription subscriptionDistributionList(DistributionList distributionList) {
        this.subscriptionDistributionList = distributionList;
        return this;
    }

    public void setSubscriptionDistributionList(DistributionList distributionList) {
        this.subscriptionDistributionList = distributionList;
    }

    public User getSubscriptionUser() {
        return subscriptionUser;
    }

    public ReportSubscription subscriptionUser(User user) {
        this.subscriptionUser = user;
        return this;
    }

    public void setSubscriptionUser(User user) {
        this.subscriptionUser = user;
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
        ReportSubscription reportSubscription = (ReportSubscription) o;
        if (reportSubscription.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), reportSubscription.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ReportSubscription{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", language='" + getLanguage() + "'" +
            ", startDate='" + getStartDate() + "'" +
            ", range='" + getRange() + "'" +
            ", rangeN=" + getRangeN() +
            ", active='" + isActive() + "'" +
            ", emailMessage='" + getEmailMessage() + "'" +
            "}";
    }
}
