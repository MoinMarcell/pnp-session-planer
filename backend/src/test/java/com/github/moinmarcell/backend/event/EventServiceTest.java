package com.github.moinmarcell.backend.event;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class EventServiceTest {

    private final EventRepository eventRepository = mock(EventRepository.class);
    private final EventService eventService = new EventService(eventRepository);

    @Test
    @DisplayName("Create event - return saved event when method called")
    void createEvent_returnSavedEvent_whenMethodCalled() {
        // given
        EventDto eventDto = new EventDto(
                "title",
                "description",
                "location",
                LocalDateTime.of(2024, 3, 8, 17, 0),
                LocalDateTime.of(2024, 3, 8, 22, 0)
        );
        Event expected = Event.fromDto(eventDto);

        // when
        when(eventRepository.save(expected)).thenReturn(expected);
        Event actual = eventService.createEvent(eventDto);

        // then
        verify(eventRepository).save(any(Event.class));
        assertEquals(expected, actual);
    }

    @Test
    @DisplayName("Create event - throw exception when start is after end")
    void createEvent_throwException_whenStartIsAfterEnd() {
        // given
        EventDto eventDto = new EventDto(
                "title",
                "description",
                "location",
                LocalDateTime.of(2024, 3, 8, 22, 0),
                LocalDateTime.of(2024, 3, 8, 17, 0)
        );

        // then
        assertThrows(ResponseStatusException.class, () -> eventService.createEvent(eventDto));
    }

    @Test
    @DisplayName("Create event - throw exception when start is equal to end")
    void createEvent_throwException_whenStartIsEqualToEnd() {
        // given
        EventDto eventDto = new EventDto(
                "title",
                "description",
                "location",
                LocalDateTime.of(2024, 3, 8, 17, 0),
                LocalDateTime.of(2024, 3, 8, 17, 0)
        );

        // then
        assertThrows(ResponseStatusException.class, () -> eventService.createEvent(eventDto));
    }

    @Test
    @DisplayName("Get event by id - return event when found")
    void getEventById_returnEvent_whenFound() {
        // given
        String id = "id";
        Event expected = new Event(id, "title", "description", "location", LocalDateTime.now(), LocalDateTime.now());

        // when
        when(eventRepository.findById("id")).thenReturn(Optional.of(expected));
        Event actual = eventService.getEventById("id");

        // then
        verify(eventRepository).findById("id");
        assertEquals(expected, actual);
    }

    @Test
    @DisplayName("Get event by id - throw exception when not found")
    void getEventById_throwException_whenNotFound() {
        // given
        String id = "id";

        // then
        assertThrows(NoSuchElementException.class, () -> eventService.getEventById(id));
    }

    @Test
    @DisplayName("Get event by id - throw exception when id is null")
    void getEventById_throwException_whenIdIsNull() {
        // then
        assertThrows(NoSuchElementException.class, () -> eventService.getEventById(null));
    }

    @Test
    @DisplayName("Get event by id - throw exception when id is empty")
    void getEventById_throwException_whenIdIsEmpty() {
        // then
        assertThrows(NoSuchElementException.class, () -> eventService.getEventById(""));
    }

    @Test
    @DisplayName("Get event by id - throw exception when id is blank")
    void getEventById_throwException_whenIdIsBlank() {
        // then
        assertThrows(NoSuchElementException.class, () -> eventService.getEventById(" "));
    }

    @Test
    @DisplayName("Get all events - return all events")
    void getAllEvents_returnAllEvents() {
        // given
        Event event1 = new Event("id1", "title1", "description1", "location1", LocalDateTime.now(), LocalDateTime.now());
        Event event2 = new Event("id2", "title2", "description2", "location2", LocalDateTime.now(), LocalDateTime.now());
        List<Event> events = List.of(event1, event2);
        List<EventWithIdAndTitle> expected = events.stream().map(event -> new EventWithIdAndTitle(event.getId(), event.getTitle())).toList();

        // when
        when(eventRepository.findAllByIdAndTitle()).thenReturn(expected);
        List<EventWithIdAndTitle> actual = eventService.getAllEvents();

        // then
        verify(eventRepository).findAllByIdAndTitle();
        assertEquals(expected, actual);
    }

    @Test
    @DisplayName("Delete event by id - return message when event deleted")
    void deleteById_returnMessage_whenEventDeleted() {
        // given
        String id = "id";
        Event event = new Event(id, "title", "description", "location", LocalDateTime.now(), LocalDateTime.now());
        String expected = "Event with id " + id + " deleted";

        // when
        when(eventRepository.findById(id)).thenReturn(Optional.of(event));
        String actual = eventService.deleteById(id);

        // then
        verify(eventRepository).findById(id);
        verify(eventRepository).delete(event);
        assertEquals(expected, actual);
    }

    @Test
    @DisplayName("Delete event by id - throw exception when event not found")
    void deleteById_throwException_whenEventNotFound() {
        // given
        String id = "id";

        // then
        assertThrows(NoSuchElementException.class, () -> eventService.deleteById(id));
    }
}