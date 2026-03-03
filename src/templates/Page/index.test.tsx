import React from "react";
import { render, screen } from "@testing-library/react";
import Page from "./index";

// Mock gatsby
jest.mock("gatsby", () => ({
  graphql: jest.fn(),
  Link: jest.fn().mockImplementation(({ to, children, ...props }) => (
    <a href={to} {...props}>
      {children}
    </a>
  )),
}));

// Mock components used in Page
jest.mock("../../components/Layout", () => {
  return function DummyLayout({ children }: { children: React.ReactNode }) {
    return <div data-testid="layout">{children}</div>;
  };
});

jest.mock("../../components/Seo", () => {
  return function DummySeo() {
    return <div data-testid="seo" />;
  };
});

describe("Page Template", () => {
  const mockData = {
    wpPage: {
      title: "Test Page Title",
      content:
        '<p>Test content paragraph.</p><script>console.log("malicious script")</script>',
      seo: {
        metaDesc: "Test SEO Description",
        metaKeywords: "test, keywords",
        title: "Test SEO Title",
      },
      slug: "test-page-slug",
    },
  };

  it("renders page title and content", () => {
    const { container } = render(<Page data={mockData} />);

    expect(screen.getByText("Test Page Title")).toBeInTheDocument();
    expect(screen.getByText("Test content paragraph.")).toBeInTheDocument();

    // Check for unsafe script tag.
    // After the fix, this should be removed by sanitizeHtml.
    expect(container.innerHTML).not.toContain(
      '<script>console.log("malicious script")</script>'
    );
    // Ensure safe content is still there
    expect(screen.getByText("Test content paragraph.")).toBeInTheDocument();
  });
});
