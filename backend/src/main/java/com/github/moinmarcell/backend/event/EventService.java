package com.github.moinmarcell.backend.event;

import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class EventService {
    private final EventRepository eventRepository;

    Event createEvent(@NotNull EventDto eventDto) {
        if (isValidEventDuration(eventDto)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Start must be before end");
        }

        Event toSave = Event.fromDto(eventDto);
        return eventRepository.save(toSave);
    }

    Event getEventById(@NotNull String id) {
        return eventRepository
                .findById(id)
                .orElseThrow(() -> new NoSuchElementException("Event not found"));
    }

    List<EventWithIdAndTitle> getAllEvents() {
        return eventRepository.findAllByIdAndTitle();
    }

    String deleteById(@NotNull String id) {
        Event event = getEventById(id);
        eventRepository.delete(event);
        return "Event " + event.getTitle() + " deleted";
    }

    Event updateEvent(@NotNull String id, @NotNull EventDto eventDto) {
        if (isValidEventDuration(eventDto)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Start must be before end");
        }

        Event event = getEventById(id);
        event.updateFromDto(eventDto);
        return eventRepository.save(event);
    }

    private boolean isValidEventDuration(@NotNull EventDto eventDto) {
        return !eventDto.start().isBefore(eventDto.end()) || eventDto.start().isEqual(eventDto.end());
    }
}
