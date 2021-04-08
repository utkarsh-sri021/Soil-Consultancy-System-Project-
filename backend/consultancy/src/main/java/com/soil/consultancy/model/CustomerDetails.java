package com.soil.consultancy.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.cassandra.core.mapping.Column;
import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

@Table("customer_details")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CustomerDetails {

    @PrimaryKey
    private String customerEmail;

    @Column("customer_first_name")
    private String customerFirstName;

    @Column("customer_last_name")
    private String customerLastName;


}
