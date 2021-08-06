/** Another API example using localforage as local storage.
server and btc address **** out.
**/

import localforage from 'localforage';
import axios from 'axios';

let url = 'http://localhost:8888/https://api.*******.com/api?method=stats.provider.workers&addr=1******************************v&algo=';
const WORKER_NAMESPACE = 'WORKER-';

const neoScrypt = () => {
  return axios.get(url + 8)
    .then((response) => {
      let neoScryptData = response.data.result.workers;
      neoScryptData.forEach((item) => {
        let algoId = item[0];
        localforage.setItem(WORKER_NAMESPACE + 'NeoScrypt-' + algoId, item, (value) => {
          return value;
        });
      });
    }).then(() => {
      setTimeout(function () {
        neoScrypt();
      }.bind(), 60000);
    });
};

const lyra2REv2 = () => {
  return axios.get(url + 14)
    .then((response) => {
      let lyra2REv2tData = response.data.result.workers;
      lyra2REv2tData.forEach((item) => {
        let algoId = item[0];
        localforage.setItem(WORKER_NAMESPACE + 'Lyra2REv2-' + algoId, item, (value) => {
          return value;
        });
      });
    }).then(() => {
      setTimeout(function () {
        lyra2REv2();
      }.bind(), 60000);
    });
};

const daggerHashimoto = () => {
  return axios.get(url + 20)
    .then((response) => {
      let daggerHashimotoData = response.data.result.workers;
      daggerHashimotoData.forEach((item) => {
        let algoId = item[0];
        localforage.setItem(WORKER_NAMESPACE + 'DaggerHashimoto-' + algoId, item, (value) => {
          return value;
        });
      });
    }).then(() => {
      setTimeout(function () {
        daggerHashimoto();
      }.bind(), 60000);
    });
};

const decRed = () => {
  return axios.get(url + 21)
    .then((response) => {
      let decRedData = response.data.result.workers;
      decRedData.forEach((item) => {
        let algoId = item[0];
        localforage.setItem(WORKER_NAMESPACE + 'Decred-' + algoId, item, (value) => {
          return value;
        });
      });
    }).then(() => {
      setTimeout(function () {
        decRed();
      }.bind(), 60000);
    });
};

const cryptoNight = () => {
  return axios.get(url + 22)
    .then((response) => {
      let cryptoNightData = response.data.result.workers;
      cryptoNightData.forEach((item) => {
        let algoId = item[0];
        localforage.setItem(WORKER_NAMESPACE + 'CryptoNight-' + algoId, item, (value) => {
          return value;
        });
      });
    }).then(() => {
      setTimeout(function () {
        cryptoNight();
      }.bind(), 60000);
    });
};

const lbRy = () => {
  return axios.get(url + 23)
    .then((response) => {
      let lbRyData = response.data.result.workers;
      lbRyData.forEach((item) => {
        let algoId = item[0];
        localforage.setItem(WORKER_NAMESPACE + 'Lbry-' + algoId, item, (value) => {
          return value;
        });
      });
    }).then(() => {
      setTimeout(function () {
        lbRy();
      }.bind(), 60000);
    });
};

const equiHash = () => {
  return axios.get(url + 24)
    .then((response) => {
      let equiHashData = response.data.result.workers;
      equiHashData.forEach((item) => {
        let algoId = item[0];
        localforage.setItem(WORKER_NAMESPACE + 'Equihash-' + algoId, item, (value) => {
          return value;
        });
      });
    }).then(() => {
      setTimeout(function () {
        equiHash();
      }.bind(), 60000);
    });
};

const x11 = () => {
  return axios.get(url + 3)
    .then((response) => {
      let x11Data = response.data.result.workers;
      x11Data.forEach((item) => {
        let algoId = item[0];
        localforage.setItem(WORKER_NAMESPACE + 'X11-' + algoId, item, (value) => {
          return value;
        });
      });
    }).then(() => {
      setTimeout(function () {
        x11();
      }.bind(), 60000);
    });
};

export const fetchWorkers = () => {
  return neoScrypt().then(() => {
    return lyra2REv2().then(() => {
      return daggerHashimoto().then(() => {
        return decRed().then(() => {
          return cryptoNight().then(() => {
            return lbRy().then(() => {
              return equiHash().then(() => {
                return x11();
              });
            });
          });
        });
      });
    });
  });
};

export const getWorkers = () => {
  return localforage.startsWith(WORKER_NAMESPACE).then((response) => {
    return response;
  });
};

export const saveWorker = (worker) => {
  return localforage.setItem(
    WORKER_NAMESPACE + worker.id,
    worker
  ).then((value) => {
    return value;
  }).catch((error) => {
    console.log(error);
  });
};
