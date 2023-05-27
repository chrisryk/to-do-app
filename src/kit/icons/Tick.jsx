import PropTypes from 'prop-types';

const Tick = ({ className }) => (
  <svg className={className} fill="#fff" width="20px" height="20px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
    <path d="M760 380.4l-61.6-61.6-263.2 263.1-109.6-109.5L264 534l171.2 171.2L760 380.4z" />
  </svg>
);

Tick.defaultProps = {
  className: '',
};

Tick.propTypes = {
  className: PropTypes.string,
};

export default Tick;
