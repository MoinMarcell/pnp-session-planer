package com.github.moinmarcell.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.RegexRequestMatcher;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    public static final String LOGIN_ENDPOINT = "/api/users/login";
    public static final String EVENTS_ENDPOINT = "/api/events";
    public static final String EVENT_ENDPOINT_WITH_ID = EVENTS_ENDPOINT + "/{id}";
    public static final String ADMIN_ROLE = "admin";

    @Bean
    public PasswordEncoder passwordEncoder() {
        return Argon2PasswordEncoder.defaultsForSpringSecurity_v5_8();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(c -> c.sessionCreationPolicy(SessionCreationPolicy.ALWAYS))
                .authorizeHttpRequests(c -> c
                        .requestMatchers(HttpMethod.POST, LOGIN_ENDPOINT).permitAll()
                        .requestMatchers(HttpMethod.GET, EVENTS_ENDPOINT).permitAll()
                        .requestMatchers(HttpMethod.GET, EVENT_ENDPOINT_WITH_ID).permitAll()
                        .requestMatchers(HttpMethod.POST, EVENTS_ENDPOINT).hasRole(ADMIN_ROLE)
                        .requestMatchers(HttpMethod.DELETE, EVENT_ENDPOINT_WITH_ID).hasRole(ADMIN_ROLE)
                        .requestMatchers(HttpMethod.PUT, EVENT_ENDPOINT_WITH_ID).hasRole(ADMIN_ROLE)
                        .requestMatchers(RegexRequestMatcher.regexMatcher("^(?!/api).*$")).permitAll()
                        .anyRequest().authenticated()
                )
                .httpBasic(c -> c.authenticationEntryPoint(((request, response, authException) -> response.sendError(401, authException.getMessage()))));
        return http.build();
    }
}
