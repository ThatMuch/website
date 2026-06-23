import React from "react";
import { render, screen } from "@testing-library/react";
import Features from "./Features";

describe("Features Component", () => {
  const mockFeatures = {
    title: "Test Title",
    subtitle: "Test Subtitle",
    features: [
      {
        title: "Feature 1",
        description: "Description 1",
        number: {
          node: {
            mediaItemUrl: "http://example.com/image1.jpg",
            altText: "Alt Text 1",
            localFile: {
              childImageSharp: {
                gatsbyImageData: {
                  layout: "fixed",
                  width: 100,
                  height: 100,
                  images: {
                    fallback: {
                      src: "http://example.com/image1-optimized.jpg",
                    },
                  },
                },
              },
            },
          },
        },
      },
    ],
  };

  test("renders Features component with optimized image", () => {
    render(
      <Features
        title={mockFeatures.title}
        subtitle={mockFeatures.subtitle}
        features={mockFeatures.features}
      />
    );

    const img = screen.getByAltText("Alt Text 1");
    expect(img).toBeInTheDocument();
  });
});
