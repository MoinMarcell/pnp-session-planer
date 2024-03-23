package com.github.moinmarcell.backend.appuser;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "appusers")
public record AppUser(
        String id,
        String username,
        String password,
        String role
) {
}
