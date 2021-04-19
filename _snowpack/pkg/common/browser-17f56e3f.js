import { n as Emitter } from './editorContextKeys-7b242db0.js';

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
class WindowManager {
    constructor() {
        // --- Zoom Level
        this._zoomLevel = 0;
        this._lastZoomLevelChangeTime = 0;
        this._onDidChangeZoomLevel = new Emitter();
        this.onDidChangeZoomLevel = this._onDidChangeZoomLevel.event;
        // --- Zoom Factor
        this._zoomFactor = 1;
    }
    getZoomLevel() {
        return this._zoomLevel;
    }
    getTimeSinceLastZoomLevelChanged() {
        return Date.now() - this._lastZoomLevelChangeTime;
    }
    getZoomFactor() {
        return this._zoomFactor;
    }
    // --- Pixel Ratio
    getPixelRatio() {
        let ctx = document.createElement('canvas').getContext('2d');
        let dpr = window.devicePixelRatio || 1;
        let bsr = ctx.webkitBackingStorePixelRatio ||
            ctx.mozBackingStorePixelRatio ||
            ctx.msBackingStorePixelRatio ||
            ctx.oBackingStorePixelRatio ||
            ctx.backingStorePixelRatio || 1;
        return dpr / bsr;
    }
}
WindowManager.INSTANCE = new WindowManager();
function getZoomLevel() {
    return WindowManager.INSTANCE.getZoomLevel();
}
/** Returns the time (in ms) since the zoom level was changed */
function getTimeSinceLastZoomLevelChanged() {
    return WindowManager.INSTANCE.getTimeSinceLastZoomLevelChanged();
}
function onDidChangeZoomLevel(callback) {
    return WindowManager.INSTANCE.onDidChangeZoomLevel(callback);
}
/** The zoom scale for an index, e.g. 1, 1.2, 1.4 */
function getZoomFactor() {
    return WindowManager.INSTANCE.getZoomFactor();
}
function getPixelRatio() {
    return WindowManager.INSTANCE.getPixelRatio();
}
const userAgent = navigator.userAgent;
const isFirefox = (userAgent.indexOf('Firefox') >= 0);
const isWebKit = (userAgent.indexOf('AppleWebKit') >= 0);
const isChrome = (userAgent.indexOf('Chrome') >= 0);
const isSafari = (!isChrome && (userAgent.indexOf('Safari') >= 0));
const isWebkitWebView = (!isChrome && !isSafari && isWebKit);
const isIPad = (userAgent.indexOf('iPad') >= 0 || (isSafari && navigator.maxTouchPoints > 0));
const isEdgeLegacyWebView = (userAgent.indexOf('Edge/') >= 0) && (userAgent.indexOf('WebView/') >= 0);
const isElectron = (userAgent.indexOf('Electron/') >= 0);
const isAndroid = (userAgent.indexOf('Android') >= 0);
const isStandalone = (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches);

export { getPixelRatio as a, getTimeSinceLastZoomLevelChanged as b, isWebKit as c, isSafari as d, isWebkitWebView as e, isAndroid as f, getZoomLevel as g, isStandalone as h, isFirefox as i, isElectron as j, isEdgeLegacyWebView as k, getZoomFactor as l, isChrome as m, onDidChangeZoomLevel as o };
