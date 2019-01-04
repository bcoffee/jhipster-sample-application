package io.github.jhipster.application.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A NotificationParameter.
 */
@Entity
@Table(name = "notification_parameter")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class NotificationParameter implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "measure")
    private String measure;

    @Column(name = "duration")
    private Float duration;

    @Column(name = "duration_track")
    private Float durationTrack;

    @Column(name = "count")
    private Integer count;

    @Column(name = "count_track")
    private Integer countTrack;

    @Column(name = "scane_date")
    private LocalDate scaneDate;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMeasure() {
        return measure;
    }

    public NotificationParameter measure(String measure) {
        this.measure = measure;
        return this;
    }

    public void setMeasure(String measure) {
        this.measure = measure;
    }

    public Float getDuration() {
        return duration;
    }

    public NotificationParameter duration(Float duration) {
        this.duration = duration;
        return this;
    }

    public void setDuration(Float duration) {
        this.duration = duration;
    }

    public Float getDurationTrack() {
        return durationTrack;
    }

    public NotificationParameter durationTrack(Float durationTrack) {
        this.durationTrack = durationTrack;
        return this;
    }

    public void setDurationTrack(Float durationTrack) {
        this.durationTrack = durationTrack;
    }

    public Integer getCount() {
        return count;
    }

    public NotificationParameter count(Integer count) {
        this.count = count;
        return this;
    }

    public void setCount(Integer count) {
        this.count = count;
    }

    public Integer getCountTrack() {
        return countTrack;
    }

    public NotificationParameter countTrack(Integer countTrack) {
        this.countTrack = countTrack;
        return this;
    }

    public void setCountTrack(Integer countTrack) {
        this.countTrack = countTrack;
    }

    public LocalDate getScaneDate() {
        return scaneDate;
    }

    public NotificationParameter scaneDate(LocalDate scaneDate) {
        this.scaneDate = scaneDate;
        return this;
    }

    public void setScaneDate(LocalDate scaneDate) {
        this.scaneDate = scaneDate;
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
        NotificationParameter notificationParameter = (NotificationParameter) o;
        if (notificationParameter.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), notificationParameter.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "NotificationParameter{" +
            "id=" + getId() +
            ", measure='" + getMeasure() + "'" +
            ", duration=" + getDuration() +
            ", durationTrack=" + getDurationTrack() +
            ", count=" + getCount() +
            ", countTrack=" + getCountTrack() +
            ", scaneDate='" + getScaneDate() + "'" +
            "}";
    }
}
