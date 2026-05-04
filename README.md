# Candoor Frontend

React app for the Candoor platform — a mentorship tool connecting advisees with advisors across different timezones.

## What I Fixed

Fixed a timezone display bug where meeting availability slots were showing in the wrong timezone depending on who was viewing them. When an advisor in Toronto proposed times, the advisee in a different timezone was seeing those times as-is instead of converted to their own timezone — and vice versa.

I updated the booking flow so each person always sees times in their own timezone, the one they set when they signed up. The confirmed meeting page now shows both timezones side by side so there's no guessing about when the call actually is.

## Stack

- React
- React Router
- Axios

## Getting Started

```bash
git clone https://github.com/ANDREWABU/CANDOOR-FRONT-END-.git
cd candoor-frontend
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
