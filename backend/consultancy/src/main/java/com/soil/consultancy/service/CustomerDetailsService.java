package com.soil.consultancy.service;

import com.soil.consultancy.model.CustomerDetails;
import com.soil.consultancy.repository.CustomerDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerDetailsService {

    @Autowired
    private CustomerDetailsRepository custDetRepo;

    public CustomerDetails createCustomer(CustomerDetails customer){
        return custDetRepo.save(customer);
    }

    public List<CustomerDetails> getAllCustomers(){
        return custDetRepo.findAll();
    }
}
