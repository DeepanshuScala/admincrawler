import classNames from 'classnames'
import React from 'react'

const Image = (
    {src , alt, className, ...rest}
) => {
  return (
    <img src={src} alt={alt} className={classNames(className)} loading='lazy' {...rest}/>
  )
}

export default Image