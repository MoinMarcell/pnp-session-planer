package com.github.moinmarcell.backend.appuser;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class AppUserController {
    private final AppUserRepository appUserRepository;
    private final PasswordEncoder passwordEncoder;

    @GetMapping("/me")
    public AppUserResponse me() {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        AppUser appUser = appUserRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
        return new AppUserResponse(
                appUser.id(),
                appUser.username(),
                appUser.role()
        );
    }

    @PostMapping("/login")
    public void login() {
        // No need to implement anything here
    }

    @PostMapping("/logout")
    public void logout(HttpSession session) {
        SecurityContextHolder.clearContext();
        session.invalidate();
    }

    @PostMapping("/create-admin")
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasRole('admin')")
    public AppUserResponse createAdminUser(@RequestBody AppUserDto appUserDto) {
        AppUser saved = appUserRepository.save(
                new AppUser(
                        null,
                        appUserDto.username(),
                        passwordEncoder.encode(appUserDto.password()),
                        "admin"
                )
        );

        return new AppUserResponse(
                saved.id(),
                saved.username(),
                saved.role()
        );
    }

    @PostMapping("/create-gm")
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasRole('admin')")
    public AppUserResponse createGameMasterUser(@RequestBody AppUserDto appUserDto) {
        AppUser saved = appUserRepository.save(
                new AppUser(
                        null,
                        appUserDto.username(),
                        passwordEncoder.encode(appUserDto.password()),
                        "gm"
                )
        );

        return new AppUserResponse(
                saved.id(),
                saved.username(),
                saved.role()
        );
    }
}
