# ebt-36860
### How well do you cover France with your eurobilltracker collection

This allows [eurobilltracker](https://fr.eurobilltracker.com/?referer=31378) users to see where they obtained euro bank notes in France, how many administrative division did they visit within the 95 districts (or départements) and 36860 municipalities (or communes). They can also use the site to plan their trip in France and see how much they still need to travel to complete the whole french territory.

![detail of the map with some visited municipalities in colour](https://github.com/aloxe/ebt-36860/blob/.jpg?raw=true)

## Documentation

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Eurobilltracker data is retrieved using the [eurobilltracker API](https://api.eurobilltracker.com/index.html)

French divisions of 'communes', 'départements', 'régions' is provided by the [API découpage administratif](https://guides.etalab.gouv.fr/apis-geo/2-api-decoupage-administratif.html) from the etalab gouvernemental agency, gathering several public databases.

Some locations referenced in Eurobilltracker do not match with a municipality (airports, resorts, hamlets, former municipality names…). municipality matching is done with a list of known locations, maintained by the users.

## How to play

The first and most important step is to [register on Eurobilltracker](https://fr.eurobilltracker.com/signup/?referer=31378), travel to France and track every bank notes you collected on the way. You don't have to keep the money, you just need to reccord the serial number as well as the printer code as [explained on Eurobilltracker](https://fr.eurobilltracker.com/new/?command=514;tab=0;referer=31378).
