import { describe, it, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert';
import { useUIStore } from './useUIStore';

describe('useUIStore', () => {
    let mockStyle = { overflow: '' };

    beforeEach(() => {
        // Reset mock style
        mockStyle = { overflow: '' };
        // Mock document
        (global as any).document = {
            body: {
                style: mockStyle
            }
        };
        // Reset store state
        useUIStore.setState({ isMenuOpen: false, isScrolled: false });
    });

    afterEach(() => {
        // Clean up global mock
        delete (global as any).document;
    });

    it('toggleMenu should toggle isMenuOpen state', () => {
        const { toggleMenu } = useUIStore.getState();

        toggleMenu();
        assert.strictEqual(useUIStore.getState().isMenuOpen, true);
        assert.strictEqual(document.body.style.overflow, 'hidden');

        toggleMenu();
        assert.strictEqual(useUIStore.getState().isMenuOpen, false);
        assert.strictEqual(document.body.style.overflow, 'auto');
    });

    it('toggleMenu should set isMenuOpen to specific value', () => {
        const { toggleMenu } = useUIStore.getState();

        toggleMenu(true);
        assert.strictEqual(useUIStore.getState().isMenuOpen, true);
        assert.strictEqual(document.body.style.overflow, 'hidden');

        toggleMenu(false);
        assert.strictEqual(useUIStore.getState().isMenuOpen, false);
        assert.strictEqual(document.body.style.overflow, 'auto');
    });
});
