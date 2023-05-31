const wait = (ms) => new Promise((resolve) => {
  setTimeout(() => resolve(), ms);
});

export default {
  wait,
  delay: wait,
  sleep: wait,
  timeout: wait,
};

