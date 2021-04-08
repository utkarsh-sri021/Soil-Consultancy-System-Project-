import axios from "axios"

const CUSTOMER = "http://localhost:8082/soil-consultancy-system"

class customerService{
    
    createCustomer(customer){
        return axios.post(`${CUSTOMER}/customer`, customer);
    }

    retrieveAllCustomers(){
        return axios.get(`${CUSTOMER}/customers`);
    }
}

export default new customerService();