import PropTypes from 'prop-types';

function Cross({ className }) {
  return (
    <svg className={className} width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 8L8 16M8.00001 8L16 16" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

Cross.propTypes = {
  className: PropTypes.string.isRequired,
};

export default Cross;
