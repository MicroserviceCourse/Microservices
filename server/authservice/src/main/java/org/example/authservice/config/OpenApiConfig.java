package org.example.authservice.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {
    @Bean
    public OpenAPI apiInfo() {
        final String scheme = "bearerAuth";
        return new OpenAPI()
                .info(new Info()
                        .title("Auth Service")
                        .version("1.0")
                        .description("This is the Auth Service API")
                        .contact(new Contact().name("WebVibe").email("tranp6648@gmail.com"))
                )
                .addServersItem(new Server().url("http://localhost:8585"))
                .components(new Components()
                        .addSecuritySchemes(scheme,
                                new SecurityScheme()
                                        .type(SecurityScheme.Type.HTTP)
                                        .scheme("bearer")
                                        .bearerFormat("JWT")
                        )
                ).addSecurityItem(new SecurityRequirement().addList(scheme));
    }
}
