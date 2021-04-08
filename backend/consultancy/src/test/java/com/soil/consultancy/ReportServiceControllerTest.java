package com.soil.consultancy;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.soil.consultancy.controller.ReportController;
import com.soil.consultancy.model.Report;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.time.Year;
import java.util.List;
import java.util.UUID;

import static java.util.Collections.singletonList;
import static org.mockito.BDDMockito.given;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest(ReportController.class)
public class ReportServiceControllerTest {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private ReportController reportController;

    @Test
    public void getReports() throws Exception {
        Report report = new Report();
        report.setNitrogen(120f);
        report.setPhosphor(20f);
        report.setPotassium(100f);
        report.setBoron(100f);
        report.setCalcium(100f);
        report.setChlorine(100f);
        report.setCopper(100f);
        report.setIron(100f);
        report.setMagnesium(100f);
        report.setManganese(100f);
        report.setMolybdenum(100f);
        report.setNickel(100f);
        report.setSulphur(100f);
        report.setZinc(100f);
        report.setCrop("Maize");


        List<Report> allReports = singletonList(report);

        given(reportController.getAllReports()).willReturn(allReports);

        mvc.perform(get("/soil-consultancy-system/reports")
                .contentType(APPLICATION_JSON))
                .andExpect(status().isOk());

    }

    @Test
    public void createReport() throws Exception {
        Report report = new Report();
        report.setReportId(UUID.fromString("f8f992a0-80e0-419e-b416-7f89412fab83"));
        report.setNitrogen(120f);
        report.setPhosphor(20f);
        report.setPotassium(100f);
        report.setBoron(100f);
        report.setCalcium(100f);
        report.setChlorine(100f);
        report.setCopper(100f);
        report.setIron(100f);
        report.setMagnesium(100f);
        report.setManganese(100f);
        report.setMolybdenum(100f);
        report.setNickel(100f);
        report.setSulphur(100f);
        report.setZinc(100f);
        report.setCrop("Maize");


        given(reportController.createReport(report)).willReturn(report);

        mvc.perform(post("/soil-consultancy-system/report")
                .content(asJsonString(report))
                .contentType(APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    public static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}