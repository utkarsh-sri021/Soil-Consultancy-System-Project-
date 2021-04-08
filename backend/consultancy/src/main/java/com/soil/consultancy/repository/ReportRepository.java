package com.soil.consultancy.repository;

import com.soil.consultancy.model.Report;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ReportRepository extends CassandraRepository<Report, UUID> {

}
