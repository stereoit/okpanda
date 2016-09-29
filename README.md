Simple scheduler app
====================

About this app
--------------
 - [Repository](https://github.com/stereoit/okpanda)
 - [Live](https://okpanda.stereoit.com)

 Features
 --------

 - Dynamic URL routing (no page refresh) using React Router</li>
 - Utilizes Flux for asynchronous state management</li>
 - React powered with reusable components (Slot creator)</li>
 - Simple styling done with Sass and 7+1 pattern</li>
 - Backend written for fun in golang</li>
 - DB backend is Mongo</li>
 - Tools includes: ES6, Webpack, Sass, git, React</li>

Thoughts for improvement
------------------------

I've hacked this in about 16 hours of my free time to see if I am able to put together proof of concept for full stack application. In every part of it I do see space for improvements, namely:

 - Backend: middleware for JSON layer + utilities for responding in error, simplify and abstract the mongoDB operations</li>
 - Frontend: different state management using proper Flux/Redux/MobX technollogies.</li>
 - Design: Better to have it from the designer, but use Material Design Lite if not available. Refactor the date pickers.</li>

Time spent
----------

 - 1h - initial reading, modeling the domain</li>
 - 1h - project setup (rollup, package.json, structure, template)</li>
 - 4h - react components + application logic (stores, passing props, etc.)</li>
 - 2h - troubleshooting rollup ES6 imports + react router integration</li>
 - 4h - golang backend including middleware for handling dynamic urls on backend</li>
 - 1h - simple styling</li>
 - 1h - final debugging to application (momentjs datetime handling,refactoring)</li>
 - 2h - github page hosting + own hosting</li>

I think same application can now be boostrapped in about 6 hours.

Structure
---------

     ├── apiserver  (backend golang sources)
     ├── src (frontend sourcess)
     ├── stylesheets (Sass 7+1 pattern, only basic)
     └── Documentation (initial task + notes)


Building
--------

    $ cd app
    $ npm i
    $ env NODE_ENV=production npm run build:prod
    $ cd dist && ./apiserver.go --addr :8080
