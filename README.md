# Aiwa
DApp Wallet for AION by BlockX Labs

# Website
https://getaiwa.com/

# Chrome Extension
https://chrome.google.com/webstore/detail/aiwa/objigohafkcoodmofgmifblmfidicehc

# Building DApps with Aiwa
Use code example in https://getaiwa.com/sample-dapp/ or './sample-dapp' folder.

# Aiwa Test Tokens
Get AION test tokens : https://faucets.blockxlabs.com/aion for Mastery and AVM Testnet.


# Development

## Required
* NPM 6.x
* NodeJS v11.x
* Chrome

## Steps
```
npm install
npm run dev
```

Go to chrome

- open `chrome://extensions`
- Right corner enable `Developer mode`
- Click `Load Unpacked`
- Open `aiwa/dev/chrome` folder

If you see blank white page after waiting, in Chrome go to 'https://localhost:3000/', Click Advanced and Proceed with Unsafe. Then go to chrome://extension -> Aiwa -> Click Reload icon.

### Firefox (is Experimental)
`npm run dev-firefox`

Go to firefox

- open `about:debugging`
- Click `Load Temporary Add-on...`
- open any file from built `aiwa/dev/firefox` directory

### Build using docker

From the application home run:

To create the image:

`docker build -t aiwa-img:latest -f ./resources/docker/Dockerfile  .`

Chrome build:

`docker run  --privileged --rm -v $PWD:/app -w /app  aiwa-img:latest  /bin/sh -c "yarn  && yarn build"`

Firefox build:

`docker run  --privileged --rm -v $PWD:/app -w /app  aiwa-img:latest  /bin/sh -c "yarn  && yarn build-firefox"`


# More
We are working towards creating Contribution Guidelines.
Aiwa is licensed as [AGPL][agpl] software.
AGPL is a free / open source software license.

This doesn't mean the software is [gratis][gratis]!

Buying a license is mandatory as soon as you develop commercial activities
distributing the Aiwa software inside your product or deploying it on a network
without disclosing the source code of your own applications under the AGPL license.

These activities include but not limited to:
- offering paid services to customers as an ASP
- as part of application or product as described in [LICENSE.md][agpl] for any blockchain
  as part of codebase with a closed source product.
- shipping Aiwa with a closed source product

Contact sales for more info: Aiwa@blockxlabs.com

[gratis]: https://en.wikipedia.org/wiki/Gratis_versus_libre
[agpl]: LICENSE.md
