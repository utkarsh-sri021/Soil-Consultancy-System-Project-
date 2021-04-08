package com.soil.consultancy.service;

import com.soil.consultancy.exception.ReportNotFoundException;
import com.soil.consultancy.model.Report;
import com.soil.consultancy.repository.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ReportService {

    @Autowired
    private ReportRepository reportRepo;

    //--------------------------------------------create New Report---------------------------------------------------
    public Report createReport(Report report)
    {
        return reportRepo.save(report);

    }

    //--------------------------------------------get All Reports ----------------------------------------------------
    public List<Report> getAllReports()
    {
        return reportRepo.findAll();
    }

    //---------------------------------------------get report by id --------------------------------------------------
    public Report getReportById(UUID reportId)
    {
        Optional<Report> optionalReport = reportRepo.findById(reportId);
        if(!optionalReport.isPresent())
            throw new ReportNotFoundException("Report with" + reportId + "not found");
        return reportRepo.findById(reportId).get();
    }

    //---------------------------------------------update report by id------------------------------------------------
    public Report updateReportById(UUID reportId , Report report)
    {
        Optional<Report> optionalReport = reportRepo.findById(reportId);
        if(!optionalReport.isPresent())
            throw new ReportNotFoundException("Report with" + reportId + "not found");
        report.setReportId(reportId);
        return reportRepo.save(report);
    }
}
