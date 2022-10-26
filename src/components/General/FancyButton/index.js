import React, {useState} from 'react';
import './styles.scss';


const FancyButton = props => {

  const [mouseState, setMouseState] = useState({
    entrance: null,
    exit: null,
    action: null,
  });

  const [buttonWidth, setButtonWidth] = useState(null);

  const action = (top, left, type) => {
    setMouseState(Object.assign({},
      mouseState,
      {[type]: [top, left]},
      type === 'exit' && {entrance: null, action: null},
      type === 'action' && {entrance: null, exit: null},
    ));
  }

  const roundDims = dims => {
    return {
      left: Math.floor(dims.left),
      top: Math.floor(dims.top)
    }
  }

  const handleHoverIn = e => {
    const {left, top} = roundDims(e.target.getBoundingClientRect());
    action(e.clientY - top, e.clientX - left, 'entrance')
  }
  const handleHoverOut = e => {
    const {left, top} = roundDims(e.target.getBoundingClientRect());
    if (!mouseState.action) action(e.clientY - top, e.clientX - left, 'exit');
  }

  const handleClick = e => {
    const {left, top} = roundDims(e.target.getBoundingClientRect());
    action(e.clientY - top, e.clientX - left, 'action')
  }

  const measureButton = React.useCallback(node => {
    if (node && buttonWidth === null) setButtonWidth(node.clientWidth);
  }, [buttonWidth])

  const buttonStyles = {
    width: buttonWidth + 'px',
    height: buttonWidth + 'px',
    borderRadius: buttonWidth + 100 + 'px'
  }

  return(
    <div className='fancy-button-wrap' style={props.background && {background: props.background}}>
      <button
        ref={measureButton}
        className={'fancy-button' + (` ${props.className}`)}
        onMouseEnter={handleHoverIn}
        onMouseLeave={handleHoverOut}
        onClick={props.onClick}
        onMouseDown={handleClick}
        onFocus={() => action('50%', '50%', 'entrance')}
        onBlur={() => action('50%', '50%', 'exit')}
      >
        {props.children
          ? props.children
          : <span className='fbtn-text'>{props.text}</span>
        }
      </button>
        <span
          key={mouseState.entrance ? ' act' : mouseState.exit ? ' inact' : 'norm'}
          className={'hover-effect' + (mouseState.entrance ? ' active' : (mouseState.exit && !mouseState.action) ? ' inactive' : '')}
          onAnimationEnd={mouseState.exit ? () => setMouseState({entrance: null, exit: null, active: null}) : null}
          style={Object.assign({},
            (mouseState.entrance || mouseState.exit) && buttonStyles,
            mouseState.entrance && {top: mouseState.entrance[0], left: mouseState.entrance[1]},
            mouseState.exit && {top: mouseState.exit[0], left: mouseState.exit[1]},
            props.hoverBackground && {background: props.hoverBackground}
          )}
        ></span>
        <span
          key={(mouseState.action ? ' actv' : 'inactv')}
          className={'active-effect' + (mouseState.action ? ' active' : (mouseState.action && mouseState.exit) ? 'inactive' : '')}
          style={Object.assign({},
            mouseState.action && buttonStyles,
            mouseState.action && {top: mouseState.action[0], left: mouseState.action[1]},
            props.activeBackground && {background: props.activeBackground}
          )}
        ></span>
    </div>
  )
}

export default FancyButton;
