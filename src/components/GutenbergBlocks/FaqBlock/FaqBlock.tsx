import "./style.scss";

import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";

import type { BlocFaq } from "../types";
import React from "react";
import { sanitizeHtml } from "../../../utils/sanitize";

type Props = {
  bloc: BlocFaq;
};

/**
 * Bloc « FAQ » — accordéon à ouverture unique, comme la FAQ de la page
 * d'accueil (voir components/FAQHome).
 *
 * Le design déplie la première question : on initialise donc l'index actif à
 * 0 plutôt qu'à null, contrairement à FAQHome qui démarre tout replié.
 */
export default function FaqBlock({ bloc }: Props) {
  const { kicker, titre, questions = [] } = bloc;

  const [activeIndex, setActiveIndex] = React.useState<number | null>(0);

  const toggleQuestion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="tm-faq">
      <div className="tm-faq__entete">
        {kicker && <p className="tm-faq__kicker">{kicker}</p>}

        <div className="divider tm-faq__divider" aria-hidden="true" />

        <h2 className="tm-faq__titre">{titre}</h2>
      </div>

      <ul className="tm-faq__liste">
        {questions.map((item, index) => {
          const ouverte = activeIndex === index;

          return (
            <li key={`${item.question}-${index}`} className="tm-faq__item">
              <h3 className="tm-faq__question">
                <button
                  type="button"
                  className="tm-faq__bouton"
                  onClick={() => toggleQuestion(index)}
                  aria-expanded={ouverte}
                  aria-controls={`faq-reponse-${index}`}
                >
                  <span>{item.question}</span>
                  {ouverte ? <FiMinusCircle /> : <FiPlusCircle />}
                </button>
              </h3>

              {ouverte && item.reponse && (
                <div
                  id={`faq-reponse-${index}`}
                  className="tm-faq__reponse"
                  dangerouslySetInnerHTML={{
                    __html: sanitizeHtml(item.reponse),
                  }}
                />
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
