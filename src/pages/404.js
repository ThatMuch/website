import "./404.scss"

import { Link } from "gatsby"
import React from "react"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import { LazyLoadImage } from "react-lazy-load-image-component"
import obiwan from "../images/Obiwan.webp"

// markup
const NotFoundPage = () => {
  return (
    <Layout>
      <Seo title="404: Not Found" />
		  <div className="NotFoundPage">

				  <div className="content">
<h1>404</h1>
        <h2>This is not the page you're looking for</h2>
        <p>
          La page que vous recherchez a disparu dans l'hyperespace. Mais ne vous
          inquiétez pas, nous pouvons vous aider à retrouver votre chemin.
        </p>
        <Link to="https://meetings-eu1.hubspot.com/mathilde-arconte" className="btn btn-primary">
          Prenez rendez-vous
        </Link>
				  </div>
				  <div className="image">
    <LazyLoadImage
          src={obiwan}
          alt="Obiwan Kenobi"
          className="obiwan-img"
          effect="blur"
        />

				  </div>

      </div>
    </Layout>
  )
}

export default NotFoundPage
