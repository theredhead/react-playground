import React, { useState, useCallback } from "react";
import type { ColumnMeta } from "./ColumnMeta";
import { MySQLField } from "./MySQLTypeComponents";

export interface MySQLFormProps {
  columns: ColumnMeta[];
  record: Record<string, any>;
  onChange?: (updated: Record<string, any>) => void;
  readOnly?: boolean;
  debounce?: number; // ms
}

export function MySQLForm({
  columns,
  record,
  onChange,
  readOnly,
  debounce = 300,
}: MySQLFormProps) {
  const [formState, setFormState] = useState(record);
  const debounceRef = React.useRef<number | null>(null);

  const handleFieldChange = useCallback(
    (columnName: string, value: any) => {
      setFormState((prev) => {
        const updated = { ...prev, [columnName]: value };
        if (onChange) {
          if (debounce > 0) {
            if (debounceRef.current) clearTimeout(debounceRef.current);
            debounceRef.current = setTimeout(() => {
              onChange(updated);
            }, debounce);
          } else {
            onChange(updated);
          }
        }
        return updated;
      });
    },
    [onChange, debounce]
  );

  return (
    <form className="mysql-form" autoComplete="off">
      {columns.map((meta) => (
        <MySQLField
          key={meta.COLUMN_NAME}
          value={formState[meta.COLUMN_NAME]}
          onChange={(value: any) => handleFieldChange(meta.COLUMN_NAME, value)}
          meta={meta}
          readOnly={readOnly}
        />
      ))}
    </form>
  );
}
