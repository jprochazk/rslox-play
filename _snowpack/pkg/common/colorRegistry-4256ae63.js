import { ap as Registry, n as Emitter, b as localize } from './editorContextKeys-7b242db0.js';
import { j as Color, G as RGBA } from './textModel-76ba00eb.js';
import { R as RunOnceScheduler } from './async-a734ffcb.js';

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
const Extensions = {
    JSONContribution: 'base.contributions.json'
};
function normalizeId(id) {
    if (id.length > 0 && id.charAt(id.length - 1) === '#') {
        return id.substring(0, id.length - 1);
    }
    return id;
}
class JSONContributionRegistry {
    constructor() {
        this._onDidChangeSchema = new Emitter();
        this.schemasById = {};
    }
    registerSchema(uri, unresolvedSchemaContent) {
        this.schemasById[normalizeId(uri)] = unresolvedSchemaContent;
        this._onDidChangeSchema.fire(uri);
    }
    notifySchemaChanged(uri) {
        this._onDidChangeSchema.fire(uri);
    }
}
const jsonContributionRegistry = new JSONContributionRegistry();
Registry.add(Extensions.JSONContribution, jsonContributionRegistry);

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
// color registry
const Extensions$1 = {
    ColorContribution: 'base.contributions.colors'
};
class ColorRegistry {
    constructor() {
        this._onDidChangeSchema = new Emitter();
        this.onDidChangeSchema = this._onDidChangeSchema.event;
        this.colorSchema = { type: 'object', properties: {} };
        this.colorReferenceSchema = { type: 'string', enum: [], enumDescriptions: [] };
        this.colorsById = {};
    }
    registerColor(id, defaults, description, needsTransparency = false, deprecationMessage) {
        let colorContribution = { id, description, defaults, needsTransparency, deprecationMessage };
        this.colorsById[id] = colorContribution;
        let propertySchema = { type: 'string', description, format: 'color-hex', defaultSnippets: [{ body: '${1:#ff0000}' }] };
        if (deprecationMessage) {
            propertySchema.deprecationMessage = deprecationMessage;
        }
        this.colorSchema.properties[id] = propertySchema;
        this.colorReferenceSchema.enum.push(id);
        this.colorReferenceSchema.enumDescriptions.push(description);
        this._onDidChangeSchema.fire();
        return id;
    }
    resolveDefaultColor(id, theme) {
        const colorDesc = this.colorsById[id];
        if (colorDesc && colorDesc.defaults) {
            const colorValue = colorDesc.defaults[theme.type];
            return resolveColorValue(colorValue, theme);
        }
        return undefined;
    }
    getColorSchema() {
        return this.colorSchema;
    }
    toString() {
        let sorter = (a, b) => {
            let cat1 = a.indexOf('.') === -1 ? 0 : 1;
            let cat2 = b.indexOf('.') === -1 ? 0 : 1;
            if (cat1 !== cat2) {
                return cat1 - cat2;
            }
            return a.localeCompare(b);
        };
        return Object.keys(this.colorsById).sort(sorter).map(k => `- \`${k}\`: ${this.colorsById[k].description}`).join('\n');
    }
}
const colorRegistry = new ColorRegistry();
Registry.add(Extensions$1.ColorContribution, colorRegistry);
function registerColor(id, defaults, description, needsTransparency, deprecationMessage) {
    return colorRegistry.registerColor(id, defaults, description, needsTransparency, deprecationMessage);
}
// ----- base colors
const foreground = registerColor('foreground', { dark: '#CCCCCC', light: '#616161', hc: '#FFFFFF' }, localize('foreground', "Overall foreground color. This color is only used if not overridden by a component."));
const errorForeground = registerColor('errorForeground', { dark: '#F48771', light: '#A1260D', hc: '#F48771' }, localize('errorForeground', "Overall foreground color for error messages. This color is only used if not overridden by a component."));
const iconForeground = registerColor('icon.foreground', { dark: '#C5C5C5', light: '#424242', hc: '#FFFFFF' }, localize('iconForeground', "The default color for icons in the workbench."));
const focusBorder = registerColor('focusBorder', { dark: '#007FD4', light: '#0090F1', hc: '#F38518' }, localize('focusBorder', "Overall border color for focused elements. This color is only used if not overridden by a component."));
const contrastBorder = registerColor('contrastBorder', { light: null, dark: null, hc: '#6FC3DF' }, localize('contrastBorder', "An extra border around elements to separate them from others for greater contrast."));
const activeContrastBorder = registerColor('contrastActiveBorder', { light: null, dark: null, hc: focusBorder }, localize('activeContrastBorder', "An extra border around active elements to separate them from others for greater contrast."));
const textLinkForeground = registerColor('textLink.foreground', { light: '#006AB1', dark: '#3794FF', hc: '#3794FF' }, localize('textLinkForeground', "Foreground color for links in text."));
const textCodeBlockBackground = registerColor('textCodeBlock.background', { light: '#dcdcdc66', dark: '#0a0a0a66', hc: Color.black }, localize('textCodeBlockBackground', "Background color for code blocks in text."));
// ----- widgets
const widgetShadow = registerColor('widget.shadow', { dark: transparent(Color.black, .36), light: transparent(Color.black, .16), hc: null }, localize('widgetShadow', 'Shadow color of widgets such as find/replace inside the editor.'));
const inputBackground = registerColor('input.background', { dark: '#3C3C3C', light: Color.white, hc: Color.black }, localize('inputBoxBackground', "Input box background."));
const inputForeground = registerColor('input.foreground', { dark: foreground, light: foreground, hc: foreground }, localize('inputBoxForeground', "Input box foreground."));
const inputBorder = registerColor('input.border', { dark: null, light: null, hc: contrastBorder }, localize('inputBoxBorder', "Input box border."));
const inputActiveOptionBorder = registerColor('inputOption.activeBorder', { dark: '#007ACC00', light: '#007ACC00', hc: contrastBorder }, localize('inputBoxActiveOptionBorder', "Border color of activated options in input fields."));
const inputActiveOptionBackground = registerColor('inputOption.activeBackground', { dark: transparent(focusBorder, 0.4), light: transparent(focusBorder, 0.2), hc: Color.transparent }, localize('inputOption.activeBackground', "Background color of activated options in input fields."));
const inputActiveOptionForeground = registerColor('inputOption.activeForeground', { dark: Color.white, light: Color.black, hc: null }, localize('inputOption.activeForeground', "Foreground color of activated options in input fields."));
const inputValidationInfoBackground = registerColor('inputValidation.infoBackground', { dark: '#063B49', light: '#D6ECF2', hc: Color.black }, localize('inputValidationInfoBackground', "Input validation background color for information severity."));
const inputValidationInfoForeground = registerColor('inputValidation.infoForeground', { dark: null, light: null, hc: null }, localize('inputValidationInfoForeground', "Input validation foreground color for information severity."));
const inputValidationInfoBorder = registerColor('inputValidation.infoBorder', { dark: '#007acc', light: '#007acc', hc: contrastBorder }, localize('inputValidationInfoBorder', "Input validation border color for information severity."));
const inputValidationWarningBackground = registerColor('inputValidation.warningBackground', { dark: '#352A05', light: '#F6F5D2', hc: Color.black }, localize('inputValidationWarningBackground', "Input validation background color for warning severity."));
const inputValidationWarningForeground = registerColor('inputValidation.warningForeground', { dark: null, light: null, hc: null }, localize('inputValidationWarningForeground', "Input validation foreground color for warning severity."));
const inputValidationWarningBorder = registerColor('inputValidation.warningBorder', { dark: '#B89500', light: '#B89500', hc: contrastBorder }, localize('inputValidationWarningBorder', "Input validation border color for warning severity."));
const inputValidationErrorBackground = registerColor('inputValidation.errorBackground', { dark: '#5A1D1D', light: '#F2DEDE', hc: Color.black }, localize('inputValidationErrorBackground', "Input validation background color for error severity."));
const inputValidationErrorForeground = registerColor('inputValidation.errorForeground', { dark: null, light: null, hc: null }, localize('inputValidationErrorForeground', "Input validation foreground color for error severity."));
const inputValidationErrorBorder = registerColor('inputValidation.errorBorder', { dark: '#BE1100', light: '#BE1100', hc: contrastBorder }, localize('inputValidationErrorBorder', "Input validation border color for error severity."));
const selectBackground = registerColor('dropdown.background', { dark: '#3C3C3C', light: Color.white, hc: Color.black }, localize('dropdownBackground', "Dropdown background."));
const selectForeground = registerColor('dropdown.foreground', { dark: '#F0F0F0', light: null, hc: Color.white }, localize('dropdownForeground', "Dropdown foreground."));
const buttonForeground = registerColor('button.foreground', { dark: Color.white, light: Color.white, hc: Color.white }, localize('buttonForeground', "Button foreground color."));
const buttonBackground = registerColor('button.background', { dark: '#0E639C', light: '#007ACC', hc: null }, localize('buttonBackground', "Button background color."));
const buttonHoverBackground = registerColor('button.hoverBackground', { dark: lighten(buttonBackground, 0.2), light: darken(buttonBackground, 0.2), hc: null }, localize('buttonHoverBackground', "Button background color when hovering."));
const badgeBackground = registerColor('badge.background', { dark: '#4D4D4D', light: '#C4C4C4', hc: Color.black }, localize('badgeBackground', "Badge background color. Badges are small information labels, e.g. for search results count."));
const badgeForeground = registerColor('badge.foreground', { dark: Color.white, light: '#333', hc: Color.white }, localize('badgeForeground', "Badge foreground color. Badges are small information labels, e.g. for search results count."));
const scrollbarShadow = registerColor('scrollbar.shadow', { dark: '#000000', light: '#DDDDDD', hc: null }, localize('scrollbarShadow', "Scrollbar shadow to indicate that the view is scrolled."));
const scrollbarSliderBackground = registerColor('scrollbarSlider.background', { dark: Color.fromHex('#797979').transparent(0.4), light: Color.fromHex('#646464').transparent(0.4), hc: transparent(contrastBorder, 0.6) }, localize('scrollbarSliderBackground', "Scrollbar slider background color."));
const scrollbarSliderHoverBackground = registerColor('scrollbarSlider.hoverBackground', { dark: Color.fromHex('#646464').transparent(0.7), light: Color.fromHex('#646464').transparent(0.7), hc: transparent(contrastBorder, 0.8) }, localize('scrollbarSliderHoverBackground', "Scrollbar slider background color when hovering."));
const scrollbarSliderActiveBackground = registerColor('scrollbarSlider.activeBackground', { dark: Color.fromHex('#BFBFBF').transparent(0.4), light: Color.fromHex('#000000').transparent(0.6), hc: contrastBorder }, localize('scrollbarSliderActiveBackground', "Scrollbar slider background color when clicked on."));
const progressBarBackground = registerColor('progressBar.background', { dark: Color.fromHex('#0E70C0'), light: Color.fromHex('#0E70C0'), hc: contrastBorder }, localize('progressBarBackground', "Background color of the progress bar that can show for long running operations."));
const editorErrorBackground = registerColor('editorError.background', { dark: null, light: null, hc: null }, localize('editorError.background', 'Background color of error text in the editor. The color must not be opaque so as not to hide underlying decorations.'), true);
const editorErrorForeground = registerColor('editorError.foreground', { dark: '#F48771', light: '#E51400', hc: null }, localize('editorError.foreground', 'Foreground color of error squigglies in the editor.'));
const editorErrorBorder = registerColor('editorError.border', { dark: null, light: null, hc: Color.fromHex('#E47777').transparent(0.8) }, localize('errorBorder', 'Border color of error boxes in the editor.'));
const editorWarningBackground = registerColor('editorWarning.background', { dark: null, light: null, hc: null }, localize('editorWarning.background', 'Background color of warning text in the editor. The color must not be opaque so as not to hide underlying decorations.'), true);
const editorWarningForeground = registerColor('editorWarning.foreground', { dark: '#CCA700', light: '#BF8803', hc: null }, localize('editorWarning.foreground', 'Foreground color of warning squigglies in the editor.'));
const editorWarningBorder = registerColor('editorWarning.border', { dark: null, light: null, hc: Color.fromHex('#FFCC00').transparent(0.8) }, localize('warningBorder', 'Border color of warning boxes in the editor.'));
const editorInfoBackground = registerColor('editorInfo.background', { dark: null, light: null, hc: null }, localize('editorInfo.background', 'Background color of info text in the editor. The color must not be opaque so as not to hide underlying decorations.'), true);
const editorInfoForeground = registerColor('editorInfo.foreground', { dark: '#75BEFF', light: '#75BEFF', hc: null }, localize('editorInfo.foreground', 'Foreground color of info squigglies in the editor.'));
const editorInfoBorder = registerColor('editorInfo.border', { dark: null, light: null, hc: Color.fromHex('#75BEFF').transparent(0.8) }, localize('infoBorder', 'Border color of info boxes in the editor.'));
const editorHintForeground = registerColor('editorHint.foreground', { dark: Color.fromHex('#eeeeee').transparent(0.7), light: '#6c6c6c', hc: null }, localize('editorHint.foreground', 'Foreground color of hint squigglies in the editor.'));
const editorHintBorder = registerColor('editorHint.border', { dark: null, light: null, hc: Color.fromHex('#eeeeee').transparent(0.8) }, localize('hintBorder', 'Border color of hint boxes in the editor.'));
/**
 * Editor background color.
 * Because of bug https://monacotools.visualstudio.com/DefaultCollection/Monaco/_workitems/edit/13254
 * we are *not* using the color white (or #ffffff, rgba(255,255,255)) but something very close to white.
 */
const editorBackground = registerColor('editor.background', { light: '#fffffe', dark: '#1E1E1E', hc: Color.black }, localize('editorBackground', "Editor background color."));
/**
 * Editor foreground color.
 */
const editorForeground = registerColor('editor.foreground', { light: '#333333', dark: '#BBBBBB', hc: Color.white }, localize('editorForeground', "Editor default foreground color."));
/**
 * Editor widgets
 */
const editorWidgetBackground = registerColor('editorWidget.background', { dark: '#252526', light: '#F3F3F3', hc: '#0C141F' }, localize('editorWidgetBackground', 'Background color of editor widgets, such as find/replace.'));
const editorWidgetForeground = registerColor('editorWidget.foreground', { dark: foreground, light: foreground, hc: foreground }, localize('editorWidgetForeground', 'Foreground color of editor widgets, such as find/replace.'));
const editorWidgetBorder = registerColor('editorWidget.border', { dark: '#454545', light: '#C8C8C8', hc: contrastBorder }, localize('editorWidgetBorder', 'Border color of editor widgets. The color is only used if the widget chooses to have a border and if the color is not overridden by a widget.'));
const editorWidgetResizeBorder = registerColor('editorWidget.resizeBorder', { light: null, dark: null, hc: null }, localize('editorWidgetResizeBorder', "Border color of the resize bar of editor widgets. The color is only used if the widget chooses to have a resize border and if the color is not overridden by a widget."));
/**
 * Quick pick widget
 */
const quickInputBackground = registerColor('quickInput.background', { dark: editorWidgetBackground, light: editorWidgetBackground, hc: editorWidgetBackground }, localize('pickerBackground', "Quick picker background color. The quick picker widget is the container for pickers like the command palette."));
const quickInputForeground = registerColor('quickInput.foreground', { dark: editorWidgetForeground, light: editorWidgetForeground, hc: editorWidgetForeground }, localize('pickerForeground', "Quick picker foreground color. The quick picker widget is the container for pickers like the command palette."));
const quickInputTitleBackground = registerColor('quickInputTitle.background', { dark: new Color(new RGBA(255, 255, 255, 0.105)), light: new Color(new RGBA(0, 0, 0, 0.06)), hc: '#000000' }, localize('pickerTitleBackground', "Quick picker title background color. The quick picker widget is the container for pickers like the command palette."));
const quickInputListFocusBackground = registerColor('quickInput.list.focusBackground', { dark: '#062F4A', light: '#D6EBFF', hc: null }, localize('quickInput.listFocusBackground', "Quick picker background color for the focused item."));
const pickerGroupForeground = registerColor('pickerGroup.foreground', { dark: '#3794FF', light: '#0066BF', hc: Color.white }, localize('pickerGroupForeground', "Quick picker color for grouping labels."));
const pickerGroupBorder = registerColor('pickerGroup.border', { dark: '#3F3F46', light: '#CCCEDB', hc: Color.white }, localize('pickerGroupBorder', "Quick picker color for grouping borders."));
/**
 * Editor selection colors.
 */
const editorSelectionBackground = registerColor('editor.selectionBackground', { light: '#ADD6FF', dark: '#264F78', hc: '#f3f518' }, localize('editorSelectionBackground', "Color of the editor selection."));
const editorSelectionForeground = registerColor('editor.selectionForeground', { light: null, dark: null, hc: '#000000' }, localize('editorSelectionForeground', "Color of the selected text for high contrast."));
const editorInactiveSelection = registerColor('editor.inactiveSelectionBackground', { light: transparent(editorSelectionBackground, 0.5), dark: transparent(editorSelectionBackground, 0.5), hc: transparent(editorSelectionBackground, 0.5) }, localize('editorInactiveSelection', "Color of the selection in an inactive editor. The color must not be opaque so as not to hide underlying decorations."), true);
const editorSelectionHighlight = registerColor('editor.selectionHighlightBackground', { light: lessProminent(editorSelectionBackground, editorBackground, 0.3, 0.6), dark: lessProminent(editorSelectionBackground, editorBackground, 0.3, 0.6), hc: null }, localize('editorSelectionHighlight', 'Color for regions with the same content as the selection. The color must not be opaque so as not to hide underlying decorations.'), true);
const editorSelectionHighlightBorder = registerColor('editor.selectionHighlightBorder', { light: null, dark: null, hc: activeContrastBorder }, localize('editorSelectionHighlightBorder', "Border color for regions with the same content as the selection."));
/**
 * Editor find match colors.
 */
const editorFindMatch = registerColor('editor.findMatchBackground', { light: '#A8AC94', dark: '#515C6A', hc: null }, localize('editorFindMatch', "Color of the current search match."));
const editorFindMatchHighlight = registerColor('editor.findMatchHighlightBackground', { light: '#EA5C0055', dark: '#EA5C0055', hc: null }, localize('findMatchHighlight', "Color of the other search matches. The color must not be opaque so as not to hide underlying decorations."), true);
const editorFindRangeHighlight = registerColor('editor.findRangeHighlightBackground', { dark: '#3a3d4166', light: '#b4b4b44d', hc: null }, localize('findRangeHighlight', "Color of the range limiting the search. The color must not be opaque so as not to hide underlying decorations."), true);
const editorFindMatchBorder = registerColor('editor.findMatchBorder', { light: null, dark: null, hc: activeContrastBorder }, localize('editorFindMatchBorder', "Border color of the current search match."));
const editorFindMatchHighlightBorder = registerColor('editor.findMatchHighlightBorder', { light: null, dark: null, hc: activeContrastBorder }, localize('findMatchHighlightBorder', "Border color of the other search matches."));
const editorFindRangeHighlightBorder = registerColor('editor.findRangeHighlightBorder', { dark: null, light: null, hc: transparent(activeContrastBorder, 0.4) }, localize('findRangeHighlightBorder', "Border color of the range limiting the search. The color must not be opaque so as not to hide underlying decorations."), true);
/**
 * Editor hover
 */
const editorHoverHighlight = registerColor('editor.hoverHighlightBackground', { light: '#ADD6FF26', dark: '#264f7840', hc: '#ADD6FF26' }, localize('hoverHighlight', 'Highlight below the word for which a hover is shown. The color must not be opaque so as not to hide underlying decorations.'), true);
const editorHoverBackground = registerColor('editorHoverWidget.background', { light: editorWidgetBackground, dark: editorWidgetBackground, hc: editorWidgetBackground }, localize('hoverBackground', 'Background color of the editor hover.'));
const editorHoverForeground = registerColor('editorHoverWidget.foreground', { light: editorWidgetForeground, dark: editorWidgetForeground, hc: editorWidgetForeground }, localize('hoverForeground', 'Foreground color of the editor hover.'));
const editorHoverBorder = registerColor('editorHoverWidget.border', { light: editorWidgetBorder, dark: editorWidgetBorder, hc: editorWidgetBorder }, localize('hoverBorder', 'Border color of the editor hover.'));
const editorHoverStatusBarBackground = registerColor('editorHoverWidget.statusBarBackground', { dark: lighten(editorHoverBackground, 0.2), light: darken(editorHoverBackground, 0.05), hc: editorWidgetBackground }, localize('statusBarBackground', "Background color of the editor hover status bar."));
/**
 * Editor link colors
 */
const editorActiveLinkForeground = registerColor('editorLink.activeForeground', { dark: '#4E94CE', light: Color.blue, hc: Color.cyan }, localize('activeLinkForeground', 'Color of active links.'));
/**
 * Inline hints
 */
const editorInlineHintForeground = registerColor('editorInlineHint.foreground', { dark: editorWidgetBackground, light: editorWidgetForeground, hc: editorWidgetBackground }, localize('editorInlineHintForeground', 'Foreground color of inline hints'));
const editorInlineHintBackground = registerColor('editorInlineHint.background', { dark: editorWidgetForeground, light: editorWidgetBackground, hc: editorWidgetForeground }, localize('editorInlineHintBackground', 'Background color of inline hints'));
/**
 * Editor lighbulb icon colors
 */
const editorLightBulbForeground = registerColor('editorLightBulb.foreground', { dark: '#FFCC00', light: '#DDB100', hc: '#FFCC00' }, localize('editorLightBulbForeground', "The color used for the lightbulb actions icon."));
const editorLightBulbAutoFixForeground = registerColor('editorLightBulbAutoFix.foreground', { dark: '#75BEFF', light: '#007ACC', hc: '#75BEFF' }, localize('editorLightBulbAutoFixForeground', "The color used for the lightbulb auto fix actions icon."));
/**
 * Diff Editor Colors
 */
const defaultInsertColor = new Color(new RGBA(155, 185, 85, 0.2));
const defaultRemoveColor = new Color(new RGBA(255, 0, 0, 0.2));
const diffInserted = registerColor('diffEditor.insertedTextBackground', { dark: defaultInsertColor, light: defaultInsertColor, hc: null }, localize('diffEditorInserted', 'Background color for text that got inserted. The color must not be opaque so as not to hide underlying decorations.'), true);
const diffRemoved = registerColor('diffEditor.removedTextBackground', { dark: defaultRemoveColor, light: defaultRemoveColor, hc: null }, localize('diffEditorRemoved', 'Background color for text that got removed. The color must not be opaque so as not to hide underlying decorations.'), true);
const diffInsertedOutline = registerColor('diffEditor.insertedTextBorder', { dark: null, light: null, hc: '#33ff2eff' }, localize('diffEditorInsertedOutline', 'Outline color for the text that got inserted.'));
const diffRemovedOutline = registerColor('diffEditor.removedTextBorder', { dark: null, light: null, hc: '#FF008F' }, localize('diffEditorRemovedOutline', 'Outline color for text that got removed.'));
const diffBorder = registerColor('diffEditor.border', { dark: null, light: null, hc: contrastBorder }, localize('diffEditorBorder', 'Border color between the two text editors.'));
const diffDiagonalFill = registerColor('diffEditor.diagonalFill', { dark: '#cccccc33', light: '#22222233', hc: null }, localize('diffDiagonalFill', "Color of the diff editor's diagonal fill. The diagonal fill is used in side-by-side diff views."));
/**
 * List and tree colors
 */
const listFocusBackground = registerColor('list.focusBackground', { dark: null, light: null, hc: null }, localize('listFocusBackground', "List/Tree background color for the focused item when the list/tree is active. An active list/tree has keyboard focus, an inactive does not."));
const listFocusForeground = registerColor('list.focusForeground', { dark: null, light: null, hc: null }, localize('listFocusForeground', "List/Tree foreground color for the focused item when the list/tree is active. An active list/tree has keyboard focus, an inactive does not."));
const listFocusOutline = registerColor('list.focusOutline', { dark: focusBorder, light: focusBorder, hc: activeContrastBorder }, localize('listFocusOutline', "List/Tree outline color for the focused item when the list/tree is active. An active list/tree has keyboard focus, an inactive does not."));
const listActiveSelectionBackground = registerColor('list.activeSelectionBackground', { dark: '#094771', light: '#0060C0', hc: null }, localize('listActiveSelectionBackground', "List/Tree background color for the selected item when the list/tree is active. An active list/tree has keyboard focus, an inactive does not."));
const listActiveSelectionForeground = registerColor('list.activeSelectionForeground', { dark: Color.white, light: Color.white, hc: null }, localize('listActiveSelectionForeground', "List/Tree foreground color for the selected item when the list/tree is active. An active list/tree has keyboard focus, an inactive does not."));
const listInactiveSelectionBackground = registerColor('list.inactiveSelectionBackground', { dark: '#37373D', light: '#E4E6F1', hc: null }, localize('listInactiveSelectionBackground', "List/Tree background color for the selected item when the list/tree is inactive. An active list/tree has keyboard focus, an inactive does not."));
const listInactiveSelectionForeground = registerColor('list.inactiveSelectionForeground', { dark: null, light: null, hc: null }, localize('listInactiveSelectionForeground', "List/Tree foreground color for the selected item when the list/tree is inactive. An active list/tree has keyboard focus, an inactive does not."));
const listInactiveFocusBackground = registerColor('list.inactiveFocusBackground', { dark: null, light: null, hc: null }, localize('listInactiveFocusBackground', "List/Tree background color for the focused item when the list/tree is inactive. An active list/tree has keyboard focus, an inactive does not."));
const listInactiveFocusOutline = registerColor('list.inactiveFocusOutline', { dark: null, light: null, hc: null }, localize('listInactiveFocusOutline', "List/Tree outline color for the focused item when the list/tree is inactive. An active list/tree has keyboard focus, an inactive does not."));
const listHoverBackground = registerColor('list.hoverBackground', { dark: '#2A2D2E', light: '#F0F0F0', hc: null }, localize('listHoverBackground', "List/Tree background when hovering over items using the mouse."));
const listHoverForeground = registerColor('list.hoverForeground', { dark: null, light: null, hc: null }, localize('listHoverForeground', "List/Tree foreground when hovering over items using the mouse."));
const listDropBackground = registerColor('list.dropBackground', { dark: listFocusBackground, light: listFocusBackground, hc: null }, localize('listDropBackground', "List/Tree drag and drop background when moving items around using the mouse."));
const listHighlightForeground = registerColor('list.highlightForeground', { dark: '#0097fb', light: '#0066BF', hc: focusBorder }, localize('highlight', 'List/Tree foreground color of the match highlights when searching inside the list/tree.'));
const listFilterWidgetBackground = registerColor('listFilterWidget.background', { light: '#efc1ad', dark: '#653723', hc: Color.black }, localize('listFilterWidgetBackground', 'Background color of the type filter widget in lists and trees.'));
const listFilterWidgetOutline = registerColor('listFilterWidget.outline', { dark: Color.transparent, light: Color.transparent, hc: '#f38518' }, localize('listFilterWidgetOutline', 'Outline color of the type filter widget in lists and trees.'));
const listFilterWidgetNoMatchesOutline = registerColor('listFilterWidget.noMatchesOutline', { dark: '#BE1100', light: '#BE1100', hc: contrastBorder }, localize('listFilterWidgetNoMatchesOutline', 'Outline color of the type filter widget in lists and trees, when there are no matches.'));
const treeIndentGuidesStroke = registerColor('tree.indentGuidesStroke', { dark: '#585858', light: '#a9a9a9', hc: '#a9a9a9' }, localize('treeIndentGuidesStroke', "Tree stroke color for the indentation guides."));
const tableColumnsBorder = registerColor('tree.tableColumnsBorder', { dark: '#CCCCCC20', light: '#61616120', hc: null }, localize('treeIndentGuidesStroke', "Tree stroke color for the indentation guides."));
/**
 * Menu colors
 */
const menuBorder = registerColor('menu.border', { dark: null, light: null, hc: contrastBorder }, localize('menuBorder', "Border color of menus."));
const menuForeground = registerColor('menu.foreground', { dark: selectForeground, light: foreground, hc: selectForeground }, localize('menuForeground', "Foreground color of menu items."));
const menuBackground = registerColor('menu.background', { dark: selectBackground, light: selectBackground, hc: selectBackground }, localize('menuBackground', "Background color of menu items."));
const menuSelectionForeground = registerColor('menu.selectionForeground', { dark: listActiveSelectionForeground, light: listActiveSelectionForeground, hc: listActiveSelectionForeground }, localize('menuSelectionForeground', "Foreground color of the selected menu item in menus."));
const menuSelectionBackground = registerColor('menu.selectionBackground', { dark: listActiveSelectionBackground, light: listActiveSelectionBackground, hc: listActiveSelectionBackground }, localize('menuSelectionBackground', "Background color of the selected menu item in menus."));
const menuSelectionBorder = registerColor('menu.selectionBorder', { dark: null, light: null, hc: activeContrastBorder }, localize('menuSelectionBorder', "Border color of the selected menu item in menus."));
const menuSeparatorBackground = registerColor('menu.separatorBackground', { dark: '#BBBBBB', light: '#888888', hc: contrastBorder }, localize('menuSeparatorBackground', "Color of a separator menu item in menus."));
/**
 * Snippet placeholder colors
 */
const snippetTabstopHighlightBackground = registerColor('editor.snippetTabstopHighlightBackground', { dark: new Color(new RGBA(124, 124, 124, 0.3)), light: new Color(new RGBA(10, 50, 100, 0.2)), hc: new Color(new RGBA(124, 124, 124, 0.3)) }, localize('snippetTabstopHighlightBackground', "Highlight background color of a snippet tabstop."));
const snippetTabstopHighlightBorder = registerColor('editor.snippetTabstopHighlightBorder', { dark: null, light: null, hc: null }, localize('snippetTabstopHighlightBorder', "Highlight border color of a snippet tabstop."));
const snippetFinalTabstopHighlightBackground = registerColor('editor.snippetFinalTabstopHighlightBackground', { dark: null, light: null, hc: null }, localize('snippetFinalTabstopHighlightBackground', "Highlight background color of the final tabstop of a snippet."));
const snippetFinalTabstopHighlightBorder = registerColor('editor.snippetFinalTabstopHighlightBorder', { dark: '#525252', light: new Color(new RGBA(10, 50, 100, 0.5)), hc: '#525252' }, localize('snippetFinalTabstopHighlightBorder', "Highlight border color of the final tabstop of a snippet."));
const overviewRulerFindMatchForeground = registerColor('editorOverviewRuler.findMatchForeground', { dark: '#d186167e', light: '#d186167e', hc: '#AB5A00' }, localize('overviewRulerFindMatchForeground', 'Overview ruler marker color for find matches. The color must not be opaque so as not to hide underlying decorations.'), true);
const overviewRulerSelectionHighlightForeground = registerColor('editorOverviewRuler.selectionHighlightForeground', { dark: '#A0A0A0CC', light: '#A0A0A0CC', hc: '#A0A0A0CC' }, localize('overviewRulerSelectionHighlightForeground', 'Overview ruler marker color for selection highlights. The color must not be opaque so as not to hide underlying decorations.'), true);
const minimapFindMatch = registerColor('minimap.findMatchHighlight', { light: '#d18616', dark: '#d18616', hc: '#AB5A00' }, localize('minimapFindMatchHighlight', 'Minimap marker color for find matches.'), true);
const minimapSelection = registerColor('minimap.selectionHighlight', { light: '#ADD6FF', dark: '#264F78', hc: '#ffffff' }, localize('minimapSelectionHighlight', 'Minimap marker color for the editor selection.'), true);
const minimapError = registerColor('minimap.errorHighlight', { dark: new Color(new RGBA(255, 18, 18, 0.7)), light: new Color(new RGBA(255, 18, 18, 0.7)), hc: new Color(new RGBA(255, 50, 50, 1)) }, localize('minimapError', 'Minimap marker color for errors.'));
const minimapWarning = registerColor('minimap.warningHighlight', { dark: editorWarningForeground, light: editorWarningForeground, hc: editorWarningBorder }, localize('overviewRuleWarning', 'Minimap marker color for warnings.'));
const minimapBackground = registerColor('minimap.background', { dark: null, light: null, hc: null }, localize('minimapBackground', "Minimap background color."));
const minimapSliderBackground = registerColor('minimapSlider.background', { light: transparent(scrollbarSliderBackground, 0.5), dark: transparent(scrollbarSliderBackground, 0.5), hc: transparent(scrollbarSliderBackground, 0.5) }, localize('minimapSliderBackground', "Minimap slider background color."));
const minimapSliderHoverBackground = registerColor('minimapSlider.hoverBackground', { light: transparent(scrollbarSliderHoverBackground, 0.5), dark: transparent(scrollbarSliderHoverBackground, 0.5), hc: transparent(scrollbarSliderHoverBackground, 0.5) }, localize('minimapSliderHoverBackground', "Minimap slider background color when hovering."));
const minimapSliderActiveBackground = registerColor('minimapSlider.activeBackground', { light: transparent(scrollbarSliderActiveBackground, 0.5), dark: transparent(scrollbarSliderActiveBackground, 0.5), hc: transparent(scrollbarSliderActiveBackground, 0.5) }, localize('minimapSliderActiveBackground', "Minimap slider background color when clicked on."));
const problemsErrorIconForeground = registerColor('problemsErrorIcon.foreground', { dark: editorErrorForeground, light: editorErrorForeground, hc: editorErrorForeground }, localize('problemsErrorIconForeground', "The color used for the problems error icon."));
const problemsWarningIconForeground = registerColor('problemsWarningIcon.foreground', { dark: editorWarningForeground, light: editorWarningForeground, hc: editorWarningForeground }, localize('problemsWarningIconForeground', "The color used for the problems warning icon."));
const problemsInfoIconForeground = registerColor('problemsInfoIcon.foreground', { dark: editorInfoForeground, light: editorInfoForeground, hc: editorInfoForeground }, localize('problemsInfoIconForeground', "The color used for the problems info icon."));
// ----- color functions
function darken(colorValue, factor) {
    return (theme) => {
        let color = resolveColorValue(colorValue, theme);
        if (color) {
            return color.darken(factor);
        }
        return undefined;
    };
}
function lighten(colorValue, factor) {
    return (theme) => {
        let color = resolveColorValue(colorValue, theme);
        if (color) {
            return color.lighten(factor);
        }
        return undefined;
    };
}
function transparent(colorValue, factor) {
    return (theme) => {
        let color = resolveColorValue(colorValue, theme);
        if (color) {
            return color.transparent(factor);
        }
        return undefined;
    };
}
function lessProminent(colorValue, backgroundColorValue, factor, transparency) {
    return (theme) => {
        let from = resolveColorValue(colorValue, theme);
        if (from) {
            let backgroundColor = resolveColorValue(backgroundColorValue, theme);
            if (backgroundColor) {
                if (from.isDarkerThan(backgroundColor)) {
                    return Color.getLighterColor(from, backgroundColor, factor).transparent(transparency);
                }
                return Color.getDarkerColor(from, backgroundColor, factor).transparent(transparency);
            }
            return from.transparent(factor * transparency);
        }
        return undefined;
    };
}
// ----- implementation
/**
 * @param colorValue Resolve a color value in the context of a theme
 */
function resolveColorValue(colorValue, theme) {
    if (colorValue === null) {
        return undefined;
    }
    else if (typeof colorValue === 'string') {
        if (colorValue[0] === '#') {
            return Color.fromHex(colorValue);
        }
        return theme.getColor(colorValue);
    }
    else if (colorValue instanceof Color) {
        return colorValue;
    }
    else if (typeof colorValue === 'function') {
        return colorValue(theme);
    }
    return undefined;
}
const workbenchColorsSchemaId = 'vscode://schemas/workbench-colors';
let schemaRegistry = Registry.as(Extensions.JSONContribution);
schemaRegistry.registerSchema(workbenchColorsSchemaId, colorRegistry.getColorSchema());
const delayer = new RunOnceScheduler(() => schemaRegistry.notifySchemaChanged(workbenchColorsSchemaId), 200);
colorRegistry.onDidChangeSchema(() => {
    if (!delayer.isScheduled()) {
        delayer.schedule();
    }
});
// setTimeout(_ => console.log(colorRegistry.toString()), 5000);

export { inputValidationErrorBackground as $, overviewRulerFindMatchForeground as A, minimapFindMatch as B, editorWidgetBackground as C, editorWidgetForeground as D, Extensions as E, widgetShadow as F, inputActiveOptionBorder as G, inputActiveOptionForeground as H, inputActiveOptionBackground as I, editorFindMatch as J, editorFindRangeHighlight as K, editorFindMatchHighlightBorder as L, editorFindMatchBorder as M, editorFindRangeHighlightBorder as N, errorForeground as O, editorWidgetResizeBorder as P, editorWidgetBorder as Q, focusBorder as R, inputBackground as S, inputForeground as T, inputBorder as U, inputValidationInfoBackground as V, inputValidationInfoForeground as W, inputValidationInfoBorder as X, inputValidationWarningBackground as Y, inputValidationWarningForeground as Z, inputValidationWarningBorder as _, minimapSliderBackground as a, inputValidationErrorForeground as a0, inputValidationErrorBorder as a1, overviewRulerSelectionHighlightForeground as a2, diffInserted as a3, diffRemoved as a4, diffInsertedOutline as a5, diffRemovedOutline as a6, diffBorder as a7, scrollbarSliderBackground as a8, scrollbarSliderHoverBackground as a9, menuBackground as aA, menuSelectionForeground as aB, menuSelectionBackground as aC, menuSelectionBorder as aD, menuSeparatorBackground as aE, minimapError as aF, minimapWarning as aG, quickInputBackground as aH, quickInputForeground as aI, quickInputTitleBackground as aJ, badgeBackground as aK, badgeForeground as aL, buttonForeground as aM, buttonBackground as aN, buttonHoverBackground as aO, progressBarBackground as aP, quickInputListFocusBackground as aQ, pickerGroupBorder as aR, pickerGroupForeground as aS, scrollbarSliderActiveBackground as aa, diffDiagonalFill as ab, defaultInsertColor as ac, defaultRemoveColor as ad, editorSelectionHighlight as ae, Extensions$1 as af, resolveColorValue as ag, listFocusBackground as ah, listFocusForeground as ai, listFocusOutline as aj, listActiveSelectionBackground as ak, listActiveSelectionForeground as al, listInactiveSelectionBackground as am, listInactiveSelectionForeground as an, listInactiveFocusBackground as ao, listInactiveFocusOutline as ap, listHoverBackground as aq, listHoverForeground as ar, listDropBackground as as, listFilterWidgetBackground as at, listFilterWidgetOutline as au, listFilterWidgetNoMatchesOutline as av, treeIndentGuidesStroke as aw, tableColumnsBorder as ax, menuBorder as ay, menuForeground as az, minimapSliderHoverBackground as b, minimapSliderActiveBackground as c, minimapSelection as d, editorSelectionBackground as e, editorInactiveSelection as f, editorSelectionForeground as g, editorErrorBorder as h, editorErrorForeground as i, editorErrorBackground as j, editorWarningBorder as k, editorWarningForeground as l, minimapBackground as m, editorWarningBackground as n, editorInfoBorder as o, editorInfoForeground as p, editorInfoBackground as q, editorHintBorder as r, scrollbarShadow as s, editorHintForeground as t, editorForeground as u, registerColor as v, activeContrastBorder as w, editorFindMatchHighlight as x, contrastBorder as y, editorBackground as z };
