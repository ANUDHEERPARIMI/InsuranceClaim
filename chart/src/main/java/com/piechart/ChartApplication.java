package com.piechart;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class ChartApplication {

	public static void main(String[] args) {
		SpringApplication.run(ChartApplication.class, args);
	}

}
