package com.sthirax.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.Collections;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .cors().configurationSource(corsConfigurationSource())
            .and()
            .csrf().disable() // REST APIs with bearer token/session
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .authorizeRequests()
            // Public endpoints
            .antMatchers("/api/v1/auth/**").permitAll()
            .antMatchers(HttpMethod.GET, "/api/v1/products/**").permitAll()
            .antMatchers(HttpMethod.POST, "/api/v1/enquiries/**").permitAll()
            .antMatchers(HttpMethod.POST, "/api/v1/partners/apply").permitAll()
            .antMatchers(HttpMethod.GET, "/api/v1/passports/**").permitAll()
            .antMatchers(HttpMethod.GET, "/api/v1/regulatory-documents/**").permitAll()
            .antMatchers(HttpMethod.GET, "/api/v1/roadmap/**").permitAll()
            .antMatchers(HttpMethod.POST, "/api/v1/analytics/**").permitAll()
            .antMatchers("/v3/api-docs/**", "/swagger-ui/**", "/swagger-ui.html").permitAll()
            // Protected operational endpoints
            .antMatchers("/api/v1/admin/**").hasRole("ADMIN")
            .antMatchers("/api/v1/quality-reviews/**").hasAnyRole("ADMIN", "QUALITY_REVIEWER", "OPERATIONS_MANAGER")
            .antMatchers("/api/v1/approvals/**").hasAnyRole("ADMIN", "OPERATIONS_MANAGER")
            .anyRequest().permitAll(); // permit all other for initial prototype with controller-level checks
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOriginPatterns(Collections.singletonList("*"));
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type", "X-Requested-With", "Accept", "Origin"));
        config.setAllowCredentials(true);
        config.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
