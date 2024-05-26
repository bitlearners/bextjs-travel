import React from 'react';

const Block = ({ block }) => {
  return (
    <div dangerouslySetInnerHTML={{ __html: block.content }} />
  );
};

export default Block;
