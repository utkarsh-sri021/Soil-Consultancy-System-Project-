package com.soil.consultancy.repository;

import com.soil.consultancy.model.CustomerDetails;
import org.springframework.data.cassandra.repository.CassandraRepository;

public interface CustomerDetailsRepository extends CassandraRepository<CustomerDetails,String> {

}
