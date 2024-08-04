import axios from '.';

export const api = {
  signUpUser: (userId, userName, email) => {
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

  // ==== Favrourites API
  addUserFavourites: (userId, { id_API, image_URL_large, image_URL_small }) => {
    const data = {
      fields: {
        id_API: { stringValue: id_API },
        image_URL_large: { stringValue: image_URL_large },
        image_URL_small: { stringValue: image_URL_small },
      },
    };

    //console.log(userId, data);
    return axios.patch(`/users/${userId}/favourites/${id_API}`, data);
  },

  //get the favourites
  getUserFavourites: (userId) => {
    return axios.get(`/users/${userId}/favourites`);
  },

  //Is the wallpaper user's fav? if it returns data then fav else not.
  isFavourite: (userId, favId) =>
    axios.get(`/users/${userId}/favourites/${favId}`),

  // delete user fav
  deleteUserFavourites: (userId, favId) => {
    return axios.delete(`/users/${userId}/favourites/${favId}`);
  },

  //add user downloads
  addUserDownloads: (userId, { id_API, image_URL_large, image_URL_small }) => {
    const data = {
      fields: {
        id_API: { stringValue: id_API },
        image_URL_large: { stringValue: image_URL_large },
        image_URL_small: { stringValue: image_URL_small },
      },
    };

    //console.log('Users: ', userId, data); 

    return axios.patch(`/users/${userId}/downloads/${id_API}`, data);
  },
  //get user Downloads
  getUserDownloads: (userId) => {
    return axios.get(`/users/${userId}/downloads`);
  },
};
