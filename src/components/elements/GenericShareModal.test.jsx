import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react'; // Added fireEvent
import GenericShareModal from './GenericShareModal';
import { GlobalContext } from '@/context/GlobalContext'; // Import context

// Mock the clipboard and Web Share API
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn().mockResolvedValue(undefined),
  },
  share: jest.fn().mockResolvedValue(undefined),
});

// Mock next/link and next/image if necessary, but often not needed for basic rendering
// jest.mock('next/link', () => ({ children, href }) => <a href={href}>{children}</a>);
// jest.mock('next/image', () => ({ src, alt, width, height, className }) => <img src={src} alt={alt} width={width} height={height} className={className} />);


// Helper to render the component with a mock context provider
const renderWithContext = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <GlobalContext.Provider value={providerProps}>{ui}</GlobalContext.Provider>,
    renderOptions
  );
};


describe('GenericShareModal', () => {
  let mockOnClose;
  let providerProps;

  beforeEach(() => {
    mockOnClose = jest.fn();
    providerProps = {
      shareModalPostContent: {
        content: 'This is a test post content for sharing.',
        media: [{ url: '/test-image.jpg', type: 'image' }],
        type: 'image',
      },
      specificPostId: '12345',
      closeMediaViewer: () => {}, // Mock other functions if needed
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should not render when isOpen is false', () => {
    renderWithContext(<GenericShareModal isOpen={false} onClose={mockOnClose} />, { providerProps });
    // Check that the modal title is not in the document
    expect(screen.queryByText('Share Post')).not.toBeInTheDocument();
  });

  it('renders correctly when isOpen is true', () => {
    renderWithContext(<GenericShareModal isOpen={true} onClose={mockOnClose} />, { providerProps });

    // Check if the title and key elements are displayed
    expect(screen.getByText('Share Post')).toBeInTheDocument();
    expect(screen.getByText('Copy Link')).toBeInTheDocument();
    // Check for the post preview content
    expect(screen.getByText(/This is a test post content/)).toBeInTheDocument();
  });

  it('copies link to clipboard and shows confirmation', async () => {
    renderWithContext(<GenericShareModal isOpen={true} onClose={mockOnClose} />, { providerProps });

    const copyButton = screen.getByRole('button', { name: /copy link/i });
    fireEvent.click(copyButton);

    // Check that clipboard API was called
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost/post/12345');

    // Check for confirmation UI
    expect(await screen.findByText('Link Copied!')).toBeInTheDocument();
    expect(screen.queryByText('Copy Link')).not.toBeInTheDocument(); // Original text is gone
  });

  it('calls Web Share API when the share button is clicked', () => {
    // Enable mock for navigator.share for this test
    navigator.share = jest.fn().mockResolvedValue(undefined);

    renderWithContext(<GenericShareModal isOpen={true} onClose={mockOnClose} />, { providerProps });

    const shareButton = screen.getByRole('button', { name: /share via/i });
    fireEvent.click(shareButton);

    expect(navigator.share).toHaveBeenCalled();
    expect(navigator.share).toHaveBeenCalledWith({
      title: 'This is a test post content for sharing....',
      text: 'This is a test post content for sharing....', // Corrected text to include ellipsis
      url: 'http://localhost/post/12345',
    });
  });
});
