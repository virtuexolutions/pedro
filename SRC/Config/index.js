// export const baseUrl = "ecstatic-buck.23-106-85-134.plesk.page";
// export const baseUrl = 'https://ac15-45-199-187-64.ngrok-free.app';
export const baseUrl = 'https://ecstatic-buck.23-106-85-134.plesk.page';
console.log('🚀 ~ baseUrl:', baseUrl);
export const imageUrl = `${baseUrl}/api/images/`;
export const profilePicUrl = `${baseUrl}/uploads`;

export const apiDataLimit = 10;
export const validateEmail = email => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
