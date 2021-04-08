package com.soil.consultancy.controller;

import com.soil.consultancy.model.CustomerDetails;
import com.soil.consultancy.service.CustomerDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("soil-consultancy-system")
@CrossOrigin("*")
public class CustomerDetailsController {

    @Autowired
    public CustomerDetailsService custDetSerive;

    @PostMapping("/customer")
    public CustomerDetails createCustomer(@Valid @RequestBody CustomerDetails customer){
        return custDetSerive.createCustomer(customer);
    }

    @GetMapping("/customers")
    public List<CustomerDetails> getAllCustomers(){
        return custDetSerive.getAllCustomers();
    }
}
