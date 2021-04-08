package com.soil.consultancy.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.soil.consultancy.model.Report;
import com.soil.consultancy.service.ReportService;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;


@RestController
@RequestMapping("/soil-consultancy-system")
@CrossOrigin("*")
public class ReportController
{
    @Autowired
    private ReportService reportService;

    @PostMapping("/report")
    public Report createReport(@Valid @RequestBody Report report)
    {
        report.setReportId(UUID.randomUUID());
        return reportService.createReport(report);
    }

    @GetMapping("/reports")
    public List<Report> getAllReports()
    {
        return reportService.getAllReports();
    }

    @GetMapping("/report/{id}")
    public Report getReportById(@PathVariable("id") UUID reportId)
    {
        return reportService.getReportById(reportId);
    }

    @PutMapping("/report/{id}")
    public Report updateReportById(@PathVariable("id") UUID reportId , @Valid @RequestBody Report report)
    {
        return reportService.updateReportById(reportId,report);
    }



}

