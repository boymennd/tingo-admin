export type Employee = {
  fullName: string;
  middleName: string;
  surName: string;
  givenName: string;
  gender: string;
  email: string;
  status: string;
  accountId: string;
  registrationDate: number;
  residentCountry: string;
  phoneNumber: string;
  approvedDate: number;
  avatar: string;
  dob: string;
  lastUpdate: number;
};

export type DataDetailbyTitleProps = {
  title: string;
  data: string | null;
};
