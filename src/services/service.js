import axios from 'axios';

export const getUserQuestions = async (url) => {
  try {
    return await axios({
      url,
      method: 'get',
      responseType: 'json'
    })
  } catch (error) {
    return error;
  }
};

export const setUserAnswers = async (url, payload) => {
  try {
    return await axios({
      url,
      method: 'post',
      responseType: 'json',
      data: payload,
      config: { headers: {'Content-Type': 'appliction/json' }}
    })
  } catch (error) {
    return error;
  }
};

export const getAllUserAnswers = async (url) => {
  try {
    return await axios({
      url,
      method: 'get',
      responseType: 'json'
    })
  } catch (error) {
    return error;
  }
};

