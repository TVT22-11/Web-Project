import React, { useRef } from 'react';

const ShareLink = ({ url }) => {
  const linkRef = useRef(null);

  const copyToClipboard = () => {
    if (linkRef.current) {
      linkRef.current.select();
      document.execCommand('copy');
    }
  };

  return (
    <div>
      <input
        ref={linkRef}
        type="text"
        readOnly
        value={url}
        style={{ position: 'absolute', left: '-9999px' }}
      />
      <button onClick={copyToClipboard}>Copy Link</button>
    </div>
  );
};

export default ShareLink;