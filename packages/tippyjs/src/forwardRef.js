import React, {cloneElement} from 'react';
import {preserveRef} from './utils';

export default (Tippy, defaultProps) =>
  function TippyWrapper({children, ref, ...props}) {
    return (
      // If I spread them separately here, Babel adds the _extends ponyfill for
      // some reason
      <Tippy {...{...defaultProps, ...props}}>
        {children
          ? cloneElement(children, {
              ref(node) {
                preserveRef(ref, node);
                preserveRef(children.ref, node);
              },
            })
          : null}
      </Tippy>
    );
  };
