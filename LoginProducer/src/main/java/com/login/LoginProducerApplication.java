package com.login;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class LoginProducerApplication {

	public static void main(String[] args) {
		SpringApplication.run(LoginProducerApplication.class, args);
	}

}
