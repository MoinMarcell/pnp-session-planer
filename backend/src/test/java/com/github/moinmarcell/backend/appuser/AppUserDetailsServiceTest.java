package com.github.moinmarcell.backend.appuser;

import org.junit.jupiter.api.Test;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class AppUserDetailsServiceTest {

    private final AppUserRepository appUserRepository = mock(AppUserRepository.class);
    private final AppUserDetailsService appUserDetailsService = new AppUserDetailsService(appUserRepository);

    @Test
    void loadUserByUsername() {
        // given
        AppUser appUser = new AppUser("1", "test", "test", "gm");
        // when
        when(appUserRepository.findByUsername("test")).thenReturn(Optional.of(appUser));
        var userDetails = appUserDetailsService.loadUserByUsername("test");
        // then
        assertEquals("test", userDetails.getUsername());
    }

    @Test
    void loadUserByUsername_userNotFound() {
        // given
        // when
        when(appUserRepository.findByUsername("test")).thenReturn(Optional.empty());
        // then
        try {
            appUserDetailsService.loadUserByUsername("test");
        } catch (Exception e) {
            assertEquals("User not found", e.getMessage());
        }
    }
}