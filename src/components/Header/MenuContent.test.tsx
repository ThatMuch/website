import React from 'react';
import { render } from '@testing-library/react';
import MenuContent from './MenuContent';
import { MenuItem } from './types';

// Mocks
jest.mock('../../store/useUIStore', () => ({
  useUIStore: (selector: any) => selector({
    isMobile: false,
    activeMenuIndex: null,
    setActiveMenuIndex: jest.fn(),
    toggleMenu: jest.fn(),
  })
}));

jest.mock('react-lazy-load-image-component', () => ({
  LazyLoadImage: () => null
}));

jest.mock('gatsby', () => ({
  Link: ({ children, to, ...props }: any) => <a href={to} {...props}>{children}</a>
}));

jest.mock('react-icons/fi', () => ({
  FiChevronRight: () => null,
  FiArrowRight: () => null,
  FiChevronLeft: () => null,
}));

jest.mock('react-icons/lu', () => ({
  LuSquareArrowOutUpRight: () => null,
}));

jest.mock('./MenuMobile', () => () => null);
jest.mock('../../images/Comet.svg', () => 'comet.svg');

describe('MenuContent', () => {
  it('renders without crashing', () => {
    const props = {
      menuItems: [
        {
          id: '1',
          label: 'Test Item',
          url: '/test',
          path: '/test',
          childItems: { nodes: [] }
        }
      ] as MenuItem[]
    };
    render(<MenuContent {...props} />);
  });
});
