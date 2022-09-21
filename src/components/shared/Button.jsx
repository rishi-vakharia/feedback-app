import PropTypes from 'prop-types'

function Button({children, version, isDisabled, type}) {
  return (
    <button disabled={isDisabled} type={type} className={`btn btn-${version}`}>
      {children}
    </button>
  )
}

Button.defaultProps = {
  version: 'primary',
  isDisabled: false,
  type: 'button',
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  version: PropTypes.string,
  type: PropTypes.string,
  isDisabled: PropTypes.bool,
}

export default Button