import { i as isFirefox, f as isAndroid, m as isChrome, d as isSafari } from './browser-17f56e3f.js';
import { e as addStandardDisposableListener, a as addDisposableListener, h as getShadowRoot, l as isInDOM, n as saveParentsScrollTop, o as restoreParentsScrollTop } from './dom-e1686e61.js';
import { R as RunOnceScheduler } from './async-a734ffcb.js';
import { aI as commonSuffixLength, aJ as commonPrefixLength, aK as containsEmoji, aL as containsFullWidthCharacter, R as Range, P as Position, a4 as Disposable, n as Emitter, B as isMacintosh, O as isHighSurrogate, S as Selection } from './editorContextKeys-7b242db0.js';

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
class TextAreaState {
    constructor(value, selectionStart, selectionEnd, selectionStartPosition, selectionEndPosition) {
        this.value = value;
        this.selectionStart = selectionStart;
        this.selectionEnd = selectionEnd;
        this.selectionStartPosition = selectionStartPosition;
        this.selectionEndPosition = selectionEndPosition;
    }
    toString() {
        return '[ <' + this.value + '>, selectionStart: ' + this.selectionStart + ', selectionEnd: ' + this.selectionEnd + ']';
    }
    static readFromTextArea(textArea) {
        return new TextAreaState(textArea.getValue(), textArea.getSelectionStart(), textArea.getSelectionEnd(), null, null);
    }
    collapseSelection() {
        return new TextAreaState(this.value, this.value.length, this.value.length, null, null);
    }
    writeToTextArea(reason, textArea, select) {
        textArea.setValue(reason, this.value);
        if (select) {
            textArea.setSelectionRange(reason, this.selectionStart, this.selectionEnd);
        }
    }
    deduceEditorPosition(offset) {
        if (offset <= this.selectionStart) {
            const str = this.value.substring(offset, this.selectionStart);
            return this._finishDeduceEditorPosition(this.selectionStartPosition, str, -1);
        }
        if (offset >= this.selectionEnd) {
            const str = this.value.substring(this.selectionEnd, offset);
            return this._finishDeduceEditorPosition(this.selectionEndPosition, str, 1);
        }
        const str1 = this.value.substring(this.selectionStart, offset);
        if (str1.indexOf(String.fromCharCode(8230)) === -1) {
            return this._finishDeduceEditorPosition(this.selectionStartPosition, str1, 1);
        }
        const str2 = this.value.substring(offset, this.selectionEnd);
        return this._finishDeduceEditorPosition(this.selectionEndPosition, str2, -1);
    }
    _finishDeduceEditorPosition(anchor, deltaText, signum) {
        let lineFeedCnt = 0;
        let lastLineFeedIndex = -1;
        while ((lastLineFeedIndex = deltaText.indexOf('\n', lastLineFeedIndex + 1)) !== -1) {
            lineFeedCnt++;
        }
        return [anchor, signum * deltaText.length, lineFeedCnt];
    }
    static selectedText(text) {
        return new TextAreaState(text, 0, text.length, null, null);
    }
    static deduceInput(previousState, currentState, couldBeEmojiInput) {
        if (!previousState) {
            // This is the EMPTY state
            return {
                text: '',
                replacePrevCharCnt: 0,
                replaceNextCharCnt: 0,
                positionDelta: 0
            };
        }
        let previousValue = previousState.value;
        let previousSelectionStart = previousState.selectionStart;
        let previousSelectionEnd = previousState.selectionEnd;
        let currentValue = currentState.value;
        let currentSelectionStart = currentState.selectionStart;
        let currentSelectionEnd = currentState.selectionEnd;
        // Strip the previous suffix from the value (without interfering with the current selection)
        const previousSuffix = previousValue.substring(previousSelectionEnd);
        const currentSuffix = currentValue.substring(currentSelectionEnd);
        const suffixLength = commonSuffixLength(previousSuffix, currentSuffix);
        currentValue = currentValue.substring(0, currentValue.length - suffixLength);
        previousValue = previousValue.substring(0, previousValue.length - suffixLength);
        const previousPrefix = previousValue.substring(0, previousSelectionStart);
        const currentPrefix = currentValue.substring(0, currentSelectionStart);
        const prefixLength = commonPrefixLength(previousPrefix, currentPrefix);
        currentValue = currentValue.substring(prefixLength);
        previousValue = previousValue.substring(prefixLength);
        currentSelectionStart -= prefixLength;
        previousSelectionStart -= prefixLength;
        currentSelectionEnd -= prefixLength;
        previousSelectionEnd -= prefixLength;
        if (couldBeEmojiInput && currentSelectionStart === currentSelectionEnd && previousValue.length > 0) {
            // on OSX, emojis from the emoji picker are inserted at random locations
            // the only hints we can use is that the selection is immediately after the inserted emoji
            // and that none of the old text has been deleted
            let potentialEmojiInput = null;
            if (currentSelectionStart === currentValue.length) {
                // emoji potentially inserted "somewhere" after the previous selection => it should appear at the end of `currentValue`
                if (currentValue.startsWith(previousValue)) {
                    // only if all of the old text is accounted for
                    potentialEmojiInput = currentValue.substring(previousValue.length);
                }
            }
            else {
                // emoji potentially inserted "somewhere" before the previous selection => it should appear at the start of `currentValue`
                if (currentValue.endsWith(previousValue)) {
                    // only if all of the old text is accounted for
                    potentialEmojiInput = currentValue.substring(0, currentValue.length - previousValue.length);
                }
            }
            if (potentialEmojiInput !== null && potentialEmojiInput.length > 0) {
                // now we check that this is indeed an emoji
                // emojis can grow quite long, so a length check is of no help
                // e.g. 1F3F4 E0067 E0062 E0065 E006E E0067 E007F  ; fully-qualified     # 🏴󠁧󠁢󠁥󠁮󠁧󠁿 England
                // Oftentimes, emojis use Variation Selector-16 (U+FE0F), so that is a good hint
                // http://emojipedia.org/variation-selector-16/
                // > An invisible codepoint which specifies that the preceding character
                // > should be displayed with emoji presentation. Only required if the
                // > preceding character defaults to text presentation.
                if (/\uFE0F/.test(potentialEmojiInput) || containsEmoji(potentialEmojiInput)) {
                    return {
                        text: potentialEmojiInput,
                        replacePrevCharCnt: 0,
                        replaceNextCharCnt: 0,
                        positionDelta: 0
                    };
                }
            }
        }
        if (currentSelectionStart === currentSelectionEnd) {
            // composition accept case (noticed in FF + Japanese)
            // [blahblah] => blahblah|
            if (previousValue === currentValue
                && previousSelectionStart === 0
                && previousSelectionEnd === previousValue.length
                && currentSelectionStart === currentValue.length
                && currentValue.indexOf('\n') === -1) {
                if (containsFullWidthCharacter(currentValue)) {
                    return {
                        text: '',
                        replacePrevCharCnt: 0,
                        replaceNextCharCnt: 0,
                        positionDelta: 0
                    };
                }
            }
            // no current selection
            const replacePreviousCharacters = (previousPrefix.length - prefixLength);
            return {
                text: currentValue,
                replacePrevCharCnt: replacePreviousCharacters,
                replaceNextCharCnt: 0,
                positionDelta: 0
            };
        }
        // there is a current selection => composition case
        const replacePreviousCharacters = previousSelectionEnd - previousSelectionStart;
        return {
            text: currentValue,
            replacePrevCharCnt: replacePreviousCharacters,
            replaceNextCharCnt: 0,
            positionDelta: 0
        };
    }
    static deduceAndroidCompositionInput(previousState, currentState) {
        if (!previousState) {
            // This is the EMPTY state
            return {
                text: '',
                replacePrevCharCnt: 0,
                replaceNextCharCnt: 0,
                positionDelta: 0
            };
        }
        if (previousState.value === currentState.value) {
            return {
                text: '',
                replacePrevCharCnt: 0,
                replaceNextCharCnt: 0,
                positionDelta: currentState.selectionEnd - previousState.selectionEnd
            };
        }
        const prefixLength = Math.min(commonPrefixLength(previousState.value, currentState.value), previousState.selectionEnd);
        const suffixLength = Math.min(commonSuffixLength(previousState.value, currentState.value), previousState.value.length - previousState.selectionEnd);
        const previousValue = previousState.value.substring(prefixLength, previousState.value.length - suffixLength);
        const currentValue = currentState.value.substring(prefixLength, currentState.value.length - suffixLength);
        const previousSelectionStart = previousState.selectionStart - prefixLength;
        const previousSelectionEnd = previousState.selectionEnd - prefixLength;
        const currentSelectionStart = currentState.selectionStart - prefixLength;
        const currentSelectionEnd = currentState.selectionEnd - prefixLength;
        return {
            text: currentValue,
            replacePrevCharCnt: previousSelectionEnd,
            replaceNextCharCnt: previousValue.length - previousSelectionEnd,
            positionDelta: currentSelectionEnd - currentValue.length
        };
    }
}
TextAreaState.EMPTY = new TextAreaState('', 0, 0, null, null);
class PagedScreenReaderStrategy {
    static _getPageOfLine(lineNumber, linesPerPage) {
        return Math.floor((lineNumber - 1) / linesPerPage);
    }
    static _getRangeForPage(page, linesPerPage) {
        const offset = page * linesPerPage;
        const startLineNumber = offset + 1;
        const endLineNumber = offset + linesPerPage;
        return new Range(startLineNumber, 1, endLineNumber + 1, 1);
    }
    static fromEditorSelection(previousState, model, selection, linesPerPage, trimLongText) {
        const selectionStartPage = PagedScreenReaderStrategy._getPageOfLine(selection.startLineNumber, linesPerPage);
        const selectionStartPageRange = PagedScreenReaderStrategy._getRangeForPage(selectionStartPage, linesPerPage);
        const selectionEndPage = PagedScreenReaderStrategy._getPageOfLine(selection.endLineNumber, linesPerPage);
        const selectionEndPageRange = PagedScreenReaderStrategy._getRangeForPage(selectionEndPage, linesPerPage);
        const pretextRange = selectionStartPageRange.intersectRanges(new Range(1, 1, selection.startLineNumber, selection.startColumn));
        let pretext = model.getValueInRange(pretextRange, 1 /* LF */);
        const lastLine = model.getLineCount();
        const lastLineMaxColumn = model.getLineMaxColumn(lastLine);
        const posttextRange = selectionEndPageRange.intersectRanges(new Range(selection.endLineNumber, selection.endColumn, lastLine, lastLineMaxColumn));
        let posttext = model.getValueInRange(posttextRange, 1 /* LF */);
        let text;
        if (selectionStartPage === selectionEndPage || selectionStartPage + 1 === selectionEndPage) {
            // take full selection
            text = model.getValueInRange(selection, 1 /* LF */);
        }
        else {
            const selectionRange1 = selectionStartPageRange.intersectRanges(selection);
            const selectionRange2 = selectionEndPageRange.intersectRanges(selection);
            text = (model.getValueInRange(selectionRange1, 1 /* LF */)
                + String.fromCharCode(8230)
                + model.getValueInRange(selectionRange2, 1 /* LF */));
        }
        // Chromium handles very poorly text even of a few thousand chars
        // Cut text to avoid stalling the entire UI
        if (trimLongText) {
            const LIMIT_CHARS = 500;
            if (pretext.length > LIMIT_CHARS) {
                pretext = pretext.substring(pretext.length - LIMIT_CHARS, pretext.length);
            }
            if (posttext.length > LIMIT_CHARS) {
                posttext = posttext.substring(0, LIMIT_CHARS);
            }
            if (text.length > 2 * LIMIT_CHARS) {
                text = text.substring(0, LIMIT_CHARS) + String.fromCharCode(8230) + text.substring(text.length - LIMIT_CHARS, text.length);
            }
        }
        return new TextAreaState(pretext + text + posttext, pretext.length, pretext.length + text.length, new Position(selection.startLineNumber, selection.startColumn), new Position(selection.endLineNumber, selection.endColumn));
    }
}

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var TextAreaSyntethicEvents;
(function (TextAreaSyntethicEvents) {
    TextAreaSyntethicEvents.Tap = '-monaco-textarea-synthetic-tap';
})(TextAreaSyntethicEvents || (TextAreaSyntethicEvents = {}));
const CopyOptions = {
    forceCopyWithSyntaxHighlighting: false
};
/**
 * Every time we write to the clipboard, we record a bit of extra metadata here.
 * Every time we read from the cipboard, if the text matches our last written text,
 * we can fetch the previous metadata.
 */
class InMemoryClipboardMetadataManager {
    constructor() {
        this._lastState = null;
    }
    set(lastCopiedValue, data) {
        this._lastState = { lastCopiedValue, data };
    }
    get(pastedText) {
        if (this._lastState && this._lastState.lastCopiedValue === pastedText) {
            // match!
            return this._lastState.data;
        }
        this._lastState = null;
        return null;
    }
}
InMemoryClipboardMetadataManager.INSTANCE = new InMemoryClipboardMetadataManager();
/**
 * Writes screen reader content to the textarea and is able to analyze its input events to generate:
 *  - onCut
 *  - onPaste
 *  - onType
 *
 * Composition events are generated for presentation purposes (composition input is reflected in onType).
 */
class TextAreaInput extends Disposable {
    constructor(host, textArea) {
        super();
        this.textArea = textArea;
        this._onFocus = this._register(new Emitter());
        this.onFocus = this._onFocus.event;
        this._onBlur = this._register(new Emitter());
        this.onBlur = this._onBlur.event;
        this._onKeyDown = this._register(new Emitter());
        this.onKeyDown = this._onKeyDown.event;
        this._onKeyUp = this._register(new Emitter());
        this.onKeyUp = this._onKeyUp.event;
        this._onCut = this._register(new Emitter());
        this.onCut = this._onCut.event;
        this._onPaste = this._register(new Emitter());
        this.onPaste = this._onPaste.event;
        this._onType = this._register(new Emitter());
        this.onType = this._onType.event;
        this._onCompositionStart = this._register(new Emitter());
        this.onCompositionStart = this._onCompositionStart.event;
        this._onCompositionUpdate = this._register(new Emitter());
        this.onCompositionUpdate = this._onCompositionUpdate.event;
        this._onCompositionEnd = this._register(new Emitter());
        this.onCompositionEnd = this._onCompositionEnd.event;
        this._onSelectionChangeRequest = this._register(new Emitter());
        this.onSelectionChangeRequest = this._onSelectionChangeRequest.event;
        this._host = host;
        this._textArea = this._register(new TextAreaWrapper(textArea));
        this._asyncTriggerCut = this._register(new RunOnceScheduler(() => this._onCut.fire(), 0));
        this._asyncFocusGainWriteScreenReaderContent = this._register(new RunOnceScheduler(() => this.writeScreenReaderContent('asyncFocusGain'), 0));
        this._textAreaState = TextAreaState.EMPTY;
        this._selectionChangeListener = null;
        this.writeScreenReaderContent('ctor');
        this._hasFocus = false;
        this._isDoingComposition = false;
        this._nextCommand = 0 /* Type */;
        let lastKeyDown = null;
        this._register(addStandardDisposableListener(textArea.domNode, 'keydown', (e) => {
            if (e.keyCode === 109 /* KEY_IN_COMPOSITION */
                || (this._isDoingComposition && e.keyCode === 1 /* Backspace */)) {
                // Stop propagation for keyDown events if the IME is processing key input
                e.stopPropagation();
            }
            if (e.equals(9 /* Escape */)) {
                // Prevent default always for `Esc`, otherwise it will generate a keypress
                // See https://msdn.microsoft.com/en-us/library/ie/ms536939(v=vs.85).aspx
                e.preventDefault();
            }
            lastKeyDown = e;
            this._onKeyDown.fire(e);
        }));
        this._register(addStandardDisposableListener(textArea.domNode, 'keyup', (e) => {
            this._onKeyUp.fire(e);
        }));
        this._register(addDisposableListener(textArea.domNode, 'compositionstart', (e) => {
            if (this._isDoingComposition) {
                return;
            }
            this._isDoingComposition = true;
            if (isMacintosh
                && this._textAreaState.selectionStart === this._textAreaState.selectionEnd
                && this._textAreaState.selectionStart > 0
                && this._textAreaState.value.substr(this._textAreaState.selectionStart - 1, 1) === e.data) {
                const isArrowKey = (lastKeyDown && lastKeyDown.equals(109 /* KEY_IN_COMPOSITION */)
                    && (lastKeyDown.code === 'ArrowRight' || lastKeyDown.code === 'ArrowLeft'));
                if (isArrowKey || isFirefox) {
                    this._textAreaState = new TextAreaState(this._textAreaState.value, this._textAreaState.selectionStart - 1, this._textAreaState.selectionEnd, this._textAreaState.selectionStartPosition ? new Position(this._textAreaState.selectionStartPosition.lineNumber, this._textAreaState.selectionStartPosition.column - 1) : null, this._textAreaState.selectionEndPosition);
                    this._onCompositionStart.fire({ revealDeltaColumns: -1 });
                    return;
                }
            }
            if (isAndroid) {
                // when tapping on the editor, Android enters composition mode to edit the current word
                // so we cannot clear the textarea on Android and we must pretend the current word was selected
                this._onCompositionStart.fire({ revealDeltaColumns: -this._textAreaState.selectionStart });
                return;
            }
            this._setAndWriteTextAreaState('compositionstart', TextAreaState.EMPTY);
            this._onCompositionStart.fire({ revealDeltaColumns: 0 });
        }));
        /**
         * Deduce the typed input from a text area's value and the last observed state.
         */
        const deduceInputFromTextAreaValue = (couldBeEmojiInput) => {
            const oldState = this._textAreaState;
            const newState = TextAreaState.readFromTextArea(this._textArea);
            return [newState, TextAreaState.deduceInput(oldState, newState, couldBeEmojiInput)];
        };
        const deduceAndroidCompositionInput = () => {
            const oldState = this._textAreaState;
            const newState = TextAreaState.readFromTextArea(this._textArea);
            return [newState, TextAreaState.deduceAndroidCompositionInput(oldState, newState)];
        };
        /**
         * Deduce the composition input from a string.
         */
        const deduceComposition = (text) => {
            const oldState = this._textAreaState;
            const newState = TextAreaState.selectedText(text);
            const typeInput = {
                text: newState.value,
                replacePrevCharCnt: oldState.selectionEnd - oldState.selectionStart,
                replaceNextCharCnt: 0,
                positionDelta: 0
            };
            return [newState, typeInput];
        };
        this._register(addDisposableListener(textArea.domNode, 'compositionupdate', (e) => {
            if (isAndroid) {
                // On Android, the data sent with the composition update event is unusable.
                // For example, if the cursor is in the middle of a word like Mic|osoft
                // and Microsoft is chosen from the keyboard's suggestions, the e.data will contain "Microsoft".
                // This is not really usable because it doesn't tell us where the edit began and where it ended.
                const [newState, typeInput] = deduceAndroidCompositionInput();
                this._textAreaState = newState;
                this._onType.fire(typeInput);
                this._onCompositionUpdate.fire(e);
                return;
            }
            const [newState, typeInput] = deduceComposition(e.data || '');
            this._textAreaState = newState;
            this._onType.fire(typeInput);
            this._onCompositionUpdate.fire(e);
        }));
        this._register(addDisposableListener(textArea.domNode, 'compositionend', (e) => {
            // https://github.com/microsoft/monaco-editor/issues/1663
            // On iOS 13.2, Chinese system IME randomly trigger an additional compositionend event with empty data
            if (!this._isDoingComposition) {
                return;
            }
            this._isDoingComposition = false;
            if (isAndroid) {
                // On Android, the data sent with the composition update event is unusable.
                // For example, if the cursor is in the middle of a word like Mic|osoft
                // and Microsoft is chosen from the keyboard's suggestions, the e.data will contain "Microsoft".
                // This is not really usable because it doesn't tell us where the edit began and where it ended.
                const [newState, typeInput] = deduceAndroidCompositionInput();
                this._textAreaState = newState;
                this._onType.fire(typeInput);
                this._onCompositionEnd.fire();
                return;
            }
            const [newState, typeInput] = deduceComposition(e.data || '');
            this._textAreaState = newState;
            this._onType.fire(typeInput);
            // isChrome: the textarea is not updated correctly when composition ends
            // isFirefox: the textarea is not updated correctly after inserting emojis
            // => we cannot assume the text at the end consists only of the composited text
            if (isChrome || isFirefox) {
                this._textAreaState = TextAreaState.readFromTextArea(this._textArea);
            }
            this._onCompositionEnd.fire();
        }));
        this._register(addDisposableListener(textArea.domNode, 'input', () => {
            // Pretend here we touched the text area, as the `input` event will most likely
            // result in a `selectionchange` event which we want to ignore
            this._textArea.setIgnoreSelectionChangeTime('received input event');
            if (this._isDoingComposition) {
                return;
            }
            const [newState, typeInput] = deduceInputFromTextAreaValue(/*couldBeEmojiInput*/ isMacintosh);
            if (typeInput.replacePrevCharCnt === 0 && typeInput.text.length === 1 && isHighSurrogate(typeInput.text.charCodeAt(0))) {
                // Ignore invalid input but keep it around for next time
                return;
            }
            this._textAreaState = newState;
            if (this._nextCommand === 0 /* Type */) {
                if (typeInput.text !== '' || typeInput.replacePrevCharCnt !== 0) {
                    this._onType.fire(typeInput);
                }
            }
            else {
                if (typeInput.text !== '' || typeInput.replacePrevCharCnt !== 0) {
                    this._firePaste(typeInput.text, null);
                }
                this._nextCommand = 0 /* Type */;
            }
        }));
        // --- Clipboard operations
        this._register(addDisposableListener(textArea.domNode, 'cut', (e) => {
            // Pretend here we touched the text area, as the `cut` event will most likely
            // result in a `selectionchange` event which we want to ignore
            this._textArea.setIgnoreSelectionChangeTime('received cut event');
            this._ensureClipboardGetsEditorSelection(e);
            this._asyncTriggerCut.schedule();
        }));
        this._register(addDisposableListener(textArea.domNode, 'copy', (e) => {
            this._ensureClipboardGetsEditorSelection(e);
        }));
        this._register(addDisposableListener(textArea.domNode, 'paste', (e) => {
            // Pretend here we touched the text area, as the `paste` event will most likely
            // result in a `selectionchange` event which we want to ignore
            this._textArea.setIgnoreSelectionChangeTime('received paste event');
            if (ClipboardEventUtils.canUseTextData(e)) {
                const [pastePlainText, metadata] = ClipboardEventUtils.getTextData(e);
                if (pastePlainText !== '') {
                    this._firePaste(pastePlainText, metadata);
                }
            }
            else {
                if (this._textArea.getSelectionStart() !== this._textArea.getSelectionEnd()) {
                    // Clean up the textarea, to get a clean paste
                    this._setAndWriteTextAreaState('paste', TextAreaState.EMPTY);
                }
                this._nextCommand = 1 /* Paste */;
            }
        }));
        this._register(addDisposableListener(textArea.domNode, 'focus', () => {
            const hadFocus = this._hasFocus;
            this._setHasFocus(true);
            if (isSafari && !hadFocus && this._hasFocus) {
                // When "tabbing into" the textarea, immediately after dispatching the 'focus' event,
                // Safari will always move the selection at offset 0 in the textarea
                this._asyncFocusGainWriteScreenReaderContent.schedule();
            }
        }));
        this._register(addDisposableListener(textArea.domNode, 'blur', () => {
            if (this._isDoingComposition) {
                // See https://github.com/microsoft/vscode/issues/112621
                // where compositionend is not triggered when the editor
                // is taken off-dom during a composition
                // Clear the flag to be able to write to the textarea
                this._isDoingComposition = false;
                // Clear the textarea to avoid an unwanted cursor type
                this.writeScreenReaderContent('blurWithoutCompositionEnd');
                // Fire artificial composition end
                this._onCompositionEnd.fire();
            }
            this._setHasFocus(false);
        }));
        this._register(addDisposableListener(textArea.domNode, TextAreaSyntethicEvents.Tap, () => {
            if (isAndroid && this._isDoingComposition) {
                // on Android, tapping does not cancel the current composition, so the
                // textarea is stuck showing the old composition
                // Clear the flag to be able to write to the textarea
                this._isDoingComposition = false;
                // Clear the textarea to avoid an unwanted cursor type
                this.writeScreenReaderContent('tapWithoutCompositionEnd');
                // Fire artificial composition end
                this._onCompositionEnd.fire();
            }
        }));
    }
    _installSelectionChangeListener() {
        // See https://github.com/microsoft/vscode/issues/27216 and https://github.com/microsoft/vscode/issues/98256
        // When using a Braille display, it is possible for users to reposition the
        // system caret. This is reflected in Chrome as a `selectionchange` event.
        //
        // The `selectionchange` event appears to be emitted under numerous other circumstances,
        // so it is quite a challenge to distinguish a `selectionchange` coming in from a user
        // using a Braille display from all the other cases.
        //
        // The problems with the `selectionchange` event are:
        //  * the event is emitted when the textarea is focused programmatically -- textarea.focus()
        //  * the event is emitted when the selection is changed in the textarea programmatically -- textarea.setSelectionRange(...)
        //  * the event is emitted when the value of the textarea is changed programmatically -- textarea.value = '...'
        //  * the event is emitted when tabbing into the textarea
        //  * the event is emitted asynchronously (sometimes with a delay as high as a few tens of ms)
        //  * the event sometimes comes in bursts for a single logical textarea operation
        // `selectionchange` events often come multiple times for a single logical change
        // so throttle multiple `selectionchange` events that burst in a short period of time.
        let previousSelectionChangeEventTime = 0;
        return addDisposableListener(document, 'selectionchange', (e) => {
            if (!this._hasFocus) {
                return;
            }
            if (this._isDoingComposition) {
                return;
            }
            if (!isChrome) {
                // Support only for Chrome until testing happens on other browsers
                return;
            }
            const now = Date.now();
            const delta1 = now - previousSelectionChangeEventTime;
            previousSelectionChangeEventTime = now;
            if (delta1 < 5) {
                // received another `selectionchange` event within 5ms of the previous `selectionchange` event
                // => ignore it
                return;
            }
            const delta2 = now - this._textArea.getIgnoreSelectionChangeTime();
            this._textArea.resetSelectionChangeTime();
            if (delta2 < 100) {
                // received a `selectionchange` event within 100ms since we touched the textarea
                // => ignore it, since we caused it
                return;
            }
            if (!this._textAreaState.selectionStartPosition || !this._textAreaState.selectionEndPosition) {
                // Cannot correlate a position in the textarea with a position in the editor...
                return;
            }
            const newValue = this._textArea.getValue();
            if (this._textAreaState.value !== newValue) {
                // Cannot correlate a position in the textarea with a position in the editor...
                return;
            }
            const newSelectionStart = this._textArea.getSelectionStart();
            const newSelectionEnd = this._textArea.getSelectionEnd();
            if (this._textAreaState.selectionStart === newSelectionStart && this._textAreaState.selectionEnd === newSelectionEnd) {
                // Nothing to do...
                return;
            }
            const _newSelectionStartPosition = this._textAreaState.deduceEditorPosition(newSelectionStart);
            const newSelectionStartPosition = this._host.deduceModelPosition(_newSelectionStartPosition[0], _newSelectionStartPosition[1], _newSelectionStartPosition[2]);
            const _newSelectionEndPosition = this._textAreaState.deduceEditorPosition(newSelectionEnd);
            const newSelectionEndPosition = this._host.deduceModelPosition(_newSelectionEndPosition[0], _newSelectionEndPosition[1], _newSelectionEndPosition[2]);
            const newSelection = new Selection(newSelectionStartPosition.lineNumber, newSelectionStartPosition.column, newSelectionEndPosition.lineNumber, newSelectionEndPosition.column);
            this._onSelectionChangeRequest.fire(newSelection);
        });
    }
    dispose() {
        super.dispose();
        if (this._selectionChangeListener) {
            this._selectionChangeListener.dispose();
            this._selectionChangeListener = null;
        }
    }
    focusTextArea() {
        // Setting this._hasFocus and writing the screen reader content
        // will result in a focus() and setSelectionRange() in the textarea
        this._setHasFocus(true);
        // If the editor is off DOM, focus cannot be really set, so let's double check that we have managed to set the focus
        this.refreshFocusState();
    }
    isFocused() {
        return this._hasFocus;
    }
    refreshFocusState() {
        const shadowRoot = getShadowRoot(this.textArea.domNode);
        if (shadowRoot) {
            this._setHasFocus(shadowRoot.activeElement === this.textArea.domNode);
        }
        else if (isInDOM(this.textArea.domNode)) {
            this._setHasFocus(document.activeElement === this.textArea.domNode);
        }
        else {
            this._setHasFocus(false);
        }
    }
    _setHasFocus(newHasFocus) {
        if (this._hasFocus === newHasFocus) {
            // no change
            return;
        }
        this._hasFocus = newHasFocus;
        if (this._selectionChangeListener) {
            this._selectionChangeListener.dispose();
            this._selectionChangeListener = null;
        }
        if (this._hasFocus) {
            this._selectionChangeListener = this._installSelectionChangeListener();
        }
        if (this._hasFocus) {
            this.writeScreenReaderContent('focusgain');
        }
        if (this._hasFocus) {
            this._onFocus.fire();
        }
        else {
            this._onBlur.fire();
        }
    }
    _setAndWriteTextAreaState(reason, textAreaState) {
        if (!this._hasFocus) {
            textAreaState = textAreaState.collapseSelection();
        }
        textAreaState.writeToTextArea(reason, this._textArea, this._hasFocus);
        this._textAreaState = textAreaState;
    }
    writeScreenReaderContent(reason) {
        if (this._isDoingComposition) {
            // Do not write to the text area when doing composition
            return;
        }
        this._setAndWriteTextAreaState(reason, this._host.getScreenReaderContent(this._textAreaState));
    }
    _ensureClipboardGetsEditorSelection(e) {
        const dataToCopy = this._host.getDataToCopy(ClipboardEventUtils.canUseTextData(e));
        const storedMetadata = {
            version: 1,
            isFromEmptySelection: dataToCopy.isFromEmptySelection,
            multicursorText: dataToCopy.multicursorText,
            mode: dataToCopy.mode
        };
        InMemoryClipboardMetadataManager.INSTANCE.set(
        // When writing "LINE\r\n" to the clipboard and then pasting,
        // Firefox pastes "LINE\n", so let's work around this quirk
        (isFirefox ? dataToCopy.text.replace(/\r\n/g, '\n') : dataToCopy.text), storedMetadata);
        if (!ClipboardEventUtils.canUseTextData(e)) {
            // Looks like an old browser. The strategy is to place the text
            // we'd like to be copied to the clipboard in the textarea and select it.
            this._setAndWriteTextAreaState('copy or cut', TextAreaState.selectedText(dataToCopy.text));
            return;
        }
        ClipboardEventUtils.setTextData(e, dataToCopy.text, dataToCopy.html, storedMetadata);
    }
    _firePaste(text, metadata) {
        if (!metadata) {
            // try the in-memory store
            metadata = InMemoryClipboardMetadataManager.INSTANCE.get(text);
        }
        this._onPaste.fire({
            text: text,
            metadata: metadata
        });
    }
}
class ClipboardEventUtils {
    static canUseTextData(e) {
        if (e.clipboardData) {
            return true;
        }
        if (window.clipboardData) {
            return true;
        }
        return false;
    }
    static getTextData(e) {
        if (e.clipboardData) {
            e.preventDefault();
            const text = e.clipboardData.getData('text/plain');
            let metadata = null;
            const rawmetadata = e.clipboardData.getData('vscode-editor-data');
            if (typeof rawmetadata === 'string') {
                try {
                    metadata = JSON.parse(rawmetadata);
                    if (metadata.version !== 1) {
                        metadata = null;
                    }
                }
                catch (err) {
                    // no problem!
                }
            }
            return [text, metadata];
        }
        if (window.clipboardData) {
            e.preventDefault();
            const text = window.clipboardData.getData('Text');
            return [text, null];
        }
        throw new Error('ClipboardEventUtils.getTextData: Cannot use text data!');
    }
    static setTextData(e, text, html, metadata) {
        if (e.clipboardData) {
            e.clipboardData.setData('text/plain', text);
            if (typeof html === 'string') {
                e.clipboardData.setData('text/html', html);
            }
            e.clipboardData.setData('vscode-editor-data', JSON.stringify(metadata));
            e.preventDefault();
            return;
        }
        if (window.clipboardData) {
            window.clipboardData.setData('Text', text);
            e.preventDefault();
            return;
        }
        throw new Error('ClipboardEventUtils.setTextData: Cannot use text data!');
    }
}
class TextAreaWrapper extends Disposable {
    constructor(_textArea) {
        super();
        this._actual = _textArea;
        this._ignoreSelectionChangeTime = 0;
    }
    setIgnoreSelectionChangeTime(reason) {
        this._ignoreSelectionChangeTime = Date.now();
    }
    getIgnoreSelectionChangeTime() {
        return this._ignoreSelectionChangeTime;
    }
    resetSelectionChangeTime() {
        this._ignoreSelectionChangeTime = 0;
    }
    getValue() {
        // console.log('current value: ' + this._textArea.value);
        return this._actual.domNode.value;
    }
    setValue(reason, value) {
        const textArea = this._actual.domNode;
        if (textArea.value === value) {
            // No change
            return;
        }
        // console.log('reason: ' + reason + ', current value: ' + textArea.value + ' => new value: ' + value);
        this.setIgnoreSelectionChangeTime('setValue');
        textArea.value = value;
    }
    getSelectionStart() {
        return this._actual.domNode.selectionDirection === 'backward' ? this._actual.domNode.selectionEnd : this._actual.domNode.selectionStart;
    }
    getSelectionEnd() {
        return this._actual.domNode.selectionDirection === 'backward' ? this._actual.domNode.selectionStart : this._actual.domNode.selectionEnd;
    }
    setSelectionRange(reason, selectionStart, selectionEnd) {
        const textArea = this._actual.domNode;
        let activeElement = null;
        const shadowRoot = getShadowRoot(textArea);
        if (shadowRoot) {
            activeElement = shadowRoot.activeElement;
        }
        else {
            activeElement = document.activeElement;
        }
        const currentIsFocused = (activeElement === textArea);
        const currentSelectionStart = textArea.selectionStart;
        const currentSelectionEnd = textArea.selectionEnd;
        if (currentIsFocused && currentSelectionStart === selectionStart && currentSelectionEnd === selectionEnd) {
            // No change
            // Firefox iframe bug https://github.com/microsoft/monaco-editor/issues/643#issuecomment-367871377
            if (isFirefox && window.parent !== window) {
                textArea.focus();
            }
            return;
        }
        // console.log('reason: ' + reason + ', setSelectionRange: ' + selectionStart + ' -> ' + selectionEnd);
        if (currentIsFocused) {
            // No need to focus, only need to change the selection range
            this.setIgnoreSelectionChangeTime('setSelectionRange');
            textArea.setSelectionRange(selectionStart, selectionEnd);
            if (isFirefox && window.parent !== window) {
                textArea.focus();
            }
            return;
        }
        // If the focus is outside the textarea, browsers will try really hard to reveal the textarea.
        // Here, we try to undo the browser's desperate reveal.
        try {
            const scrollState = saveParentsScrollTop(textArea);
            this.setIgnoreSelectionChangeTime('setSelectionRange');
            textArea.focus();
            textArea.setSelectionRange(selectionStart, selectionEnd);
            restoreParentsScrollTop(textArea, scrollState);
        }
        catch (e) {
            // Sometimes IE throws when setting selection (e.g. textarea is off-DOM)
        }
    }
}

export { CopyOptions as C, InMemoryClipboardMetadataManager as I, PagedScreenReaderStrategy as P, TextAreaSyntethicEvents as T, TextAreaInput as a, TextAreaState as b };
