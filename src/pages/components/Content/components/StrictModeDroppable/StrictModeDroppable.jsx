import { useEffect, useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';

// https://medium.com/@wbern/getting-react-18s-strict-mode-to-work-with-react-beautiful-dnd-47bc909348e4

function StrictModeDroppable({ children, ...props }) {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));
    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);
  if (!enabled) {
    return null;
  }
  return <Droppable {...props}>{children}</Droppable>;
}

StrictModeDroppable.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StrictModeDroppable;
