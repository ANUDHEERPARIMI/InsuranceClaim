package com.teams;

import org.springframework.boot.SpringApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableDiscoveryClient
public class TeamsApplication {

	public static void main(String[] args) {
		SpringApplication.run(TeamsApplication.class, args);
	}

}
