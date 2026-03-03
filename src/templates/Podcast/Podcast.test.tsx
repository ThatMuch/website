import React from 'react';
import { render, screen } from '@testing-library/react';
import Podcast from './index';
import { useSitePosts } from '../../hooks/use-site-posts';

// Mock gatsby
jest.mock('gatsby', () => {
  const React = require('react');
  const gatsby = jest.requireActual('gatsby');
  return {
    ...gatsby,
    graphql: jest.fn(),
    Link: jest.fn().mockImplementation(
      ({
        activeClassName,
        activeStyle,
        getProps,
        innerRef,
        partiallyActive,
        ref,
        replace,
        to,
        ...rest
      }) =>
        React.createElement('a', {
          ...rest,
          href: to,
        })
    ),
    StaticQuery: jest.fn(),
    useStaticQuery: jest.fn(),
  };
});

// Mock child components and hooks
jest.mock('../../hooks/use-site-posts', () => ({
  useSitePosts: jest.fn(),
}));

jest.mock('../../components/Layout', () => ({ children }: { children: React.ReactNode }) => <div data-testid="layout">{children}</div>);
jest.mock('../../components/Seo', () => () => <div data-testid="seo" />);
jest.mock('../../components/PodcastLinks', () => () => <div data-testid="podcast-links" />);
jest.mock('../../components/AllPosts/AllPosts', () => () => <div data-testid="all-posts" />);
jest.mock('../../components/ContactForm', () => () => <div data-testid="contact-form" />);
jest.mock('react-lazy-load-image-component', () => ({
  LazyLoadImage: ({ src, alt }: { src: string, alt: string }) => <img src={src} alt={alt} data-testid="lazy-image" />,
}));

describe('Podcast Template', () => {
  it('should sanitize HTML content in descriptionHeroSection', () => {
    const maliciousHtml = '<img src=x onerror=alert(1)>Malicious Content';

    const mockData = {
      wpPage: {
        title: 'Podcast Title',
        featuredImage: {
          node: {
            mediaItemUrl: 'image.jpg',
            altText: 'Alt Text',
          },
        },
        detailPagePodcast: {
          descriptionHeroSection: maliciousHtml,
          sousTitre: 'Subtitle',
        },
        hubspotForm: {},
        seo: {
          metaDesc: 'Meta Desc',
        },
      },
    };

    (useSitePosts as jest.Mock).mockReturnValue([]);

    const { container } = render(<Podcast data={mockData} />);

    // Check if the malicious attribute is present (it should NOT be if sanitized)
    // The test will fail initially because the code does NOT sanitize yet.
    expect(container.innerHTML).not.toContain('onerror');
    expect(container.innerHTML).toContain('Malicious Content');
  });
});
