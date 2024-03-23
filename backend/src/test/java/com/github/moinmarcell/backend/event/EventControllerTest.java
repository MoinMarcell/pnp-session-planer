package com.github.moinmarcell.backend.event;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class EventControllerTest {
    private static final String EVENT_API_ENDPOINT = "/api/events";

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @DisplayName("Create event - expect status 201 and saved event when endpoint called")
    void createEvent_expectStatus201AndSavedEvent_whenEndpointCalled() throws Exception {
        EventDto eventDto = new EventDto(
                "title",
                "description",
                "location",
                LocalDateTime.of(2024, 3, 8, 17, 0),
                LocalDateTime.of(2024, 3, 8, 22, 0)
        );
        String eventDtoJson = objectMapper.writeValueAsString(eventDto);

        MvcResult response = mockMvc.perform(post(EVENT_API_ENDPOINT)
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(eventDtoJson))
                .andExpect(status().isCreated())
                .andReturn();
        Event savedEvent = objectMapper.readValue(response.getResponse().getContentAsString(), Event.class);

        assertEquals(eventDto.title(), savedEvent.getTitle());
        assertEquals(eventDto.description(), savedEvent.getDescription());
        assertEquals(eventDto.location(), savedEvent.getLocation());
        assertEquals(eventDto.start(), savedEvent.getStart());
        assertEquals(eventDto.end(), savedEvent.getEnd());
        assertNotNull(savedEvent.getId());
    }

    @Test
    @DisplayName("Create event - expect status 415 when media type is not json")
    void createEvent_expectStatus415_whenMediaTypeIsNotJson() throws Exception {
        EventDto eventDto = new EventDto(
                "title",
                "description",
                "location",
                LocalDateTime.of(2024, 3, 8, 17, 0),
                LocalDateTime.of(2024, 3, 8, 22, 0)
        );
        String eventDtoJson = objectMapper.writeValueAsString(eventDto);

        mockMvc.perform(post(EVENT_API_ENDPOINT)
                        .contentType(MediaType.APPLICATION_XML_VALUE)
                        .content(eventDtoJson))
                .andExpect(status().isUnsupportedMediaType());
    }

    @Test
    @DisplayName("Create event - expect status 400 when title is blank")
    void createEvent_expectStatus400_whenTitleIsBlank() throws Exception {
        EventDto eventDto = new EventDto(
                "",
                "description",
                "location",
                LocalDateTime.of(2024, 3, 8, 17, 0),
                LocalDateTime.of(2024, 3, 8, 22, 0)
        );
        String eventDtoJson = objectMapper.writeValueAsString(eventDto);

        mockMvc.perform(post(EVENT_API_ENDPOINT)
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(eventDtoJson))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DisplayName("Create event - expect status 400 when location is blank")
    void createEvent_expectStatus400_whenLocationIsBlank() throws Exception {
        EventDto eventDto = new EventDto(
                "title",
                "description",
                "",
                LocalDateTime.of(2024, 3, 8, 17, 0),
                LocalDateTime.of(2024, 3, 8, 22, 0)
        );
        String eventDtoJson = objectMapper.writeValueAsString(eventDto);

        mockMvc.perform(post(EVENT_API_ENDPOINT)
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(eventDtoJson))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DisplayName("Create event - expect status 400 when start is null")
    void createEvent_expectStatus400_whenStartIsNull() throws Exception {
        EventDto eventDto = new EventDto(
                "title",
                "description",
                "location",
                null,
                LocalDateTime.of(2024, 3, 8, 22, 0)
        );
        String eventDtoJson = objectMapper.writeValueAsString(eventDto);

        mockMvc.perform(post(EVENT_API_ENDPOINT)
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(eventDtoJson))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DisplayName("Create event - expect status 400 when end is null")
    void createEvent_expectStatus400_whenEndIsNull() throws Exception {
        EventDto eventDto = new EventDto(
                "title",
                "description",
                "location",
                LocalDateTime.of(2024, 3, 8, 17, 0),
                null
        );
        String eventDtoJson = objectMapper.writeValueAsString(eventDto);

        mockMvc.perform(post(EVENT_API_ENDPOINT)
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(eventDtoJson))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DisplayName("Create event - expect status 400 when start is after end")
    void createEvent_expectStatus400_whenStartIsAfterEnd() throws Exception {
        EventDto eventDto = new EventDto(
                "title",
                "description",
                "location",
                LocalDateTime.of(2024, 3, 8, 17, 0),
                LocalDateTime.of(2024, 3, 8, 16, 0)
        );
        String eventDtoJson = objectMapper.writeValueAsString(eventDto);

        mockMvc.perform(post(EVENT_API_ENDPOINT)
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(eventDtoJson))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DisplayName("Create event - expect status 400 when start is equal to end")
    void createEvent_expectStatus400_whenStartIsEqualToEnd() throws Exception {
        EventDto eventDto = new EventDto(
                "title",
                "description",
                "location",
                LocalDateTime.of(2024, 3, 8, 17, 0),
                LocalDateTime.of(2024, 3, 8, 17, 0)
        );
        String eventDtoJson = objectMapper.writeValueAsString(eventDto);

        mockMvc.perform(post(EVENT_API_ENDPOINT)
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(eventDtoJson))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DisplayName("Get event by id - expect status 200 and event when endpoint called")
    void getEventById_expectStatus200AndEvent_whenEndpointCalled() throws Exception {
        EventDto eventDto = new EventDto(
                "title",
                "description",
                "location",
                LocalDateTime.of(2024, 3, 8, 17, 0),
                LocalDateTime.of(2024, 3, 8, 22, 0)
        );
        String eventDtoJson = objectMapper.writeValueAsString(eventDto);

        MvcResult response = mockMvc.perform(post(EVENT_API_ENDPOINT)
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(eventDtoJson))
                .andExpect(status().isCreated())
                .andReturn();
        Event savedEvent = objectMapper.readValue(response.getResponse().getContentAsString(), Event.class);

        MvcResult getResponse = mockMvc.perform(get(EVENT_API_ENDPOINT + "/" + savedEvent.getId()))
                .andExpect(status().isOk())
                .andReturn();
        Event foundEvent = objectMapper.readValue(getResponse.getResponse().getContentAsString(), Event.class);

        assertEquals(savedEvent, foundEvent);
    }

    @Test
    @DisplayName("Get event by id - expect status 404 when event not found")
    void getEventById_expectStatus404_whenEventNotFound() throws Exception {
        mockMvc.perform(get(EVENT_API_ENDPOINT + "/nonexistent-id"))
                .andExpect(status().isNotFound())
                .andExpect(content().string("Event not found"));
    }

    @Test
    @DisplayName("Get all events - expect status 200 and empty list when no events")
    void getAllEvents_expectStatus200AndEmptyList_whenNoEvents() throws Exception {
        mockMvc.perform(get(EVENT_API_ENDPOINT))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

    @Test
    @DisplayName("Delete event by id - expect status 200 and message when event deleted")
    void deleteById_expectStatus200AndMessage_whenEventDeleted() throws Exception {
        EventDto eventDto = new EventDto(
                "title",
                "description",
                "location",
                LocalDateTime.of(2024, 3, 8, 17, 0),
                LocalDateTime.of(2024, 3, 8, 22, 0)
        );
        String eventDtoJson = objectMapper.writeValueAsString(eventDto);

        MvcResult response = mockMvc.perform(post(EVENT_API_ENDPOINT)
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(eventDtoJson))
                .andExpect(status().isCreated())
                .andReturn();
        Event savedEvent = objectMapper.readValue(response.getResponse().getContentAsString(), Event.class);

        mockMvc.perform(delete(EVENT_API_ENDPOINT + "/" + savedEvent.getId()))
                .andExpect(status().isOk())
                .andExpect(content().string("Event " + savedEvent.getTitle() + " deleted"));
    }

    @Test
    @DisplayName("Delete event by id - expect status 404 when event not found")
    void deleteById_expectStatus404_whenEventNotFound() throws Exception {
        mockMvc.perform(delete(EVENT_API_ENDPOINT + "/nonexistent-id"))
                .andExpect(status().isNotFound())
                .andExpect(content().string("Event not found"));
    }

    @Test
    @DisplayName("Update event - expect status 200 and updated event when endpoint called")
    void updateEvent_expectStatus200AndUpdatedEvent_whenEndpointCalled() throws Exception {
        EventDto eventDto = new EventDto(
                "title",
                "description",
                "location",
                LocalDateTime.of(2024, 3, 8, 17, 0),
                LocalDateTime.of(2024, 3, 8, 22, 0)
        );
        String eventDtoJson = objectMapper.writeValueAsString(eventDto);

        MvcResult response = mockMvc.perform(post(EVENT_API_ENDPOINT)
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(eventDtoJson))
                .andExpect(status().isCreated())
                .andReturn();
        Event savedEvent = objectMapper.readValue(response.getResponse().getContentAsString(), Event.class);

        EventDto updatedEventDto = new EventDto(
                "updated title",
                "updated description",
                "updated location",
                LocalDateTime.of(2024, 3, 8, 18, 0),
                LocalDateTime.of(2024, 3, 8, 23, 0)
        );
        String updatedEventDtoJson = objectMapper.writeValueAsString(updatedEventDto);

        MvcResult updateResponse = mockMvc.perform(put(EVENT_API_ENDPOINT + "/" + savedEvent.getId())
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(updatedEventDtoJson))
                .andExpect(status().isOk())
                .andReturn();
        Event updatedEvent = objectMapper.readValue(updateResponse.getResponse().getContentAsString(), Event.class);

        assertEquals(updatedEventDto.title(), updatedEvent.getTitle());
        assertEquals(updatedEventDto.description(), updatedEvent.getDescription());
        assertEquals(updatedEventDto.location(), updatedEvent.getLocation());
        assertEquals(updatedEventDto.start(), updatedEvent.getStart());
        assertEquals(updatedEventDto.end(), updatedEvent.getEnd());
        assertEquals(savedEvent.getId(), updatedEvent.getId());
    }

    @Test
    @DisplayName("Update event - expect status 404 when event not found")
    void updateEvent_expectStatus404_whenEventNotFound() throws Exception {
        EventDto eventDto = new EventDto(
                "title",
                "description",
                "location",
                LocalDateTime.of(2024, 3, 8, 17, 0),
                LocalDateTime.of(2024, 3, 8, 22, 0)
        );
        String eventDtoJson = objectMapper.writeValueAsString(eventDto);

        mockMvc.perform(put(EVENT_API_ENDPOINT + "/nonexistent-id")
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(eventDtoJson))
                .andExpect(status().isNotFound())
                .andExpect(content().string("Event not found"));
    }

    @Test
    @DisplayName("Update event - expect status 400 when start is after end")
    void updateEvent_expectStatus400_whenStartIsAfterEnd() throws Exception {
        EventDto eventDto = new EventDto(
                "title",
                "description",
                "location",
                LocalDateTime.of(2024, 3, 8, 22, 0),
                LocalDateTime.of(2024, 3, 8, 17, 0)
        );
        String eventDtoJson = objectMapper.writeValueAsString(eventDto);

        mockMvc.perform(put(EVENT_API_ENDPOINT + "/id")
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(eventDtoJson))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DisplayName("Update event - expect status 400 when start is equal to end")
    void updateEvent_expectStatus400_whenStartIsEqualToEnd() throws Exception {
        EventDto eventDto = new EventDto(
                "title",
                "description",
                "location",
                LocalDateTime.of(2024, 3, 8, 17, 0),
                LocalDateTime.of(2024, 3, 8, 17, 0)
        );
        String eventDtoJson = objectMapper.writeValueAsString(eventDto);

        mockMvc.perform(put(EVENT_API_ENDPOINT + "/id")
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(eventDtoJson))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DisplayName("Update event - expect status 415 when media type is not json")
    void updateEvent_expectStatus415_whenMediaTypeIsNotJson() throws Exception {
        EventDto eventDto = new EventDto(
                "title",
                "description",
                "location",
                LocalDateTime.of(2024, 3, 8, 17, 0),
                LocalDateTime.of(2024, 3, 8, 22, 0)
        );
        String eventDtoJson = objectMapper.writeValueAsString(eventDto);

        mockMvc.perform(put(EVENT_API_ENDPOINT + "/id")
                        .contentType(MediaType.APPLICATION_XML_VALUE)
                        .content(eventDtoJson))
                .andExpect(status().isUnsupportedMediaType());
    }
}