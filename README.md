## Description
A react & redux based crypto currency dashboard that displays list of coins and their chart based on theri price change.

## Setup
 - `yarn install`
To install dependencies

 - `yarn start`
Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

 - `yarn test`
To run tests (currently written end to end test case of my App component)

- `yarn build`
To build a production level build

## Directory Tree

- App (Starting Point)
   - Components
      - Dashboard (The main component displaying the interface)
      - NavBar (The component navigation links)
      - CryptoList (The component shows list of coins sorted on the basis of their rank)
      - ChartBoard (Plots a Bubble/Scatter Chart for coins base on their Market Capitalization vs Volume (24h) vs Absolute Price Change (%))
      - Loader (The component shows loader when API request is made and waiting for response)
      - Limiter (The component has a select box that limits number of coins shown on the page)

## How to use
 - App has 2 navihation links that shows maket overview and liquidity(chart board)
 - A select box that fetches number of coins selected everytime on onchange

## Assumptions
 - Latest browser version compatibilty.
 - Coins to be fetched for USD rates only.

## Technology choice
 - Built in react+redux as it is easier to manage data flow in multiple components with central store for states.
 - Used redux-thunk for API call management
 - Used SCSS for CSS which allowed to use common variables/mixins/placeholders and maintain css architecture.
 - Use BEM for styling.
 - Animations are added using pure CSS(no UI library used)
 - Added e2e Test cases for basic coin fetching and rendering scenarios.
 - App is mobile/desktop/tablet compatible

## HACKS
 - Since marketcoin API has cross origin restrictions, to use the API on local, used the *cors-anywhere* server that is a proxy that adds CORS headers to a request. A proxy acts as an intermediary between a client and server. In this case, the cors-anywhere proxy server operates in between the frontend web app making the request, and the server that responds with data. Similar to the Allow-control-allow-origin plugin, it adds the more open Access-Control-Allow-Origin: * header to the response.
 - Since price change (in %) has values greater than 100%, their radius is considered constant as 5units for the ease of the interaction ans studying the chart. On hover, the tooltip shows the value of z-axis(price change ) for each coin.

## Future improvements and features
 - Add lazy loading to the market overview page
 - localstorage for maintaining current state on page refresh
