import { memo } from "react";
import { Content as PopoverContent, Root as PopoverRoot, Trigger as PopoverTrigger } from "@radix-ui/react-popover";
import { BubbleMenu, type Editor } from "@tiptap/react";

import { ColorPicker } from "../../panels";
import { Icon } from "../../ui/Icon";
import { Surface } from "../../ui/Surface";
import { Toolbar } from "../../ui/Toolbar";
import { i18n } from "../../utils/locale";
import { ContentTypePicker } from "./components/ContentTypePicker";
import { EditLinkPopover } from "./components/EditLinkPopover";
import { FontFamilyPicker } from "./components/FontFamilyPicker";
import { FontSizePicker } from "./components/FontSizePicker";
import { useTextmenuCommands } from "./hooks/useTextmenuCommands";
import { useTextmenuContentTypes } from "./hooks/useTextmenuContentTypes";
import { useTextMenuStates } from "./hooks/useTextmenuStates";

// We memorize the button so each button is not rerendered
// on every editor state change
const MemoButton = memo(Toolbar.Button);
const MemoColorPicker = memo(ColorPicker);
const MemoFontFamilyPicker = memo(FontFamilyPicker);
const MemoFontSizePicker = memo(FontSizePicker);
const MemoContentTypePicker = memo(ContentTypePicker);

export type TextMenuProps = {
  editor: Editor;
};

export const TextMenu = ({ editor }: TextMenuProps) => {
  const commands = useTextmenuCommands(editor);
  const states = useTextMenuStates(editor);
  const blockOptions = useTextmenuContentTypes(editor);

  return (
    <BubbleMenu
      editor={editor}
      pluginKey="textMenu"
      shouldShow={states.shouldShow}
      tippyOptions={{
        zIndex: 40,
        maxWidth: "none",
        popperOptions: {
          placement: "auto",
        },
      }}
      updateDelay={100}
    >
      <Toolbar.Wrapper>
        <MemoContentTypePicker options={blockOptions} />
        <MemoFontFamilyPicker onChange={commands.onSetFont} value={states.currentFont || ""} />
        <MemoFontSizePicker onChange={commands.onSetFontSize} value={states.currentSize || ""} />
        <Toolbar.Divider />
        <MemoButton
          active={states.isBold}
          onClick={commands.onBold}
          tooltip={i18n("textMenu.bold")}
          tooltipShortcut={["Mod", "B"]}
        >
          <Icon name="Bold" />
        </MemoButton>
        <MemoButton
          active={states.isItalic}
          onClick={commands.onItalic}
          tooltip={i18n("textMenu.italic")}
          tooltipShortcut={["Mod", "I"]}
        >
          <Icon name="Italic" />
        </MemoButton>
        <MemoButton
          active={states.isUnderline}
          onClick={commands.onUnderline}
          tooltip={i18n("textMenu.underline")}
          tooltipShortcut={["Mod", "U"]}
        >
          <Icon name="Underline" />
        </MemoButton>
        <MemoButton
          active={states.isStrike}
          onClick={commands.onStrike}
          tooltip={i18n("textMenu.strikethrough")}
          tooltipShortcut={["Mod", "Shift", "S"]}
        >
          <Icon name="Strikethrough" />
        </MemoButton>
        <MemoButton
          active={states.isCode}
          onClick={commands.onCode}
          tooltip={i18n("textMenu.code")}
          tooltipShortcut={["Mod", "E"]}
        >
          <Icon name="Code" />
        </MemoButton>
        <MemoButton onClick={commands.onCodeBlock} tooltip={i18n("textMenu.codeBlock")}>
          <Icon name="Code" />
        </MemoButton>
        <EditLinkPopover onSetLink={commands.onLink} />
        <PopoverRoot>
          <PopoverTrigger asChild>
            <MemoButton active={!!states.currentHighlight} tooltip={i18n("textMenu.highlighter")}>
              <Icon name="Highlighter" />
            </MemoButton>
          </PopoverTrigger>
          <PopoverContent asChild side="top" sideOffset={8}>
            <Surface className="p-1">
              <MemoColorPicker
                color={states.currentHighlight}
                onChange={commands.onChangeHighlight}
                onClear={commands.onClearHighlight}
              />
            </Surface>
          </PopoverContent>
        </PopoverRoot>
        <PopoverRoot>
          <PopoverTrigger asChild>
            <MemoButton active={!!states.currentColor} tooltip={i18n("textMenu.color")}>
              <Icon name="Palette" />
            </MemoButton>
          </PopoverTrigger>
          <PopoverContent asChild side="top" sideOffset={8}>
            <Surface className="p-1">
              <MemoColorPicker
                color={states.currentColor}
                onChange={commands.onChangeColor}
                onClear={commands.onClearColor}
              />
            </Surface>
          </PopoverContent>
        </PopoverRoot>
        <PopoverRoot>
          <PopoverTrigger asChild>
            <MemoButton tooltip={i18n("textMenu.more")}>
              <Icon name="MoveVertical" />
            </MemoButton>
          </PopoverTrigger>
          <PopoverContent asChild side="top">
            <Toolbar.Wrapper>
              <MemoButton
                active={states.isSubscript}
                onClick={commands.onSubscript}
                tooltip={i18n("textMenu.subscript")}
                tooltipShortcut={["Mod", "."]}
              >
                <Icon name="Subscript" />
              </MemoButton>
              <MemoButton
                active={states.isSuperscript}
                onClick={commands.onSuperscript}
                tooltip={i18n("textMenu.superscript")}
                tooltipShortcut={["Mod", ","]}
              >
                <Icon name="Superscript" />
              </MemoButton>
              <Toolbar.Divider />
              <MemoButton
                active={states.isAlignLeft}
                onClick={commands.onAlignLeft}
                tooltip={i18n("textMenu.alignLeft")}
                tooltipShortcut={["Shift", "Mod", "L"]}
              >
                <Icon name="AlignLeft" />
              </MemoButton>
              <MemoButton
                active={states.isAlignCenter}
                onClick={commands.onAlignCenter}
                tooltip={i18n("textMenu.alignCenter")}
                tooltipShortcut={["Shift", "Mod", "E"]}
              >
                <Icon name="AlignCenter" />
              </MemoButton>
              <MemoButton
                active={states.isAlignRight}
                onClick={commands.onAlignRight}
                tooltip={i18n("textMenu.alignRight")}
                tooltipShortcut={["Shift", "Mod", "R"]}
              >
                <Icon name="AlignRight" />
              </MemoButton>
              <MemoButton
                active={states.isAlignJustify}
                onClick={commands.onAlignJustify}
                tooltip={i18n("textMenu.alignJustify")}
                tooltipShortcut={["Shift", "Mod", "J"]}
              >
                <Icon name="AlignJustify" />
              </MemoButton>
            </Toolbar.Wrapper>
          </PopoverContent>
        </PopoverRoot>
      </Toolbar.Wrapper>
    </BubbleMenu>
  );
};
