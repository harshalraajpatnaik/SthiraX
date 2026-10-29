package com.sthirax;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
public class SthiraxApplication {
    public static void main(String[] args) {
        SpringApplication.run(SthiraxApplication.class, args);
    }
}
