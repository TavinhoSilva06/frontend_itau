import axios from "axios";

// Cria uma instância do Axios apontando para a URL da API
const api = axios.create({

    baseURL: "http://localhost:8080",

    headers: {
        "Content-Type": "application/json"
    }

});

export default api;