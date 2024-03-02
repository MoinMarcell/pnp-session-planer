package com.github.moinmarcell.backend.event;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

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
}
