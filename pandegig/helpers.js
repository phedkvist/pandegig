import Auth from '@aws-amplify/auth';

module.exports = {
  token: () => new Promise((resolve, reject) => {
    Auth.currentSession()
      .then((userSession) => resolve(userSession.getIdToken().getJwtToken()))
      .catch((err) => reject(err));
  }),
};
