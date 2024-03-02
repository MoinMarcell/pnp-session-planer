package com.github.moinmarcell.backend.event;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class EventService {
    private final EventRepository eventRepository;

    Event createEvent(EventDto eventDto) {
        if (!isValidEventDuration(eventDto)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Start must be before end");
        }

        Event toSave = Event.fromDto(eventDto);
        return eventRepository.save(toSave);
    }

    private boolean isValidEventDuration(EventDto eventDto) {
        return eventDto.start().isBefore(eventDto.end()) && !eventDto.start().isEqual(eventDto.end());
    }
}
