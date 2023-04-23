package com.ssafy.nanumi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class NanumiApplication {

	public static void main(String[] args) {
		SpringApplication.run(NanumiApplication.class, args);
	}

}
