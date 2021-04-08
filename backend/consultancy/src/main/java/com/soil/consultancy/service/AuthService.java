package com.soil.consultancy.service;


import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.soil.consultancy.contacts.Response;
import com.soil.consultancy.model.CustomerDetails;
import com.soil.consultancy.repository.AuthRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Arrays;
import java.util.Optional;

import static com.soil.consultancy.constants.constants.CLIENT_ID;


@Service
public class AuthService {
    @Autowired
    AuthRepository authRepository;
    public ResponseEntity authService(String idTokenString) throws GeneralSecurityException, IOException {

        try {
            HttpTransport transport = new NetHttpTransport();
            JsonFactory jsonFactory = JacksonFactory.getDefaultInstance();
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(transport, jsonFactory).
                    setAudience(Arrays.asList(CLIENT_ID)).build();
            GoogleIdToken idToken = verifier.verify(idTokenString);
            if (idToken != null) {
                GoogleIdToken.Payload payload = idToken.getPayload();
                String email = (String) payload.get("email");
                String name = (String) payload.get("name");
                Optional<CustomerDetails> e_mail = authRepository.findById(email);
                if(e_mail.isPresent()) {
                    Response response = new Response();
                    response.setName(name);
                    response.setEmail(email);
                    return new ResponseEntity(response, HttpStatus.OK);

                }
                else {
                return new ResponseEntity(HttpStatus.UNAUTHORIZED);
                }
            }
        }
        catch(Exception e)
        {
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

    }
}
