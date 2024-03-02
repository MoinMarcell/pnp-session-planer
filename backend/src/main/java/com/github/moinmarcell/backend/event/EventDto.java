package com.github.moinmarcell.backend.event;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public record EventDto(
        @NotBlank(message = "Title is mandatory")
        String title,

        String description,

        @NotBlank(message = "Location is mandatory")
        String location,

        @NotNull(message = "Start is mandatory")
        LocalDateTime start,

        @NotNull(message = "End is mandatory")
        LocalDateTime end
) {
}
