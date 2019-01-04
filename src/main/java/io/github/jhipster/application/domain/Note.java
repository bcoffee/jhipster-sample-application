package io.github.jhipster.application.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

import io.github.jhipster.application.domain.enumeration.Language;

/**
 * A Note.
 */
@Entity
@Table(name = "note")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Note implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "language")
    private Language language;

    @Column(name = "message")
    private String message;

    @Column(name = "cycle_id")
    private String cycleId;

    @OneToOne    @JoinColumn(unique = true)
    private User noteUser;

    @OneToOne    @JoinColumn(unique = true)
    private Note parentNote;

    @OneToOne    @JoinColumn(unique = true)
    private NoteCategory noteCategory;

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

    public Note name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Language getLanguage() {
        return language;
    }

    public Note language(Language language) {
        this.language = language;
        return this;
    }

    public void setLanguage(Language language) {
        this.language = language;
    }

    public String getMessage() {
        return message;
    }

    public Note message(String message) {
        this.message = message;
        return this;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getCycleId() {
        return cycleId;
    }

    public Note cycleId(String cycleId) {
        this.cycleId = cycleId;
        return this;
    }

    public void setCycleId(String cycleId) {
        this.cycleId = cycleId;
    }

    public User getNoteUser() {
        return noteUser;
    }

    public Note noteUser(User user) {
        this.noteUser = user;
        return this;
    }

    public void setNoteUser(User user) {
        this.noteUser = user;
    }

    public Note getParentNote() {
        return parentNote;
    }

    public Note parentNote(Note note) {
        this.parentNote = note;
        return this;
    }

    public void setParentNote(Note note) {
        this.parentNote = note;
    }

    public NoteCategory getNoteCategory() {
        return noteCategory;
    }

    public Note noteCategory(NoteCategory noteCategory) {
        this.noteCategory = noteCategory;
        return this;
    }

    public void setNoteCategory(NoteCategory noteCategory) {
        this.noteCategory = noteCategory;
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
        Note note = (Note) o;
        if (note.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), note.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Note{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", language='" + getLanguage() + "'" +
            ", message='" + getMessage() + "'" +
            ", cycleId='" + getCycleId() + "'" +
            "}";
    }
}
