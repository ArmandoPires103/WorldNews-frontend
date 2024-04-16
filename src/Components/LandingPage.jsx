import React from 'react';
import { Link } from 'react-router-dom';


const LandingPage = () => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@3.2.0/fonts/remixicon.css"
          rel="stylesheet"
        />
        <link rel="stylesheet" type="text/css" href="./src/index.css" />
        <title>TutorLink Website</title>
      </head>
      <body>
        <nav>
        </nav>
        <section className="section">
          <div className="section__container">
            <div className="content">
              <p className="subtitle"></p>
              <h1 className="title">
                <span>Welcome<br />To Global Echo</span>
              </h1>
              <p className="description">
              GlobeEcho delivers real-time updates on global events, providing users with concise and comprehensive coverage of world news. Stay informed with breaking headlines and insightful analysis, all in one convenient platform.
              </p>
              <div className="action__btns">
              <Link to="/map">
                <button className="hire__me">World Map</button>
              </Link>
              </div>
            </div>
            <div className="image">
              <img src="https://res.cloudinary.com/dhexjuuzd/image/upload/v1712883874/worldwide-global-map-outline-black-background_1017-46153_hnt7fl.avif" alt="profile" />
            </div>
          </div>
        </section>
        <div id="root"></div>
        <script type="module" src="/src/main.jsx"></script>
      </body>
    </html>
  );
};

export default LandingPage;
