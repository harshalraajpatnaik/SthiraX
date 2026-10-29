package com.sthirax.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI sthiraxOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("SthiraX Platform API")
                        .description("REST API documentation for the SthiraX Distributed CO2-Mineralization & Low-Carbon Precast Operations Platform.")
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("SthiraX Industrial Engineering Team")
                                .email("contact@sthirax.com")
                                .url("https://github.com/harshalraajpatnaik/SthiraX"))
                        .license(new License().name("Proprietary / Industrial Operations")))
                .servers(List.of(
                        new Server().url("http://localhost:8088").description("Local Development Server (Port 8088)")
                ));
    }
}
