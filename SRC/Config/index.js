// export const baseUrl = "ecstatic-buck.23-106-85-134.plesk.page";
export const baseUrl = 'https://94ec-103-138-50-45.ngrok-free.app';
console.log('🚀 ~ baseUrl:', baseUrl);
export const imageUrl = `${baseUrl}/api/images/`;
export const profilePicUrl = `${baseUrl}/uploads`;

export const apiDataLimit = 10;
export const validateEmail = email => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
