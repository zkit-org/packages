import { type FC, useContext, useEffect, useState } from "react";
import get from "lodash/get";

import { Input } from "@easykit/design/components/ui/input";
import {
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Pagination as ShadcnPagination,
} from "@easykit/design/components/ui/pagination";
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

// 生成页码数组的辅助函数
const generatePageNumbers = (currentPage: number, totalPages: number) => {
  const pages: (number | "ellipsis")[] = [];

  if (totalPages <= 7) {
    // 如果总页数小于等于7，显示所有页码
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    // 总是显示第一页
    pages.push(1);

    if (currentPage <= 4) {
      // 当前页在前面时
      for (let i = 2; i <= 5; i++) {
        pages.push(i);
      }
      pages.push("ellipsis");
      pages.push(totalPages);
    } else if (currentPage >= totalPages - 3) {
      // 当前页在后面时
      pages.push("ellipsis");
      for (let i = totalPages - 4; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // 当前页在中间时
      pages.push("ellipsis");
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pages.push(i);
      }
      pages.push("ellipsis");
      pages.push(totalPages);
    }
  }

  return pages;
};

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

  const pageNumbers = generatePageNumbers(page, totalPage);

  return (
    <div className="flex items-center justify-center space-x-6">
      <ShadcnPagination>
        {/* 总数信息 */}
        <div className="flex items-center space-x-2 text-muted-foreground text-sm">
          <span>{totalPageText?.replace("%total", `${total}`)}</span>
          <span>{totalText?.replace("%page", `${totalPage}`)}</span>
        </div>
        {/* 分页导航 */}
        <PaginationContent>
          {/* 上一页 */}
          <PaginationItem>
            <PaginationPrevious
              className={page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              onClick={page === 1 ? undefined : () => onChange?.(page - 1)}
              size="default"
            />
          </PaginationItem>

          {/* 页码数字 */}
          {pageNumbers.map((pageNum, index) => (
            <PaginationItem key={pageNum === "ellipsis" ? `ellipsis-${index}` : `page-${pageNum}`}>
              {pageNum === "ellipsis" ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  className="cursor-pointer"
                  isActive={pageNum === page}
                  onClick={() => onChange?.(pageNum)}
                  size="default"
                >
                  {pageNum}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          {/* 下一页 */}
          <PaginationItem>
            <PaginationNext
              className={page === totalPage ? "pointer-events-none opacity-50" : "cursor-pointer"}
              onClick={page === totalPage ? undefined : () => onChange?.(page + 1)}
              size="default"
            />
          </PaginationItem>
        </PaginationContent>
        {/* 控制区域 */}
        <div className="flex items-center space-x-3">
          {/* 页面大小选择 */}
          <Select
            className="w-auto"
            onChange={(v) => onSizeChange?.(Number(v))}
            options={sizeOptions.map((v) => ({ label: sizeText?.replace("%size", `${v}`) || "", value: `${v}` }))}
            value={`${size}`}
          />

          {/* 跳转输入框 */}
          <div className="flex items-center space-x-1 text-sm">
            <span>{go}</span>
            <Input
              className="h-9 w-12 rounded px-2 text-center"
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
      </ShadcnPagination>
    </div>
  );
};
