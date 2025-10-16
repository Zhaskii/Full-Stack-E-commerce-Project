import { AxiosInstance, AxiosResponse } from "axios";

export interface ILoginResponse extends AxiosResponse {
  data: {
    accessToken: string;
    userDetails: {
      address: string;
      dob: string;
      email: string;
      firstName: string;
      gender: string;
      lastName: string;
      role: string;
      _id: string;
    };
    message: string;
  };
}
