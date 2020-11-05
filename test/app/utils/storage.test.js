import sinon from 'sinon';

import * as browserService from '../../../app/services/browserService';
import * as storage from '../../../app/utils/storage';
import * as store from '../../../app/store/configureStore';

const assert = require('assert');

const hashKey = '228ad7d4b3c353672f34cf5cb7cf9c6736efc9a1360c36516919b907fbcc830648e27bb1521819e54735628378afdfdb4e20e9096678afec90ec2799b2c0e4d2';
const localstate = 'U2FsdGVkX1+c9dq5YZzyrHsDLTn58/0wz3K4t8fKmYUVH31DpaPk2VjFcoRKUUMLaOL7ZKcAkuN0KWOP+b9OaESwZ779jZcEnsQNfnuErn12hPB0TknTxnl8y72HzsqltopWVsWOVfnk+uRf6xmUV50LC0G57Om9leyYqQob2qxjDtPdJ2oapAv7E473vSX9JaI+qDY3AvCqgVUJxBDjmzdAxy5iXFL9Mj3TaEj9mcsw3dB4meGjESvDfPsV/WxOP3Si0w9Z0NZsNkMaXw/cV3Ez05+oDikFzHWusdkhS1B0p4EdyNYleWr+bFOdrEz5ISBta4rn/8CWjQ3EY2EnBMbLEJPvsmaZ79YvQ6ffSILVaAw/VwAIRMFRg9BYPmyyvaN0XLXOjNn8RwEm5QKRrNpg6nu9OWKJotRpRZUyZKmOq1eBt366h6Fds5d0SqoC5Q8ZOD4DG/yiiBpLlXaeQmA2sC/a7lP736Uv7tgH79smic4QFdsJsfMzdWyMiDjV/Q+PLOP7QP2vc4+MA2WuUBhsKxLzzvnnN74iUlzrecb8EpBalocXpYXpKj5d35kjcxQtV2nk5ZMWXFllctOqoRGLrEoSRkeFxtaUp0AsvhNN3BZzOD8CgChG0XJXpszP5mko77PUsMyGEBVkaA4/EoPWRCqxKh2BOxbec4mkcZXzPvYFiFWY1r+QOVFpy6SZbhYAJwblKqn8xLKnLRsg23TCE8fDy0IdnQt9iK9/MDco3NLX8HjFAVTk7E2LxB2A7JbsiC2BzpfKoDd6LCYQ0cjdPdp4E79x9mL8p90/z6s71JzFQBLg1J4KLbIa2GNnlcESJNhhCDnAYxQ5mIx9DsPxy/uqF5RU66H5HoeNz+XF4f1/QLhca8oEzV08kLh+GxrgJNCy16pGYwJQTlX33MUqhyHC5qjQOBKSO6yWxJqJH46a6b/dHGOyhGXj9lVLY9R4elvlKOf2V8zIqltPrhCsr20DVrkLfMQFIK+3jXZO/ihY3hiyi+vwCCds1KYFaN3/RGgNwxBlFnR2sODLQHS7HAviYSsj2nXjRLI2R/UKiOb8XHmaM4mdg2EL11nYuNQJwJ2KqOlUfMH8tHdyscZipHntLKI4jcpoBJRoJ6ucbAA83T1Ek/dgrDsG5Bya5/VexshkE0Wb6ze43nihObKTN31uiAqxgXtt4NJ3PMiXWUFT71iVbOaUJVxrRkg2UMmQE0B59BZLUCsMadiGYjwH2hzqFZ8tzoRqEqbix2oSUPLJS64ArWr+zrl+JkiqYjNM3mOrslITTpjJo8k5TI8DN4GKgvDZCZ3amjI5spATHl0X5RNXjL9WE7Pbk9gBk1pLeUK6p75XxP6IEi1svz9c4OLL9OB0VqJyHSvQrEsd4blQNAeO037lT7mratB7jHmGQdyGQYXgAK5mghm7hGrKTU9bwRqsiJzIKkBYRuUHjrr6Pm3xZrJZBHipMkknT8JopboYpwlaJ6qhkFkpwcDgf8tj/qs23WZX3qArI1smLkkPC9ZItyZjs8sooukc1vRqeElSK4T8YGHCOSFwbYql/U/Y5HcoOgPtjUliYwdfvR1y0IitJmHRaZHbfwT1QMmzLmT4o56Yqhs1/l0/JlHZK2a8mWHBieAAbM/oDQrPDqPtDXfI6jr51pUi8Skdz2j5I9d6RBM1hv0an86llZ249QCR7DosaeAH2MzyyiRwgE42HkQOZCvY5wcqoQiEU3re9KiTNmg9TxCBM+PUxMPW1ugUi9w8M0pgHgfFLR3pduPsV8evEkyHBC0Xu7t3oa4eHoeBNMwfqyCmdlxC/zvevIYNl2Is9Eyww+h8ipSYctduyBV8lTFtDua5Xa5CJw1x97p1be9IUktgVZ9J3T8X9kKouwO7JChTxWXALzVQkq7R3zZyT4M7EB4SyGVHR7a6K0qOBwREB3+w4zYsKW+4Sk4bubl4K5t2bJkq7xGsQNXJ70d099a/qIvXm6WSnFz5aKCAcRbI2JTNUkjDHym0/5OwJpEihBDBfrF4lHY8+AEiRaS1m/lz4m6G7dPoVlRE8aSTC06erMtdbJ7uk04Rn6rIB8kCZ635eihWsWWdA/PWmYJcIp3vKAS3y/yRPqz8vT6qbmAdAE+FKnkZ/rYB3+RXrVotQ/4jEZgQDxCw6Ed6kJABTh8XHZYzDC8MnJrkiCUrNJ3hkRjYReBOUlLXfglzKb0l+q0/r6xNjIaSUJFNOmoq7HyrWdb1ZrSTC9Qus9ZKiaUjTEsjK6abf6IhhG131Mof6j0q2R1rB9PvbYV78lI0EzhRYQoltHcE96zgibtJgtclRf+s9gtsCnwkZhv7zt0T99C1v9EfNMljlHG99dbnHGoVsZIIv0JfNWnkIFSo7cQslNHMUeW9Nn0NScU2UKMQkNtej0v5jGfzIjhZu+F9EEQEv3LVufoyBbWlvU490KBKsGBk7vEyj2xWGuunjpCut14PSHy+Ec30Et5jZieJAmOrxUgQwFpNU52esklUwE2YHB4h+7NCcYzU56GhK++Qx7qNdQcbWQ2lK5yrq8UWRgJWnNtUAywuV+zPTXmIf/MJtGUZTXqRHYFfKzrysg1SsjayeU+RCIeV+dd8TNtg+9olfUnK+v8+Y3sRYIPyWUheJkflF4mVRvoH0UWv1Ce8vgfGtvelWiNaQX1L6vyF32G/h/taSWQ/XfusKCiewtU2C44jM+O4lkAJiH1VnrUYtKHU2Nh2NDRMF2Z/GyZQO2AeU6yvuRPFDV49xIozQO/5jYxbS5Bek8eJzBl/ZqbFRt8lFEPk2daTDO6U3iQJHEVjobl7Doq855bpiJrF33qgpvgvlZe8VgfeWFKoEYQryGZ1D/bJqjhoGYnHgcy2YJJbRwzrWlgDWKD6i9G41lWL2Tb8nbsgTq0EH3xkpMAZiYGEOGrPmT00MyNhEYUZvEyhZ+vGZclDBzEkp53exn75r7jsIiXD1t/zFyp14OihhhhLE555bl4fPJ+l9HTH3cyhILVb7UEIUd19B3rSuLul/T7+RiZJcUk37SWLylcVIRUk44EjLlTp0ySfXsJCAzhNdMPP1kzQ140zoYn2wlPWE1TPpy5vxyJI+KDjuNt39VDK2mFcqea1lx5H+03pbQ6P5RoyP8GhZTwKjloj1QtmKggbIcTuBJcTtmYxkU631H5UZo2DfaqPjbtndts6yR4oFJuLP4PYbyoOGZYl6J/shk77Rsjg3zAzXrm4HbdchS4jSDBvLMdBkG/9fAibza5GHp3kAlbv/SSo8A9IOyz2qXh2HMR1LXjHh/jlCHZEjQiuazuy5BGfieNjEgShqyN9yY9zFyaYyvXyCcWvGE/YrRxWx4a6oh984hvt+1Pvh+QOgqkofeXWikGMotWD2CuZPD8tqQvisdNBDTKllYRmKGndunrRKDR82rVqtkbjt6wRJ3T9G5lnOS/aSzyxRCkMtoT1YIN50iVzPnwMN2cwH5KHM7fFOnuANkugBezEKi/LRHGAx3OPEIkAhtLRHcPfChj6/Y2Y0O7s4ElvaX+gadWUopsH8uauEHLiGKnta0x+KTKYYvnxLcw9Gr4vui6JHdyigktwfKVH107hjOo7ta67ZAqewaUpuIKoweyM+gSmdus7xDdpts9JKRBnoPrSlmQwoi98nvdeK5RFigt1LCjgSjDoFqcrNV9SgaZWY2h5JL9wQH6vJx5P6tK3xbeeUHSsW1M/a8frnmRte3d1RHqJYaF3OY/Ypv2GcN6dT4ekQl7s0kEb84x7vXew4Ljhs0WT7t2YN0Sahur7V5XhsYmfXg/bJJD3AEKbqLLdDQghdTIpfiD1y3yc/N4gQNcW4c+zktHVJpu9n49/9XzWx6uvMZ5R/2ja/W+uRyLsLZ2DVIbSJdeY4FPPHEIBeT2q4IAJ0qN60mV3eqJ7PLl8XWhJArMgAVsy9lxfs4xM9VbHF/IkCB+rP+BAEm/3nQK0FszMN1i/SlepXS/YHsGGRw2jB+AQWhWZbIxCBKi0Wwp9GcY1rvR3UUHK+OqHP9Cm4Atgbh77rP4f7IqaEH4gePGNQtuiT2z4N6G79lGdf/Yq/ILAvqWi1xHDjISOSmxgsHwI4NsuNDJouoVnfVOSScJ7LvlTJ7zTjdjnW4fE23I6mGEeFlYMQDOmXrHd9CUq5gYU/CQaLSkHWpBi7QDYEwJLINfqinvjYZ0+jjQpQQC/gsSGelpqdV8MyP79MBkFkHi+cM6w2UQwr+9pkLE23pMGjuqO8mp99hlkJJ8dwj3Ts1j8quzIOR87wWmZEI49jf+pm3zQzIMJxCZrne8sMRvyHZ2faOAd+a0GrcPycTj3l58QD0Sy1CT3MnT9cXMbGG6iSnnVO8vCelsT87fxvUZWUUAWOq09Gyvw/+/iX5NO2+dHLmz8pbpt9cEn6RMeXzSE9Dg76xQF5yezkFHNpK6UD8X8Jh46QRpA+7qXp8NEbZjt7kRlweUs4yjt3SOelNwujMvoGRd0Rqm1X5TKyNMWzDJPG2A5iXpOXkpwWwhbjpnhL77R5hlOtCfH1AJAR6kCAqfEq9Hi6NmULePvLSr1/ExKVZ2lSBUBT974K/3IdqOVwe+ztBsagUs77SYgrIL7x7BQ/T4ZL4vXYrqC2StQm5Bx/hPBcYp8CqrRkXnP83KnaN8TG+owbd2vr7qWNB3IvoEZt6zJ8ixLLYUkQLJljlQt9vXJ8nbRsHHrKOrmFuac7Gk8/tGQKcP3ClYZIDxP4TViwZ0QhgVfRVm91i3xjvH9Bz+SlF8uoCwpf9ccVG0Tq8wwGYfdSAsXr5Or2gfFtvMNe2WYF7lZpLf8SmzXB5HOY5502IAafnzbvrWvLjsBQyqxZO4UKAb1y8WBuurv9x28MeY1+BtE+gZMYC1sTwtNnBFfgzFxXx5W+FxHIBbQWYqPck6hlpbFoo1M5YE12/akYTJEyJNIM5IXZ3h14IXvkTkMs0Kw6gutLvOQ2Fv3XT94FJwMatYYOw3u6Rl10b3l08jpczzATlQhiDQshGqhkDmfOO1GbV6MXLrj7cHKADbYlaRBBsipiT1bibY+jg1TOEhDwUvO99LQpNTtAn1fTianriLspu97JcbJFCjTEVYTrMzfyCq5L5xtgyiZIqeeiUzMK2noi8f4voz/e5dge+8PrqSMI+vcVgbR+UV2VYtnPA7WdrFuBNVSjGHGr4zqz7N8AA3HjMLSN8uxL+GIyDiwL9Me3eUCxucGLizU1LiP5ShoUZuY2r0v21GUXg7wtVO4rj78S836Sd9tp0sCXZgOvz4HjRK6BT2UsFlsTM8JAzJGh6kUiy7Va2gA3z4TgaAl/i9p8twXIMQnrc6hOpH8p/kNHPb14XFJ/Hpz/dXAA0icyOIM5dwaB6wBb5P7a0ZGbbQpqEGKjXOK3jomS5BtS+uIfBhRqev/8MRxYBJN26bYztA0aOMVqwdV/zSCHsXoda8BDpgEdnmGXZH4rODBYi+lIVpMhUdtAkTJmJ3tAg8RN4mKuy/ZbOwqyYYkw0UzT9D6ZQmm6f+Nx8IRAMwRiXZx76EM9Wz59d6DuQZLj0yCoINYI24yYLnPNdGlyNnnYT4x0HLGKRZyu6dnwR9wnGtLNihlwzbX3t5UCgkPKvfXoXKew4zfhV0TmWXO1icu3jXbuan2hfzNp4EsxsXBW3rdt9BuDt6NUlCBdbbEwpdkvLWcGscIKPvnN82L2Qk49YHYDhZPzSrYUZP85bmT9pv0aVgeKc8vzeh4qxRiitHYcDJuDDwuBl+zZ60OjYbx5O3m82AftEBkjy/nBbmURqoJkgBlgz/uI3qhUSc/aFP7lQQOYh8/Zu6GGar5Z6U4vtd3KgIgCIH19bCFT3R4OJicNT5GCCJcsd2p+mXjeafj6O5W6SJDOimf57D4sdNycK6u/IHljKV5zhcqqiouIGytb8tomkOkR5qJbFp142Ih8p4TH3Ih+9wbUailjdtOG7eIxJJosHOjnAB+cdB98aTy4FNvno44hRFZQMVkAz+iqHvgG0irmb3cqCQqMXOjKm3OG4vsC88D26adFKUaajPnxpflmeD+HwnZPFXVkINT+9nTxFtqQ5AJZnjk85sqNldoQM81O3XJLB7KUQgXgqNEyalxZOhLt/f/MLLQvJ42RiugG4SjpcaEQB+d0XD81ugprJvQeRTo24tqD/Sb8V9dCA7su3Yk8j2Kph58i/e+iPt6UWkJp37zATPsWCKZD21IVfcyaqYbXTM0v7+Nuw3N9mqnQErP0W6yHajOQ6coe557gI2rhHKTyGoTZGoRVnJawHDTy2ZPjpqXLDELLl5TFznVHgtSLBPJ6QNEueqhrEP4uiGYDJsjOUxqhVEaj3s2dT08+Tzjcggmo6GB0tEGy2Vu/fXzfvSTtD+JIad9i+vVI4aymkG3EEfpNWA0NIKssMsVIdXriU/Bq7bDAR6f63xIgtV6TusX4h3wI19B7vMEbwjiTTEWWdfi97GrCH7YdVkBz0o9lrldQwidSXFG+f6NKhAnPN7AAnoHLFfGtigUh6Eynfhsk+ZUt5ZWYdLr53esGrLMy/1hzg46YVwTWmArOZFu0KlSxTejr5xYpeNFzgZ+TrONBiYUCt+ZZZf0thGDjGh3Xu8xmTxDIj6pCqhUv3mWDeouHA1EzmFMJldzJVpayMqxi+C1K4XxE1cPQnHN/xtDobAt+6gKDUd7voEnCwZudgQ0rGWKdQ/rwd9J5Vjy4h3Ej4cAu4FpU2CEeSQ7G+u+VqiilEMe+kcXAsWzZR6JlcW86Lqwz1fLsS/h5UMZ1qNG7FlPiDiNs5mBVvTExyySDJko6yt68omYxaD1KKAwVhw0FAwIdNHS5/HNHT9LAwwAFg2JPdCfQfz1ynQw3diKNpH3sJpdyRmhjrwkaUlrinkwyWQOFKD+W0VKV66m5F3tTbC74oHTD7p7ngIP6fi6PpSmRXg6jPit7E0Zr+c/d4IOB0XsAgfw9umqs8DJCFvxqJAmnxHICX5xM6PbeulKXYsBgDfDzGi2qciiN5w1C52JFdLmr1C8GSCKy+07Yq+iw5b+IZ+MZ2sNd1H653jafvAYc2YOKD/hsJzZuAChLyjysPVNQlczla6X0wS51l05sdq8Auz2Yt7AiFQqlPmmm5QJkIJn65irliMHY4RGlE9aT36BgU7o5fmzXSMLkyr224AIX8eRI2GE3BX6gigogVkv0RHnOH1+KDxrhzgZeOqv8riEK7epNNgAbprSdxwIiBa24eu4iumSK9cXMQg2nf+HsjjGWivzzMPUlDY9G5pYSSqmHHq9F9eQnGo7jJsZKG52mCa4enpjbLkPLGaEoXFf5f7mSoE4QpfY4lWno9ZFHc1j++A4iiAPhCbUzlto5D7QxhAIm2kGiRp+RQWAjMjI8v2ICrfUVgo+nH71WAHAFYOL1aDmg8u4W93mOoAcb2mVUv+x4WzcSoKR8/vOB5TrZUjZ1x8C8FxvTyjTVu9hLuYanW3MbeoRO++k1UZOKmmP32DMiMkMLd1vt7QkJzoj/7mP6EPnG9ZOPAgAf4diJcQj6Z6fpoVMX3v43uKxwxo2Nw2kHUSwKMUzp3BLuTZC/X82LdBd+IIL+KzeL4It3fYZ2367u+dAvzwTRlbYBFNSD1qu9ipJnEMbqvkw69tu57MPQsXUuk92/IdeYmfSZeXRGRmfOv7NeT2pdAlGOd7Rk8biROP4ugkGf1Wee10ukhXgHYeqPIZJXe4RGXpT3RRRsOZ/KESXLQglAPx/R0LAQQy0OPLxLAXTOlFiz7jhTajR1r5wsQLWKnLCNS5XEeCRVOfcNvj23w50w3Bu1o6TDfxia+wQY/yb4XNt+9uAebOWKuocUKNoxAyKkzLAIn3UVW5W/LgaZH5LT6cBk82yFTNsLF10w7TfhBwGOlVLXatIcYtfdj0yZOz/fl605qAuUBsgozLV6HAYjzhC5UV54hbRz7aelQKAVKfAlQon8KGAQ3kWRqD0YzfmSmdgmmYIHXgi/ZokvJ2vxalPNDNyvD06EB1QDkbIHAKoz5/uiZSuF2aaNGGbXIVL44GuDGXyrvcTt6oVKmPop+G/THwPVVyUmh5ZX6LO+nfegaFvbYsFr7E9gAxWZFZwGXan7G36VG8PwGX1x2DhQNILAsxrjtpxBHHJJRPJiqwGyjkQjHyCERfM98K5aPi+ZRsJgVU4dhsndN41og/BhpKmOF1foefhzeu/2wgTCfh5ZE2vVCys9l7uEvUl/daGpPDkQE2bW+aIhu7QaU5xN4EDfX2FOiI9RpuYJrKfjPeuM13jj1jUU6lJnYS1ZLBYMyO2cwJKKg85N7kgktpy6fPuMHlFRIXqXnDhNuK8FTjhSZ3KDgddTTjxwwMdBQ0CiTGI9napnM5wiUZXd80cChFfkZOBrYW5Wb2d6nnvA55gHVJJ8hvttAKuIPtszAPI8IYOYbyncN0tDFyJfKQ/I+QeJnOLOxD4/iAwhfunhGysnzPU2O7nNrcuECCZxmEHD+4ulf9lVTZiA+G5augviQ7TPkoInpGvYDzYb0hJlXoLtymp0NP89cnW+bVch2MqaWK96lnSzzwr1ob4hJCwLbxP9k2tmLVHEhqygzkLRVqKORIxb8BKBcQkxymGjNe0wVWKgAD2qei6aQIpn7v+Nq92BRZ3KD4Dni8fx1qSUUntG6S1onTncTcKgMKqDlW+qfHn4cfEzAuU/HUhLCBim6a+y6YFXasY+4LC5YkyfMoEeAP1uehKf8z/C/3XY9jsU0xokqvIeKSikY2n4ZMIQ9xsoZXiUEi0HaA4ZUKmuyyJ3H1QSuijMVHDGT5c6sX5o9+y6D3w9DtGZdGi5XMwFbWlzQaBHXdBdsIgeQznFYV+IQRR+iPh6FFES83ZWIYEmJ5xiIQ=';

const encryptState = { state: localstate };
const decryptState = {
  appState: {
    pageStatus: 'home',
    token:
      '228ad7d4b3c353672f34cf5cb7cf9c6736efc9a1360c36516919b907fbcc830648e27bb1521819e54735628378afdfdb4e20e9096678afec90ec2799b2c0e4d2',
    isTermsAgree: true,
    isUpdatedTouVersion: false,
    timeout: 300000,
    sendTokenSavedState: {},
    isNetworkConnected: true,
    statusCode: 200,
    isLoading: false,
    marketData: {
      aion: {
        marketData: {
          currentPrice: '0.12',
          marketCap: '29,374,762.25',
          priceChangePercentage24h: '4.37',
          totalVolume: '1,294,876.83',
          circulatingSupply: '244,625,431.00',
        },
      },
    },
  },
  animationReducer: {
    showSettings: false,
    showWalletDropdown: false,
    showWalletSettings: false,
    showTokenMarketData: false,
  },
  accounts: {
    accounts: [],
  },
  wallets: {
    wallets: [
      {
        privateKey:
          '0xa107072d19a2ba50ce93440fe50fd6c6516b79cfde553dd82fbc7028be8a13d24554380980c146c0c31bb8fcbb0b7686cb3f204e77b5c56dc087199e9cdba46e',
        address: '0xa064923fd1314301653d72f72b8bc850d8a0ca3923d9b6ca96d30396976d66d4',
        alias: 'Wallet 1',
      },
      {
        privateKey:
          '2b466aa53f7478272336bdee445991cb3ed5ab6ae4fc28432e32d8eadbd72d2b69ce1ce7adcdd8b015c6d2ef90819331782c68ffeb7118738a2ff4f4d5c75fdc',
        address: '0xa0e29a8871d969fba7a96bd5aea6df1e25385d80a722a4e766ae070c2344c7d1',
        publicKey: '69ce1ce7adcdd8b015c6d2ef90819331782c68ffeb7118738a2ff4f4d5c75fdc',
        alias: 'Wallet 1',
        imported: true,
      },
      {
        privateKey:
          '336c5c68d75010d738f620fb21a04cc56234d76a7b5d9ca3088708f1c45b3161a75d1c6e59833fad80ba02cc8010c4a99787a0859941613a7ccadf9c51c15c3a',
        address: '0xa0130e8bef33916c224f8b45b32bff5ffc5ccff1b875cf7606fdcb620aa9e0f0',
        publicKey: 'a75d1c6e59833fad80ba02cc8010c4a99787a0859941613a7ccadf9c51c15c3a',
        alias: 'Wallet 2',
        imported: true,
      },
    ],
    currentWallet: {
      privateKey:
        '0xa107072d19a2ba50ce93440fe50fd6c6516b79cfde553dd82fbc7028be8a13d24554380980c146c0c31bb8fcbb0b7686cb3f204e77b5c56dc087199e9cdba46e',
      address: '0xa064923fd1314301653d72f72b8bc850d8a0ca3923d9b6ca96d30396976d66d4',
      alias: 'Wallet 1',
    },
    hasWallet: true,
    walletBalanceArr: [
      {
        wallet: {
          privateKey:
            '0xa107072d19a2ba50ce93440fe50fd6c6516b79cfde553dd82fbc7028be8a13d24554380980c146c0c31bb8fcbb0b7686cb3f204e77b5c56dc087199e9cdba46e',
          address: '0xa064923fd1314301653d72f72b8bc850d8a0ca3923d9b6ca96d30396976d66d4',
          alias: 'Wallet 1',
        },
        selectedToken: {
          id: 'aion',
          name: 'Aion',
          symbol: 'AION',
          decimals: 18,
          address: 'none',
          balance: {
            amount: 40.836222176,
            usd: 4.9003466611199995,
          },
        },
        aionToken: {
          id: 'aion',
          name: 'Aion',
          symbol: 'AION',
          decimals: 18,
          address: 'none',
          balance: {
            amount: 40.836222176,
            usd: 4.9003466611199995,
          },
        },
      },
      {
        wallet: {
          privateKey:
            '2b466aa53f7478272336bdee445991cb3ed5ab6ae4fc28432e32d8eadbd72d2b69ce1ce7adcdd8b015c6d2ef90819331782c68ffeb7118738a2ff4f4d5c75fdc',
          address: '0xa0e29a8871d969fba7a96bd5aea6df1e25385d80a722a4e766ae070c2344c7d1',
          publicKey: '69ce1ce7adcdd8b015c6d2ef90819331782c68ffeb7118738a2ff4f4d5c75fdc',
          alias: 'Wallet 1',
          imported: true,
        },
        selectedToken: {
          id: 'aion',
          name: 'Aion',
          symbol: 'AION',
          decimals: 18,
          address: 'none',
          balance: {
            amount: 10.5112755,
            usd: 1.26135306,
          },
        },
        aionToken: {
          id: 'aion',
          name: 'Aion',
          symbol: 'AION',
          decimals: 18,
          address: 'none',
          balance: {
            amount: 10.5112755,
            usd: 1.26135306,
          },
        },
      },
      {
        wallet: {
          privateKey:
            '336c5c68d75010d738f620fb21a04cc56234d76a7b5d9ca3088708f1c45b3161a75d1c6e59833fad80ba02cc8010c4a99787a0859941613a7ccadf9c51c15c3a',
          address: '0xa0130e8bef33916c224f8b45b32bff5ffc5ccff1b875cf7606fdcb620aa9e0f0',
          publicKey: 'a75d1c6e59833fad80ba02cc8010c4a99787a0859941613a7ccadf9c51c15c3a',
          alias: 'Wallet 2',
          imported: true,
        },
        selectedToken: {
          id: 'aion',
          name: 'Aion',
          symbol: 'AION',
          decimals: 18,
          address: 'none',
          balance: {
            amount: 1.0111437600358024,
            usd: 0.12133725120429628,
          },
        },
        aionToken: {
          id: 'aion',
          name: 'Aion',
          symbol: 'AION',
          decimals: 18,
          address: 'none',
          balance: {
            amount: 1.0111437600358024,
            usd: 0.12133725120429628,
          },
        },
      },
    ],
    currentWalletBalance: {
      wallet: {
        privateKey:
          '0xa107072d19a2ba50ce93440fe50fd6c6516b79cfde553dd82fbc7028be8a13d24554380980c146c0c31bb8fcbb0b7686cb3f204e77b5c56dc087199e9cdba46e',
        address: '0xa064923fd1314301653d72f72b8bc850d8a0ca3923d9b6ca96d30396976d66d4',
        alias: 'Wallet 1',
      },
      selectedToken: {
        id: 'aion',
        name: 'Aion',
        symbol: 'AION',
        decimals: 18,
        address: 'none',
        balance: {
          amount: 40.836222176,
          usd: 4.9003466611199995,
        },
      },
    },
  },
  networks: {
    networks: [
      {
        text: 'Mainnet',
        value: 'mainnet',
        networkURL:
          'https://mainnet-node.theoan.com/rpc',
        networkPort: '',
        networkFullUrl:
          'https://mainnet-node.theoan.com/rpc',
        transactionUrl: 'https://mainnet.theoan.com/#/transaction/',
      },
      {
        text: 'Mastery',
        value: 'mastery',
        networkURL:
          'https://amity-node.theoan.com/rpc',
        networkPort: '',
        networkFullUrl:
          'https://amity-node.theoan.com/rpc',
        transactionUrl: 'https://amity.theoan.com/#/transaction/',
      },
      {
        text: 'Localhost',
        value: 'localhost',
        networkURL: 'http://127.0.0.1',
        networkPort: '8545',
        networkFullUrl: 'http://127.0.0.1:8545',
      },
      {
        text: 'Custom',
        value: 'custom',
        networkURL: 'http://localhost',
        networkPort: '8545',
        networkFullUrl: 'http://localhost:8545',
      },
    ],
    currentNetwork: {
      text: 'Mastery',
      value: 'mastery',
      networkURL:
        'https://amity-node.theoan.com/rpc',
      networkPort: '',
      networkFullUrl:
        'https://amity-node.theoan.com/rpc',
      transactionUrl: 'https://amity.theoan.com/#/transaction/',
    },
    showNetworkList: false,
  },
  transactions: {
    pendingTrxns: [],
  },
  vaults: {
    toastOptions: null,
  },
  toast: {
    toastOptions: null,
  },
  tokens: {
    tokenList: {
      '0xa0130e8bef33916c224f8b45b32bff5ffc5ccff1b875cf7606fdcb620aa9e0f0': {
        mainnet: [],
        mastery: [
          {
            id: 'aion',
            name: 'Aion',
            symbol: 'AION',
            decimals: 18,
            address: 'none',
            balance: {
              amount: 1.0111437600358024,
              usd: 0.12133725120429628,
            },
          },
        ],
        localhost: [],
        custom: [],
      },
      '0xa0e29a8871d969fba7a96bd5aea6df1e25385d80a722a4e766ae070c2344c7d1': {
        mainnet: [],
        mastery: [
          {
            id: 'aion',
            name: 'Aion',
            symbol: 'AION',
            decimals: 18,
            address: 'none',
            balance: {
              amount: 10.5112755,
              usd: 1.26135306,
            },
          },
        ],
        localhost: [],
        custom: [],
      },
      '0xa064923fd1314301653d72f72b8bc850d8a0ca3923d9b6ca96d30396976d66d4': {
        mainnet: [],
        mastery: [
          {
            id: 'aion',
            name: 'Aion',
            symbol: 'AION',
            decimals: 18,
            address: 'none',
            balance: {
              amount: 40.836222176,
              usd: 4.9003466611199995,
            },
          },
        ],
        localhost: [],
        custom: [],
      },
    },
    suggestAddToken: false,
    selectedToken: {
      id: 'aion',
      name: 'Aion',
      symbol: 'AION',
      decimals: 18,
      address: 'none',
      balance: {
        amount: 40.836222176,
        usd: 4.9003466611199995,
      },
    },
  },
  message: {},
  security: {
    privacyModeEnabled: false,
    whiteListedDApp: [],
  },
};

describe('#getHashKeyFromProcess()', () => {
  it('get hash key from background JS', async () => {
    const stub = sinon.stub(browserService, 'sendMessage').returns({});
    await storage.getHashKeyFromProcess();
    stub.restore();
  });
});

describe('#setHashKey()', () => {
  it('set hash Key', () => {
    storage.setHashKey(hashKey);
  });
});

describe('#decryptState()', () => {
  it('decrypt the value of given state', async () => {
    const stub = sinon.stub(browserService, 'sendMessage');
    stub.withArgs({ result: 'getKey' }).returns({ type: 'getKey', data: hashKey });
    const output = await storage.decryptState(localstate);
    assert.equal(
      JSON.stringify(output),
      JSON.stringify(decryptState),
      'Expected state should be same with actual',
    );
    stub.restore();
  });
});

// skiping for temp
describe('#getStore()', () => {
  it('get the store', async () => {
    const stub = sinon.stub(browserService, 'getLocalStorage');
    stub.withArgs('state').returns(encryptState);
    const stubMessage = sinon.stub(browserService, 'sendMessage');
    stubMessage.withArgs({ result: 'getKey' }).returns({ type: 'getKey', data: hashKey });
    const stubStore = sinon.stub(store, 'getStore');
    const output = await storage.getStore();
    assert.equal(
      JSON.stringify(output.getState()),
      JSON.stringify(decryptState),
      'Expected state should be same with actual',
    );
    stub.restore();
    stubMessage.restore();
    stubStore.restore();
  });
});

describe('#getStoreBackgroundJS()', () => {
  it('get the store for background JS', async () => {
    const stub = sinon.stub(browserService, 'getLocalStorage');
    const stubMessage = sinon.stub(browserService, 'sendMessage');
    stub.withArgs('state').returns(encryptState);
    const stubStore = sinon.stub(store, 'getStore');
    const output = await storage.getStoreBackgroundJS();
    assert.equal(
      JSON.stringify(output.getState()),
      JSON.stringify(decryptState),
      'Expected state should be same with actual',
    );
    stub.restore();
    stubMessage.restore();
    stubStore.restore();
  });
});
