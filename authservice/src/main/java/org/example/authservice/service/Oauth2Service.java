package org.example.authservice.service;

import org.example.authservice.dto.response.Oauth2Response;
import org.springframework.security.oauth2.core.user.OAuth2User;

public interface Oauth2Service {
    Oauth2Response Oauth2Login(OAuth2User oAuth2User);
}
