import axios from '.';

export const api = {
  createUser: (userId, userName, email) => {
    const data = {
      fields: {
        userName: { stringValue: userName },
        email: { stringValue: email },
        createdAt: { timestampValue: new Date().toISOString() }, // Current timestamp
      },
    };

    return axios.patch(`/users/${userId}`, data);
  },
  getUser: (userId) => {
    return axios.get(`/users/${userId}`);
  },

  getUserFavourites: (userId) => {
    return axios.get(`/users/${userId}/favourites`);
  },

  getUserDownloads: (userId) => {
    return axios.get(`/users/${userId}/downloads`);
  },
};
