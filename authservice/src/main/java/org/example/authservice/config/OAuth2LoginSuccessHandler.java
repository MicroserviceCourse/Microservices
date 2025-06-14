package org.example.authservice.config;


import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.example.authservice.dto.response.Oauth2Response;
import org.example.authservice.dto.response.RequestResponse;
import org.example.authservice.service.Oauth2Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.security.oauth2.core.user.OAuth2User;


import java.io.IOException;

@Component
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {

    @Autowired
    private Oauth2Service oauth2Service;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

        Oauth2Response oauth2Response = oauth2Service.Oauth2Login(oAuth2User);

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        RequestResponse requestRespons = new RequestResponse(oauth2Response);

        ObjectMapper mapper = new ObjectMapper();
        response.getWriter().write(mapper.writeValueAsString(requestRespons));
    }
}
