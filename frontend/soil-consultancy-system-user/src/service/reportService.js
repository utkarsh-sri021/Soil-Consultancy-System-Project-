import axios from 'axios';

const REPORT = "http://localhost:8082/soil-consultancy-system"

class reportService {
    
    createReport(report) 
    {
        return axios.post(`${REPORT}/report`, report);
    }

    retrieveAllReport(){
        return axios.get(`${REPORT}/reports`);
    }

    retrieveReportById(id){
        return axios.get(`${REPORT}/report/${id}`)
    }
}

export default new reportService();