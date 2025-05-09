import {ReactElement} from 'react';
import ReactDOM from 'react-dom';
import {isObject} from './is';
import {createRoot as reactDOMCreateRoot} from 'react-dom/client';

type CreateRootFnType = (container: Element | DocumentFragment) => {
  render: (container: ReactElement) => void;
  unmount: () => void;
  _unmount: () => void;
};

const reactDOMCreateRootCopy = reactDOMCreateRoot as CreateRootFnType;

const __SECRET_INTERNALS__ = '__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED';

const CopyReactDOM = ReactDOM as typeof ReactDOM & {
  createRoot: CreateRootFnType;
  // https://github.com/facebook/react/blob/4ff5f5719b348d9d8db14aaa49a48532defb4ab7/packages/react-dom/src/client/ReactDOM.js#L181
  [__SECRET_INTERNALS__]: {
    usingClientEntryPoint?: boolean;
  };
};

let copyRender: (
  app: ReactElement,
  container: Element | DocumentFragment
) => {
  render: (container: ReactElement) => void;
  _unmount: () => void;
};

const isReact18 = Number(CopyReactDOM.version?.split('.')[0]) > 17;
const isReact19 = Number(CopyReactDOM.version?.split('.')[0]) > 18;

const updateUsingClientEntryPoint = (skipWarning?: boolean) => {
  // https://github.com/facebook/react/blob/17806594cc28284fe195f918e8d77de3516848ec/packages/react-dom/npm/client.js#L10
  // Avoid console warning
  if (isObject(CopyReactDOM[__SECRET_INTERNALS__])) {
    CopyReactDOM[__SECRET_INTERNALS__].usingClientEntryPoint = skipWarning;
  }
};

let createRoot: CreateRootFnType;
try {
  createRoot = CopyReactDOM.createRoot;
} catch (_) {
  //
}

if (isReact19) {
  copyRender = (app: ReactElement, container: Element | DocumentFragment) => {
    updateUsingClientEntryPoint(true);
    const root = reactDOMCreateRootCopy(container);
    updateUsingClientEntryPoint(false);

    root.render(app);

    root._unmount = function () {
      setTimeout(() => {
        root?.unmount?.();
      });
    };
    return root;
  };
} else if (isReact18) {
  copyRender = (app: ReactElement, container: Element | DocumentFragment) => {
    updateUsingClientEntryPoint(true);
    const root = createRoot(container);
    updateUsingClientEntryPoint(false);

    root.render(app);

    root._unmount = function () {
      setTimeout(() => {
        root?.unmount?.();
      });
    };
    return root;
  };
} else {
  copyRender = function (app: ReactElement, container: Element | DocumentFragment) {
    (CopyReactDOM as any).render(app, container);

    return {
      render: (app: ReactElement) => {
        (CopyReactDOM as any).render(app, container);
      },
      _unmount() {
        (CopyReactDOM as any).unmountComponentAtNode(container);
      },
    };
  };
}

export const render = copyRender;
