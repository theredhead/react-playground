// TypeScript type for MySQL column metadata (information_schema.columns)
export interface ColumnMeta {
  TABLE_NAME: string;
  COLUMN_NAME: string;
  DATA_TYPE: string;
  COLUMN_TYPE: string;
  IS_NULLABLE: "YES" | "NO";
  COLUMN_DEFAULT: string | null;
  CHARACTER_MAXIMUM_LENGTH?: number | null;
  NUMERIC_PRECISION?: number | null;
  NUMERIC_SCALE?: number | null;
  EXTRA?: string;
  COLUMN_COMMENT?: string;
  // ...other fields as needed
}
