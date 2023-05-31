import _ from 'lodash';
import { message as AntMessage } from 'antd';

const getResponseError = (error) => {
  const status = _.get(error, 'response.data.code', 400);
  const msg = _.get(error, 'response.data.message')
    || _.get(error, 'message');
  if (msg === 'Network Error') {
    return 'Oops... We can\'t connect to the server. Please try again later.';
  }
  if (status === 500 && process.env.NODE_ENV === 'production') {
    return 'Something went wrong! We\'re notified about this issue and will fix it soon.';
  }
  if (!msg && process.env.NODE_ENV === 'development') {
    return 'Unhandle error. Please check the console for more details.';
  }
  return msg;
};

const message = Object.assign(AntMessage, {
  responseError(error, duration = 4) {
    const text = getResponseError(error);
    if (!text) return null;
    if (process.env.NODE_ENV !== 'production') {
      console.log('Error:', { error, text });
    }
    return AntMessage.warning(text, duration);
  },
});

message.config({
  maxCount: 3,
  duration: 4,
});

export default message;
