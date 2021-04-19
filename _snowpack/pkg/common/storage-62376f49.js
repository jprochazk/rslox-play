import { B as isMacintosh, n as Emitter, a4 as Disposable, aF as DisposableStore, j as isNumber, av as dispose, a0 as toDisposable, aZ as Action, a_ as ActionRunner, aa as setImmediate, aq as isUndefinedOrNull, a$ as Separator, b as localize, b0 as isFunction, al as Event, ap as Registry, a3 as Codicon, aU as CSSIcon, aW as ThemeIcon, a2 as iconRegistry$1, an as createDecorator, b1 as PauseableEmitter } from './editorContextKeys-7b242db0.js';
import { a as Gesture, E as EventType, W as Widget, m as mixin, e as ScrollableElement } from './notification-c41cc505.js';
import { w as clearNode, x as append, $ as $$1, y as domEvent, p as EventHelper, z as getElementsByTagName, S as StandardMouseEvent, A as createStyleSheet, a as addDisposableListener, e as addStandardDisposableListener, E as EventType$1, m as StandardKeyboardEvent, t as trackFocus, C as getActiveElement, D as isAncestor, F as getTotalHeight, q as getTotalWidth } from './dom-e1686e61.js';
import { D as Delayer, R as RunOnceScheduler, b as ThrottledDelayer } from './async-a734ffcb.js';
import { i as isFirefox } from './browser-17f56e3f.js';
import { j as Color } from './textModel-76ba00eb.js';
import { E as Extensions$1 } from './colorRegistry-4256ae63.js';

/** SNOWPACK INJECT STYLE: monaco-editor/esm/vs/base/browser/ui/aria/aria.css */
function __snowpack__injectStyle(css) {
  const headEl = document.head || document.getElementsByTagName('head')[0];
  const styleEl = document.createElement('style');
  styleEl.type = 'text/css';
  if (styleEl.styleSheet) {
    styleEl.styleSheet.cssText = css;
  } else {
    styleEl.appendChild(document.createTextNode(css));
  }
  headEl.appendChild(styleEl);
}
__snowpack__injectStyle("/*---------------------------------------------------------------------------------------------\r\n *  Copyright (c) Microsoft Corporation. All rights reserved.\r\n *  Licensed under the MIT License. See License.txt in the project root for license information.\r\n *--------------------------------------------------------------------------------------------*/\r\n\r\n.monaco-aria-container {\r\n\tposition: absolute; /* try to hide from window but not from screen readers */\r\n\tleft:-999em;\r\n}");

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
// Use a max length since we are inserting the whole msg in the DOM and that can cause browsers to freeze for long messages #94233
const MAX_MESSAGE_LENGTH = 20000;
let ariaContainer;
let alertContainer;
let alertContainer2;
let statusContainer;
let statusContainer2;
function setARIAContainer(parent) {
    ariaContainer = document.createElement('div');
    ariaContainer.className = 'monaco-aria-container';
    const createAlertContainer = () => {
        const element = document.createElement('div');
        element.className = 'monaco-alert';
        element.setAttribute('role', 'alert');
        element.setAttribute('aria-atomic', 'true');
        ariaContainer.appendChild(element);
        return element;
    };
    alertContainer = createAlertContainer();
    alertContainer2 = createAlertContainer();
    const createStatusContainer = () => {
        const element = document.createElement('div');
        element.className = 'monaco-status';
        element.setAttribute('role', 'complementary');
        element.setAttribute('aria-live', 'polite');
        element.setAttribute('aria-atomic', 'true');
        ariaContainer.appendChild(element);
        return element;
    };
    statusContainer = createStatusContainer();
    statusContainer2 = createStatusContainer();
    parent.appendChild(ariaContainer);
}
/**
 * Given the provided message, will make sure that it is read as alert to screen readers.
 */
function alert(msg) {
    if (!ariaContainer) {
        return;
    }
    // Use alternate containers such that duplicated messages get read out by screen readers #99466
    if (alertContainer.textContent !== msg) {
        clearNode(alertContainer2);
        insertMessage(alertContainer, msg);
    }
    else {
        clearNode(alertContainer);
        insertMessage(alertContainer2, msg);
    }
}
/**
 * Given the provided message, will make sure that it is read as status to screen readers.
 */
function status(msg) {
    if (!ariaContainer) {
        return;
    }
    if (isMacintosh) {
        alert(msg); // VoiceOver does not seem to support status role
    }
    else {
        if (statusContainer.textContent !== msg) {
            clearNode(statusContainer2);
            insertMessage(statusContainer, msg);
        }
        else {
            clearNode(statusContainer);
            insertMessage(statusContainer2, msg);
        }
    }
}
function insertMessage(target, msg) {
    clearNode(target);
    if (msg.length > MAX_MESSAGE_LENGTH) {
        msg = msg.substr(0, MAX_MESSAGE_LENGTH);
    }
    target.textContent = msg;
    // See https://www.paciellogroup.com/blog/2012/06/html5-accessibility-chops-aria-rolealert-browser-support/
    target.style.visibility = 'hidden';
    target.style.visibility = 'visible';
}

/** SNOWPACK INJECT STYLE: monaco-editor/esm/vs/base/browser/ui/sash/sash.css */
function __snowpack__injectStyle$1(css) {
  const headEl = document.head || document.getElementsByTagName('head')[0];
  const styleEl = document.createElement('style');
  styleEl.type = 'text/css';
  if (styleEl.styleSheet) {
    styleEl.styleSheet.cssText = css;
  } else {
    styleEl.appendChild(document.createTextNode(css));
  }
  headEl.appendChild(styleEl);
}
__snowpack__injectStyle$1("/*---------------------------------------------------------------------------------------------\r\n *  Copyright (c) Microsoft Corporation. All rights reserved.\r\n *  Licensed under the MIT License. See License.txt in the project root for license information.\r\n *--------------------------------------------------------------------------------------------*/\r\n\r\n:root {\r\n\t--sash-size: 4px;\r\n}\r\n\r\n.monaco-sash {\r\n\tposition: absolute;\r\n\tz-index: 35;\r\n\ttouch-action: none;\r\n}\r\n\r\n.monaco-sash.disabled {\r\n\tpointer-events: none;\r\n}\r\n\r\n.monaco-sash.mac.vertical {\r\n\tcursor: col-resize;\r\n}\r\n\r\n.monaco-sash.vertical.minimum {\r\n\tcursor: e-resize;\r\n}\r\n\r\n.monaco-sash.vertical.maximum {\r\n\tcursor: w-resize;\r\n}\r\n\r\n.monaco-sash.mac.horizontal {\r\n\tcursor: row-resize;\r\n}\r\n\r\n.monaco-sash.horizontal.minimum {\r\n\tcursor: s-resize;\r\n}\r\n\r\n.monaco-sash.horizontal.maximum {\r\n\tcursor: n-resize;\r\n}\r\n\r\n.monaco-sash.disabled {\r\n\tcursor: default !important;\r\n\tpointer-events: none !important;\r\n}\r\n\r\n.monaco-sash.vertical {\r\n\tcursor: ew-resize;\r\n\ttop: 0;\r\n\twidth: var(--sash-size);\r\n\theight: 100%;\r\n}\r\n\r\n.monaco-sash.horizontal {\r\n\tcursor: ns-resize;\r\n\tleft: 0;\r\n\twidth: 100%;\r\n\theight: var(--sash-size);\r\n}\r\n\r\n.monaco-sash:not(.disabled) > .orthogonal-drag-handle {\r\n\tcontent: \" \";\r\n\theight: calc(var(--sash-size) * 2);\r\n\twidth: calc(var(--sash-size) * 2);\r\n\tz-index: 100;\r\n\tdisplay: block;\r\n\tcursor: all-scroll;\r\n\tposition: absolute;\r\n}\r\n\r\n.monaco-sash.horizontal.orthogonal-edge-north:not(.disabled)\r\n\t> .orthogonal-drag-handle.start,\r\n.monaco-sash.horizontal.orthogonal-edge-south:not(.disabled)\r\n\t> .orthogonal-drag-handle.end {\r\n\tcursor: nwse-resize;\r\n}\r\n\r\n.monaco-sash.horizontal.orthogonal-edge-north:not(.disabled)\r\n\t> .orthogonal-drag-handle.end,\r\n.monaco-sash.horizontal.orthogonal-edge-south:not(.disabled)\r\n\t> .orthogonal-drag-handle.start {\r\n\tcursor: nesw-resize;\r\n}\r\n\r\n.monaco-sash.vertical > .orthogonal-drag-handle.start {\r\n\tleft: calc(var(--sash-size) * -0.5);\r\n\ttop: calc(var(--sash-size) * -1);\r\n}\r\n.monaco-sash.vertical > .orthogonal-drag-handle.end {\r\n\tleft: calc(var(--sash-size) * -0.5);\r\n\tbottom: calc(var(--sash-size) * -1);\r\n}\r\n.monaco-sash.horizontal > .orthogonal-drag-handle.start {\r\n\ttop: calc(var(--sash-size) * -0.5);\r\n\tleft: calc(var(--sash-size) * -1);\r\n}\r\n.monaco-sash.horizontal > .orthogonal-drag-handle.end {\r\n\ttop: calc(var(--sash-size) * -0.5);\r\n\tright: calc(var(--sash-size) * -1);\r\n}\r\n\r\n.monaco-sash {\r\n\ttransition: background-color 0.1s ease-out;\r\n\tbackground: transparent;\r\n}\r\n\r\n/** Debug **/\r\n\r\n.monaco-sash.debug {\r\n\tbackground: cyan;\r\n}\r\n\r\n.monaco-sash.debug.disabled {\r\n\tbackground: rgba(0, 255, 255, 0.2);\r\n}\r\n\r\n.monaco-sash.debug:not(.disabled) > .orthogonal-drag-handle {\r\n\tbackground: red;\r\n}\r\n");

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
let DEBUG = false;
var OrthogonalEdge;
(function (OrthogonalEdge) {
    OrthogonalEdge["North"] = "north";
    OrthogonalEdge["South"] = "south";
    OrthogonalEdge["East"] = "east";
    OrthogonalEdge["West"] = "west";
})(OrthogonalEdge || (OrthogonalEdge = {}));
let globalSize = 4;
const onDidChangeGlobalSize = new Emitter();
class Sash extends Disposable {
    constructor(container, layoutProvider, options) {
        super();
        this.hoverDelayer = this._register(new Delayer(300));
        this._state = 3 /* Enabled */;
        this._onDidEnablementChange = this._register(new Emitter());
        this.onDidEnablementChange = this._onDidEnablementChange.event;
        this._onDidStart = this._register(new Emitter());
        this.onDidStart = this._onDidStart.event;
        this._onDidChange = this._register(new Emitter());
        this.onDidChange = this._onDidChange.event;
        this._onDidReset = this._register(new Emitter());
        this.onDidReset = this._onDidReset.event;
        this._onDidEnd = this._register(new Emitter());
        this.onDidEnd = this._onDidEnd.event;
        this.linkedSash = undefined;
        this.orthogonalStartSashDisposables = this._register(new DisposableStore());
        this.orthogonalStartDragHandleDisposables = this._register(new DisposableStore());
        this.orthogonalEndSashDisposables = this._register(new DisposableStore());
        this.orthogonalEndDragHandleDisposables = this._register(new DisposableStore());
        this.el = append(container, $$1('.monaco-sash'));
        if (options.orthogonalEdge) {
            this.el.classList.add(`orthogonal-edge-${options.orthogonalEdge}`);
        }
        if (isMacintosh) {
            this.el.classList.add('mac');
        }
        this._register(domEvent(this.el, 'mousedown')(this.onMouseDown, this));
        this._register(domEvent(this.el, 'dblclick')(this.onMouseDoubleClick, this));
        this._register(domEvent(this.el, 'mouseenter')(() => Sash.onMouseEnter(this)));
        this._register(domEvent(this.el, 'mouseleave')(() => Sash.onMouseLeave(this)));
        this._register(Gesture.addTarget(this.el));
        this._register(domEvent(this.el, EventType.Start)(this.onTouchStart, this));
        if (typeof options.size === 'number') {
            this.size = options.size;
            if (options.orientation === 0 /* VERTICAL */) {
                this.el.style.width = `${this.size}px`;
            }
            else {
                this.el.style.height = `${this.size}px`;
            }
        }
        else {
            this.size = globalSize;
            this._register(onDidChangeGlobalSize.event(size => {
                this.size = size;
                this.layout();
            }));
        }
        this.hidden = false;
        this.layoutProvider = layoutProvider;
        this.orthogonalStartSash = options.orthogonalStartSash;
        this.orthogonalEndSash = options.orthogonalEndSash;
        this.orientation = options.orientation || 0 /* VERTICAL */;
        if (this.orientation === 1 /* HORIZONTAL */) {
            this.el.classList.add('horizontal');
            this.el.classList.remove('vertical');
        }
        else {
            this.el.classList.remove('horizontal');
            this.el.classList.add('vertical');
        }
        this.el.classList.toggle('debug', DEBUG);
        this.layout();
    }
    get state() { return this._state; }
    set state(state) {
        if (this._state === state) {
            return;
        }
        this.el.classList.toggle('disabled', state === 0 /* Disabled */);
        this.el.classList.toggle('minimum', state === 1 /* Minimum */);
        this.el.classList.toggle('maximum', state === 2 /* Maximum */);
        this._state = state;
        this._onDidEnablementChange.fire(state);
    }
    get orthogonalStartSash() { return this._orthogonalStartSash; }
    set orthogonalStartSash(sash) {
        this.orthogonalStartDragHandleDisposables.clear();
        this.orthogonalStartSashDisposables.clear();
        if (sash) {
            const onChange = (state) => {
                this.orthogonalStartDragHandleDisposables.clear();
                if (state !== 0 /* Disabled */) {
                    this._orthogonalStartDragHandle = append(this.el, $$1('.orthogonal-drag-handle.start'));
                    this.orthogonalStartDragHandleDisposables.add(toDisposable(() => this._orthogonalStartDragHandle.remove()));
                    domEvent(this._orthogonalStartDragHandle, 'mouseenter')(() => Sash.onMouseEnter(sash), undefined, this.orthogonalStartDragHandleDisposables);
                    domEvent(this._orthogonalStartDragHandle, 'mouseleave')(() => Sash.onMouseLeave(sash), undefined, this.orthogonalStartDragHandleDisposables);
                }
            };
            this.orthogonalStartSashDisposables.add(sash.onDidEnablementChange(onChange, this));
            onChange(sash.state);
        }
        this._orthogonalStartSash = sash;
    }
    get orthogonalEndSash() { return this._orthogonalEndSash; }
    set orthogonalEndSash(sash) {
        this.orthogonalEndDragHandleDisposables.clear();
        this.orthogonalEndSashDisposables.clear();
        if (sash) {
            const onChange = (state) => {
                this.orthogonalEndDragHandleDisposables.clear();
                if (state !== 0 /* Disabled */) {
                    this._orthogonalEndDragHandle = append(this.el, $$1('.orthogonal-drag-handle.end'));
                    this.orthogonalEndDragHandleDisposables.add(toDisposable(() => this._orthogonalEndDragHandle.remove()));
                    domEvent(this._orthogonalEndDragHandle, 'mouseenter')(() => Sash.onMouseEnter(sash), undefined, this.orthogonalEndDragHandleDisposables);
                    domEvent(this._orthogonalEndDragHandle, 'mouseleave')(() => Sash.onMouseLeave(sash), undefined, this.orthogonalEndDragHandleDisposables);
                }
            };
            this.orthogonalEndSashDisposables.add(sash.onDidEnablementChange(onChange, this));
            onChange(sash.state);
        }
        this._orthogonalEndSash = sash;
    }
    onMouseDown(e) {
        EventHelper.stop(e, false);
        let isMultisashResize = false;
        if (!e.__orthogonalSashEvent) {
            const orthogonalSash = this.getOrthogonalSash(e);
            if (orthogonalSash) {
                isMultisashResize = true;
                e.__orthogonalSashEvent = true;
                orthogonalSash.onMouseDown(e);
            }
        }
        if (this.linkedSash && !e.__linkedSashEvent) {
            e.__linkedSashEvent = true;
            this.linkedSash.onMouseDown(e);
        }
        if (!this.state) {
            return;
        }
        // Select both iframes and webviews; internally Electron nests an iframe
        // in its <webview> component, but this isn't queryable.
        const iframes = [
            ...getElementsByTagName('iframe'),
            ...getElementsByTagName('webview'),
        ];
        for (const iframe of iframes) {
            iframe.style.pointerEvents = 'none'; // disable mouse events on iframes as long as we drag the sash
        }
        const mouseDownEvent = new StandardMouseEvent(e);
        const startX = mouseDownEvent.posx;
        const startY = mouseDownEvent.posy;
        const altKey = mouseDownEvent.altKey;
        const startEvent = { startX, currentX: startX, startY, currentY: startY, altKey };
        this.el.classList.add('active');
        this._onDidStart.fire(startEvent);
        // fix https://github.com/microsoft/vscode/issues/21675
        const style = createStyleSheet(this.el);
        const updateStyle = () => {
            let cursor = '';
            if (isMultisashResize) {
                cursor = 'all-scroll';
            }
            else if (this.orientation === 1 /* HORIZONTAL */) {
                if (this.state === 1 /* Minimum */) {
                    cursor = 's-resize';
                }
                else if (this.state === 2 /* Maximum */) {
                    cursor = 'n-resize';
                }
                else {
                    cursor = isMacintosh ? 'row-resize' : 'ns-resize';
                }
            }
            else {
                if (this.state === 1 /* Minimum */) {
                    cursor = 'e-resize';
                }
                else if (this.state === 2 /* Maximum */) {
                    cursor = 'w-resize';
                }
                else {
                    cursor = isMacintosh ? 'col-resize' : 'ew-resize';
                }
            }
            style.textContent = `* { cursor: ${cursor} !important; }`;
        };
        const disposables = new DisposableStore();
        updateStyle();
        if (!isMultisashResize) {
            this.onDidEnablementChange(updateStyle, null, disposables);
        }
        const onMouseMove = (e) => {
            EventHelper.stop(e, false);
            const mouseMoveEvent = new StandardMouseEvent(e);
            const event = { startX, currentX: mouseMoveEvent.posx, startY, currentY: mouseMoveEvent.posy, altKey };
            this._onDidChange.fire(event);
        };
        const onMouseUp = (e) => {
            EventHelper.stop(e, false);
            this.el.removeChild(style);
            this.el.classList.remove('active');
            this._onDidEnd.fire();
            disposables.dispose();
            for (const iframe of iframes) {
                iframe.style.pointerEvents = 'auto';
            }
        };
        domEvent(window, 'mousemove')(onMouseMove, null, disposables);
        domEvent(window, 'mouseup')(onMouseUp, null, disposables);
    }
    onMouseDoubleClick(e) {
        const orthogonalSash = this.getOrthogonalSash(e);
        if (orthogonalSash) {
            orthogonalSash._onDidReset.fire();
        }
        if (this.linkedSash) {
            this.linkedSash._onDidReset.fire();
        }
        this._onDidReset.fire();
    }
    onTouchStart(event) {
        EventHelper.stop(event);
        const listeners = [];
        const startX = event.pageX;
        const startY = event.pageY;
        const altKey = event.altKey;
        this._onDidStart.fire({
            startX: startX,
            currentX: startX,
            startY: startY,
            currentY: startY,
            altKey
        });
        listeners.push(addDisposableListener(this.el, EventType.Change, (event) => {
            if (isNumber(event.pageX) && isNumber(event.pageY)) {
                this._onDidChange.fire({
                    startX: startX,
                    currentX: event.pageX,
                    startY: startY,
                    currentY: event.pageY,
                    altKey
                });
            }
        }));
        listeners.push(addDisposableListener(this.el, EventType.End, () => {
            this._onDidEnd.fire();
            dispose(listeners);
        }));
    }
    static onMouseEnter(sash, fromLinkedSash = false) {
        if (sash.el.classList.contains('active')) {
            sash.hoverDelayer.cancel();
            sash.el.classList.add('hover');
        }
        else {
            sash.hoverDelayer.trigger(() => sash.el.classList.add('hover'));
        }
        if (!fromLinkedSash && sash.linkedSash) {
            Sash.onMouseEnter(sash.linkedSash, true);
        }
    }
    static onMouseLeave(sash, fromLinkedSash = false) {
        sash.hoverDelayer.cancel();
        sash.el.classList.remove('hover');
        if (!fromLinkedSash && sash.linkedSash) {
            Sash.onMouseLeave(sash.linkedSash, true);
        }
    }
    layout() {
        if (this.orientation === 0 /* VERTICAL */) {
            const verticalProvider = this.layoutProvider;
            this.el.style.left = verticalProvider.getVerticalSashLeft(this) - (this.size / 2) + 'px';
            if (verticalProvider.getVerticalSashTop) {
                this.el.style.top = verticalProvider.getVerticalSashTop(this) + 'px';
            }
            if (verticalProvider.getVerticalSashHeight) {
                this.el.style.height = verticalProvider.getVerticalSashHeight(this) + 'px';
            }
        }
        else {
            const horizontalProvider = this.layoutProvider;
            this.el.style.top = horizontalProvider.getHorizontalSashTop(this) - (this.size / 2) + 'px';
            if (horizontalProvider.getHorizontalSashLeft) {
                this.el.style.left = horizontalProvider.getHorizontalSashLeft(this) + 'px';
            }
            if (horizontalProvider.getHorizontalSashWidth) {
                this.el.style.width = horizontalProvider.getHorizontalSashWidth(this) + 'px';
            }
        }
    }
    hide() {
        this.hidden = true;
        this.el.style.display = 'none';
        this.el.setAttribute('aria-hidden', 'true');
    }
    getOrthogonalSash(e) {
        if (!e.target || !(e.target instanceof HTMLElement)) {
            return undefined;
        }
        if (e.target.classList.contains('orthogonal-drag-handle')) {
            return e.target.classList.contains('start') ? this.orthogonalStartSash : this.orthogonalEndSash;
        }
        return undefined;
    }
    dispose() {
        super.dispose();
        this.el.remove();
    }
}

/** SNOWPACK INJECT STYLE: monaco-editor/esm/vs/base/browser/ui/inputbox/inputBox.css */
function __snowpack__injectStyle$2(css) {
  const headEl = document.head || document.getElementsByTagName('head')[0];
  const styleEl = document.createElement('style');
  styleEl.type = 'text/css';
  if (styleEl.styleSheet) {
    styleEl.styleSheet.cssText = css;
  } else {
    styleEl.appendChild(document.createTextNode(css));
  }
  headEl.appendChild(styleEl);
}
__snowpack__injectStyle$2("/*---------------------------------------------------------------------------------------------\r\n *  Copyright (c) Microsoft Corporation. All rights reserved.\r\n *  Licensed under the MIT License. See License.txt in the project root for license information.\r\n *--------------------------------------------------------------------------------------------*/\r\n\r\n.monaco-inputbox {\r\n\tposition: relative;\r\n\tdisplay: block;\r\n\tpadding: 0;\r\n\tbox-sizing:\tborder-box;\r\n\r\n\t/* Customizable */\r\n\tfont-size: inherit;\r\n}\r\n\r\n.monaco-inputbox.idle {\r\n\tborder: 1px solid transparent;\r\n}\r\n\r\n.monaco-inputbox > .ibwrapper > .input,\r\n.monaco-inputbox > .ibwrapper > .mirror {\r\n\r\n\t/* Customizable */\r\n\tpadding: 4px;\r\n}\r\n\r\n.monaco-inputbox > .ibwrapper {\r\n\tposition: relative;\r\n\twidth: 100%;\r\n\theight: 100%;\r\n}\r\n\r\n.monaco-inputbox > .ibwrapper > .input {\r\n\tdisplay: inline-block;\r\n\tbox-sizing:\tborder-box;\r\n\twidth: 100%;\r\n\theight: 100%;\r\n\tline-height: inherit;\r\n\tborder: none;\r\n\tfont-family: inherit;\r\n\tfont-size: inherit;\r\n\tresize: none;\r\n\tcolor: inherit;\r\n}\r\n\r\n.monaco-inputbox > .ibwrapper > input {\r\n\ttext-overflow: ellipsis;\r\n}\r\n\r\n.monaco-inputbox > .ibwrapper > textarea.input {\r\n\tdisplay: block;\r\n\t-ms-overflow-style: none; /* IE 10+: hide scrollbars */\r\n\tscrollbar-width: none; /* Firefox: hide scrollbars */\r\n\toutline: none;\r\n}\r\n\r\n.monaco-inputbox > .ibwrapper > textarea.input::-webkit-scrollbar {\r\n\tdisplay: none; /* Chrome + Safari: hide scrollbar */\r\n}\r\n\r\n.monaco-inputbox > .ibwrapper > textarea.input.empty {\r\n\twhite-space: nowrap;\r\n}\r\n\r\n.monaco-inputbox > .ibwrapper > .mirror {\r\n\tposition: absolute;\r\n\tdisplay: inline-block;\r\n\twidth: 100%;\r\n\ttop: 0;\r\n\tleft: 0;\r\n\tbox-sizing: border-box;\r\n\twhite-space: pre-wrap;\r\n\tvisibility: hidden;\r\n\tword-wrap: break-word;\r\n}\r\n\r\n/* Context view */\r\n\r\n.monaco-inputbox-container {\r\n\ttext-align: right;\r\n}\r\n\r\n.monaco-inputbox-container .monaco-inputbox-message {\r\n\tdisplay: inline-block;\r\n\toverflow: hidden;\r\n\ttext-align: left;\r\n\twidth: 100%;\r\n\tbox-sizing:\tborder-box;\r\n\tpadding: 0.4em;\r\n\tfont-size: 12px;\r\n\tline-height: 17px;\r\n\tmargin-top: -1px;\r\n\tword-wrap: break-word;\r\n}\r\n\r\n/* Action bar support */\r\n.monaco-inputbox .monaco-action-bar {\r\n\tposition: absolute;\r\n\tright: 2px;\r\n\ttop: 4px;\r\n}\r\n\r\n.monaco-inputbox .monaco-action-bar .action-item {\r\n\tmargin-left: 2px;\r\n}\r\n\r\n.monaco-inputbox .monaco-action-bar .action-item .codicon {\r\n\tbackground-repeat: no-repeat;\r\n\twidth: 16px;\r\n\theight: 16px;\r\n}\r\n");

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
function renderText(text, options = {}) {
    const element = createElement(options);
    element.textContent = text;
    return element;
}
function renderFormattedText(formattedText, options = {}) {
    const element = createElement(options);
    _renderFormattedText(element, parseFormattedText(formattedText), options.actionHandler);
    return element;
}
function createElement(options) {
    const tagName = options.inline ? 'span' : 'div';
    const element = document.createElement(tagName);
    if (options.className) {
        element.className = options.className;
    }
    return element;
}
class StringStream {
    constructor(source) {
        this.source = source;
        this.index = 0;
    }
    eos() {
        return this.index >= this.source.length;
    }
    next() {
        const next = this.peek();
        this.advance();
        return next;
    }
    peek() {
        return this.source[this.index];
    }
    advance() {
        this.index++;
    }
}
function _renderFormattedText(element, treeNode, actionHandler) {
    let child;
    if (treeNode.type === 2 /* Text */) {
        child = document.createTextNode(treeNode.content || '');
    }
    else if (treeNode.type === 3 /* Bold */) {
        child = document.createElement('b');
    }
    else if (treeNode.type === 4 /* Italics */) {
        child = document.createElement('i');
    }
    else if (treeNode.type === 5 /* Action */ && actionHandler) {
        const a = document.createElement('a');
        a.href = '#';
        actionHandler.disposeables.add(addStandardDisposableListener(a, 'click', (event) => {
            actionHandler.callback(String(treeNode.index), event);
        }));
        child = a;
    }
    else if (treeNode.type === 7 /* NewLine */) {
        child = document.createElement('br');
    }
    else if (treeNode.type === 1 /* Root */) {
        child = element;
    }
    if (child && element !== child) {
        element.appendChild(child);
    }
    if (child && Array.isArray(treeNode.children)) {
        treeNode.children.forEach((nodeChild) => {
            _renderFormattedText(child, nodeChild, actionHandler);
        });
    }
}
function parseFormattedText(content) {
    const root = {
        type: 1 /* Root */,
        children: []
    };
    let actionViewItemIndex = 0;
    let current = root;
    const stack = [];
    const stream = new StringStream(content);
    while (!stream.eos()) {
        let next = stream.next();
        const isEscapedFormatType = (next === '\\' && formatTagType(stream.peek()) !== 0 /* Invalid */);
        if (isEscapedFormatType) {
            next = stream.next(); // unread the backslash if it escapes a format tag type
        }
        if (!isEscapedFormatType && isFormatTag(next) && next === stream.peek()) {
            stream.advance();
            if (current.type === 2 /* Text */) {
                current = stack.pop();
            }
            const type = formatTagType(next);
            if (current.type === type || (current.type === 5 /* Action */ && type === 6 /* ActionClose */)) {
                current = stack.pop();
            }
            else {
                const newCurrent = {
                    type: type,
                    children: []
                };
                if (type === 5 /* Action */) {
                    newCurrent.index = actionViewItemIndex;
                    actionViewItemIndex++;
                }
                current.children.push(newCurrent);
                stack.push(current);
                current = newCurrent;
            }
        }
        else if (next === '\n') {
            if (current.type === 2 /* Text */) {
                current = stack.pop();
            }
            current.children.push({
                type: 7 /* NewLine */
            });
        }
        else {
            if (current.type !== 2 /* Text */) {
                const textCurrent = {
                    type: 2 /* Text */,
                    content: next
                };
                current.children.push(textCurrent);
                stack.push(current);
                current = textCurrent;
            }
            else {
                current.content += next;
            }
        }
    }
    if (current.type === 2 /* Text */) {
        current = stack.pop();
    }
    return root;
}
function isFormatTag(char) {
    return formatTagType(char) !== 0 /* Invalid */;
}
function formatTagType(char) {
    switch (char) {
        case '*':
            return 3 /* Bold */;
        case '_':
            return 4 /* Italics */;
        case '[':
            return 5 /* Action */;
        case ']':
            return 6 /* ActionClose */;
        default:
            return 0 /* Invalid */;
    }
}

/** SNOWPACK INJECT STYLE: monaco-editor/esm/vs/base/browser/ui/actionbar/actionbar.css */
function __snowpack__injectStyle$3(css) {
  const headEl = document.head || document.getElementsByTagName('head')[0];
  const styleEl = document.createElement('style');
  styleEl.type = 'text/css';
  if (styleEl.styleSheet) {
    styleEl.styleSheet.cssText = css;
  } else {
    styleEl.appendChild(document.createTextNode(css));
  }
  headEl.appendChild(styleEl);
}
__snowpack__injectStyle$3("/*---------------------------------------------------------------------------------------------\r\n *  Copyright (c) Microsoft Corporation. All rights reserved.\r\n *  Licensed under the MIT License. See License.txt in the project root for license information.\r\n *--------------------------------------------------------------------------------------------*/\r\n\r\n.monaco-action-bar {\r\n\ttext-align: right;\r\n\twhite-space: nowrap;\r\n}\r\n\r\n.monaco-action-bar .actions-container {\r\n\tdisplay: flex;\r\n\tmargin: 0 auto;\r\n\tpadding: 0;\r\n\twidth: 100%;\r\n\tjustify-content: flex-end;\r\n}\r\n\r\n.monaco-action-bar.vertical .actions-container {\r\n\tdisplay: inline-block;\r\n}\r\n\r\n.monaco-action-bar.reverse .actions-container {\r\n\tflex-direction: row-reverse;\r\n}\r\n\r\n.monaco-action-bar .action-item {\r\n\tcursor: pointer;\r\n\tdisplay: inline-block;\r\n\ttransition: transform 50ms ease;\r\n\tposition: relative;  /* DO NOT REMOVE - this is the key to preventing the ghosting icon bug in Chrome 42 */\r\n}\r\n\r\n.monaco-action-bar .action-item.disabled {\r\n\tcursor: default;\r\n}\r\n\r\n.monaco-action-bar.animated .action-item.active {\r\n\ttransform: scale(1.272019649, 1.272019649); /* 1.272019649 = √φ */\r\n}\r\n\r\n.monaco-action-bar .action-item .icon,\r\n.monaco-action-bar .action-item .codicon {\r\n\tdisplay: inline-block;\r\n}\r\n\r\n.monaco-action-bar .action-item .codicon {\r\n\tdisplay: flex;\r\n\talign-items: center;\r\n}\r\n\r\n.monaco-action-bar .action-label {\r\n\tfont-size: 11px;\r\n\tmargin-right: 4px;\r\n}\r\n\r\n.monaco-action-bar .action-item.disabled .action-label,\r\n.monaco-action-bar .action-item.disabled .action-label::before,\r\n.monaco-action-bar .action-item.disabled .action-label:hover {\r\n\topacity: 0.4;\r\n}\r\n\r\n/* Vertical actions */\r\n\r\n.monaco-action-bar.vertical {\r\n\ttext-align: left;\r\n}\r\n\r\n.monaco-action-bar.vertical .action-item {\r\n\tdisplay: block;\r\n}\r\n\r\n.monaco-action-bar.vertical .action-label.separator {\r\n\tdisplay: block;\r\n\tborder-bottom: 1px solid #bbb;\r\n\tpadding-top: 1px;\r\n\tmargin-left: .8em;\r\n\tmargin-right: .8em;\r\n}\r\n\r\n.monaco-action-bar.animated.vertical .action-item.active {\r\n\ttransform: translate(5px, 0);\r\n}\r\n\r\n.secondary-actions .monaco-action-bar .action-label {\r\n\tmargin-left: 6px;\r\n}\r\n\r\n/* Action Items */\r\n.monaco-action-bar .action-item.select-container {\r\n\toverflow: hidden; /* somehow the dropdown overflows its container, we prevent it here to not push */\r\n\tflex: 1;\r\n\tmax-width: 170px;\r\n\tmin-width: 60px;\r\n\tdisplay: flex;\r\n\talign-items: center;\r\n\tjustify-content: center;\r\n\tmargin-right: 10px;\r\n}\r\n\r\n.monaco-action-bar .action-item.action-dropdown-item {\r\n\tdisplay: flex;\r\n}\r\n\r\n.monaco-action-bar .action-item.action-dropdown-item > .action-label {\r\n\tmargin-right: 1px;\r\n}\r\n");

// Common data transfers
const DataTransfers = {
    /**
     * Application specific resource transfer type
     */
    RESOURCES: 'ResourceURLs',
    /**
     * Browser specific transfer type to download
     */
    DOWNLOAD_URL: 'DownloadURL',
    /**
     * Browser specific transfer type for files
     */
    FILES: 'Files',
    /**
     * Typically transfer type for copy/paste transfers.
     */
    TEXT: 'text/plain'
};
class DragAndDropData {
    constructor(data) {
        this.data = data;
    }
    update() {
        // noop
    }
    getData() {
        return this.data;
    }
}
const StaticDND = {
    CurrentDragAndDropData: undefined
};

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
class BaseActionViewItem extends Disposable {
    constructor(context, action, options = {}) {
        super();
        this.options = options;
        this._context = context || this;
        this._action = action;
        if (action instanceof Action) {
            this._register(action.onDidChange(event => {
                if (!this.element) {
                    // we have not been rendered yet, so there
                    // is no point in updating the UI
                    return;
                }
                this.handleActionChangeEvent(event);
            }));
        }
    }
    handleActionChangeEvent(event) {
        if (event.enabled !== undefined) {
            this.updateEnabled();
        }
        if (event.checked !== undefined) {
            this.updateChecked();
        }
        if (event.class !== undefined) {
            this.updateClass();
        }
        if (event.label !== undefined) {
            this.updateLabel();
            this.updateTooltip();
        }
        if (event.tooltip !== undefined) {
            this.updateTooltip();
        }
    }
    get actionRunner() {
        if (!this._actionRunner) {
            this._actionRunner = this._register(new ActionRunner());
        }
        return this._actionRunner;
    }
    set actionRunner(actionRunner) {
        this._actionRunner = actionRunner;
    }
    getAction() {
        return this._action;
    }
    isEnabled() {
        return this._action.enabled;
    }
    setActionContext(newContext) {
        this._context = newContext;
    }
    render(container) {
        const element = this.element = container;
        this._register(Gesture.addTarget(container));
        const enableDragging = this.options && this.options.draggable;
        if (enableDragging) {
            container.draggable = true;
            if (isFirefox) {
                // Firefox: requires to set a text data transfer to get going
                this._register(addDisposableListener(container, EventType$1.DRAG_START, e => { var _a; return (_a = e.dataTransfer) === null || _a === void 0 ? void 0 : _a.setData(DataTransfers.TEXT, this._action.label); }));
            }
        }
        this._register(addDisposableListener(element, EventType.Tap, e => this.onClick(e)));
        this._register(addDisposableListener(element, EventType$1.MOUSE_DOWN, e => {
            if (!enableDragging) {
                EventHelper.stop(e, true); // do not run when dragging is on because that would disable it
            }
            if (this._action.enabled && e.button === 0) {
                element.classList.add('active');
            }
        }));
        if (isMacintosh) {
            // macOS: allow to trigger the button when holding Ctrl+key and pressing the
            // main mouse button. This is for scenarios where e.g. some interaction forces
            // the Ctrl+key to be pressed and hold but the user still wants to interact
            // with the actions (for example quick access in quick navigation mode).
            this._register(addDisposableListener(element, EventType$1.CONTEXT_MENU, e => {
                if (e.button === 0 && e.ctrlKey === true) {
                    this.onClick(e);
                }
            }));
        }
        this._register(addDisposableListener(element, EventType$1.CLICK, e => {
            EventHelper.stop(e, true);
            // menus do not use the click event
            if (!(this.options && this.options.isMenu)) {
                setImmediate(() => this.onClick(e));
            }
        }));
        this._register(addDisposableListener(element, EventType$1.DBLCLICK, e => {
            EventHelper.stop(e, true);
        }));
        [EventType$1.MOUSE_UP, EventType$1.MOUSE_OUT].forEach(event => {
            this._register(addDisposableListener(element, event, e => {
                EventHelper.stop(e);
                element.classList.remove('active');
            }));
        });
    }
    onClick(event) {
        var _a;
        EventHelper.stop(event, true);
        const context = isUndefinedOrNull(this._context) ? ((_a = this.options) === null || _a === void 0 ? void 0 : _a.useEventAsContext) ? event : undefined : this._context;
        this.actionRunner.run(this._action, context);
    }
    // Only set the tabIndex on the element once it is about to get focused
    // That way this element wont be a tab stop when it is not needed #106441
    focus() {
        if (this.element) {
            this.element.tabIndex = 0;
            this.element.focus();
            this.element.classList.add('focused');
        }
    }
    blur() {
        if (this.element) {
            this.element.blur();
            this.element.tabIndex = -1;
            this.element.classList.remove('focused');
        }
    }
    setFocusable(focusable) {
        if (this.element) {
            this.element.tabIndex = focusable ? 0 : -1;
        }
    }
    get trapsArrowNavigation() {
        return false;
    }
    updateEnabled() {
        // implement in subclass
    }
    updateLabel() {
        // implement in subclass
    }
    updateTooltip() {
        // implement in subclass
    }
    updateClass() {
        // implement in subclass
    }
    updateChecked() {
        // implement in subclass
    }
    dispose() {
        if (this.element) {
            this.element.remove();
            this.element = undefined;
        }
        super.dispose();
    }
}
class ActionViewItem extends BaseActionViewItem {
    constructor(context, action, options = {}) {
        super(context, action, options);
        this.options = options;
        this.options.icon = options.icon !== undefined ? options.icon : false;
        this.options.label = options.label !== undefined ? options.label : true;
        this.cssClass = '';
    }
    render(container) {
        super.render(container);
        if (this.element) {
            this.label = append(this.element, $$1('a.action-label'));
        }
        if (this.label) {
            if (this._action.id === Separator.ID) {
                this.label.setAttribute('role', 'presentation'); // A separator is a presentation item
            }
            else {
                if (this.options.isMenu) {
                    this.label.setAttribute('role', 'menuitem');
                }
                else {
                    this.label.setAttribute('role', 'button');
                }
            }
        }
        if (this.options.label && this.options.keybinding && this.element) {
            append(this.element, $$1('span.keybinding')).textContent = this.options.keybinding;
        }
        this.updateClass();
        this.updateLabel();
        this.updateTooltip();
        this.updateEnabled();
        this.updateChecked();
    }
    // Only set the tabIndex on the element once it is about to get focused
    // That way this element wont be a tab stop when it is not needed #106441
    focus() {
        if (this.label) {
            this.label.tabIndex = 0;
            this.label.focus();
        }
    }
    blur() {
        if (this.label) {
            this.label.tabIndex = -1;
        }
    }
    setFocusable(focusable) {
        if (this.label) {
            this.label.tabIndex = focusable ? 0 : -1;
        }
    }
    updateLabel() {
        if (this.options.label && this.label) {
            this.label.textContent = this.getAction().label;
        }
    }
    updateTooltip() {
        let title = null;
        if (this.getAction().tooltip) {
            title = this.getAction().tooltip;
        }
        else if (!this.options.label && this.getAction().label && this.options.icon) {
            title = this.getAction().label;
            if (this.options.keybinding) {
                title = localize({ key: 'titleLabel', comment: ['action title', 'action keybinding'] }, "{0} ({1})", title, this.options.keybinding);
            }
        }
        if (title && this.label) {
            this.label.title = title;
        }
    }
    updateClass() {
        if (this.cssClass && this.label) {
            this.label.classList.remove(...this.cssClass.split(' '));
        }
        if (this.options.icon) {
            this.cssClass = this.getAction().class;
            if (this.label) {
                this.label.classList.add('codicon');
                if (this.cssClass) {
                    this.label.classList.add(...this.cssClass.split(' '));
                }
            }
            this.updateEnabled();
        }
        else {
            if (this.label) {
                this.label.classList.remove('codicon');
            }
        }
    }
    updateEnabled() {
        if (this.getAction().enabled) {
            if (this.label) {
                this.label.removeAttribute('aria-disabled');
                this.label.classList.remove('disabled');
            }
            if (this.element) {
                this.element.classList.remove('disabled');
            }
        }
        else {
            if (this.label) {
                this.label.setAttribute('aria-disabled', 'true');
                this.label.classList.add('disabled');
            }
            if (this.element) {
                this.element.classList.add('disabled');
            }
        }
    }
    updateChecked() {
        if (this.label) {
            if (this.getAction().checked) {
                this.label.classList.add('checked');
            }
            else {
                this.label.classList.remove('checked');
            }
        }
    }
}

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
class ActionBar extends Disposable {
    constructor(container, options = {}) {
        var _a, _b, _c, _d, _e, _f;
        super();
        // Trigger Key Tracking
        this.triggerKeyDown = false;
        this.focusable = true;
        this._onDidBlur = this._register(new Emitter());
        this.onDidBlur = this._onDidBlur.event;
        this._onDidCancel = this._register(new Emitter({ onFirstListenerAdd: () => this.cancelHasListener = true }));
        this.onDidCancel = this._onDidCancel.event;
        this.cancelHasListener = false;
        this._onDidRun = this._register(new Emitter());
        this.onDidRun = this._onDidRun.event;
        this._onBeforeRun = this._register(new Emitter());
        this.onBeforeRun = this._onBeforeRun.event;
        this.options = options;
        this._context = (_a = options.context) !== null && _a !== void 0 ? _a : null;
        this._orientation = (_b = this.options.orientation) !== null && _b !== void 0 ? _b : 0 /* HORIZONTAL */;
        this._triggerKeys = {
            keyDown: (_d = (_c = this.options.triggerKeys) === null || _c === void 0 ? void 0 : _c.keyDown) !== null && _d !== void 0 ? _d : false,
            keys: (_f = (_e = this.options.triggerKeys) === null || _e === void 0 ? void 0 : _e.keys) !== null && _f !== void 0 ? _f : [3 /* Enter */, 10 /* Space */]
        };
        if (this.options.actionRunner) {
            this._actionRunner = this.options.actionRunner;
        }
        else {
            this._actionRunner = new ActionRunner();
            this._register(this._actionRunner);
        }
        this._register(this._actionRunner.onDidRun(e => this._onDidRun.fire(e)));
        this._register(this._actionRunner.onBeforeRun(e => this._onBeforeRun.fire(e)));
        this._actionIds = [];
        this.viewItems = [];
        this.focusedItem = undefined;
        this.domNode = document.createElement('div');
        this.domNode.className = 'monaco-action-bar';
        if (options.animated !== false) {
            this.domNode.classList.add('animated');
        }
        let previousKeys;
        let nextKeys;
        switch (this._orientation) {
            case 0 /* HORIZONTAL */:
                previousKeys = [15 /* LeftArrow */];
                nextKeys = [17 /* RightArrow */];
                break;
            case 1 /* HORIZONTAL_REVERSE */:
                previousKeys = [17 /* RightArrow */];
                nextKeys = [15 /* LeftArrow */];
                this.domNode.className += ' reverse';
                break;
            case 2 /* VERTICAL */:
                previousKeys = [16 /* UpArrow */];
                nextKeys = [18 /* DownArrow */];
                this.domNode.className += ' vertical';
                break;
            case 3 /* VERTICAL_REVERSE */:
                previousKeys = [18 /* DownArrow */];
                nextKeys = [16 /* UpArrow */];
                this.domNode.className += ' vertical reverse';
                break;
        }
        this._register(addDisposableListener(this.domNode, EventType$1.KEY_DOWN, e => {
            const event = new StandardKeyboardEvent(e);
            let eventHandled = true;
            const focusedItem = typeof this.focusedItem === 'number' ? this.viewItems[this.focusedItem] : undefined;
            if (previousKeys && (event.equals(previousKeys[0]) || event.equals(previousKeys[1]))) {
                eventHandled = this.focusPrevious();
            }
            else if (nextKeys && (event.equals(nextKeys[0]) || event.equals(nextKeys[1]))) {
                eventHandled = this.focusNext();
            }
            else if (event.equals(9 /* Escape */) && this.cancelHasListener) {
                this._onDidCancel.fire();
            }
            else if (event.equals(2 /* Tab */) && focusedItem instanceof BaseActionViewItem && focusedItem.trapsArrowNavigation) {
                this.focusNext();
            }
            else if (this.isTriggerKeyEvent(event)) {
                // Staying out of the else branch even if not triggered
                if (this._triggerKeys.keyDown) {
                    this.doTrigger(event);
                }
                else {
                    this.triggerKeyDown = true;
                }
            }
            else {
                eventHandled = false;
            }
            if (eventHandled) {
                event.preventDefault();
                event.stopPropagation();
            }
        }));
        this._register(addDisposableListener(this.domNode, EventType$1.KEY_UP, e => {
            const event = new StandardKeyboardEvent(e);
            // Run action on Enter/Space
            if (this.isTriggerKeyEvent(event)) {
                if (!this._triggerKeys.keyDown && this.triggerKeyDown) {
                    this.triggerKeyDown = false;
                    this.doTrigger(event);
                }
                event.preventDefault();
                event.stopPropagation();
            }
            // Recompute focused item
            else if (event.equals(2 /* Tab */) || event.equals(1024 /* Shift */ | 2 /* Tab */)) {
                this.updateFocusedItem();
            }
        }));
        this.focusTracker = this._register(trackFocus(this.domNode));
        this._register(this.focusTracker.onDidBlur(() => {
            if (getActiveElement() === this.domNode || !isAncestor(getActiveElement(), this.domNode)) {
                this._onDidBlur.fire();
                this.focusedItem = undefined;
                this.triggerKeyDown = false;
            }
        }));
        this._register(this.focusTracker.onDidFocus(() => this.updateFocusedItem()));
        this.actionsList = document.createElement('ul');
        this.actionsList.className = 'actions-container';
        this.actionsList.setAttribute('role', 'toolbar');
        if (this.options.ariaLabel) {
            this.actionsList.setAttribute('aria-label', this.options.ariaLabel);
        }
        this.domNode.appendChild(this.actionsList);
        container.appendChild(this.domNode);
    }
    isTriggerKeyEvent(event) {
        let ret = false;
        this._triggerKeys.keys.forEach(keyCode => {
            ret = ret || event.equals(keyCode);
        });
        return ret;
    }
    updateFocusedItem() {
        for (let i = 0; i < this.actionsList.children.length; i++) {
            const elem = this.actionsList.children[i];
            if (isAncestor(getActiveElement(), elem)) {
                this.focusedItem = i;
                break;
            }
        }
    }
    get context() {
        return this._context;
    }
    set context(context) {
        this._context = context;
        this.viewItems.forEach(i => i.setActionContext(context));
    }
    get actionRunner() {
        return this._actionRunner;
    }
    set actionRunner(actionRunner) {
        if (actionRunner) {
            this._actionRunner = actionRunner;
            this.viewItems.forEach(item => item.actionRunner = actionRunner);
        }
    }
    getContainer() {
        return this.domNode;
    }
    push(arg, options = {}) {
        const actions = Array.isArray(arg) ? arg : [arg];
        let index = isNumber(options.index) ? options.index : null;
        actions.forEach((action) => {
            const actionViewItemElement = document.createElement('li');
            actionViewItemElement.className = 'action-item';
            actionViewItemElement.setAttribute('role', 'presentation');
            // Prevent native context menu on actions
            if (!this.options.allowContextMenu) {
                this._register(addDisposableListener(actionViewItemElement, EventType$1.CONTEXT_MENU, (e) => {
                    EventHelper.stop(e, true);
                }));
            }
            let item;
            if (this.options.actionViewItemProvider) {
                item = this.options.actionViewItemProvider(action);
            }
            if (!item) {
                item = new ActionViewItem(this.context, action, options);
            }
            item.actionRunner = this._actionRunner;
            item.setActionContext(this.context);
            item.render(actionViewItemElement);
            if (this.focusable && item instanceof BaseActionViewItem && this.viewItems.length === 0) {
                // We need to allow for the first enabled item to be focused on using tab navigation #106441
                item.setFocusable(true);
            }
            if (index === null || index < 0 || index >= this.actionsList.children.length) {
                this.actionsList.appendChild(actionViewItemElement);
                this.viewItems.push(item);
                this._actionIds.push(action.id);
            }
            else {
                this.actionsList.insertBefore(actionViewItemElement, this.actionsList.children[index]);
                this.viewItems.splice(index, 0, item);
                this._actionIds.splice(index, 0, action.id);
                index++;
            }
        });
        if (typeof this.focusedItem === 'number') {
            // After a clear actions might be re-added to simply toggle some actions. We should preserve focus #97128
            this.focus(this.focusedItem);
        }
    }
    clear() {
        dispose(this.viewItems);
        this.viewItems = [];
        this._actionIds = [];
        clearNode(this.actionsList);
    }
    focus(arg) {
        let selectFirst = false;
        let index = undefined;
        if (arg === undefined) {
            selectFirst = true;
        }
        else if (typeof arg === 'number') {
            index = arg;
        }
        else if (typeof arg === 'boolean') {
            selectFirst = arg;
        }
        if (selectFirst && typeof this.focusedItem === 'undefined') {
            const firstEnabled = this.viewItems.findIndex(item => item.isEnabled());
            // Focus the first enabled item
            this.focusedItem = firstEnabled === -1 ? undefined : firstEnabled;
            this.updateFocus();
        }
        else {
            if (index !== undefined) {
                this.focusedItem = index;
            }
            this.updateFocus();
        }
    }
    focusNext() {
        if (typeof this.focusedItem === 'undefined') {
            this.focusedItem = this.viewItems.length - 1;
        }
        const startIndex = this.focusedItem;
        let item;
        do {
            if (this.options.preventLoopNavigation && this.focusedItem + 1 >= this.viewItems.length) {
                this.focusedItem = startIndex;
                return false;
            }
            this.focusedItem = (this.focusedItem + 1) % this.viewItems.length;
            item = this.viewItems[this.focusedItem];
        } while (this.focusedItem !== startIndex && this.options.focusOnlyEnabledItems && !item.isEnabled());
        this.updateFocus();
        return true;
    }
    focusPrevious() {
        if (typeof this.focusedItem === 'undefined') {
            this.focusedItem = 0;
        }
        const startIndex = this.focusedItem;
        let item;
        do {
            this.focusedItem = this.focusedItem - 1;
            if (this.focusedItem < 0) {
                if (this.options.preventLoopNavigation) {
                    this.focusedItem = startIndex;
                    return false;
                }
                this.focusedItem = this.viewItems.length - 1;
            }
            item = this.viewItems[this.focusedItem];
        } while (this.focusedItem !== startIndex && this.options.focusOnlyEnabledItems && !item.isEnabled());
        this.updateFocus(true);
        return true;
    }
    updateFocus(fromRight, preventScroll) {
        if (typeof this.focusedItem === 'undefined') {
            this.actionsList.focus({ preventScroll });
        }
        for (let i = 0; i < this.viewItems.length; i++) {
            const item = this.viewItems[i];
            const actionViewItem = item;
            if (i === this.focusedItem) {
                let focusItem = true;
                if (!isFunction(actionViewItem.focus)) {
                    focusItem = false;
                }
                if (this.options.focusOnlyEnabledItems && isFunction(item.isEnabled) && !item.isEnabled()) {
                    focusItem = false;
                }
                if (focusItem) {
                    actionViewItem.focus(fromRight);
                }
                else {
                    this.actionsList.focus({ preventScroll });
                }
            }
            else {
                if (isFunction(actionViewItem.blur)) {
                    actionViewItem.blur();
                }
            }
        }
    }
    doTrigger(event) {
        if (typeof this.focusedItem === 'undefined') {
            return; //nothing to focus
        }
        // trigger action
        const actionViewItem = this.viewItems[this.focusedItem];
        if (actionViewItem instanceof BaseActionViewItem) {
            const context = (actionViewItem._context === null || actionViewItem._context === undefined) ? event : actionViewItem._context;
            this.run(actionViewItem._action, context);
        }
    }
    run(action, context) {
        return this._actionRunner.run(action, context);
    }
    dispose() {
        dispose(this.viewItems);
        this.viewItems = [];
        this._actionIds = [];
        this.getContainer().remove();
        super.dispose();
    }
}

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
class ArrayNavigator {
    constructor(items, start = 0, end = items.length, index = start - 1) {
        this.items = items;
        this.start = start;
        this.end = end;
        this.index = index;
    }
    current() {
        if (this.index === this.start - 1 || this.index === this.end) {
            return null;
        }
        return this.items[this.index];
    }
    next() {
        this.index = Math.min(this.index + 1, this.end);
        return this.current();
    }
    previous() {
        this.index = Math.max(this.index - 1, this.start - 1);
        return this.current();
    }
    first() {
        this.index = this.start;
        return this.current();
    }
    last() {
        this.index = this.end - 1;
        return this.current();
    }
}

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
class HistoryNavigator {
    constructor(history = [], limit = 10) {
        this._initialize(history);
        this._limit = limit;
        this._onChange();
    }
    add(t) {
        this._history.delete(t);
        this._history.add(t);
        this._onChange();
    }
    next() {
        if (this._currentPosition() !== this._elements.length - 1) {
            return this._navigator.next();
        }
        return null;
    }
    previous() {
        if (this._currentPosition() !== 0) {
            return this._navigator.previous();
        }
        return null;
    }
    current() {
        return this._navigator.current();
    }
    first() {
        return this._navigator.first();
    }
    last() {
        return this._navigator.last();
    }
    has(t) {
        return this._history.has(t);
    }
    _onChange() {
        this._reduceToLimit();
        const elements = this._elements;
        this._navigator = new ArrayNavigator(elements, 0, elements.length, elements.length);
    }
    _reduceToLimit() {
        const data = this._elements;
        if (data.length > this._limit) {
            this._initialize(data.slice(data.length - this._limit));
        }
    }
    _currentPosition() {
        const currentElement = this._navigator.current();
        if (!currentElement) {
            return -1;
        }
        return this._elements.indexOf(currentElement);
    }
    _initialize(history) {
        this._history = new Set();
        for (const entry of history) {
            this._history.add(entry);
        }
    }
    get _elements() {
        const elements = [];
        this._history.forEach(e => elements.push(e));
        return elements;
    }
}

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
const $ = $$1;
const defaultOpts = {
    inputBackground: Color.fromHex('#3C3C3C'),
    inputForeground: Color.fromHex('#CCCCCC'),
    inputValidationInfoBorder: Color.fromHex('#55AAFF'),
    inputValidationInfoBackground: Color.fromHex('#063B49'),
    inputValidationWarningBorder: Color.fromHex('#B89500'),
    inputValidationWarningBackground: Color.fromHex('#352A05'),
    inputValidationErrorBorder: Color.fromHex('#BE1100'),
    inputValidationErrorBackground: Color.fromHex('#5A1D1D')
};
class InputBox extends Widget {
    constructor(container, contextViewProvider, options) {
        super();
        this.state = 'idle';
        this.maxHeight = Number.POSITIVE_INFINITY;
        this._onDidChange = this._register(new Emitter());
        this.onDidChange = this._onDidChange.event;
        this._onDidHeightChange = this._register(new Emitter());
        this.onDidHeightChange = this._onDidHeightChange.event;
        this.contextViewProvider = contextViewProvider;
        this.options = options || Object.create(null);
        mixin(this.options, defaultOpts, false);
        this.message = null;
        this.placeholder = this.options.placeholder || '';
        this.ariaLabel = this.options.ariaLabel || '';
        this.inputBackground = this.options.inputBackground;
        this.inputForeground = this.options.inputForeground;
        this.inputBorder = this.options.inputBorder;
        this.inputValidationInfoBorder = this.options.inputValidationInfoBorder;
        this.inputValidationInfoBackground = this.options.inputValidationInfoBackground;
        this.inputValidationInfoForeground = this.options.inputValidationInfoForeground;
        this.inputValidationWarningBorder = this.options.inputValidationWarningBorder;
        this.inputValidationWarningBackground = this.options.inputValidationWarningBackground;
        this.inputValidationWarningForeground = this.options.inputValidationWarningForeground;
        this.inputValidationErrorBorder = this.options.inputValidationErrorBorder;
        this.inputValidationErrorBackground = this.options.inputValidationErrorBackground;
        this.inputValidationErrorForeground = this.options.inputValidationErrorForeground;
        if (this.options.validationOptions) {
            this.validation = this.options.validationOptions.validation;
        }
        this.element = append(container, $('.monaco-inputbox.idle'));
        let tagName = this.options.flexibleHeight ? 'textarea' : 'input';
        let wrapper = append(this.element, $('.ibwrapper'));
        this.input = append(wrapper, $(tagName + '.input.empty'));
        this.input.setAttribute('autocorrect', 'off');
        this.input.setAttribute('autocapitalize', 'off');
        this.input.setAttribute('spellcheck', 'false');
        this.onfocus(this.input, () => this.element.classList.add('synthetic-focus'));
        this.onblur(this.input, () => this.element.classList.remove('synthetic-focus'));
        if (this.options.flexibleHeight) {
            this.maxHeight = typeof this.options.flexibleMaxHeight === 'number' ? this.options.flexibleMaxHeight : Number.POSITIVE_INFINITY;
            this.mirror = append(wrapper, $('div.mirror'));
            this.mirror.innerText = '\u00a0';
            this.scrollableElement = new ScrollableElement(this.element, { vertical: 1 /* Auto */ });
            if (this.options.flexibleWidth) {
                this.input.setAttribute('wrap', 'off');
                this.mirror.style.whiteSpace = 'pre';
                this.mirror.style.wordWrap = 'initial';
            }
            append(container, this.scrollableElement.getDomNode());
            this._register(this.scrollableElement);
            // from ScrollableElement to DOM
            this._register(this.scrollableElement.onScroll(e => this.input.scrollTop = e.scrollTop));
            const onSelectionChange = Event.filter(domEvent(document, 'selectionchange'), () => {
                const selection = document.getSelection();
                return (selection === null || selection === void 0 ? void 0 : selection.anchorNode) === wrapper;
            });
            // from DOM to ScrollableElement
            this._register(onSelectionChange(this.updateScrollDimensions, this));
            this._register(this.onDidHeightChange(this.updateScrollDimensions, this));
        }
        else {
            this.input.type = this.options.type || 'text';
            this.input.setAttribute('wrap', 'off');
        }
        if (this.ariaLabel) {
            this.input.setAttribute('aria-label', this.ariaLabel);
        }
        if (this.placeholder) {
            this.setPlaceHolder(this.placeholder);
        }
        this.oninput(this.input, () => this.onValueChange());
        this.onblur(this.input, () => this.onBlur());
        this.onfocus(this.input, () => this.onFocus());
        this.ignoreGesture(this.input);
        setTimeout(() => this.updateMirror(), 0);
        // Support actions
        if (this.options.actions) {
            this.actionbar = this._register(new ActionBar(this.element));
            this.actionbar.push(this.options.actions, { icon: true, label: false });
        }
        this.applyStyles();
    }
    onBlur() {
        this._hideMessage();
    }
    onFocus() {
        this._showMessage();
    }
    setPlaceHolder(placeHolder) {
        this.placeholder = placeHolder;
        this.input.setAttribute('placeholder', placeHolder);
        this.input.title = placeHolder;
    }
    setAriaLabel(label) {
        this.ariaLabel = label;
        if (label) {
            this.input.setAttribute('aria-label', this.ariaLabel);
        }
        else {
            this.input.removeAttribute('aria-label');
        }
    }
    getAriaLabel() {
        return this.ariaLabel;
    }
    get inputElement() {
        return this.input;
    }
    get value() {
        return this.input.value;
    }
    set value(newValue) {
        if (this.input.value !== newValue) {
            this.input.value = newValue;
            this.onValueChange();
        }
    }
    get height() {
        return typeof this.cachedHeight === 'number' ? this.cachedHeight : getTotalHeight(this.element);
    }
    focus() {
        this.input.focus();
    }
    blur() {
        this.input.blur();
    }
    hasFocus() {
        return document.activeElement === this.input;
    }
    select(range = null) {
        this.input.select();
        if (range) {
            this.input.setSelectionRange(range.start, range.end);
            if (range.end === this.input.value.length) {
                this.input.scrollLeft = this.input.scrollWidth;
            }
        }
    }
    isSelectionAtEnd() {
        return this.input.selectionEnd === this.input.value.length && this.input.selectionStart === this.input.selectionEnd;
    }
    enable() {
        this.input.removeAttribute('disabled');
    }
    disable() {
        this.blur();
        this.input.disabled = true;
        this._hideMessage();
    }
    get width() {
        return getTotalWidth(this.input);
    }
    set width(width) {
        if (this.options.flexibleHeight && this.options.flexibleWidth) {
            // textarea with horizontal scrolling
            let horizontalPadding = 0;
            if (this.mirror) {
                const paddingLeft = parseFloat(this.mirror.style.paddingLeft || '') || 0;
                const paddingRight = parseFloat(this.mirror.style.paddingRight || '') || 0;
                horizontalPadding = paddingLeft + paddingRight;
            }
            this.input.style.width = (width - horizontalPadding) + 'px';
        }
        else {
            this.input.style.width = width + 'px';
        }
        if (this.mirror) {
            this.mirror.style.width = width + 'px';
        }
    }
    set paddingRight(paddingRight) {
        if (this.options.flexibleHeight && this.options.flexibleWidth) {
            this.input.style.width = `calc(100% - ${paddingRight}px)`;
        }
        else {
            this.input.style.paddingRight = paddingRight + 'px';
        }
        if (this.mirror) {
            this.mirror.style.paddingRight = paddingRight + 'px';
        }
    }
    updateScrollDimensions() {
        if (typeof this.cachedContentHeight !== 'number' || typeof this.cachedHeight !== 'number' || !this.scrollableElement) {
            return;
        }
        const scrollHeight = this.cachedContentHeight;
        const height = this.cachedHeight;
        const scrollTop = this.input.scrollTop;
        this.scrollableElement.setScrollDimensions({ scrollHeight, height });
        this.scrollableElement.setScrollPosition({ scrollTop });
    }
    showMessage(message, force) {
        this.message = message;
        this.element.classList.remove('idle');
        this.element.classList.remove('info');
        this.element.classList.remove('warning');
        this.element.classList.remove('error');
        this.element.classList.add(this.classForType(message.type));
        const styles = this.stylesForType(this.message.type);
        this.element.style.border = styles.border ? `1px solid ${styles.border}` : '';
        if (this.hasFocus() || force) {
            this._showMessage();
        }
    }
    hideMessage() {
        this.message = null;
        this.element.classList.remove('info');
        this.element.classList.remove('warning');
        this.element.classList.remove('error');
        this.element.classList.add('idle');
        this._hideMessage();
        this.applyStyles();
    }
    validate() {
        let errorMsg = null;
        if (this.validation) {
            errorMsg = this.validation(this.value);
            if (errorMsg) {
                this.inputElement.setAttribute('aria-invalid', 'true');
                this.showMessage(errorMsg);
            }
            else if (this.inputElement.hasAttribute('aria-invalid')) {
                this.inputElement.removeAttribute('aria-invalid');
                this.hideMessage();
            }
        }
        return errorMsg === null || errorMsg === void 0 ? void 0 : errorMsg.type;
    }
    stylesForType(type) {
        switch (type) {
            case 1 /* INFO */: return { border: this.inputValidationInfoBorder, background: this.inputValidationInfoBackground, foreground: this.inputValidationInfoForeground };
            case 2 /* WARNING */: return { border: this.inputValidationWarningBorder, background: this.inputValidationWarningBackground, foreground: this.inputValidationWarningForeground };
            default: return { border: this.inputValidationErrorBorder, background: this.inputValidationErrorBackground, foreground: this.inputValidationErrorForeground };
        }
    }
    classForType(type) {
        switch (type) {
            case 1 /* INFO */: return 'info';
            case 2 /* WARNING */: return 'warning';
            default: return 'error';
        }
    }
    _showMessage() {
        if (!this.contextViewProvider || !this.message) {
            return;
        }
        let div;
        let layout = () => div.style.width = getTotalWidth(this.element) + 'px';
        this.contextViewProvider.showContextView({
            getAnchor: () => this.element,
            anchorAlignment: 1 /* RIGHT */,
            render: (container) => {
                if (!this.message) {
                    return null;
                }
                div = append(container, $('.monaco-inputbox-container'));
                layout();
                const renderOptions = {
                    inline: true,
                    className: 'monaco-inputbox-message'
                };
                const spanElement = (this.message.formatContent
                    ? renderFormattedText(this.message.content, renderOptions)
                    : renderText(this.message.content, renderOptions));
                spanElement.classList.add(this.classForType(this.message.type));
                const styles = this.stylesForType(this.message.type);
                spanElement.style.backgroundColor = styles.background ? styles.background.toString() : '';
                spanElement.style.color = styles.foreground ? styles.foreground.toString() : '';
                spanElement.style.border = styles.border ? `1px solid ${styles.border}` : '';
                append(div, spanElement);
                return null;
            },
            onHide: () => {
                this.state = 'closed';
            },
            layout: layout
        });
        // ARIA Support
        let alertText;
        if (this.message.type === 3 /* ERROR */) {
            alertText = localize('alertErrorMessage', "Error: {0}", this.message.content);
        }
        else if (this.message.type === 2 /* WARNING */) {
            alertText = localize('alertWarningMessage', "Warning: {0}", this.message.content);
        }
        else {
            alertText = localize('alertInfoMessage', "Info: {0}", this.message.content);
        }
        alert(alertText);
        this.state = 'open';
    }
    _hideMessage() {
        if (!this.contextViewProvider) {
            return;
        }
        if (this.state === 'open') {
            this.contextViewProvider.hideContextView();
        }
        this.state = 'idle';
    }
    onValueChange() {
        this._onDidChange.fire(this.value);
        this.validate();
        this.updateMirror();
        this.input.classList.toggle('empty', !this.value);
        if (this.state === 'open' && this.contextViewProvider) {
            this.contextViewProvider.layout();
        }
    }
    updateMirror() {
        if (!this.mirror) {
            return;
        }
        const value = this.value;
        const lastCharCode = value.charCodeAt(value.length - 1);
        const suffix = lastCharCode === 10 ? ' ' : '';
        const mirrorTextContent = value + suffix;
        if (mirrorTextContent) {
            this.mirror.textContent = value + suffix;
        }
        else {
            this.mirror.innerText = '\u00a0';
        }
        this.layout();
    }
    style(styles) {
        this.inputBackground = styles.inputBackground;
        this.inputForeground = styles.inputForeground;
        this.inputBorder = styles.inputBorder;
        this.inputValidationInfoBackground = styles.inputValidationInfoBackground;
        this.inputValidationInfoForeground = styles.inputValidationInfoForeground;
        this.inputValidationInfoBorder = styles.inputValidationInfoBorder;
        this.inputValidationWarningBackground = styles.inputValidationWarningBackground;
        this.inputValidationWarningForeground = styles.inputValidationWarningForeground;
        this.inputValidationWarningBorder = styles.inputValidationWarningBorder;
        this.inputValidationErrorBackground = styles.inputValidationErrorBackground;
        this.inputValidationErrorForeground = styles.inputValidationErrorForeground;
        this.inputValidationErrorBorder = styles.inputValidationErrorBorder;
        this.applyStyles();
    }
    applyStyles() {
        const background = this.inputBackground ? this.inputBackground.toString() : '';
        const foreground = this.inputForeground ? this.inputForeground.toString() : '';
        const border = this.inputBorder ? this.inputBorder.toString() : '';
        this.element.style.backgroundColor = background;
        this.element.style.color = foreground;
        this.input.style.backgroundColor = 'inherit';
        this.input.style.color = foreground;
        this.element.style.borderWidth = border ? '1px' : '';
        this.element.style.borderStyle = border ? 'solid' : '';
        this.element.style.borderColor = border;
    }
    layout() {
        if (!this.mirror) {
            return;
        }
        const previousHeight = this.cachedContentHeight;
        this.cachedContentHeight = getTotalHeight(this.mirror);
        if (previousHeight !== this.cachedContentHeight) {
            this.cachedHeight = Math.min(this.cachedContentHeight, this.maxHeight);
            this.input.style.height = this.cachedHeight + 'px';
            this._onDidHeightChange.fire(this.cachedContentHeight);
        }
    }
    insertAtCursor(text) {
        const inputElement = this.inputElement;
        const start = inputElement.selectionStart;
        const end = inputElement.selectionEnd;
        const content = inputElement.value;
        if (start !== null && end !== null) {
            this.value = content.substr(0, start) + text + content.substr(end);
            inputElement.setSelectionRange(start + 1, start + 1);
            this.layout();
        }
    }
    dispose() {
        this._hideMessage();
        this.message = null;
        if (this.actionbar) {
            this.actionbar.dispose();
        }
        super.dispose();
    }
}
class HistoryInputBox extends InputBox {
    constructor(container, contextViewProvider, options) {
        super(container, contextViewProvider, options);
        this.history = new HistoryNavigator(options.history, 100);
    }
    addToHistory() {
        if (this.value && this.value !== this.getCurrentValue()) {
            this.history.add(this.value);
        }
    }
    showNextValue() {
        if (!this.history.has(this.value)) {
            this.addToHistory();
        }
        let next = this.getNextValue();
        if (next) {
            next = next === this.value ? this.getNextValue() : next;
        }
        if (next) {
            this.value = next;
            status(this.value);
        }
    }
    showPreviousValue() {
        if (!this.history.has(this.value)) {
            this.addToHistory();
        }
        let previous = this.getPreviousValue();
        if (previous) {
            previous = previous === this.value ? this.getPreviousValue() : previous;
        }
        if (previous) {
            this.value = previous;
            status(this.value);
        }
    }
    getCurrentValue() {
        let currentValue = this.history.current();
        if (!currentValue) {
            currentValue = this.history.last();
            this.history.next();
        }
        return currentValue;
    }
    getPreviousValue() {
        return this.history.previous() || this.history.first();
    }
    getNextValue() {
        return this.history.next() || this.history.last();
    }
}

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
//  ------ API types
// icon registry
const Extensions = {
    IconContribution: 'base.contributions.icons'
};
class IconRegistry {
    constructor() {
        this._onDidChange = new Emitter();
        this.onDidChange = this._onDidChange.event;
        this.iconSchema = {
            definitions: {
                icons: {
                    type: 'object',
                    properties: {
                        fontId: { type: 'string', description: localize('iconDefintion.fontId', 'The id of the font to use. If not set, the font that is defined first is used.') },
                        fontCharacter: { type: 'string', description: localize('iconDefintion.fontCharacter', 'The font character associated with the icon definition.') }
                    },
                    additionalProperties: false,
                    defaultSnippets: [{ body: { fontCharacter: '\\\\e030' } }]
                }
            },
            type: 'object',
            properties: {}
        };
        this.iconReferenceSchema = { type: 'string', pattern: `^${CSSIcon.iconNameExpression}$`, enum: [], enumDescriptions: [] };
        this.iconsById = {};
        this.iconFontsById = {};
    }
    registerIcon(id, defaults, description, deprecationMessage) {
        const existing = this.iconsById[id];
        if (existing) {
            if (description && !existing.description) {
                existing.description = description;
                this.iconSchema.properties[id].markdownDescription = `${description} $(${id})`;
                const enumIndex = this.iconReferenceSchema.enum.indexOf(id);
                if (enumIndex !== -1) {
                    this.iconReferenceSchema.enumDescriptions[enumIndex] = description;
                }
                this._onDidChange.fire();
            }
            return existing;
        }
        let iconContribution = { id, description, defaults, deprecationMessage };
        this.iconsById[id] = iconContribution;
        let propertySchema = { $ref: '#/definitions/icons' };
        if (deprecationMessage) {
            propertySchema.deprecationMessage = deprecationMessage;
        }
        if (description) {
            propertySchema.markdownDescription = `${description}: $(${id})`;
        }
        this.iconSchema.properties[id] = propertySchema;
        this.iconReferenceSchema.enum.push(id);
        this.iconReferenceSchema.enumDescriptions.push(description || '');
        this._onDidChange.fire();
        return { id };
    }
    getIcons() {
        return Object.keys(this.iconsById).map(id => this.iconsById[id]);
    }
    getIcon(id) {
        return this.iconsById[id];
    }
    getIconSchema() {
        return this.iconSchema;
    }
    getIconFont(id) {
        return this.iconFontsById[id];
    }
    toString() {
        const sorter = (i1, i2) => {
            return i1.id.localeCompare(i2.id);
        };
        const classNames = (i) => {
            while (ThemeIcon.isThemeIcon(i.defaults)) {
                i = this.iconsById[i.defaults.id];
            }
            return `codicon codicon-${i ? i.id : ''}`;
        };
        let reference = [];
        reference.push(`| preview     | identifier                        | default codicon ID                | description`);
        reference.push(`| ----------- | --------------------------------- | --------------------------------- | --------------------------------- |`);
        const contributions = Object.keys(this.iconsById).map(key => this.iconsById[key]);
        for (const i of contributions.filter(i => !!i.description).sort(sorter)) {
            reference.push(`|<i class="${classNames(i)}"></i>|${i.id}|${ThemeIcon.isThemeIcon(i.defaults) ? i.defaults.id : i.id}|${i.description || ''}|`);
        }
        reference.push(`| preview     | identifier                        `);
        reference.push(`| ----------- | --------------------------------- |`);
        for (const i of contributions.filter(i => !ThemeIcon.isThemeIcon(i.defaults)).sort(sorter)) {
            reference.push(`|<i class="${classNames(i)}"></i>|${i.id}|`);
        }
        return reference.join('\n');
    }
}
const iconRegistry = new IconRegistry();
Registry.add(Extensions.IconContribution, iconRegistry);
function registerIcon(id, defaults, description, deprecationMessage) {
    return iconRegistry.registerIcon(id, defaults, description, deprecationMessage);
}
function getIconRegistry() {
    return iconRegistry;
}
function initialize() {
    for (const icon of iconRegistry$1.all) {
        iconRegistry.registerIcon(icon.id, icon.definition, icon.description);
    }
    iconRegistry$1.onDidRegister(icon => iconRegistry.registerIcon(icon.id, icon.definition, icon.description));
}
initialize();
const iconsSchemaId = 'vscode://schemas/icons';
let schemaRegistry = Registry.as(Extensions$1.JSONContribution);
schemaRegistry.registerSchema(iconsSchemaId, iconRegistry.getIconSchema());
const delayer = new RunOnceScheduler(() => schemaRegistry.notifySchemaChanged(iconsSchemaId), 200);
iconRegistry.onDidChange(() => {
    if (!delayer.isScheduled()) {
        delayer.schedule();
    }
});
//setTimeout(_ => console.log(iconRegistry.toString()), 5000);
// common icons
const widgetClose = registerIcon('widget-close', Codicon.close, localize('widgetClose', 'Icon for the close action in widgets.'));

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
const IContextViewService = createDecorator('contextViewService');
const IContextMenuService = createDecorator('contextMenuService');

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
const IKeybindingService = createDecorator('keybindingService');

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var StorageState;
(function (StorageState) {
    StorageState[StorageState["None"] = 0] = "None";
    StorageState[StorageState["Initialized"] = 1] = "Initialized";
    StorageState[StorageState["Closed"] = 2] = "Closed";
})(StorageState || (StorageState = {}));
class Storage extends Disposable {
    constructor(database, options = Object.create(null)) {
        super();
        this.database = database;
        this.options = options;
        this._onDidChangeStorage = this._register(new Emitter());
        this.onDidChangeStorage = this._onDidChangeStorage.event;
        this.state = StorageState.None;
        this.cache = new Map();
        this.flushDelayer = new ThrottledDelayer(Storage.DEFAULT_FLUSH_DELAY);
        this.pendingDeletes = new Set();
        this.pendingInserts = new Map();
        this.whenFlushedCallbacks = [];
        this.registerListeners();
    }
    registerListeners() {
        this._register(this.database.onDidChangeItemsExternal(e => this.onDidChangeItemsExternal(e)));
    }
    onDidChangeItemsExternal(e) {
        var _a, _b;
        // items that change external require us to update our
        // caches with the values. we just accept the value and
        // emit an event if there is a change.
        (_a = e.changed) === null || _a === void 0 ? void 0 : _a.forEach((value, key) => this.accept(key, value));
        (_b = e.deleted) === null || _b === void 0 ? void 0 : _b.forEach(key => this.accept(key, undefined));
    }
    accept(key, value) {
        if (this.state === StorageState.Closed) {
            return; // Return early if we are already closed
        }
        let changed = false;
        // Item got removed, check for deletion
        if (isUndefinedOrNull(value)) {
            changed = this.cache.delete(key);
        }
        // Item got updated, check for change
        else {
            const currentValue = this.cache.get(key);
            if (currentValue !== value) {
                this.cache.set(key, value);
                changed = true;
            }
        }
        // Signal to outside listeners
        if (changed) {
            this._onDidChangeStorage.fire(key);
        }
    }
    get(key, fallbackValue) {
        const value = this.cache.get(key);
        if (isUndefinedOrNull(value)) {
            return fallbackValue;
        }
        return value;
    }
    getBoolean(key, fallbackValue) {
        const value = this.get(key);
        if (isUndefinedOrNull(value)) {
            return fallbackValue;
        }
        return value === 'true';
    }
    getNumber(key, fallbackValue) {
        const value = this.get(key);
        if (isUndefinedOrNull(value)) {
            return fallbackValue;
        }
        return parseInt(value, 10);
    }
    set(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.state === StorageState.Closed) {
                return; // Return early if we are already closed
            }
            // We remove the key for undefined/null values
            if (isUndefinedOrNull(value)) {
                return this.delete(key);
            }
            // Otherwise, convert to String and store
            const valueStr = String(value);
            // Return early if value already set
            const currentValue = this.cache.get(key);
            if (currentValue === valueStr) {
                return;
            }
            // Update in cache and pending
            this.cache.set(key, valueStr);
            this.pendingInserts.set(key, valueStr);
            this.pendingDeletes.delete(key);
            // Event
            this._onDidChangeStorage.fire(key);
            // Accumulate work by scheduling after timeout
            return this.flushDelayer.trigger(() => this.flushPending());
        });
    }
    delete(key) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.state === StorageState.Closed) {
                return; // Return early if we are already closed
            }
            // Remove from cache and add to pending
            const wasDeleted = this.cache.delete(key);
            if (!wasDeleted) {
                return; // Return early if value already deleted
            }
            if (!this.pendingDeletes.has(key)) {
                this.pendingDeletes.add(key);
            }
            this.pendingInserts.delete(key);
            // Event
            this._onDidChangeStorage.fire(key);
            // Accumulate work by scheduling after timeout
            return this.flushDelayer.trigger(() => this.flushPending());
        });
    }
    get hasPending() {
        return this.pendingInserts.size > 0 || this.pendingDeletes.size > 0;
    }
    flushPending() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.hasPending) {
                return; // return early if nothing to do
            }
            // Get pending data
            const updateRequest = { insert: this.pendingInserts, delete: this.pendingDeletes };
            // Reset pending data for next run
            this.pendingDeletes = new Set();
            this.pendingInserts = new Map();
            // Update in storage and release any
            // waiters we have once done
            return this.database.updateItems(updateRequest).finally(() => {
                var _a;
                if (!this.hasPending) {
                    while (this.whenFlushedCallbacks.length) {
                        (_a = this.whenFlushedCallbacks.pop()) === null || _a === void 0 ? void 0 : _a();
                    }
                }
            });
        });
    }
    dispose() {
        this.flushDelayer.cancel(); // workaround https://github.com/microsoft/vscode/issues/116777
        this.flushDelayer.dispose();
        super.dispose();
    }
}
Storage.DEFAULT_FLUSH_DELAY = 100;
class InMemoryStorageDatabase {
    constructor() {
        this.onDidChangeItemsExternal = Event.None;
        this.items = new Map();
    }
    updateItems(request) {
        return __awaiter(this, void 0, void 0, function* () {
            if (request.insert) {
                request.insert.forEach((value, key) => this.items.set(key, value));
            }
            if (request.delete) {
                request.delete.forEach(key => this.items.delete(key));
            }
        });
    }
}

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
const TARGET_KEY = '__$__targetStorageMarker';
const IStorageService = createDecorator('storageService');
var WillSaveStateReason;
(function (WillSaveStateReason) {
    /**
     * No specific reason to save state.
     */
    WillSaveStateReason[WillSaveStateReason["NONE"] = 0] = "NONE";
    /**
     * A hint that the workbench is about to shutdown.
     */
    WillSaveStateReason[WillSaveStateReason["SHUTDOWN"] = 1] = "SHUTDOWN";
})(WillSaveStateReason || (WillSaveStateReason = {}));
class AbstractStorageService extends Disposable {
    constructor(options = { flushInterval: AbstractStorageService.DEFAULT_FLUSH_INTERVAL }) {
        super();
        this.options = options;
        this._onDidChangeValue = this._register(new PauseableEmitter());
        this._onDidChangeTarget = this._register(new PauseableEmitter());
        this._onWillSaveState = this._register(new Emitter());
        this.onWillSaveState = this._onWillSaveState.event;
        this._workspaceKeyTargets = undefined;
        this._globalKeyTargets = undefined;
    }
    emitDidChangeValue(scope, key) {
        // Specially handle `TARGET_KEY`
        if (key === TARGET_KEY) {
            // Clear our cached version which is now out of date
            if (scope === 0 /* GLOBAL */) {
                this._globalKeyTargets = undefined;
            }
            else if (scope === 1 /* WORKSPACE */) {
                this._workspaceKeyTargets = undefined;
            }
            // Emit as `didChangeTarget` event
            this._onDidChangeTarget.fire({ scope });
        }
        // Emit any other key to outside
        else {
            this._onDidChangeValue.fire({ scope, key, target: this.getKeyTargets(scope)[key] });
        }
    }
    get(key, scope, fallbackValue) {
        var _a;
        return (_a = this.getStorage(scope)) === null || _a === void 0 ? void 0 : _a.get(key, fallbackValue);
    }
    getBoolean(key, scope, fallbackValue) {
        var _a;
        return (_a = this.getStorage(scope)) === null || _a === void 0 ? void 0 : _a.getBoolean(key, fallbackValue);
    }
    getNumber(key, scope, fallbackValue) {
        var _a;
        return (_a = this.getStorage(scope)) === null || _a === void 0 ? void 0 : _a.getNumber(key, fallbackValue);
    }
    store(key, value, scope, target) {
        // We remove the key for undefined/null values
        if (isUndefinedOrNull(value)) {
            this.remove(key, scope);
            return;
        }
        // Update our datastructures but send events only after
        this.withPausedEmitters(() => {
            var _a;
            // Update key-target map
            this.updateKeyTarget(key, scope, target);
            // Store actual value
            (_a = this.getStorage(scope)) === null || _a === void 0 ? void 0 : _a.set(key, value);
        });
    }
    remove(key, scope) {
        // Update our datastructures but send events only after
        this.withPausedEmitters(() => {
            var _a;
            // Update key-target map
            this.updateKeyTarget(key, scope, undefined);
            // Remove actual key
            (_a = this.getStorage(scope)) === null || _a === void 0 ? void 0 : _a.delete(key);
        });
    }
    withPausedEmitters(fn) {
        // Pause emitters
        this._onDidChangeValue.pause();
        this._onDidChangeTarget.pause();
        try {
            fn();
        }
        finally {
            // Resume emitters
            this._onDidChangeValue.resume();
            this._onDidChangeTarget.resume();
        }
    }
    updateKeyTarget(key, scope, target) {
        var _a, _b;
        // Add
        const keyTargets = this.getKeyTargets(scope);
        if (typeof target === 'number') {
            if (keyTargets[key] !== target) {
                keyTargets[key] = target;
                (_a = this.getStorage(scope)) === null || _a === void 0 ? void 0 : _a.set(TARGET_KEY, JSON.stringify(keyTargets));
            }
        }
        // Remove
        else {
            if (typeof keyTargets[key] === 'number') {
                delete keyTargets[key];
                (_b = this.getStorage(scope)) === null || _b === void 0 ? void 0 : _b.set(TARGET_KEY, JSON.stringify(keyTargets));
            }
        }
    }
    get workspaceKeyTargets() {
        if (!this._workspaceKeyTargets) {
            this._workspaceKeyTargets = this.loadKeyTargets(1 /* WORKSPACE */);
        }
        return this._workspaceKeyTargets;
    }
    get globalKeyTargets() {
        if (!this._globalKeyTargets) {
            this._globalKeyTargets = this.loadKeyTargets(0 /* GLOBAL */);
        }
        return this._globalKeyTargets;
    }
    getKeyTargets(scope) {
        return scope === 0 /* GLOBAL */ ? this.globalKeyTargets : this.workspaceKeyTargets;
    }
    loadKeyTargets(scope) {
        const keysRaw = this.get(TARGET_KEY, scope);
        if (keysRaw) {
            try {
                return JSON.parse(keysRaw);
            }
            catch (error) {
                // Fail gracefully
            }
        }
        return Object.create(null);
    }
}
AbstractStorageService.DEFAULT_FLUSH_INTERVAL = 60 * 1000; // every minute
class InMemoryStorageService extends AbstractStorageService {
    constructor() {
        super();
        this.globalStorage = new Storage(new InMemoryStorageDatabase());
        this.workspaceStorage = new Storage(new InMemoryStorageDatabase());
        this._register(this.workspaceStorage.onDidChangeStorage(key => this.emitDidChangeValue(1 /* WORKSPACE */, key)));
        this._register(this.globalStorage.onDidChangeStorage(key => this.emitDidChangeValue(0 /* GLOBAL */, key)));
    }
    getStorage(scope) {
        return scope === 0 /* GLOBAL */ ? this.globalStorage : this.workspaceStorage;
    }
}

export { ActionBar as A, BaseActionViewItem as B, DataTransfers as D, HistoryInputBox as H, IStorageService as I, Sash as S, alert as a, IContextViewService as b, IKeybindingService as c, IContextMenuService as d, ActionViewItem as e, StaticDND as f, getIconRegistry as g, DragAndDropData as h, InputBox as i, InMemoryStorageService as j, registerIcon as r, setARIAContainer as s, widgetClose as w };
