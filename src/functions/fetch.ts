import env from 'react-dotenv';

export const fetchData = async (url: string) => {
  const response = await fetch(`${env.API_URL}/${url}`, {
    method: 'GET',
    headers: {
      accessToken: env.ACCESS_TOKEN,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }).then((res) => res.json());
  return response;
};

export const fetchDataId = async (url: string, id: number) => {
  const response = await fetch(`${env.API_URL}/${url}/${id}`, {
    method: 'GET',
    headers: {
      accessToken: env.ACCESS_TOKEN,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }).then((res) => res.json());
  return response;
};
