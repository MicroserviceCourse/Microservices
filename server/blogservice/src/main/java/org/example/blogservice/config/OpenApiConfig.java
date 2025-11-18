package org.example.blogservice.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI().info(
                new Info()
                        .title("Blog Service API")
                        .version("v1")
                        .description("CMS + SEO + Recommendations + Comments")
        );
    }

    // ✅ Quan trọng: khai báo group và chỉ rõ package + path
    @Bean
    public GroupedOpenApi blogApi() {
        return GroupedOpenApi.builder()
                .group("blog-v1")
                .packagesToScan("/home/phuc-nghia/Desktop/Microservices/server/blogservice/src/main/java/org/example/blogservice/controller")
                .pathsToMatch("/api/v1/**")
                .build();
    }
}
