import { i as isFirefox, c as isWebKit, d as isSafari, h as isStandalone, j as isElectron, k as isEdgeLegacyWebView } from './browser-17f56e3f.js';
import { n as Emitter, B as isMacintosh, aD as SimpleKeybinding, aE as KeyCodeUtils, ag as isWindows, aj as isNative, a4 as Disposable, a0 as toDisposable, aF as DisposableStore, o as onUnexpectedError, as as isIOS } from './editorContextKeys-7b242db0.js';
import { a as RemoteAuthorities, F as FileAccess, T as TimeoutTimer } from './async-a734ffcb.js';

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
const domEvent = (element, type, useCapture) => {
    const fn = (e) => emitter.fire(e);
    const emitter = new Emitter({
        onFirstListenerAdd: () => {
            element.addEventListener(type, fn, useCapture);
        },
        onLastListenerRemove: () => {
            element.removeEventListener(type, fn, useCapture);
        }
    });
    return emitter.event;
};
function stopEvent(event) {
    event.preventDefault();
    event.stopPropagation();
    return event;
}

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
let KEY_CODE_MAP = new Array(230);
let INVERSE_KEY_CODE_MAP = new Array(112 /* MAX_VALUE */);
(function () {
    for (let i = 0; i < INVERSE_KEY_CODE_MAP.length; i++) {
        INVERSE_KEY_CODE_MAP[i] = -1;
    }
    function define(code, keyCode) {
        KEY_CODE_MAP[code] = keyCode;
        INVERSE_KEY_CODE_MAP[keyCode] = code;
    }
    define(3, 7 /* PauseBreak */); // VK_CANCEL 0x03 Control-break processing
    define(8, 1 /* Backspace */);
    define(9, 2 /* Tab */);
    define(13, 3 /* Enter */);
    define(16, 4 /* Shift */);
    define(17, 5 /* Ctrl */);
    define(18, 6 /* Alt */);
    define(19, 7 /* PauseBreak */);
    define(20, 8 /* CapsLock */);
    define(27, 9 /* Escape */);
    define(32, 10 /* Space */);
    define(33, 11 /* PageUp */);
    define(34, 12 /* PageDown */);
    define(35, 13 /* End */);
    define(36, 14 /* Home */);
    define(37, 15 /* LeftArrow */);
    define(38, 16 /* UpArrow */);
    define(39, 17 /* RightArrow */);
    define(40, 18 /* DownArrow */);
    define(45, 19 /* Insert */);
    define(46, 20 /* Delete */);
    define(48, 21 /* KEY_0 */);
    define(49, 22 /* KEY_1 */);
    define(50, 23 /* KEY_2 */);
    define(51, 24 /* KEY_3 */);
    define(52, 25 /* KEY_4 */);
    define(53, 26 /* KEY_5 */);
    define(54, 27 /* KEY_6 */);
    define(55, 28 /* KEY_7 */);
    define(56, 29 /* KEY_8 */);
    define(57, 30 /* KEY_9 */);
    define(65, 31 /* KEY_A */);
    define(66, 32 /* KEY_B */);
    define(67, 33 /* KEY_C */);
    define(68, 34 /* KEY_D */);
    define(69, 35 /* KEY_E */);
    define(70, 36 /* KEY_F */);
    define(71, 37 /* KEY_G */);
    define(72, 38 /* KEY_H */);
    define(73, 39 /* KEY_I */);
    define(74, 40 /* KEY_J */);
    define(75, 41 /* KEY_K */);
    define(76, 42 /* KEY_L */);
    define(77, 43 /* KEY_M */);
    define(78, 44 /* KEY_N */);
    define(79, 45 /* KEY_O */);
    define(80, 46 /* KEY_P */);
    define(81, 47 /* KEY_Q */);
    define(82, 48 /* KEY_R */);
    define(83, 49 /* KEY_S */);
    define(84, 50 /* KEY_T */);
    define(85, 51 /* KEY_U */);
    define(86, 52 /* KEY_V */);
    define(87, 53 /* KEY_W */);
    define(88, 54 /* KEY_X */);
    define(89, 55 /* KEY_Y */);
    define(90, 56 /* KEY_Z */);
    define(93, 58 /* ContextMenu */);
    define(96, 93 /* NUMPAD_0 */);
    define(97, 94 /* NUMPAD_1 */);
    define(98, 95 /* NUMPAD_2 */);
    define(99, 96 /* NUMPAD_3 */);
    define(100, 97 /* NUMPAD_4 */);
    define(101, 98 /* NUMPAD_5 */);
    define(102, 99 /* NUMPAD_6 */);
    define(103, 100 /* NUMPAD_7 */);
    define(104, 101 /* NUMPAD_8 */);
    define(105, 102 /* NUMPAD_9 */);
    define(106, 103 /* NUMPAD_MULTIPLY */);
    define(107, 104 /* NUMPAD_ADD */);
    define(108, 105 /* NUMPAD_SEPARATOR */);
    define(109, 106 /* NUMPAD_SUBTRACT */);
    define(110, 107 /* NUMPAD_DECIMAL */);
    define(111, 108 /* NUMPAD_DIVIDE */);
    define(112, 59 /* F1 */);
    define(113, 60 /* F2 */);
    define(114, 61 /* F3 */);
    define(115, 62 /* F4 */);
    define(116, 63 /* F5 */);
    define(117, 64 /* F6 */);
    define(118, 65 /* F7 */);
    define(119, 66 /* F8 */);
    define(120, 67 /* F9 */);
    define(121, 68 /* F10 */);
    define(122, 69 /* F11 */);
    define(123, 70 /* F12 */);
    define(124, 71 /* F13 */);
    define(125, 72 /* F14 */);
    define(126, 73 /* F15 */);
    define(127, 74 /* F16 */);
    define(128, 75 /* F17 */);
    define(129, 76 /* F18 */);
    define(130, 77 /* F19 */);
    define(144, 78 /* NumLock */);
    define(145, 79 /* ScrollLock */);
    define(186, 80 /* US_SEMICOLON */);
    define(187, 81 /* US_EQUAL */);
    define(188, 82 /* US_COMMA */);
    define(189, 83 /* US_MINUS */);
    define(190, 84 /* US_DOT */);
    define(191, 85 /* US_SLASH */);
    define(192, 86 /* US_BACKTICK */);
    define(193, 110 /* ABNT_C1 */);
    define(194, 111 /* ABNT_C2 */);
    define(219, 87 /* US_OPEN_SQUARE_BRACKET */);
    define(220, 88 /* US_BACKSLASH */);
    define(221, 89 /* US_CLOSE_SQUARE_BRACKET */);
    define(222, 90 /* US_QUOTE */);
    define(223, 91 /* OEM_8 */);
    define(226, 92 /* OEM_102 */);
    /**
     * https://lists.w3.org/Archives/Public/www-dom/2010JulSep/att-0182/keyCode-spec.html
     * If an Input Method Editor is processing key input and the event is keydown, return 229.
     */
    define(229, 109 /* KEY_IN_COMPOSITION */);
    if (isFirefox) {
        define(59, 80 /* US_SEMICOLON */);
        define(107, 81 /* US_EQUAL */);
        define(109, 83 /* US_MINUS */);
        if (isMacintosh) {
            define(224, 57 /* Meta */);
        }
    }
    else if (isWebKit) {
        define(91, 57 /* Meta */);
        if (isMacintosh) {
            // the two meta keys in the Mac have different key codes (91 and 93)
            define(93, 57 /* Meta */);
        }
        else {
            define(92, 57 /* Meta */);
        }
    }
})();
function extractKeyCode(e) {
    if (e.charCode) {
        // "keypress" events mostly
        let char = String.fromCharCode(e.charCode).toUpperCase();
        return KeyCodeUtils.fromString(char);
    }
    return KEY_CODE_MAP[e.keyCode] || 0 /* Unknown */;
}
const ctrlKeyMod = (isMacintosh ? 256 /* WinCtrl */ : 2048 /* CtrlCmd */);
const altKeyMod = 512 /* Alt */;
const shiftKeyMod = 1024 /* Shift */;
const metaKeyMod = (isMacintosh ? 2048 /* CtrlCmd */ : 256 /* WinCtrl */);
class StandardKeyboardEvent {
    constructor(source) {
        this._standardKeyboardEventBrand = true;
        let e = source;
        this.browserEvent = e;
        this.target = e.target;
        this.ctrlKey = e.ctrlKey;
        this.shiftKey = e.shiftKey;
        this.altKey = e.altKey;
        this.metaKey = e.metaKey;
        this.keyCode = extractKeyCode(e);
        this.code = e.code;
        // console.info(e.type + ": keyCode: " + e.keyCode + ", which: " + e.which + ", charCode: " + e.charCode + ", detail: " + e.detail + " ====> " + this.keyCode + ' -- ' + KeyCode[this.keyCode]);
        this.ctrlKey = this.ctrlKey || this.keyCode === 5 /* Ctrl */;
        this.altKey = this.altKey || this.keyCode === 6 /* Alt */;
        this.shiftKey = this.shiftKey || this.keyCode === 4 /* Shift */;
        this.metaKey = this.metaKey || this.keyCode === 57 /* Meta */;
        this._asKeybinding = this._computeKeybinding();
        this._asRuntimeKeybinding = this._computeRuntimeKeybinding();
        // console.log(`code: ${e.code}, keyCode: ${e.keyCode}, key: ${e.key}`);
    }
    preventDefault() {
        if (this.browserEvent && this.browserEvent.preventDefault) {
            this.browserEvent.preventDefault();
        }
    }
    stopPropagation() {
        if (this.browserEvent && this.browserEvent.stopPropagation) {
            this.browserEvent.stopPropagation();
        }
    }
    toKeybinding() {
        return this._asRuntimeKeybinding;
    }
    equals(other) {
        return this._asKeybinding === other;
    }
    _computeKeybinding() {
        let key = 0 /* Unknown */;
        if (this.keyCode !== 5 /* Ctrl */ && this.keyCode !== 4 /* Shift */ && this.keyCode !== 6 /* Alt */ && this.keyCode !== 57 /* Meta */) {
            key = this.keyCode;
        }
        let result = 0;
        if (this.ctrlKey) {
            result |= ctrlKeyMod;
        }
        if (this.altKey) {
            result |= altKeyMod;
        }
        if (this.shiftKey) {
            result |= shiftKeyMod;
        }
        if (this.metaKey) {
            result |= metaKeyMod;
        }
        result |= key;
        return result;
    }
    _computeRuntimeKeybinding() {
        let key = 0 /* Unknown */;
        if (this.keyCode !== 5 /* Ctrl */ && this.keyCode !== 4 /* Shift */ && this.keyCode !== 6 /* Alt */ && this.keyCode !== 57 /* Meta */) {
            key = this.keyCode;
        }
        return new SimpleKeybinding(this.ctrlKey, this.shiftKey, this.altKey, this.metaKey, key);
    }
}

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
let hasDifferentOriginAncestorFlag = false;
let sameOriginWindowChainCache = null;
function getParentWindowIfSameOrigin(w) {
    if (!w.parent || w.parent === w) {
        return null;
    }
    // Cannot really tell if we have access to the parent window unless we try to access something in it
    try {
        let location = w.location;
        let parentLocation = w.parent.location;
        if (location.origin !== 'null' && parentLocation.origin !== 'null') {
            if (location.protocol !== parentLocation.protocol || location.hostname !== parentLocation.hostname || location.port !== parentLocation.port) {
                hasDifferentOriginAncestorFlag = true;
                return null;
            }
        }
    }
    catch (e) {
        hasDifferentOriginAncestorFlag = true;
        return null;
    }
    return w.parent;
}
class IframeUtils {
    /**
     * Returns a chain of embedded windows with the same origin (which can be accessed programmatically).
     * Having a chain of length 1 might mean that the current execution environment is running outside of an iframe or inside an iframe embedded in a window with a different origin.
     * To distinguish if at one point the current execution environment is running inside a window with a different origin, see hasDifferentOriginAncestor()
     */
    static getSameOriginWindowChain() {
        if (!sameOriginWindowChainCache) {
            sameOriginWindowChainCache = [];
            let w = window;
            let parent;
            do {
                parent = getParentWindowIfSameOrigin(w);
                if (parent) {
                    sameOriginWindowChainCache.push({
                        window: w,
                        iframeElement: w.frameElement || null
                    });
                }
                else {
                    sameOriginWindowChainCache.push({
                        window: w,
                        iframeElement: null
                    });
                }
                w = parent;
            } while (w);
        }
        return sameOriginWindowChainCache.slice(0);
    }
    /**
     * Returns true if the current execution environment is chained in a list of iframes which at one point ends in a window with a different origin.
     * Returns false if the current execution environment is not running inside an iframe or if the entire chain of iframes have the same origin.
     */
    static hasDifferentOriginAncestor() {
        if (!sameOriginWindowChainCache) {
            this.getSameOriginWindowChain();
        }
        return hasDifferentOriginAncestorFlag;
    }
    /**
     * Returns the position of `childWindow` relative to `ancestorWindow`
     */
    static getPositionOfChildWindowRelativeToAncestorWindow(childWindow, ancestorWindow) {
        if (!ancestorWindow || childWindow === ancestorWindow) {
            return {
                top: 0,
                left: 0
            };
        }
        let top = 0, left = 0;
        let windowChain = this.getSameOriginWindowChain();
        for (const windowChainEl of windowChain) {
            top += windowChainEl.window.scrollY;
            left += windowChainEl.window.scrollX;
            if (windowChainEl.window === ancestorWindow) {
                break;
            }
            if (!windowChainEl.iframeElement) {
                break;
            }
            let boundingRect = windowChainEl.iframeElement.getBoundingClientRect();
            top += boundingRect.top;
            left += boundingRect.left;
        }
        return {
            top: top,
            left: left
        };
    }
}

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
class StandardMouseEvent {
    constructor(e) {
        this.timestamp = Date.now();
        this.browserEvent = e;
        this.leftButton = e.button === 0;
        this.middleButton = e.button === 1;
        this.rightButton = e.button === 2;
        this.buttons = e.buttons;
        this.target = e.target;
        this.detail = e.detail || 1;
        if (e.type === 'dblclick') {
            this.detail = 2;
        }
        this.ctrlKey = e.ctrlKey;
        this.shiftKey = e.shiftKey;
        this.altKey = e.altKey;
        this.metaKey = e.metaKey;
        if (typeof e.pageX === 'number') {
            this.posx = e.pageX;
            this.posy = e.pageY;
        }
        else {
            // Probably hit by MSGestureEvent
            this.posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            this.posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        // Find the position of the iframe this code is executing in relative to the iframe where the event was captured.
        let iframeOffsets = IframeUtils.getPositionOfChildWindowRelativeToAncestorWindow(self, e.view);
        this.posx -= iframeOffsets.left;
        this.posy -= iframeOffsets.top;
    }
    preventDefault() {
        this.browserEvent.preventDefault();
    }
    stopPropagation() {
        this.browserEvent.stopPropagation();
    }
}
class StandardWheelEvent {
    constructor(e, deltaX = 0, deltaY = 0) {
        this.browserEvent = e || null;
        this.target = e ? (e.target || e.targetNode || e.srcElement) : null;
        this.deltaY = deltaY;
        this.deltaX = deltaX;
        if (e) {
            // Old (deprecated) wheel events
            let e1 = e;
            let e2 = e;
            // vertical delta scroll
            if (typeof e1.wheelDeltaY !== 'undefined') {
                this.deltaY = e1.wheelDeltaY / 120;
            }
            else if (typeof e2.VERTICAL_AXIS !== 'undefined' && e2.axis === e2.VERTICAL_AXIS) {
                this.deltaY = -e2.detail / 3;
            }
            else if (e.type === 'wheel') {
                // Modern wheel event
                // https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent
                const ev = e;
                if (ev.deltaMode === ev.DOM_DELTA_LINE) {
                    // the deltas are expressed in lines
                    if (isFirefox && !isMacintosh) {
                        this.deltaY = -e.deltaY / 3;
                    }
                    else {
                        this.deltaY = -e.deltaY;
                    }
                }
                else {
                    this.deltaY = -e.deltaY / 40;
                }
            }
            // horizontal delta scroll
            if (typeof e1.wheelDeltaX !== 'undefined') {
                if (isSafari && isWindows) {
                    this.deltaX = -(e1.wheelDeltaX / 120);
                }
                else {
                    this.deltaX = e1.wheelDeltaX / 120;
                }
            }
            else if (typeof e2.HORIZONTAL_AXIS !== 'undefined' && e2.axis === e2.HORIZONTAL_AXIS) {
                this.deltaX = -e.detail / 3;
            }
            else if (e.type === 'wheel') {
                // Modern wheel event
                // https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent
                const ev = e;
                if (ev.deltaMode === ev.DOM_DELTA_LINE) {
                    // the deltas are expressed in lines
                    if (isFirefox && !isMacintosh) {
                        this.deltaX = -e.deltaX / 3;
                    }
                    else {
                        this.deltaX = -e.deltaX;
                    }
                }
                else {
                    this.deltaX = -e.deltaX / 40;
                }
            }
            // Assume a vertical scroll if nothing else worked
            if (this.deltaY === 0 && this.deltaX === 0 && e.wheelDelta) {
                this.deltaY = e.wheelDelta / 120;
            }
        }
    }
    preventDefault() {
        if (this.browserEvent) {
            this.browserEvent.preventDefault();
        }
    }
    stopPropagation() {
        if (this.browserEvent) {
            this.browserEvent.stopPropagation();
        }
    }
}

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
/**
 * Browser feature we can support in current platform, browser and environment.
 */
const BrowserFeatures = {
    clipboard: {
        writeText: (isNative
            || (document.queryCommandSupported && document.queryCommandSupported('copy'))
            || !!(navigator && navigator.clipboard && navigator.clipboard.writeText)),
        readText: (isNative
            || !!(navigator && navigator.clipboard && navigator.clipboard.readText))
    },
    keyboard: (() => {
        if (isNative || isStandalone) {
            return 0 /* Always */;
        }
        if (navigator.keyboard || isSafari) {
            return 1 /* FullScreen */;
        }
        return 2 /* None */;
    })(),
    // 'ontouchstart' in window always evaluates to true with typescript's modern typings. This causes `window` to be
    // `never` later in `window.navigator`. That's why we need the explicit `window as Window` cast
    touch: 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.navigator.msMaxTouchPoints > 0,
    pointerEvents: window.PointerEvent && ('ontouchstart' in window || window.navigator.maxTouchPoints > 0 || navigator.maxTouchPoints > 0 || window.navigator.msMaxTouchPoints > 0)
};

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
function clearNode(node) {
    while (node.firstChild) {
        node.firstChild.remove();
    }
}
/**
 * @deprecated Use node.isConnected directly
 */
function isInDOM(node) {
    var _a;
    return (_a = node === null || node === void 0 ? void 0 : node.isConnected) !== null && _a !== void 0 ? _a : false;
}
class DomListener {
    constructor(node, type, handler, options) {
        this._node = node;
        this._type = type;
        this._handler = handler;
        this._options = (options || false);
        this._node.addEventListener(this._type, this._handler, this._options);
    }
    dispose() {
        if (!this._handler) {
            // Already disposed
            return;
        }
        this._node.removeEventListener(this._type, this._handler, this._options);
        // Prevent leakers from holding on to the dom or handler func
        this._node = null;
        this._handler = null;
    }
}
function addDisposableListener(node, type, handler, useCaptureOrOptions) {
    return new DomListener(node, type, handler, useCaptureOrOptions);
}
function _wrapAsStandardMouseEvent(handler) {
    return function (e) {
        return handler(new StandardMouseEvent(e));
    };
}
function _wrapAsStandardKeyboardEvent(handler) {
    return function (e) {
        return handler(new StandardKeyboardEvent(e));
    };
}
let addStandardDisposableListener = function addStandardDisposableListener(node, type, handler, useCapture) {
    let wrapHandler = handler;
    if (type === 'click' || type === 'mousedown') {
        wrapHandler = _wrapAsStandardMouseEvent(handler);
    }
    else if (type === 'keydown' || type === 'keypress' || type === 'keyup') {
        wrapHandler = _wrapAsStandardKeyboardEvent(handler);
    }
    return addDisposableListener(node, type, wrapHandler, useCapture);
};
function addDisposableNonBubblingMouseOutListener(node, handler) {
    return addDisposableListener(node, 'mouseout', (e) => {
        // Mouse out bubbles, so this is an attempt to ignore faux mouse outs coming from children elements
        let toElement = (e.relatedTarget);
        while (toElement && toElement !== node) {
            toElement = toElement.parentNode;
        }
        if (toElement === node) {
            return;
        }
        handler(e);
    });
}
function addDisposableNonBubblingPointerOutListener(node, handler) {
    return addDisposableListener(node, 'pointerout', (e) => {
        // Mouse out bubbles, so this is an attempt to ignore faux mouse outs coming from children elements
        let toElement = (e.relatedTarget);
        while (toElement && toElement !== node) {
            toElement = toElement.parentNode;
        }
        if (toElement === node) {
            return;
        }
        handler(e);
    });
}
let _animationFrame = null;
function doRequestAnimationFrame(callback) {
    if (!_animationFrame) {
        const emulatedRequestAnimationFrame = (callback) => {
            return setTimeout(() => callback(new Date().getTime()), 0);
        };
        _animationFrame = (self.requestAnimationFrame
            || self.msRequestAnimationFrame
            || self.webkitRequestAnimationFrame
            || self.mozRequestAnimationFrame
            || self.oRequestAnimationFrame
            || emulatedRequestAnimationFrame);
    }
    return _animationFrame.call(self, callback);
}
/**
 * Schedule a callback to be run at the next animation frame.
 * This allows multiple parties to register callbacks that should run at the next animation frame.
 * If currently in an animation frame, `runner` will be executed immediately.
 * @return token that can be used to cancel the scheduled runner (only if `runner` was not executed immediately).
 */
let runAtThisOrScheduleAtNextAnimationFrame;
/**
 * Schedule a callback to be run at the next animation frame.
 * This allows multiple parties to register callbacks that should run at the next animation frame.
 * If currently in an animation frame, `runner` will be executed at the next animation frame.
 * @return token that can be used to cancel the scheduled runner.
 */
let scheduleAtNextAnimationFrame;
class AnimationFrameQueueItem {
    constructor(runner, priority = 0) {
        this._runner = runner;
        this.priority = priority;
        this._canceled = false;
    }
    dispose() {
        this._canceled = true;
    }
    execute() {
        if (this._canceled) {
            return;
        }
        try {
            this._runner();
        }
        catch (e) {
            onUnexpectedError(e);
        }
    }
    // Sort by priority (largest to lowest)
    static sort(a, b) {
        return b.priority - a.priority;
    }
}
(function () {
    /**
     * The runners scheduled at the next animation frame
     */
    let NEXT_QUEUE = [];
    /**
     * The runners scheduled at the current animation frame
     */
    let CURRENT_QUEUE = null;
    /**
     * A flag to keep track if the native requestAnimationFrame was already called
     */
    let animFrameRequested = false;
    /**
     * A flag to indicate if currently handling a native requestAnimationFrame callback
     */
    let inAnimationFrameRunner = false;
    let animationFrameRunner = () => {
        animFrameRequested = false;
        CURRENT_QUEUE = NEXT_QUEUE;
        NEXT_QUEUE = [];
        inAnimationFrameRunner = true;
        while (CURRENT_QUEUE.length > 0) {
            CURRENT_QUEUE.sort(AnimationFrameQueueItem.sort);
            let top = CURRENT_QUEUE.shift();
            top.execute();
        }
        inAnimationFrameRunner = false;
    };
    scheduleAtNextAnimationFrame = (runner, priority = 0) => {
        let item = new AnimationFrameQueueItem(runner, priority);
        NEXT_QUEUE.push(item);
        if (!animFrameRequested) {
            animFrameRequested = true;
            doRequestAnimationFrame(animationFrameRunner);
        }
        return item;
    };
    runAtThisOrScheduleAtNextAnimationFrame = (runner, priority) => {
        if (inAnimationFrameRunner) {
            let item = new AnimationFrameQueueItem(runner, priority);
            CURRENT_QUEUE.push(item);
            return item;
        }
        else {
            return scheduleAtNextAnimationFrame(runner, priority);
        }
    };
})();
const MINIMUM_TIME_MS = 8;
const DEFAULT_EVENT_MERGER = function (lastEvent, currentEvent) {
    return currentEvent;
};
class TimeoutThrottledDomListener extends Disposable {
    constructor(node, type, handler, eventMerger = DEFAULT_EVENT_MERGER, minimumTimeMs = MINIMUM_TIME_MS) {
        super();
        let lastEvent = null;
        let lastHandlerTime = 0;
        let timeout = this._register(new TimeoutTimer());
        let invokeHandler = () => {
            lastHandlerTime = (new Date()).getTime();
            handler(lastEvent);
            lastEvent = null;
        };
        this._register(addDisposableListener(node, type, (e) => {
            lastEvent = eventMerger(lastEvent, e);
            let elapsedTime = (new Date()).getTime() - lastHandlerTime;
            if (elapsedTime >= minimumTimeMs) {
                timeout.cancel();
                invokeHandler();
            }
            else {
                timeout.setIfNotSet(invokeHandler, minimumTimeMs - elapsedTime);
            }
        }));
    }
}
function addDisposableThrottledListener(node, type, handler, eventMerger, minimumTimeMs) {
    return new TimeoutThrottledDomListener(node, type, handler, eventMerger, minimumTimeMs);
}
function getComputedStyle(el) {
    return document.defaultView.getComputedStyle(el, null);
}
function getClientArea(element) {
    // Try with DOM clientWidth / clientHeight
    if (element !== document.body) {
        return new Dimension(element.clientWidth, element.clientHeight);
    }
    // If visual view port exits and it's on mobile, it should be used instead of window innerWidth / innerHeight, or document.body.clientWidth / document.body.clientHeight
    if (isIOS && window.visualViewport) {
        const width = window.visualViewport.width;
        const height = window.visualViewport.height - (isStandalone
            // in PWA mode, the visual viewport always includes the safe-area-inset-bottom (which is for the home indicator)
            // even when you are using the onscreen monitor, the visual viewport will include the area between system statusbar and the onscreen keyboard
            // plus the area between onscreen keyboard and the bottom bezel, which is 20px on iOS.
            ? (20 + 4) // + 4px for body margin
            : 0);
        return new Dimension(width, height);
    }
    // Try innerWidth / innerHeight
    if (window.innerWidth && window.innerHeight) {
        return new Dimension(window.innerWidth, window.innerHeight);
    }
    // Try with document.body.clientWidth / document.body.clientHeight
    if (document.body && document.body.clientWidth && document.body.clientHeight) {
        return new Dimension(document.body.clientWidth, document.body.clientHeight);
    }
    // Try with document.documentElement.clientWidth / document.documentElement.clientHeight
    if (document.documentElement && document.documentElement.clientWidth && document.documentElement.clientHeight) {
        return new Dimension(document.documentElement.clientWidth, document.documentElement.clientHeight);
    }
    throw new Error('Unable to figure out browser width and height');
}
class SizeUtils {
    // Adapted from WinJS
    // Converts a CSS positioning string for the specified element to pixels.
    static convertToPixels(element, value) {
        return parseFloat(value) || 0;
    }
    static getDimension(element, cssPropertyName, jsPropertyName) {
        let computedStyle = getComputedStyle(element);
        let value = '0';
        if (computedStyle) {
            if (computedStyle.getPropertyValue) {
                value = computedStyle.getPropertyValue(cssPropertyName);
            }
            else {
                // IE8
                value = computedStyle.getAttribute(jsPropertyName);
            }
        }
        return SizeUtils.convertToPixels(element, value);
    }
    static getBorderLeftWidth(element) {
        return SizeUtils.getDimension(element, 'border-left-width', 'borderLeftWidth');
    }
    static getBorderRightWidth(element) {
        return SizeUtils.getDimension(element, 'border-right-width', 'borderRightWidth');
    }
    static getBorderTopWidth(element) {
        return SizeUtils.getDimension(element, 'border-top-width', 'borderTopWidth');
    }
    static getBorderBottomWidth(element) {
        return SizeUtils.getDimension(element, 'border-bottom-width', 'borderBottomWidth');
    }
    static getPaddingLeft(element) {
        return SizeUtils.getDimension(element, 'padding-left', 'paddingLeft');
    }
    static getPaddingRight(element) {
        return SizeUtils.getDimension(element, 'padding-right', 'paddingRight');
    }
    static getPaddingTop(element) {
        return SizeUtils.getDimension(element, 'padding-top', 'paddingTop');
    }
    static getPaddingBottom(element) {
        return SizeUtils.getDimension(element, 'padding-bottom', 'paddingBottom');
    }
    static getMarginLeft(element) {
        return SizeUtils.getDimension(element, 'margin-left', 'marginLeft');
    }
    static getMarginTop(element) {
        return SizeUtils.getDimension(element, 'margin-top', 'marginTop');
    }
    static getMarginRight(element) {
        return SizeUtils.getDimension(element, 'margin-right', 'marginRight');
    }
    static getMarginBottom(element) {
        return SizeUtils.getDimension(element, 'margin-bottom', 'marginBottom');
    }
}
class Dimension {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    with(width = this.width, height = this.height) {
        if (width !== this.width || height !== this.height) {
            return new Dimension(width, height);
        }
        else {
            return this;
        }
    }
    static is(obj) {
        return typeof obj === 'object' && typeof obj.height === 'number' && typeof obj.width === 'number';
    }
    static lift(obj) {
        if (obj instanceof Dimension) {
            return obj;
        }
        else {
            return new Dimension(obj.width, obj.height);
        }
    }
    static equals(a, b) {
        if (a === b) {
            return true;
        }
        if (!a || !b) {
            return false;
        }
        return a.width === b.width && a.height === b.height;
    }
}
function getTopLeftOffset(element) {
    // Adapted from WinJS.Utilities.getPosition
    // and added borders to the mix
    let offsetParent = element.offsetParent;
    let top = element.offsetTop;
    let left = element.offsetLeft;
    while ((element = element.parentNode) !== null
        && element !== document.body
        && element !== document.documentElement) {
        top -= element.scrollTop;
        const c = isShadowRoot(element) ? null : getComputedStyle(element);
        if (c) {
            left -= c.direction !== 'rtl' ? element.scrollLeft : -element.scrollLeft;
        }
        if (element === offsetParent) {
            left += SizeUtils.getBorderLeftWidth(element);
            top += SizeUtils.getBorderTopWidth(element);
            top += element.offsetTop;
            left += element.offsetLeft;
            offsetParent = element.offsetParent;
        }
    }
    return {
        left: left,
        top: top
    };
}
/**
 * Returns the position of a dom node relative to the entire page.
 */
function getDomNodePagePosition(domNode) {
    let bb = domNode.getBoundingClientRect();
    return {
        left: bb.left + StandardWindow.scrollX,
        top: bb.top + StandardWindow.scrollY,
        width: bb.width,
        height: bb.height
    };
}
const StandardWindow = new class {
    get scrollX() {
        if (typeof window.scrollX === 'number') {
            // modern browsers
            return window.scrollX;
        }
        else {
            return document.body.scrollLeft + document.documentElement.scrollLeft;
        }
    }
    get scrollY() {
        if (typeof window.scrollY === 'number') {
            // modern browsers
            return window.scrollY;
        }
        else {
            return document.body.scrollTop + document.documentElement.scrollTop;
        }
    }
};
// Adapted from WinJS
// Gets the width of the element, including margins.
function getTotalWidth(element) {
    let margin = SizeUtils.getMarginLeft(element) + SizeUtils.getMarginRight(element);
    return element.offsetWidth + margin;
}
function getContentWidth(element) {
    let border = SizeUtils.getBorderLeftWidth(element) + SizeUtils.getBorderRightWidth(element);
    let padding = SizeUtils.getPaddingLeft(element) + SizeUtils.getPaddingRight(element);
    return element.offsetWidth - border - padding;
}
// Adapted from WinJS
// Gets the height of the content of the specified element. The content height does not include borders or padding.
function getContentHeight(element) {
    let border = SizeUtils.getBorderTopWidth(element) + SizeUtils.getBorderBottomWidth(element);
    let padding = SizeUtils.getPaddingTop(element) + SizeUtils.getPaddingBottom(element);
    return element.offsetHeight - border - padding;
}
// Adapted from WinJS
// Gets the height of the element, including its margins.
function getTotalHeight(element) {
    let margin = SizeUtils.getMarginTop(element) + SizeUtils.getMarginBottom(element);
    return element.offsetHeight + margin;
}
// ----------------------------------------------------------------------------------------
function isAncestor(testChild, testAncestor) {
    while (testChild) {
        if (testChild === testAncestor) {
            return true;
        }
        testChild = testChild.parentNode;
    }
    return false;
}
function findParentWithClass(node, clazz, stopAtClazzOrNode) {
    while (node && node.nodeType === node.ELEMENT_NODE) {
        if (node.classList.contains(clazz)) {
            return node;
        }
        if (stopAtClazzOrNode) {
            if (typeof stopAtClazzOrNode === 'string') {
                if (node.classList.contains(stopAtClazzOrNode)) {
                    return null;
                }
            }
            else {
                if (node === stopAtClazzOrNode) {
                    return null;
                }
            }
        }
        node = node.parentNode;
    }
    return null;
}
function hasParentWithClass(node, clazz, stopAtClazzOrNode) {
    return !!findParentWithClass(node, clazz, stopAtClazzOrNode);
}
function isShadowRoot(node) {
    return (node && !!node.host && !!node.mode);
}
function isInShadowDOM(domNode) {
    return !!getShadowRoot(domNode);
}
function getShadowRoot(domNode) {
    while (domNode.parentNode) {
        if (domNode === document.body) {
            // reached the body
            return null;
        }
        domNode = domNode.parentNode;
    }
    return isShadowRoot(domNode) ? domNode : null;
}
function getActiveElement() {
    let result = document.activeElement;
    while (result === null || result === void 0 ? void 0 : result.shadowRoot) {
        result = result.shadowRoot.activeElement;
    }
    return result;
}
function createStyleSheet(container = document.getElementsByTagName('head')[0]) {
    let style = document.createElement('style');
    style.type = 'text/css';
    style.media = 'screen';
    container.appendChild(style);
    return style;
}
let _sharedStyleSheet = null;
function getSharedStyleSheet() {
    if (!_sharedStyleSheet) {
        _sharedStyleSheet = createStyleSheet();
    }
    return _sharedStyleSheet;
}
function getDynamicStyleSheetRules(style) {
    var _a, _b;
    if ((_a = style === null || style === void 0 ? void 0 : style.sheet) === null || _a === void 0 ? void 0 : _a.rules) {
        // Chrome, IE
        return style.sheet.rules;
    }
    if ((_b = style === null || style === void 0 ? void 0 : style.sheet) === null || _b === void 0 ? void 0 : _b.cssRules) {
        // FF
        return style.sheet.cssRules;
    }
    return [];
}
function createCSSRule(selector, cssText, style = getSharedStyleSheet()) {
    if (!style || !cssText) {
        return;
    }
    style.sheet.insertRule(selector + '{' + cssText + '}', 0);
}
function removeCSSRulesContainingSelector(ruleName, style = getSharedStyleSheet()) {
    if (!style) {
        return;
    }
    let rules = getDynamicStyleSheetRules(style);
    let toDelete = [];
    for (let i = 0; i < rules.length; i++) {
        let rule = rules[i];
        if (rule.selectorText.indexOf(ruleName) !== -1) {
            toDelete.push(i);
        }
    }
    for (let i = toDelete.length - 1; i >= 0; i--) {
        style.sheet.deleteRule(toDelete[i]);
    }
}
function isHTMLElement(o) {
    if (typeof HTMLElement === 'object') {
        return o instanceof HTMLElement;
    }
    return o && typeof o === 'object' && o.nodeType === 1 && typeof o.nodeName === 'string';
}
const EventType = {
    // Mouse
    CLICK: 'click',
    AUXCLICK: 'auxclick',
    DBLCLICK: 'dblclick',
    MOUSE_UP: 'mouseup',
    MOUSE_DOWN: 'mousedown',
    MOUSE_OVER: 'mouseover',
    MOUSE_MOVE: 'mousemove',
    MOUSE_OUT: 'mouseout',
    MOUSE_ENTER: 'mouseenter',
    MOUSE_LEAVE: 'mouseleave',
    MOUSE_WHEEL: 'wheel',
    POINTER_UP: 'pointerup',
    POINTER_DOWN: 'pointerdown',
    POINTER_MOVE: 'pointermove',
    CONTEXT_MENU: 'contextmenu',
    WHEEL: 'wheel',
    // Keyboard
    KEY_DOWN: 'keydown',
    KEY_PRESS: 'keypress',
    KEY_UP: 'keyup',
    // HTML Document
    LOAD: 'load',
    BEFORE_UNLOAD: 'beforeunload',
    UNLOAD: 'unload',
    ABORT: 'abort',
    ERROR: 'error',
    RESIZE: 'resize',
    SCROLL: 'scroll',
    FULLSCREEN_CHANGE: 'fullscreenchange',
    WK_FULLSCREEN_CHANGE: 'webkitfullscreenchange',
    // Form
    SELECT: 'select',
    CHANGE: 'change',
    SUBMIT: 'submit',
    RESET: 'reset',
    FOCUS: 'focus',
    FOCUS_IN: 'focusin',
    FOCUS_OUT: 'focusout',
    BLUR: 'blur',
    INPUT: 'input',
    // Local Storage
    STORAGE: 'storage',
    // Drag
    DRAG_START: 'dragstart',
    DRAG: 'drag',
    DRAG_ENTER: 'dragenter',
    DRAG_LEAVE: 'dragleave',
    DRAG_OVER: 'dragover',
    DROP: 'drop',
    DRAG_END: 'dragend',
    // Animation
    ANIMATION_START: isWebKit ? 'webkitAnimationStart' : 'animationstart',
    ANIMATION_END: isWebKit ? 'webkitAnimationEnd' : 'animationend',
    ANIMATION_ITERATION: isWebKit ? 'webkitAnimationIteration' : 'animationiteration'
};
const EventHelper = {
    stop: function (e, cancelBubble) {
        if (e.preventDefault) {
            e.preventDefault();
        }
        else {
            // IE8
            e.returnValue = false;
        }
        if (cancelBubble) {
            if (e.stopPropagation) {
                e.stopPropagation();
            }
            else {
                // IE8
                e.cancelBubble = true;
            }
        }
    }
};
function saveParentsScrollTop(node) {
    let r = [];
    for (let i = 0; node && node.nodeType === node.ELEMENT_NODE; i++) {
        r[i] = node.scrollTop;
        node = node.parentNode;
    }
    return r;
}
function restoreParentsScrollTop(node, state) {
    for (let i = 0; node && node.nodeType === node.ELEMENT_NODE; i++) {
        if (node.scrollTop !== state[i]) {
            node.scrollTop = state[i];
        }
        node = node.parentNode;
    }
}
class FocusTracker extends Disposable {
    constructor(element) {
        super();
        this._onDidFocus = this._register(new Emitter());
        this.onDidFocus = this._onDidFocus.event;
        this._onDidBlur = this._register(new Emitter());
        this.onDidBlur = this._onDidBlur.event;
        let hasFocus = isAncestor(document.activeElement, element);
        let loosingFocus = false;
        const onFocus = () => {
            loosingFocus = false;
            if (!hasFocus) {
                hasFocus = true;
                this._onDidFocus.fire();
            }
        };
        const onBlur = () => {
            if (hasFocus) {
                loosingFocus = true;
                window.setTimeout(() => {
                    if (loosingFocus) {
                        loosingFocus = false;
                        hasFocus = false;
                        this._onDidBlur.fire();
                    }
                }, 0);
            }
        };
        this._refreshStateHandler = () => {
            let currentNodeHasFocus = isAncestor(document.activeElement, element);
            if (currentNodeHasFocus !== hasFocus) {
                if (hasFocus) {
                    onBlur();
                }
                else {
                    onFocus();
                }
            }
        };
        this._register(domEvent(element, EventType.FOCUS, true)(onFocus));
        this._register(domEvent(element, EventType.BLUR, true)(onBlur));
    }
}
function trackFocus(element) {
    return new FocusTracker(element);
}
function append(parent, ...children) {
    parent.append(...children);
    if (children.length === 1 && typeof children[0] !== 'string') {
        return children[0];
    }
}
/**
 * Removes all children from `parent` and appends `children`
 */
function reset(parent, ...children) {
    parent.innerText = '';
    append(parent, ...children);
}
const SELECTOR_REGEX = /([\w\-]+)?(#([\w\-]+))?((\.([\w\-]+))*)/;
var Namespace;
(function (Namespace) {
    Namespace["HTML"] = "http://www.w3.org/1999/xhtml";
    Namespace["SVG"] = "http://www.w3.org/2000/svg";
})(Namespace || (Namespace = {}));
function _$(namespace, description, attrs, ...children) {
    let match = SELECTOR_REGEX.exec(description);
    if (!match) {
        throw new Error('Bad use of emmet');
    }
    attrs = Object.assign({}, (attrs || {}));
    let tagName = match[1] || 'div';
    let result;
    if (namespace !== Namespace.HTML) {
        result = document.createElementNS(namespace, tagName);
    }
    else {
        result = document.createElement(tagName);
    }
    if (match[3]) {
        result.id = match[3];
    }
    if (match[4]) {
        result.className = match[4].replace(/\./g, ' ').trim();
    }
    Object.keys(attrs).forEach(name => {
        const value = attrs[name];
        if (typeof value === 'undefined') {
            return;
        }
        if (/^on\w+$/.test(name)) {
            result[name] = value;
        }
        else if (name === 'selected') {
            if (value) {
                result.setAttribute(name, 'true');
            }
        }
        else {
            result.setAttribute(name, value);
        }
    });
    result.append(...children);
    return result;
}
function $(description, attrs, ...children) {
    return _$(Namespace.HTML, description, attrs, ...children);
}
$.SVG = function (description, attrs, ...children) {
    return _$(Namespace.SVG, description, attrs, ...children);
};
function show(...elements) {
    for (let element of elements) {
        element.style.display = '';
        element.removeAttribute('aria-hidden');
    }
}
function hide(...elements) {
    for (let element of elements) {
        element.style.display = 'none';
        element.setAttribute('aria-hidden', 'true');
    }
}
function getElementsByTagName(tag) {
    return Array.prototype.slice.call(document.getElementsByTagName(tag), 0);
}
/**
 * Find a value usable for a dom node size such that the likelihood that it would be
 * displayed with constant screen pixels size is as high as possible.
 *
 * e.g. We would desire for the cursors to be 2px (CSS px) wide. Under a devicePixelRatio
 * of 1.25, the cursor will be 2.5 screen pixels wide. Depending on how the dom node aligns/"snaps"
 * with the screen pixels, it will sometimes be rendered with 2 screen pixels, and sometimes with 3 screen pixels.
 */
function computeScreenAwareSize(cssPx) {
    const screenPx = window.devicePixelRatio * cssPx;
    return Math.max(1, Math.floor(screenPx)) / window.devicePixelRatio;
}
/**
 * See https://github.com/microsoft/monaco-editor/issues/601
 * To protect against malicious code in the linked site, particularly phishing attempts,
 * the window.opener should be set to null to prevent the linked site from having access
 * to change the location of the current page.
 * See https://mathiasbynens.github.io/rel-noopener/
 */
function windowOpenNoOpener(url) {
    if (isElectron || isEdgeLegacyWebView) {
        // In VSCode, window.open() always returns null...
        // The same is true for a WebView (see https://github.com/microsoft/monaco-editor/issues/628)
        // Also call directly window.open in sandboxed Electron (see https://github.com/microsoft/monaco-editor/issues/2220)
        window.open(url);
    }
    else {
        let newTab = window.open();
        if (newTab) {
            newTab.opener = null;
            newTab.location.href = url;
        }
    }
}
function animate(fn) {
    const step = () => {
        fn();
        stepDisposable = scheduleAtNextAnimationFrame(step);
    };
    let stepDisposable = scheduleAtNextAnimationFrame(step);
    return toDisposable(() => stepDisposable.dispose());
}
RemoteAuthorities.setPreferredWebSchema(/^https:/.test(window.location.href) ? 'https' : 'http');
/**
 * returns url('...')
 */
function asCSSUrl(uri) {
    if (!uri) {
        return `url('')`;
    }
    return `url('${FileAccess.asBrowserUri(uri).toString(true).replace(/'/g, '%27')}')`;
}
function asCSSPropertyValue(value) {
    return `'${value.replace(/'/g, '%27')}'`;
}
class ModifierKeyEmitter extends Emitter {
    constructor() {
        super();
        this._subscriptions = new DisposableStore();
        this._keyStatus = {
            altKey: false,
            shiftKey: false,
            ctrlKey: false,
            metaKey: false
        };
        this._subscriptions.add(domEvent(window, 'keydown', true)(e => {
            const event = new StandardKeyboardEvent(e);
            // If Alt-key keydown event is repeated, ignore it #112347
            // Only known to be necessary for Alt-Key at the moment #115810
            if (event.keyCode === 6 /* Alt */ && e.repeat) {
                return;
            }
            if (e.altKey && !this._keyStatus.altKey) {
                this._keyStatus.lastKeyPressed = 'alt';
            }
            else if (e.ctrlKey && !this._keyStatus.ctrlKey) {
                this._keyStatus.lastKeyPressed = 'ctrl';
            }
            else if (e.metaKey && !this._keyStatus.metaKey) {
                this._keyStatus.lastKeyPressed = 'meta';
            }
            else if (e.shiftKey && !this._keyStatus.shiftKey) {
                this._keyStatus.lastKeyPressed = 'shift';
            }
            else if (event.keyCode !== 6 /* Alt */) {
                this._keyStatus.lastKeyPressed = undefined;
            }
            else {
                return;
            }
            this._keyStatus.altKey = e.altKey;
            this._keyStatus.ctrlKey = e.ctrlKey;
            this._keyStatus.metaKey = e.metaKey;
            this._keyStatus.shiftKey = e.shiftKey;
            if (this._keyStatus.lastKeyPressed) {
                this._keyStatus.event = e;
                this.fire(this._keyStatus);
            }
        }));
        this._subscriptions.add(domEvent(window, 'keyup', true)(e => {
            if (!e.altKey && this._keyStatus.altKey) {
                this._keyStatus.lastKeyReleased = 'alt';
            }
            else if (!e.ctrlKey && this._keyStatus.ctrlKey) {
                this._keyStatus.lastKeyReleased = 'ctrl';
            }
            else if (!e.metaKey && this._keyStatus.metaKey) {
                this._keyStatus.lastKeyReleased = 'meta';
            }
            else if (!e.shiftKey && this._keyStatus.shiftKey) {
                this._keyStatus.lastKeyReleased = 'shift';
            }
            else {
                this._keyStatus.lastKeyReleased = undefined;
            }
            if (this._keyStatus.lastKeyPressed !== this._keyStatus.lastKeyReleased) {
                this._keyStatus.lastKeyPressed = undefined;
            }
            this._keyStatus.altKey = e.altKey;
            this._keyStatus.ctrlKey = e.ctrlKey;
            this._keyStatus.metaKey = e.metaKey;
            this._keyStatus.shiftKey = e.shiftKey;
            if (this._keyStatus.lastKeyReleased) {
                this._keyStatus.event = e;
                this.fire(this._keyStatus);
            }
        }));
        this._subscriptions.add(domEvent(document.body, 'mousedown', true)(e => {
            this._keyStatus.lastKeyPressed = undefined;
        }));
        this._subscriptions.add(domEvent(document.body, 'mouseup', true)(e => {
            this._keyStatus.lastKeyPressed = undefined;
        }));
        this._subscriptions.add(domEvent(document.body, 'mousemove', true)(e => {
            if (e.buttons) {
                this._keyStatus.lastKeyPressed = undefined;
            }
        }));
        this._subscriptions.add(domEvent(window, 'blur')(e => {
            this.resetKeyStatus();
        }));
    }
    get keyStatus() {
        return this._keyStatus;
    }
    /**
     * Allows to explicitly reset the key status based on more knowledge (#109062)
     */
    resetKeyStatus() {
        this.doResetKeyStatus();
        this.fire(this._keyStatus);
    }
    doResetKeyStatus() {
        this._keyStatus = {
            altKey: false,
            shiftKey: false,
            ctrlKey: false,
            metaKey: false
        };
    }
    static getInstance() {
        if (!ModifierKeyEmitter.instance) {
            ModifierKeyEmitter.instance = new ModifierKeyEmitter();
        }
        return ModifierKeyEmitter.instance;
    }
    dispose() {
        super.dispose();
        this._subscriptions.dispose();
    }
}

export { $, createStyleSheet as A, BrowserFeatures as B, getActiveElement as C, isAncestor as D, EventType as E, getTotalHeight as F, windowOpenNoOpener as G, findParentWithClass as H, IframeUtils as I, isInShadowDOM as J, asCSSUrl as K, removeCSSRulesContainingSelector as L, asCSSPropertyValue as M, hide as N, show as O, isHTMLElement as P, Dimension as Q, ModifierKeyEmitter as R, StandardMouseEvent as S, getContentWidth as T, getContentHeight as U, animate as V, stopEvent as W, hasParentWithClass as X, reset as Y, createCSSRule as Z, addDisposableListener as a, addDisposableNonBubblingMouseOutListener as b, addDisposableThrottledListener as c, addDisposableNonBubblingPointerOutListener as d, addStandardDisposableListener as e, StandardWindow as f, getDomNodePagePosition as g, getShadowRoot as h, StandardWheelEvent as i, getClientArea as j, computeScreenAwareSize as k, isInDOM as l, StandardKeyboardEvent as m, saveParentsScrollTop as n, restoreParentsScrollTop as o, EventHelper as p, getTotalWidth as q, runAtThisOrScheduleAtNextAnimationFrame as r, scheduleAtNextAnimationFrame as s, trackFocus as t, getTopLeftOffset as u, getComputedStyle as v, clearNode as w, append as x, domEvent as y, getElementsByTagName as z };
