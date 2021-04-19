import { b as localize, at as registerThemingParticipant } from './editorContextKeys-7b242db0.js';
import { j as Color, G as RGBA } from './textModel-76ba00eb.js';
import { v as registerColor, w as activeContrastBorder, x as editorFindMatchHighlight, y as contrastBorder, z as editorBackground, l as editorWarningForeground, k as editorWarningBorder, p as editorInfoForeground, o as editorInfoBorder, u as editorForeground } from './colorRegistry-4256ae63.js';

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
/**
 * Definition of the editor colors
 */
const editorLineHighlight = registerColor('editor.lineHighlightBackground', { dark: null, light: null, hc: null }, localize('lineHighlight', 'Background color for the highlight of line at the cursor position.'));
const editorLineHighlightBorder = registerColor('editor.lineHighlightBorder', { dark: '#282828', light: '#eeeeee', hc: '#f38518' }, localize('lineHighlightBorderBox', 'Background color for the border around the line at the cursor position.'));
const editorRangeHighlight = registerColor('editor.rangeHighlightBackground', { dark: '#ffffff0b', light: '#fdff0033', hc: null }, localize('rangeHighlight', 'Background color of highlighted ranges, like by quick open and find features. The color must not be opaque so as not to hide underlying decorations.'), true);
const editorRangeHighlightBorder = registerColor('editor.rangeHighlightBorder', { dark: null, light: null, hc: activeContrastBorder }, localize('rangeHighlightBorder', 'Background color of the border around highlighted ranges.'), true);
const editorSymbolHighlight = registerColor('editor.symbolHighlightBackground', { dark: editorFindMatchHighlight, light: editorFindMatchHighlight, hc: null }, localize('symbolHighlight', 'Background color of highlighted symbol, like for go to definition or go next/previous symbol. The color must not be opaque so as not to hide underlying decorations.'), true);
const editorSymbolHighlightBorder = registerColor('editor.symbolHighlightBorder', { dark: null, light: null, hc: activeContrastBorder }, localize('symbolHighlightBorder', 'Background color of the border around highlighted symbols.'), true);
const editorCursorForeground = registerColor('editorCursor.foreground', { dark: '#AEAFAD', light: Color.black, hc: Color.white }, localize('caret', 'Color of the editor cursor.'));
const editorCursorBackground = registerColor('editorCursor.background', null, localize('editorCursorBackground', 'The background color of the editor cursor. Allows customizing the color of a character overlapped by a block cursor.'));
const editorWhitespaces = registerColor('editorWhitespace.foreground', { dark: '#e3e4e229', light: '#33333333', hc: '#e3e4e229' }, localize('editorWhitespaces', 'Color of whitespace characters in the editor.'));
const editorIndentGuides = registerColor('editorIndentGuide.background', { dark: editorWhitespaces, light: editorWhitespaces, hc: editorWhitespaces }, localize('editorIndentGuides', 'Color of the editor indentation guides.'));
const editorActiveIndentGuides = registerColor('editorIndentGuide.activeBackground', { dark: editorWhitespaces, light: editorWhitespaces, hc: editorWhitespaces }, localize('editorActiveIndentGuide', 'Color of the active editor indentation guides.'));
const editorLineNumbers = registerColor('editorLineNumber.foreground', { dark: '#858585', light: '#237893', hc: Color.white }, localize('editorLineNumbers', 'Color of editor line numbers.'));
const deprecatedEditorActiveLineNumber = registerColor('editorActiveLineNumber.foreground', { dark: '#c6c6c6', light: '#0B216F', hc: activeContrastBorder }, localize('editorActiveLineNumber', 'Color of editor active line number'), false, localize('deprecatedEditorActiveLineNumber', 'Id is deprecated. Use \'editorLineNumber.activeForeground\' instead.'));
const editorActiveLineNumber = registerColor('editorLineNumber.activeForeground', { dark: deprecatedEditorActiveLineNumber, light: deprecatedEditorActiveLineNumber, hc: deprecatedEditorActiveLineNumber }, localize('editorActiveLineNumber', 'Color of editor active line number'));
const editorRuler = registerColor('editorRuler.foreground', { dark: '#5A5A5A', light: Color.lightgrey, hc: Color.white }, localize('editorRuler', 'Color of the editor rulers.'));
const editorCodeLensForeground = registerColor('editorCodeLens.foreground', { dark: '#999999', light: '#999999', hc: '#999999' }, localize('editorCodeLensForeground', 'Foreground color of editor CodeLens'));
const editorBracketMatchBackground = registerColor('editorBracketMatch.background', { dark: '#0064001a', light: '#0064001a', hc: '#0064001a' }, localize('editorBracketMatchBackground', 'Background color behind matching brackets'));
const editorBracketMatchBorder = registerColor('editorBracketMatch.border', { dark: '#888', light: '#B9B9B9', hc: contrastBorder }, localize('editorBracketMatchBorder', 'Color for matching brackets boxes'));
const editorOverviewRulerBorder = registerColor('editorOverviewRuler.border', { dark: '#7f7f7f4d', light: '#7f7f7f4d', hc: '#7f7f7f4d' }, localize('editorOverviewRulerBorder', 'Color of the overview ruler border.'));
const editorOverviewRulerBackground = registerColor('editorOverviewRuler.background', null, localize('editorOverviewRulerBackground', 'Background color of the editor overview ruler. Only used when the minimap is enabled and placed on the right side of the editor.'));
const editorGutter = registerColor('editorGutter.background', { dark: editorBackground, light: editorBackground, hc: editorBackground }, localize('editorGutter', 'Background color of the editor gutter. The gutter contains the glyph margins and the line numbers.'));
const editorUnnecessaryCodeBorder = registerColor('editorUnnecessaryCode.border', { dark: null, light: null, hc: Color.fromHex('#fff').transparent(0.8) }, localize('unnecessaryCodeBorder', 'Border color of unnecessary (unused) source code in the editor.'));
const editorUnnecessaryCodeOpacity = registerColor('editorUnnecessaryCode.opacity', { dark: Color.fromHex('#000a'), light: Color.fromHex('#0007'), hc: null }, localize('unnecessaryCodeOpacity', 'Opacity of unnecessary (unused) source code in the editor. For example, "#000000c0" will render the code with 75% opacity. For high contrast themes, use the  \'editorUnnecessaryCode.border\' theme color to underline unnecessary code instead of fading it out.'));
const rulerRangeDefault = new Color(new RGBA(0, 122, 204, 0.6));
const overviewRulerRangeHighlight = registerColor('editorOverviewRuler.rangeHighlightForeground', { dark: rulerRangeDefault, light: rulerRangeDefault, hc: rulerRangeDefault }, localize('overviewRulerRangeHighlight', 'Overview ruler marker color for range highlights. The color must not be opaque so as not to hide underlying decorations.'), true);
const overviewRulerError = registerColor('editorOverviewRuler.errorForeground', { dark: new Color(new RGBA(255, 18, 18, 0.7)), light: new Color(new RGBA(255, 18, 18, 0.7)), hc: new Color(new RGBA(255, 50, 50, 1)) }, localize('overviewRuleError', 'Overview ruler marker color for errors.'));
const overviewRulerWarning = registerColor('editorOverviewRuler.warningForeground', { dark: editorWarningForeground, light: editorWarningForeground, hc: editorWarningBorder }, localize('overviewRuleWarning', 'Overview ruler marker color for warnings.'));
const overviewRulerInfo = registerColor('editorOverviewRuler.infoForeground', { dark: editorInfoForeground, light: editorInfoForeground, hc: editorInfoBorder }, localize('overviewRuleInfo', 'Overview ruler marker color for infos.'));
// contains all color rules that used to defined in editor/browser/widget/editor.css
registerThemingParticipant((theme, collector) => {
    const background = theme.getColor(editorBackground);
    if (background) {
        collector.addRule(`.monaco-editor, .monaco-editor-background, .monaco-editor .inputarea.ime-input { background-color: ${background}; }`);
    }
    const foreground = theme.getColor(editorForeground);
    if (foreground) {
        collector.addRule(`.monaco-editor, .monaco-editor .inputarea.ime-input { color: ${foreground}; }`);
    }
    const gutter = theme.getColor(editorGutter);
    if (gutter) {
        collector.addRule(`.monaco-editor .margin { background-color: ${gutter}; }`);
    }
    const rangeHighlight = theme.getColor(editorRangeHighlight);
    if (rangeHighlight) {
        collector.addRule(`.monaco-editor .rangeHighlight { background-color: ${rangeHighlight}; }`);
    }
    const rangeHighlightBorder = theme.getColor(editorRangeHighlightBorder);
    if (rangeHighlightBorder) {
        collector.addRule(`.monaco-editor .rangeHighlight { border: 1px ${theme.type === 'hc' ? 'dotted' : 'solid'} ${rangeHighlightBorder}; }`);
    }
    const symbolHighlight = theme.getColor(editorSymbolHighlight);
    if (symbolHighlight) {
        collector.addRule(`.monaco-editor .symbolHighlight { background-color: ${symbolHighlight}; }`);
    }
    const symbolHighlightBorder = theme.getColor(editorSymbolHighlightBorder);
    if (symbolHighlightBorder) {
        collector.addRule(`.monaco-editor .symbolHighlight { border: 1px ${theme.type === 'hc' ? 'dotted' : 'solid'} ${symbolHighlightBorder}; }`);
    }
    const invisibles = theme.getColor(editorWhitespaces);
    if (invisibles) {
        collector.addRule(`.monaco-editor .mtkw { color: ${invisibles} !important; }`);
        collector.addRule(`.monaco-editor .mtkz { color: ${invisibles} !important; }`);
    }
});

export { editorActiveLineNumber as a, editorLineHighlight as b, editorLineHighlightBorder as c, editorIndentGuides as d, editorLineNumbers as e, editorActiveIndentGuides as f, editorOverviewRulerBorder as g, editorCursorForeground as h, editorOverviewRulerBackground as i, editorRuler as j, editorCursorBackground as k, editorUnnecessaryCodeOpacity as l, editorUnnecessaryCodeBorder as m, editorBracketMatchBackground as n, editorBracketMatchBorder as o, overviewRulerError as p, overviewRulerInfo as q, overviewRulerWarning as r };
