package com.wh;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com/wh/mapper")
public class whApplication {
    public static void main(String[] args) {
        SpringApplication.run(whApplication.class, args);
    }
}
