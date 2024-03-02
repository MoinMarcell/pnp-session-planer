package com.github.moinmarcell.backend.event;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection = "events")
public class Event {
    @MongoId
    private String id;
    private String title;
    private String description;
    private String location;
    private LocalDateTime start;
    private LocalDateTime end;

    static Event fromDto(EventDto eventDto) {
        return new Event(
                null,
                eventDto.title(),
                eventDto.description(),
                eventDto.location(),
                eventDto.start(),
                eventDto.end());
    }
}
