package com.soil.consultancy.controller;

import org.springframework.http.HttpHeaders;
import com.soil.consultancy.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.soil.consultancy.constants.constants.AUTHORIZATION_HEADER;

@RestController
@RequestMapping("/soil-consultancy")
@CrossOrigin("*")
public class AuthController {
    @Autowired
    AuthService authService;
    @PostMapping("/auth")
    public ResponseEntity authControllerMethod(@RequestHeader HttpHeaders headers) {
        try {
            List<String> header = headers.getValuesAsList(AUTHORIZATION_HEADER);
            return authService.authService(header.get(0).split(" ")[1]);
        } catch (Exception e) {
            System.out.println("Exception occured");
        }
        return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

