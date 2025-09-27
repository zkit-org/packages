import { useCallback } from "react";
import {
  Content as DropdownContent,
  Root as DropdownRoot,
  Trigger as DropdownTrigger,
} from "@radix-ui/react-dropdown-menu";

import { DropdownButton, DropdownCategoryTitle } from "../../../ui/Dropdown";
import { Icon } from "../../../ui/Icon";
import { Surface } from "../../../ui/Surface";
import { Toolbar } from "../../../ui/Toolbar";
import { i18n } from "../../../utils/locale";

const getFontFamilyGroups = () => [
  {
    label: "Sans Serif",
    options: [
      { label: i18n("default"), value: "" },
      { label: "Arial", value: "Arial" },
      { label: "Helvetica", value: "Helvetica" },
    ],
  },
  {
    label: "Serif",
    options: [
      { label: "Times New Roman", value: "Times" },
      { label: "Garamond", value: "Garamond" },
      { label: "Georgia", value: "Georgia" },
    ],
  },
  {
    label: "Monospace",
    options: [
      { label: "Courier", value: "Courier" },
      { label: "Courier New", value: "Courier New" },
    ],
  },
];

const getFontFamilies = () =>
  getFontFamilyGroups()
    .flatMap((group) => [group.options])
    .flat();

export type FontFamilyPickerProps = {
  onChange: (value: string) => void;
  value: string;
};

export const FontFamilyPicker = ({ onChange, value }: FontFamilyPickerProps) => {
  const currentValue = getFontFamilies().find((size) => size.value === value);
  const currentFontLabel = currentValue?.label?.split(" ")[0] || i18n("default");

  const selectFont = useCallback((font: string) => () => onChange(font), [onChange]);

  return (
    <DropdownRoot>
      <DropdownTrigger asChild>
        <Toolbar.Button active={!!currentValue?.value}>
          {currentFontLabel}
          <Icon className="h-2 w-2" name="ChevronDown" />
        </Toolbar.Button>
      </DropdownTrigger>
      <DropdownContent asChild>
        <Surface className="flex flex-col gap-1 px-2 py-4">
          {getFontFamilyGroups().map((group) => (
            <div className="mt-2.5 flex flex-col gap-0.5 first:mt-0" key={group.label}>
              <DropdownCategoryTitle>{group.label}</DropdownCategoryTitle>
              {group.options.map((font) => (
                <DropdownButton
                  isActive={value === font.value}
                  key={`${font.label}_${font.value}`}
                  onClick={selectFont(font.value)}
                >
                  <span style={{ fontFamily: font.value }}>{font.label}</span>
                </DropdownButton>
              ))}
            </div>
          ))}
        </Surface>
      </DropdownContent>
    </DropdownRoot>
  );
};
