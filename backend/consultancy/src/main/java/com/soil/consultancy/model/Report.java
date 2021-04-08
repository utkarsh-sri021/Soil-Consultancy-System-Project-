package com.soil.consultancy.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Past;
import java.lang.Float;
import java.time.LocalDate;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Report {

    @Id
    private UUID reportId;

    @NotNull
    private Float nitrogen;

    @NotNull
    private Float phosphor;

    @NotNull
    private Float  potassium;

    @NotNull
    private Float calcium;

    @NotNull
    private  Float magnesium;

    @NotNull
    private Float sulphur;

    @NotNull
    private Float iron;

    @NotNull
    private Float zinc;

    @NotNull
    private Float manganese;

    @NotNull
    private Float copper;

    @NotNull
    private Float molybdenum;

    @NotNull
    private Float boron;

    @NotNull
    private Float chlorine;

    @NotNull
    private Float nickel;

    @NotNull
    private String crop;

    @NotNull
    @Past
    private LocalDate date;

    @NotNull
    private String email;
}

