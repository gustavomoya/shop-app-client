import axios from "axios";
import token from "./token";

class Client {
  constructor() {
    this.props = null;

    this.axios = axios.create();

    this.cancelToken = axios.CancelToken.source();

    this.axios.interceptors.response.use(
      response => {
        return response;
      },
      error => {
        if (error.response.status == 403) {
          window.location.href = "/logout";
          return;
        }

        if (axios.isCancel(error)) {
          console.log("Operación cancelada");
        } else {
          return Promise.reject(error.response);
        }
      }
    );
  }

  getCliente = () => this.axios;

  getCancelToken = () => this.cancelToken;

  cancel = () => {
    this.cancelToken.cancel("Component unmounted.");
    this.cancelToken = axios.CancelToken.source();
  };

  setBearerToken = () => {
    this.axios.defaults.headers.common["Authorization"] = `Bearer ${
      token().token
    }`;
    return this;
  };

  deleteBearerToken = () => {
    delete this.axios.defaults.headers.common["Authorization"];
    return this;
  };

  setHeaders = headers => {
    this.axios.defaults.headers.common = headers;
    return this;
  };

  setProps = props => {
    this.props = props;
    return this;
  };
}

const apiClient = new Client();

export default apiClient;
