## Credrail File Upload 

A centralised spot for uploading csv and xslx files and tracking them through your account.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Prerequisites

Ensure you have at least these versions of node and npm, or later

```
node v18.12.0 +
npm v9.6.5 +
```
keep track of your different node versions used across various projects by downloading _nvm_ from

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```
install a node version by writing the command 

```
nvm install 18.12.0
```
### Installing

A step by step guide on installation

clone the project directory into your local machine
```
git clone git@github.com:ipaullly/credrail_assessment.git <directory_name>
```

change directory

```
cd <directory_name>
```

install dependencies and generate lock file
```
npm install
```

run json-server on port 8000 that the frontend will access as the mock db.json backend
```
npx json-server --port 8000 db.json 
```

run the command to initialise the React app on your local machine
```
npm run start
```

## Deployment

[credrail-file-upload-netlify](https://credrail-file-upload.netlify.app)


## Built With

* ReactJS, TailwindCSS, Json-server, React-hook-form, framer-motion, papaparse and xlsx 

## Author

* **Paul Morogo** - *Initial work* - [Ipaullly](https://github.com/Ipaullly)
