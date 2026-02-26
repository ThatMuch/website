import React from 'react';
import { render, screen } from '@testing-library/react';
import RelatedPosts from './RelatedPosts';
import { useSitePosts } from '../../hooks/use-site-posts';
import { PostType } from '../../utils/types';

// Mock the hook
jest.mock('../../hooks/use-site-posts');

describe('RelatedPosts Component', () => {
  const createMockPost = (id: string, title: string): PostType => ({
    id,
    title,
    uri: `/post-${id}`,
    link: `/post-${id}`,
    categories: { nodes: [{ slug: 'test-category', name: 'Test Category' }] },
    featuredImage: { node: { altText: 'Test Image', mediaItemUrl: 'https://example.com/image.jpg' } },
  } as unknown as PostType);

  it('should not mutate the posts array returned by useSitePosts', () => {
    const posts = [
      createMockPost('1', 'Post 1'),
      createMockPost('2', 'Post 2'),
      createMockPost('3', 'Post 3'),
    ];

    // We pass this array directly to the mock
    (useSitePosts as jest.Mock).mockReturnValue(posts);

    const currentPostId = '2';

    render(
      <RelatedPosts
        category="test-category"
        currentPostId={currentPostId}
        title="Related Posts"
      />
    );

    // Verify source array is NOT mutated
    expect(posts).toHaveLength(3);
    expect(posts.find((p) => p.id === currentPostId)).toBeDefined();

    // Verify component renders only the other posts
    // Post 2 should be excluded
    expect(screen.queryByText('Post 2')).toBeNull();
    // Post 1 and 3 should be present (assuming PostCard renders title)
    expect(screen.getByText('Post 1')).toBeInTheDocument();
    expect(screen.getByText('Post 3')).toBeInTheDocument();
  });
});
