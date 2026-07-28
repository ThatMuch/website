import "@testing-library/jest-dom";

import { fireEvent, render, screen } from "@testing-library/react";

import type { BlocFaq } from "../types";
import FaqBlock from "./FaqBlock";
import React from "react";

const bloc: BlocFaq = {
  kicker: "Vos questions fréquentes",
  titre: "Ce qu'on nous demande avant de se lancer",
  questions: [
    { question: "Combien coûte une refonte ?", reponse: "<p>Cela dépend.</p>" },
    { question: "Combien de temps ?", reponse: "<p>Quelques semaines.</p>" },
  ],
};

describe("FaqBlock", () => {
  test("affiche le kicker, le titre et les questions", () => {
    render(<FaqBlock bloc={bloc} />);

    expect(screen.getByText(bloc.kicker!)).toBeInTheDocument();
    expect(screen.getByText(bloc.titre)).toBeInTheDocument();
    expect(screen.getByText("Combien coûte une refonte ?")).toBeInTheDocument();
    expect(screen.getByText("Combien de temps ?")).toBeInTheDocument();
  });

  test("déplie la première question par défaut, les autres restant repliées", () => {
    render(<FaqBlock bloc={bloc} />);

    expect(screen.getByText("Cela dépend.")).toBeInTheDocument();
    expect(screen.queryByText("Quelques semaines.")).not.toBeInTheDocument();

    const boutons = screen.getAllByRole("button");
    expect(boutons[0]).toHaveAttribute("aria-expanded", "true");
    expect(boutons[1]).toHaveAttribute("aria-expanded", "false");
  });

  test("n'ouvre qu'une question à la fois", () => {
    render(<FaqBlock bloc={bloc} />);

    fireEvent.click(screen.getByText("Combien de temps ?"));

    expect(screen.getByText("Quelques semaines.")).toBeInTheDocument();
    expect(screen.queryByText("Cela dépend.")).not.toBeInTheDocument();
  });

  test("referme la question déjà ouverte", () => {
    render(<FaqBlock bloc={bloc} />);

    fireEvent.click(screen.getByText("Combien coûte une refonte ?"));

    expect(screen.queryByText("Cela dépend.")).not.toBeInTheDocument();
  });

  test("assainit le HTML de la réponse", () => {
    const dangereux: BlocFaq = {
      ...bloc,
      questions: [
        {
          question: "Question piégée",
          reponse:
            '<div data-testid="reponse"><img src="x" onerror="alert(1)" /></div>',
        },
      ],
    };

    render(<FaqBlock bloc={dangereux} />);

    const img = screen.getByTestId("reponse").querySelector("img");
    expect(img).not.toHaveAttribute("onerror");
  });
});
