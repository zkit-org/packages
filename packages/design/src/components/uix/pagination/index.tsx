import { type FC, useContext, useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from "@radix-ui/react-icons";
import get from "lodash/get";

import { Input } from "@easykit/design/components/ui/input";
import { Button } from "@easykit/design/components/uix/button";
import { UIXContext } from "@easykit/design/components/uix/config-provider";
import { Select } from "@easykit/design/components/uix/select";

export interface PaginationProps {
  total: number;
  page: number;
  size: number;
  onChange?: (page: number) => void;
  onSizeChange?: (size: number) => void;
  sizeOptions?: number[];
}

export const SIZE_OPTIONS = [10, 20, 50, 100];

export const Pagination: FC<PaginationProps> = (props) => {
  const { total = 0, page = 1, size = 20, sizeOptions = SIZE_OPTIONS, onChange, onSizeChange } = props;

  const config = useContext(UIXContext);
  const totalPageText = get(config.locale, "Pagination.totalPage");
  const totalText = get(config.locale, "Pagination.total");
  const sizeText = get(config.locale, "Pagination.size");
  const go = get(config.locale, "Pagination.go");
  const goSuffix = get(config.locale, "Pagination.goSuffix");

  const totalPage = Math.ceil(Number(total) / Number(size));
  // biome-ignore lint/suspicious/noExplicitAny: <pageValue>
  const [pageValue, setPageValue] = useState<any>(page);

  useEffect(() => {
    setPageValue(page);
  }, [page]);

  // biome-ignore lint/suspicious/noExplicitAny: <e>
  const handleChange = (e: any) => {
    let v = e.target.value.replace(/[^\d]/g, "");
    if (v === "") {
      setPageValue(v);
      return;
    }
    if (v < 1) {
      v = 1;
    }
    if (v > totalPage) {
      v = totalPage;
    }
    setPageValue(v);
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      <span className="space-x-1">
        <span>{totalPageText?.replace("%total", `${total}`)}</span>
        <span>{totalText?.replace("%page", `${totalPage}`)}</span>
      </span>
      <Button disabled={`${page}` === "1"} onClick={() => onChange?.(1)} size="icon" variant="outline">
        <DoubleArrowLeftIcon />
      </Button>
      <Button disabled={`${page}` === "1"} onClick={() => onChange?.(Number(page) - 1)} size="icon" variant="outline">
        <ChevronLeftIcon />
      </Button>
      <div className="flex h-9 items-center justify-center rounded bg-primary px-4 text-primary-foreground">{page}</div>
      <Button
        disabled={`${page}` === `${totalPage}`}
        onClick={() => onChange?.(Number(page) + 1)}
        size="icon"
        variant="outline"
      >
        <ChevronRightIcon />
      </Button>
      <Button
        disabled={`${page}` === `${totalPage}`}
        onClick={() => onChange?.(Number(totalPage))}
        size="icon"
        variant="outline"
      >
        <DoubleArrowRightIcon />
      </Button>
      <Select
        className="w-auto"
        onChange={(v) => onSizeChange?.(Number(v))}
        options={sizeOptions.map((v) => ({ label: sizeText?.replace("%size", `${v}`) || "", value: `${v}` }))}
        value={`${size}`}
      />
      <div className="flex items-center justify-center space-x-1">
        <span>{go}</span>
        <Input
          className="h-9 w-12 rounded px-2"
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onChange?.(Number(pageValue));
            }
          }}
          type="text"
          value={pageValue}
        />
        <span>{goSuffix}</span>
      </div>
    </div>
  );
};
