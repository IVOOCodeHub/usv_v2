// styles
import "./nrtl.scss";

// custom types
interface INRTLProps {
  datas: INRTL;
  headerBackgroundColor?: string;
  headerHoverBackgroundColor?: string;
  textColor?: string;
  rowColor?: string;
  rowHoverColor?: string;
  hoverTextColor?: string;
  disabledButtonColor?: string;
  columnSortingColor?: string;
  columnSortingFullFilledColor?: string;
  showSearchBar?: boolean;
  filterableColumns?: boolean[];
  showItemsPerPageSelector?: boolean;
  showPagination?: boolean;
  showPreviousNextButtons?: boolean;
  enableColumnSorting?: boolean;
  itemsPerPageOptions?: number[];
  language?: "En" | "Fr" | string;
  onRowClick?: (rowData: string[], index: number) => void;
}
interface INRTL {
  tableHead: string[];
  tableBody: string[][];
}

// hooks | library
import {
  useState,
  useMemo,
  useEffect,
  ReactElement,
  ChangeEvent,
  CSSProperties,
} from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

export default function NRTL({
  datas,
  headerBackgroundColor,
  headerHoverBackgroundColor,
  textColor,
  rowColor,
  rowHoverColor,
  hoverTextColor,
  columnSortingColor,
  columnSortingFullFilledColor,
  disabledButtonColor,
  showSearchBar,
  filterableColumns,
  showItemsPerPageSelector,
  showPagination,
  showPreviousNextButtons,
  enableColumnSorting,
  itemsPerPageOptions = [25, 50, 100],
  language = "En",
  onRowClick,
}: Readonly<INRTLProps>): ReactElement {
  function parseDate(dateString: string): number | null {
    const isoDate: number = Date.parse(dateString);
    if (!isNaN(isoDate)) {
      return isoDate;
    }

    const parts: string[] = dateString.split("/");
    if (parts.length === 3) {
      const day: number = parseInt(parts[0], 10);
      const month: number = parseInt(parts[1], 10) - 1;
      const year: number = parseInt(parts[2], 10);
      const date = new Date(year, month, day);
      if (!isNaN(date.getTime())) {
        return date.getTime();
      }
    }

    return null;
  }

  const [page, setPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(
    itemsPerPageOptions[0],
  );
  const [sortConfig, setSortConfig] = useState<{
    key: number;
    direction: string;
  } | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [screenSize, setScreenSize] = useState<{
    width: number;
    height: number;
  }>({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [filters, setFilters] = useState<string[]>(
    datas.tableHead.map((): string => ""),
  );

  const removeAccents: (string: string) => string = (
    string: string,
  ): string => {
    return string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const sortedData: string[][] | undefined = useMemo(():
    | string[][]
    | undefined => {
    let filteredData: string[][] = [...datas.tableBody];

    filters.forEach((filter: string, columnIndex: number): void => {
      if (filter) {
        filteredData = filteredData.filter(
          (row: string[]): boolean => row[columnIndex] === filter,
        );
      }
    });

    if (searchTerm.length > 0) {
      filteredData = filteredData.filter((row: string[]): boolean => {
        return row.some((cell: string): boolean => {
          return removeAccents(cell.toLowerCase()).includes(
            removeAccents(searchTerm.toLowerCase()),
          );
        });
      });
    }

    if (sortConfig !== null) {
      filteredData = filteredData.sort((a: string[], b: string[]): number => {
        const aValue: string = a[sortConfig.key];
        const bValue: string = b[sortConfig.key];

        const aDate: number | null = parseDate(aValue);
        const bDate: number | null = parseDate(bValue);

        if (aDate !== null && bDate !== null) {
          return sortConfig.direction === "ascending"
            ? aDate - bDate
            : bDate - aDate;
        } else if (!isNaN(Number(aValue)) && !isNaN(Number(bValue))) {
          return sortConfig.direction === "ascending"
            ? Number(aValue) - Number(bValue)
            : Number(bValue) - Number(aValue);
        } else {
          return sortConfig.direction === "ascending"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }
      });
    }

    return filteredData;
  }, [datas.tableBody, filters, sortConfig, searchTerm]);

  const totalPages: number = Math.ceil(sortedData!.length / itemsPerPage);

  const currentData: string[][] = useMemo((): string[][] => {
    if (showPagination) {
      const startIndex: number = (page - 1) * itemsPerPage;
      const endIndex: number = startIndex + itemsPerPage;
      return sortedData!.slice(startIndex, endIndex);
    } else {
      return sortedData!;
    }
  }, [sortedData, page, showPagination, itemsPerPage]);

  const handlePreviousPage: () => void = (): void => {
    setPage((prevPage: number): number => Math.max(prevPage - 1, 1));
  };

  const handleNextPage: () => void = (): void => {
    setPage((prevPage: number): number => Math.min(prevPage + 1, totalPages));
  };

  const handleItemsPerPageChange: (
    event: ChangeEvent<HTMLSelectElement>,
  ) => void = (event: ChangeEvent<HTMLSelectElement>): void => {
    setItemsPerPage(Number(event.target.value));
    setPage(1);
  };

  const requestSort: (key: number) => void = (key: number): void => {
    let direction: string = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const handleSearchChange: (event: ChangeEvent<HTMLInputElement>) => void = (
    event: ChangeEvent<HTMLInputElement>,
  ): void => {
    setSearchTerm(event.target.value);
    setPage(1);
  };

  const handleFilterChange: (columnIndex: number, value: string) => void = (
    columnIndex: number,
    value: string,
  ): void => {
    setFilters((prevFilters: string[]): string[] => {
      const newFilters: string[] = [...prevFilters];
      newFilters[columnIndex] = value;
      return newFilters;
    });
  };

  const getColumnOptions: (columnIndex: number) => string[] = (
    columnIndex: number,
  ): string[] => {
    const uniqueOptions = new Set(
      datas.tableBody.map((row: string[]): string => row[columnIndex]),
    );
    return Array.from(uniqueOptions).sort((a: string, b: string): number =>
      a.localeCompare(b),
    );
  };

  useEffect((): void => {
    if (!itemsPerPageOptions.includes(itemsPerPage)) {
      setItemsPerPage(itemsPerPageOptions[0]);
    }
  }, [itemsPerPageOptions, itemsPerPage]);

  useEffect((): (() => void) => {
    const handleResize: () => void = (): void => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return (): void => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section
      id={"NRTL"}
      style={
        {
          "--header-bg-color": headerBackgroundColor,
          "--header-hover-bg-color": headerHoverBackgroundColor,
          "--row-color": rowColor,
          "--row-hover-color": rowHoverColor,
          "--text-color": textColor,
          "--hover-text-color": hoverTextColor,
          "--disabled-button-color": disabledButtonColor,
          "--columnSortingColor": columnSortingColor,
          "--columnSortingFullFilledColor": columnSortingFullFilledColor,
        } as CSSProperties
      }
    >
      <div className={"tableHeader"}>
        {showItemsPerPageSelector && itemsPerPageOptions.length > 0 && (
          <div className="selectContainer">
            <label htmlFor="itemsPerPage">
              {language === "En" ? "Show" : "Afficher"}
            </label>
            <select
              id="itemsPerPage"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
            >
              {itemsPerPageOptions.map(
                (optionValue: number): ReactElement => (
                  <option key={optionValue} value={optionValue}>
                    {optionValue}
                  </option>
                ),
              )}
            </select>
            <label htmlFor="itemsPerPage">
              {language === "En" ? "entries" : "entrée"}
            </label>
          </div>
        )}
        {showSearchBar && (
          <div className="searchContainer">
            <label htmlFor="filter">
              {language === "En" ? "Search" : "Rechercher"}:{" "}
            </label>
            <input id="filter" type="text" onChange={handleSearchChange} />
          </div>
        )}
      </div>
      <div className={"tableWrapper"}>
        <table>
          <thead>
            <tr>
              {datas.tableHead.map(
                (head: string, index: number): ReactElement => (
                  <th
                    key={index}
                    style={{
                      cursor: enableColumnSorting ? "pointer" : "default",
                    }}
                  >
                    {head}
                    {enableColumnSorting && (
                      <div
                        onClick={
                          enableColumnSorting
                            ? (): void => requestSort(index)
                            : undefined
                        }
                      >
                        <span
                          className={`chevron ${
                            sortConfig?.key === index &&
                            sortConfig.direction === "ascending"
                              ? "chevron-active"
                              : ""
                          }`}
                        >
                          <svg width="12" height="12" viewBox="0 0 20 20">
                            <polyline
                              points="5,15 10,5 15,15"
                              strokeWidth="2"
                            />
                          </svg>
                        </span>
                        <span
                          className={`chevron ${
                            sortConfig?.key === index &&
                            sortConfig.direction === "descending"
                              ? "chevron-active"
                              : ""
                          }`}
                        >
                          <svg width="12" height="12" viewBox="0 0 20 20">
                            <polyline points="5,5 10,15 15,5" strokeWidth="2" />
                          </svg>
                        </span>
                      </div>
                    )}
                    {filterableColumns && filterableColumns[index] && (
                      <div className={"selectContainer"}>
                        <select
                          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                            handleFilterChange(index, e.target.value)
                          }
                          defaultValue={""}
                        >
                          <option value={""}>
                            {language === "En" ? "All" : "Tous"}
                          </option>
                          {getColumnOptions(index).map(
                            (option: string, index: number): ReactElement => (
                              <option key={index} value={option}>
                                {option}
                              </option>
                            ),
                          )}
                        </select>
                      </div>
                    )}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {currentData.length > 0 ? (
              currentData.map(
                (row: string[], index: number): ReactElement => (
                  <tr
                    key={index}
                    onClick={(): void => onRowClick?.(row, index)}
                    style={{ cursor: onRowClick ? "pointer" : "default" }}
                  >
                    {row.map(
                      (cell: string, cellIndex: number): ReactElement => (
                        <td key={cellIndex}>{cell}</td>
                      ),
                    )}
                  </tr>
                ),
              )
            ) : (
              <tr>
                <td
                  colSpan={datas.tableHead.length}
                  style={{ textAlign: "center" }}
                >
                  {language === "En"
                    ? "No data available in table"
                    : "Aucune donnée disponible dans le tableau"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {showPagination && (
        <div className="tableFooter">
          {sortedData && (
            <p>
              {language === "En"
                ? `Showing ${Math.min(page * itemsPerPage, sortedData.length)}/${sortedData.length} entries`
                : `Affichage de ${Math.min(page * itemsPerPage, sortedData.length)}/${sortedData.length} entrées`}
            </p>
          )}
          {showPreviousNextButtons && (
            <div className="buttonContainer">
              {screenSize.width < 768 ? (
                <>
                  <IoChevronBack
                    className={page === 1 ? "disabled" : "paginationIcn"}
                    onClick={handlePreviousPage}
                  />
                  <IoChevronForward
                    className={
                      page === totalPages ? "disabled" : "paginationIcn"
                    }
                    onClick={handleNextPage}
                  />
                </>
              ) : (
                <>
                  <button
                    className="button"
                    onClick={handlePreviousPage}
                    disabled={page === 1}
                  >
                    {language === "En" ? "Previous" : "Précédent"}
                  </button>
                  <button
                    className="button"
                    onClick={handleNextPage}
                    disabled={page === totalPages}
                  >
                    {language === "En" ? "Next" : "Suivant"}
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
