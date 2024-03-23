package com.github.moinmarcell.backend.appuser;

public record AppUserResponse(
        String id,
        String username,
        String role
) {
}
