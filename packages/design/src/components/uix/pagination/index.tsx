import {FC, useContext, useEffect, useState} from "react";
import {Button} from "@easykit/design/components/uix/button";
import {ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon} from "@radix-ui/react-icons";
import {Select} from "@easykit/design/components/uix/select";
import {Input} from "@easykit/design/components/ui/input";
import {UIXContext} from "@easykit/design/components/uix/config-provider";
import get from "lodash/get";

export interface PaginationProps {
  total: number;
  page: number;
  size: number;
  onChange?: Function;
  onSizeChange?: Function;
  sizeOptions?: number[];
}

export const SIZE_OPTIONS = [10, 20, 50, 100];

export const Pagination: FC<PaginationProps> = (props) => {
  const {
    total = 0,
    page = 1,
    size = 20,
    sizeOptions = SIZE_OPTIONS,
    onChange = (page: number) => {
    },
    onSizeChange = (size: number) => {
    },
  } = props;

  const config = useContext(UIXContext);
  const totalPageText = get(config.locale, "Pagination.totalPage");
  const totalText = get(config.locale, "Pagination.total");
  const sizeText = get(config.locale, "Pagination.size");
  const go = get(config.locale, "Pagination.go");
  const goSuffix = get(config.locale, "Pagination.goSuffix");


  const totalPage = Math.ceil(Number(total) / Number(size));
  const [pageValue, setPageValue] = useState<any>(page);

  useEffect(() => {
    setPageValue(page);
  }, [page]);

  const handleChange = (e: any) => {
    let v = e.target.value.replace(/[^\d]/g, '');
    if (v === '') {
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
  }

  return <div className={"flex justify-center items-center space-x-2"}>
    <span className={"space-x-1"}>
      <span>
        {totalPageText.replace("%total", `${total}`)}
      </span>
      <span>
        {totalText.replace("%page", `${totalPage}`)}
      </span>
    </span>
    <Button
      disabled={`${page}` === '1'}
      variant="outline" size="icon"
      onClick={() => onChange && onChange(1)}
    >
      <DoubleArrowLeftIcon/>
    </Button>
    <Button
      disabled={`${page}` === '1'} variant="outline" size="icon"
      onClick={() => onChange && onChange(Number(page) - 1)}
    >
      <ChevronLeftIcon/>
    </Button>
    <div className={"h-9 px-4 bg-primary flex justify-center items-center text-primary-foreground rounded"}>{page}</div>
    <Button
      disabled={`${page}` === `${totalPage}`} variant="outline" size="icon"
      onClick={() => onChange && onChange(Number(page) + 1)}
    >
      <ChevronRightIcon/>
    </Button>
    <Button
      disabled={`${page}` === `${totalPage}`} variant="outline" size="icon"
      onClick={() => onChange && onChange(Number(totalPage))}
    >
      <DoubleArrowRightIcon/>
    </Button>
    <Select
      className={"w-auto"}
      value={`${size}`}
      options={sizeOptions.map((v) => ({label: sizeText.replace('%size', `${v}`), value: `${v}`}))}
      onChange={(v) => onSizeChange && onSizeChange(Number(v))}
    />
    <div className={"flex justify-center items-center space-x-1"}>
      <span>{go}</span>
      <Input
        value={pageValue} onChange={handleChange} type="text" className={"w-12 h-9 px-2 rounded"}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onChange && onChange(Number(pageValue));
          }
        }}
      />
      <span>{goSuffix}</span>
    </div>
  </div>
}
