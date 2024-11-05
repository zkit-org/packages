import { Icon } from '../../ui/Icon'
import { Toolbar } from '../../ui/Toolbar'
import { useTextmenuCommands } from './hooks/useTextmenuCommands'
import { useTextMenuStates } from './hooks/useTextmenuStates'
import { BubbleMenu, Editor } from '@tiptap/react'
import { memo } from 'react'
import * as Popover from '@radix-ui/react-popover'
import { Surface } from '../../ui/Surface'
import { ColorPicker } from '../../panels'
import { FontFamilyPicker } from './components/FontFamilyPicker'
import { FontSizePicker } from './components/FontSizePicker'
import { useTextmenuContentTypes } from './hooks/useTextmenuContentTypes'
import { ContentTypePicker } from './components/ContentTypePicker'
import { AIDropdown } from './components/AIDropdown'
import { EditLinkPopover } from './components/EditLinkPopover'
import {i18n} from "../../utils/locale";

// We memorize the button so each button is not rerendered
// on every editor state change
const MemoButton = memo(Toolbar.Button)
const MemoColorPicker = memo(ColorPicker)
const MemoFontFamilyPicker = memo(FontFamilyPicker)
const MemoFontSizePicker = memo(FontSizePicker)
const MemoContentTypePicker = memo(ContentTypePicker)

export type TextMenuProps = {
  editor: Editor
}

export const TextMenu = ({ editor }: TextMenuProps) => {
    const commands = useTextmenuCommands(editor)
    const states = useTextMenuStates(editor)
    const blockOptions = useTextmenuContentTypes(editor)

    return (
        <BubbleMenu
            tippyOptions={{
                zIndex: 40,
                maxWidth: "none",
                popperOptions: {
                    placement: "auto",
                }
            }}
            editor={editor}
            pluginKey="textMenu"
            shouldShow={states.shouldShow}
            updateDelay={100}
        >
            <Toolbar.Wrapper>
                {/*<AIDropdown*/}
                {/*    onCompleteSentence={commands.onCompleteSentence}*/}
                {/*    onEmojify={commands.onEmojify}*/}
                {/*    onFixSpelling={commands.onFixSpelling}*/}
                {/*    onMakeLonger={commands.onMakeLonger}*/}
                {/*    onMakeShorter={commands.onMakeShorter}*/}
                {/*    onSimplify={commands.onSimplify}*/}
                {/*    onTldr={commands.onTldr}*/}
                {/*    onTone={commands.onTone}*/}
                {/*    onTranslate={commands.onTranslate}*/}
                {/*/>*/}
                {/*<Toolbar.Divider />*/}
                <MemoContentTypePicker options={blockOptions} />
                <MemoFontFamilyPicker onChange={commands.onSetFont} value={states.currentFont || ''} />
                <MemoFontSizePicker onChange={commands.onSetFontSize} value={states.currentSize || ''} />
                <Toolbar.Divider />
                <MemoButton tooltip={i18n("textMenu.bold")} tooltipShortcut={['Mod', 'B']} onClick={commands.onBold} active={states.isBold}>
                    <Icon name="Bold" />
                </MemoButton>
                <MemoButton
                    tooltip={i18n("textMenu.italic")}
                    tooltipShortcut={['Mod', 'I']}
                    onClick={commands.onItalic}
                    active={states.isItalic}
                >
                    <Icon name="Italic" />
                </MemoButton>
                <MemoButton
                    tooltip={i18n("textMenu.underline")}
                    tooltipShortcut={['Mod', 'U']}
                    onClick={commands.onUnderline}
                    active={states.isUnderline}
                >
                    <Icon name="Underline" />
                </MemoButton>
                <MemoButton
                    tooltip={i18n("textMenu.strikethrough")}
                    tooltipShortcut={['Mod', 'Shift', 'S']}
                    onClick={commands.onStrike}
                    active={states.isStrike}
                >
                    <Icon name="Strikethrough" />
                </MemoButton>
                <MemoButton tooltip={i18n("textMenu.code")} tooltipShortcut={['Mod', 'E']} onClick={commands.onCode} active={states.isCode}>
                    <Icon name="Code" />
                </MemoButton>
                <MemoButton tooltip={i18n("textMenu.codeBlock")} onClick={commands.onCodeBlock}>
                    <Icon name="Code" />
                </MemoButton>
                <EditLinkPopover onSetLink={commands.onLink} />
                <Popover.Root>
                    <Popover.Trigger asChild>
                        <MemoButton active={!!states.currentHighlight} tooltip={i18n("textMenu.highlighter")}>
                            <Icon name="Highlighter" />
                        </MemoButton>
                    </Popover.Trigger>
                    <Popover.Content side="top" sideOffset={8} asChild>
                        <Surface className="p-1">
                            <MemoColorPicker
                                color={states.currentHighlight}
                                onChange={commands.onChangeHighlight}
                                onClear={commands.onClearHighlight}
                            />
                        </Surface>
                    </Popover.Content>
                </Popover.Root>
                <Popover.Root>
                    <Popover.Trigger asChild>
                        <MemoButton active={!!states.currentColor} tooltip={i18n("textMenu.color")}>
                            <Icon name="Palette" />
                        </MemoButton>
                    </Popover.Trigger>
                    <Popover.Content side="top" sideOffset={8} asChild>
                        <Surface className="p-1">
                            <MemoColorPicker
                                color={states.currentColor}
                                onChange={commands.onChangeColor}
                                onClear={commands.onClearColor}
                            />
                        </Surface>
                    </Popover.Content>
                </Popover.Root>
                <Popover.Root>
                    <Popover.Trigger asChild>
                        <MemoButton tooltip={i18n("textMenu.more")}>
                            <Icon name="MoveVertical" />
                        </MemoButton>
                    </Popover.Trigger>
                    <Popover.Content side="top" asChild>
                        <Toolbar.Wrapper>
                            <MemoButton
                                tooltip={i18n("textMenu.subscript")}
                                tooltipShortcut={['Mod', '.']}
                                onClick={commands.onSubscript}
                                active={states.isSubscript}
                            >
                                <Icon name="Subscript" />
                            </MemoButton>
                            <MemoButton
                                tooltip={i18n("textMenu.superscript")}
                                tooltipShortcut={['Mod', ',']}
                                onClick={commands.onSuperscript}
                                active={states.isSuperscript}
                            >
                                <Icon name="Superscript" />
                            </MemoButton>
                            <Toolbar.Divider />
                            <MemoButton
                                tooltip={i18n("textMenu.alignLeft")}
                                tooltipShortcut={['Shift', 'Mod', 'L']}
                                onClick={commands.onAlignLeft}
                                active={states.isAlignLeft}
                            >
                                <Icon name="AlignLeft" />
                            </MemoButton>
                            <MemoButton
                                tooltip={i18n("textMenu.alignCenter")}
                                tooltipShortcut={['Shift', 'Mod', 'E']}
                                onClick={commands.onAlignCenter}
                                active={states.isAlignCenter}
                            >
                                <Icon name="AlignCenter" />
                            </MemoButton>
                            <MemoButton
                                tooltip={i18n("textMenu.alignRight")}
                                tooltipShortcut={['Shift', 'Mod', 'R']}
                                onClick={commands.onAlignRight}
                                active={states.isAlignRight}
                            >
                                <Icon name="AlignRight" />
                            </MemoButton>
                            <MemoButton
                                tooltip={i18n("textMenu.alignJustify")}
                                tooltipShortcut={['Shift', 'Mod', 'J']}
                                onClick={commands.onAlignJustify}
                                active={states.isAlignJustify}
                            >
                                <Icon name="AlignJustify" />
                            </MemoButton>
                        </Toolbar.Wrapper>
                    </Popover.Content>
                </Popover.Root>
            </Toolbar.Wrapper>
        </BubbleMenu>
    )
}
