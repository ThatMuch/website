import "./ExpertisesSection.scss";

import React from "react";

type Props = {
  section: {
    title: string;
    subtitle: string;
    service: {
      titre: string;
      desc: string;
      image: {
        node: {
          mediaItemUrl: string;
          altText: string;
        };
      };
      link?: {
        target?: string;
        title?: string;
        url?: string;
      };
      products: {
        titre: string;
        desc: string;
        image: {
          node: {
            mediaItemUrl: string;
            altText: string;
          };
        };
      }[];
    }[];
  };
};

export default function ExpertisesSection({ section }: Props) {
  console.log(section);
  return (
    <div className="ExpertisesSection">
      <h2 className="h3">{section.subtitle}</h2>
      <div className="divider mb-4"></div>
      <h3 className="h2">{section.title}</h3>
      {section?.service?.map((service, index) => (
        <div className="Expertise" key={index}>
          <div className="Expertise__desc" key={index}>
            <div>
              <h4>{service.titre}</h4>
              <div
                className="ExpertisesSection__desc"
                dangerouslySetInnerHTML={{ __html: service.desc }}
              />
              {service.link && (
                <a
                  href={service.link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary ExpertisesSection__desc__btn"
                >
                  {service.link.title}
                </a>
              )}
            </div>

            <img
              src={service.image.node.mediaItemUrl}
              alt={service.image.node.altText}
              className="Expertise__desc__img"
            />
          </div>
          <div className="ExpertisesSection__services">
            {service?.products?.map((product, index) => (
              <div className="ExpertisesSection__services__product" key={index}>
                {/* <img
                  src={product.image.node.mediaItemUrl}
                  alt={product.image.node.altText}
                /> */}
                <div className="ExpertisesSection__services__product__desc">
                  <h5>{product.titre}</h5>
                  <div
                    className="ExpertisesSection__services__product__desc__desc"
                    dangerouslySetInnerHTML={{ __html: product.desc }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
