package com.github.moinmarcell.backend.appuser;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class AppUserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private AppUserRepository appUserRepository;

    @Test
    void me() throws Exception {
        AppUser appUser = appUserRepository.save(new AppUser(null, "test", "test", "gm"));
        AppUserResponse appUserResponse = new AppUserResponse(appUser.id(), appUser.username(), appUser.role());
        String appUserResponseJson = objectMapper.writeValueAsString(appUserResponse);
        UsernamePasswordAuthenticationToken principal = new UsernamePasswordAuthenticationToken(appUser.username(),
                appUser.password(), List.of());
        SecurityContextHolder.getContext().setAuthentication(principal);

        mockMvc.perform(get("/api/users/me"))
                .andExpect(status().isOk())
                .andExpect(content().json(appUserResponseJson));
    }

    @Test
    void me_expect401() throws Exception {
        mockMvc.perform(get("/api/users/me"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser(username = "test", roles = "admin")
    void createAdminUser() throws Exception {
        AppUserDto appUserDto = new AppUserDto("test", "test");
        String appUserDtoJson = objectMapper.writeValueAsString(appUserDto);

        mockMvc.perform(post("/api/users/create-admin")
                        .contentType("application/json")
                        .content(appUserDtoJson))
                .andExpect(status().isCreated());
    }

    @Test
    void createAdminUser_expect401() throws Exception {
        AppUserDto appUserDto = new AppUserDto("test", "test");
        String appUserDtoJson = objectMapper.writeValueAsString(appUserDto);

        mockMvc.perform(post("/api/users/create-admin")
                        .contentType("application/json")
                        .content(appUserDtoJson))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser(username = "test", roles = "admin")
    void createGameMasterUser() throws Exception {
        AppUserDto appUserDto = new AppUserDto("test", "test");
        String appUserDtoJson = objectMapper.writeValueAsString(appUserDto);

        mockMvc.perform(post("/api/users/create-gm")
                        .contentType("application/json")
                        .content(appUserDtoJson))
                .andExpect(status().isCreated());
    }

    @Test
    void createGameMasterUser_expect401() throws Exception {
        AppUserDto appUserDto = new AppUserDto("test", "test");
        String appUserDtoJson = objectMapper.writeValueAsString(appUserDto);

        mockMvc.perform(post("/api/users/create-gm")
                        .contentType("application/json")
                        .content(appUserDtoJson))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser
    void logout() throws Exception {
        mockMvc.perform(post("/api/users/logout"))
                .andExpect(status().isOk());
    }

    @Test
    void logout_expect401() throws Exception {
        mockMvc.perform(post("/api/users/logout"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void login() throws Exception {
        mockMvc.perform(post("/api/users/login"))
                .andExpect(status().isOk());
    }
}