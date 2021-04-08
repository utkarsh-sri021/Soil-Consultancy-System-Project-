package com.soil.consultancy.repository;

import com.soil.consultancy.model.CustomerDetails;
import org.springframework.stereotype.Repository;
import org.springframework.data.cassandra.repository.CassandraRepository;

@Repository
public interface AuthRepository extends CassandraRepository<CustomerDetails, String> {
}

