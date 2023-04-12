import useAppDispatch from "@/hooks/useAppDispatch";
import useAppSelector from "@/hooks/useAppSelector";
import { updateQuery } from "@/store/slices/employeeSlice";
import { TableHeaderCell } from "@/types";
import { Box, SortDirection, TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";
import { visuallyHidden } from "@mui/utils";

type enhancedTableHeadProps = {
  headerCells: TableHeaderCell[];
};

const EnhancedTableHead = ({ headerCells }: enhancedTableHeadProps) => {
  const dispatch = useAppDispatch();
  const query = useAppSelector((state) => state.employees.query);
  const { order, orderBy } = query;

  const createSortHandler = (property: string) => () => {
    const isAsc = orderBy === property && order === "asc";
    const updatedQuery = { ...query, orderBy: property, order: isAsc ? "desc" : "asc" };

    dispatch(updateQuery(updatedQuery));
  };

  return (
    <TableHead>
      <TableRow>
        {headerCells.map((headerCell) => {
          if (headerCell.disableSort) {
            return <TableCell key={headerCell.id}>{headerCell.label}</TableCell>;
          } else {
            return (
              <TableCell
                key={headerCell.id}
                sortDirection={orderBy === headerCell.id ? (order as SortDirection) : false}
              >
                <TableSortLabel
                  active={orderBy === headerCell.id}
                  direction={orderBy === headerCell.id ? order : ("asc" as any)}
                  onClick={createSortHandler(headerCell.id)}
                >
                  {headerCell.label}
                  {orderBy === headerCell.id ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === "desc" ? "sorted descending" : "sorted ascending"}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            );
          }
        })}
      </TableRow>
    </TableHead>
  );
};

export default EnhancedTableHead;
