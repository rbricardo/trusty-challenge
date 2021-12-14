# Trusty Challenge

## Setup

### Table of Contents

- [About](#About)
- [Install](#Install)
- [Running the Project](#Running-the-Project)
- [Demo](#demo)
- [Aditional](#Aditional)
- [Important](#Important)

### About

_Trusty Challenge_ is a chat that we are using socket.io to simulate a conversation with a BOT.
<br>
<br>
Send a messages to Botty, then the app will show a typing message when Botty is typing and handle incoming Botty messages and display them

### Install

```shell
$ yarn install
```

## Running the Project

```shell
$ yarn start
```

Open your browser and type http://localhost:3000/
<br>
<br>

## Demo

<br>
<p align="center"><img src="https://raw.githubusercontent.com/rbricardo/trusty-challenge/main/public/chatbot.gif"></p>

<br>
<br>

## Aditional

- Added test for Messages useReducer
- Set Eslint / Prettier

<br>
<br>

## Important!

### As you know, we are using a bot to simulate a chat. Sometimes the bot server dies (you can check if it's alive here: https://botty.alexgurr.com). So if this happens, please, folow the steps below: **(make sure you are using node version 12)**

<br>

```
$ git clone git@github.com:alexgurr/botty.git
```

After clone this project, we need to run it localy

```
$ yarn install && yarn start
```

Botty will run on port 4001, so go to _src/config.js_ and replace:
<br>
<br>
`BOT_SERVER_ENDPOINT: 'https://botty.alexgurr.com'`
<br>
to

`BOT_SERVER_ENDPOINT: 'http://localhost:4001'`
