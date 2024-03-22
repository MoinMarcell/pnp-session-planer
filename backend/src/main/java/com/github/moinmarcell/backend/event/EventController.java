package com.github.moinmarcell.backend.event;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/events")
@RequiredArgsConstructor
public class EventController {
    private final EventService eventService;

    @PostMapping(
            consumes = "application/json",
            produces = "application/json"
    )
    @ResponseStatus(HttpStatus.CREATED)
    public Event createEvent(@Valid @RequestBody EventDto eventDto) {
        return eventService.createEvent(eventDto);
    }

    @GetMapping(
            path = "/{id}",
            produces = "application/json"
    )
    public Event getEventById(@PathVariable String id) {
        return eventService.getEventById(id);
    }

    @GetMapping
    public List<EventWithIdAndTitle> getAllEvents() {
        return eventService.getAllEvents();
    }

    @DeleteMapping(
            path = "/{id}",
            produces = "plain/text"
    )
    public String deleteById(@PathVariable String id) {
        return eventService.deleteById(id);
    }

    @ExceptionHandler(NoSuchElementException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public String handleNoSuchElementException(NoSuchElementException exception) {
        return exception.getMessage();
    }

}
