import React from 'react';
import styles from './styles';
import Button from '../Button';

const CheckCircle = props => {

  const toggle = () => props.setter(props.setterParam || !props.condition);
  const childToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    props.setter(props.setterParam || !props.condition)
  }

  let mergeStyles = {...styles};
  if (props.styles) {
    Object.keys(props.styles).forEach(key => {
      mergeStyles[key] = {...mergeStyles[key], ...props.styles[key]};
    })
  }


  return(
    <Button
      type='button'
      onClick={toggle}
      styles={mergeStyles.container}
      hoverStyles={mergeStyles.containerHov}
      activeStyles={mergeStyles.contatinerAct}
      focusStyles={mergeStyles.containerFoc}
    >
      <svg onClick={childToggle} style={styles.svg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        {props.condition
        ? <path onClick={childToggle} style={styles.check} d="M362.6 192.9L345 174.8c-.7-.8-1.8-1.2-2.8-1.2-1.1 0-2.1.4-2.8 1.2l-122 122.9-44.4-44.4c-.8-.8-1.8-1.2-2.8-1.2-1 0-2 .4-2.8 1.2l-17.8 17.8c-1.6 1.6-1.6 4.1 0 5.7l56 56c3.6 3.6 8 5.7 11.7 5.7 5.3 0 9.9-3.9 11.6-5.5h.1l133.7-134.4c1.4-1.7 1.4-4.2-.1-5.7z"/>
        : null}
        <path onClick={childToggle} style={styles.circle} d="M256 76c48.1 0 93.3 18.7 127.3 52.7S436 207.9 436 256s-18.7 93.3-52.7 127.3S304.1 436 256 436c-48.1 0-93.3-18.7-127.3-52.7S76 304.1 76 256s18.7-93.3 52.7-127.3S207.9 76 256 76m0-28C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48z"/>
      </svg>
    </Button>
  );
}


export default CheckCircle;
