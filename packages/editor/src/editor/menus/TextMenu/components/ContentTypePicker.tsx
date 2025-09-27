import { useMemo } from "react";
import {
  Content as DropdownContent,
  Root as DropdownRoot,
  Trigger as DropdownTrigger,
} from "@radix-ui/react-dropdown-menu";
import type { icons } from "lucide-react";

import { DropdownButton, DropdownCategoryTitle } from "../../../ui/Dropdown";
import { Icon } from "../../../ui/Icon";
import { Surface } from "../../../ui/Surface";
import { Toolbar } from "../../../ui/Toolbar";

export type ContentTypePickerOption = {
  label: string;
  id: string;
  type: "option";
  disabled: () => boolean;
  isActive: () => boolean;
  onClick: () => void;
  icon: keyof typeof icons;
};

export type ContentTypePickerCategory = {
  label: string;
  id: string;
  type: "category";
};

export type ContentPickerOptions = Array<ContentTypePickerOption | ContentTypePickerCategory>;

export type ContentTypePickerProps = {
  options: ContentPickerOptions;
};

const isOption = (option: ContentTypePickerOption | ContentTypePickerCategory): option is ContentTypePickerOption =>
  option.type === "option";
const isCategory = (option: ContentTypePickerOption | ContentTypePickerCategory): option is ContentTypePickerCategory =>
  option.type === "category";

export const ContentTypePicker = ({ options }: ContentTypePickerProps) => {
  const activeItem = useMemo(() => options.find((option) => option.type === "option" && option.isActive()), [options]);

  return (
    <DropdownRoot>
      <DropdownTrigger asChild>
        <Toolbar.Button active={activeItem?.id !== "paragraph" && !!activeItem?.type}>
          <Icon name={(activeItem?.type === "option" && activeItem.icon) || "Pilcrow"} />
          <Icon className="h-2 w-2" name="ChevronDown" />
        </Toolbar.Button>
      </DropdownTrigger>
      <DropdownContent asChild>
        <Surface className="flex flex-col gap-1 px-2 py-4">
          {options.map((option) => {
            if (isOption(option)) {
              return (
                <DropdownButton isActive={option.isActive()} key={option.id} onClick={option.onClick}>
                  <Icon className="mr-1 h-4 w-4" name={option.icon} />
                  {option.label}
                </DropdownButton>
              );
            }
            if (isCategory(option)) {
              return (
                <div className="mt-2 first:mt-0" key={option.id}>
                  <DropdownCategoryTitle key={option.id}>{option.label}</DropdownCategoryTitle>
                </div>
              );
            }
            return null;
          })}
        </Surface>
      </DropdownContent>
    </DropdownRoot>
  );
};
