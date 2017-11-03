Chatty App
=====================

Chatty is a front-end web application using ReactJS. It allows you to chat using a web socket server, and send giphs by typing: /giphy + [anything you want].

## Getting Started

```
1. Fork this repository, then clone your fork of this repository.
2. Install dependencies using the `npm install` command in the chatty-app, then again in the chatty_server sub-directory.
3. Compile the client side code using `npm start` from the chatty-app main-directory.
4. Start the web server using the `npm start` command from the chatty_server sub-directory. The app will be served at <http://localhost:3000/>.
5. Go to <http://localhost:3000/> in your browser.
```

### Chatty-App Dependencies

* react
* react-dom
* webpack
* webpack-dev-server
* babel-core
* babel-loader
* babel-preset-es2015
* babel-preset-react
* babel-preset-stage-0
* css-loader
* node-sass
* sass-loader
* sockjs-client
* style-loader

## Chatty_Server Dependencies

* express
* ws
* uuid
* node-fetch
* query-string
