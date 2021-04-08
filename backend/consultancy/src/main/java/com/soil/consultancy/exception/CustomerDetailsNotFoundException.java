package com.soil.consultancy.exception;

import com.soil.consultancy.model.CustomerDetails;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class CustomerDetailsNotFoundException extends RuntimeException{

    private static final long serialVersionUID = 1L;
    public CustomerDetailsNotFoundException(String message)
    {
        super(message);
    }
}
