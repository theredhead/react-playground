import React from "react";
import type { ColumnMeta } from "./ColumnMeta";

export interface MySQLInputProps {
  value: any;
  onChange?: (value: any) => void;
  meta: ColumnMeta;
  readOnly?: boolean;
}

export interface MySQLDisplayProps {
  value: any;
  meta: ColumnMeta;
}

// Numeric types: int, bigint, float, double, decimal
export function MySQLNumberInput({
  value,
  onChange,
  meta,
  readOnly,
}: MySQLInputProps) {
  return (
    <input
      type="number"
      value={value ?? ""}
      onChange={(e) =>
        onChange?.(e.target.value === "" ? null : Number(e.target.value))
      }
      readOnly={readOnly}
      placeholder={meta.COLUMN_NAME}
      min={meta.COLUMN_DEFAULT ?? undefined}
      max={meta.NUMERIC_PRECISION ?? undefined}
      step={meta.NUMERIC_SCALE ? Math.pow(10, -meta.NUMERIC_SCALE) : undefined}
      title={meta.COLUMN_COMMENT}
    />
  );
}
export function MySQLNumberDisplay({ value, meta }: MySQLDisplayProps) {
  return <span title={meta.COLUMN_COMMENT}>{value}</span>;
}

// String types: char, varchar
export function MySQLStringInput({
  value,
  onChange,
  meta,
  readOnly,
}: MySQLInputProps) {
  return (
    <input
      type="text"
      value={value ?? ""}
      onChange={(e) => onChange?.(e.target.value)}
      readOnly={readOnly}
      maxLength={meta.CHARACTER_MAXIMUM_LENGTH ?? undefined}
      placeholder={meta.COLUMN_NAME}
      title={meta.COLUMN_COMMENT}
    />
  );
}
export function MySQLStringDisplay({ value, meta }: MySQLDisplayProps) {
  return <span title={meta.COLUMN_COMMENT}>{value}</span>;
}

// Date/time types: date, datetime, timestamp, time, year
export function MySQLDateInput({
  value,
  onChange,
  meta,
  readOnly,
}: MySQLInputProps) {
  // Use type based on meta.DATA_TYPE
  let type = "date";
  if (meta.DATA_TYPE === "datetime" || meta.DATA_TYPE === "timestamp")
    type = "datetime-local";
  if (meta.DATA_TYPE === "time") type = "time";
  if (meta.DATA_TYPE === "year") type = "number";
  return (
    <input
      type={type}
      value={value ?? ""}
      onChange={(e) => onChange?.(e.target.value)}
      readOnly={readOnly}
      placeholder={meta.COLUMN_NAME}
      title={meta.COLUMN_COMMENT}
    />
  );
}
export function MySQLDateDisplay({ value, meta }: MySQLDisplayProps) {
  return <span title={meta.COLUMN_COMMENT}>{value}</span>;
}

// Enum & set types
export function MySQLEnumInput({
  value,
  onChange,
  meta,
  readOnly,
}: MySQLInputProps) {
  // Parse enum values from COLUMN_TYPE: enum('a','b','c')
  const options =
    meta.COLUMN_TYPE.match(/\(([^)]+)\)/)?.[1]
      .split(",")
      .map((s) => s.replace(/'/g, "").trim()) ?? [];
  return (
    <select
      value={value ?? ""}
      onChange={(e) => onChange?.(e.target.value)}
      disabled={readOnly}
      title={meta.COLUMN_COMMENT}
    >
      <option value="">-- Select --</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}
export function MySQLEnumDisplay({ value, meta }: MySQLDisplayProps) {
  return <span title={meta.COLUMN_COMMENT}>{value}</span>;
}

// Boolean types: tinyint(1)
export function MySQLBooleanInput({
  value,
  onChange,
  meta,
  readOnly,
}: MySQLInputProps) {
  return (
    <input
      type="checkbox"
      checked={!!value}
      onChange={(e) => onChange?.(e.target.checked)}
      disabled={readOnly}
      title={meta.COLUMN_COMMENT}
    />
  );
}
export function MySQLBooleanDisplay({ value, meta }: MySQLDisplayProps) {
  return <span title={meta.COLUMN_COMMENT}>{value ? "Yes" : "No"}</span>;
}

// Blob types: file upload
export function MySQLBlobInput({
  value,
  onChange,
  meta,
  readOnly,
}: MySQLInputProps) {
  return (
    <input
      type="file"
      onChange={(e) => onChange?.(e.target.files?.[0] ?? null)}
      disabled={readOnly}
      title={meta.COLUMN_COMMENT}
    />
  );
}
export function MySQLBlobDisplay({ value, meta }: MySQLDisplayProps) {
  // Display as download link if value is a file/blob
  if (!value) return <span title={meta.COLUMN_COMMENT}>No file</span>;
  if (typeof value === "string")
    return (
      <a href={value} download title={meta.COLUMN_COMMENT}>
        Download
      </a>
    );
  return <span title={meta.COLUMN_COMMENT}>File uploaded</span>;
}

// Text types: markdown
export function MySQLTextInput({
  value,
  onChange,
  meta,
  readOnly,
}: MySQLInputProps) {
  return (
    <textarea
      value={value ?? ""}
      onChange={(e) => onChange?.(e.target.value)}
      readOnly={readOnly}
      placeholder={meta.COLUMN_NAME}
      title={meta.COLUMN_COMMENT}
      rows={6}
    />
  );
}
export function MySQLTextDisplay({ value, meta }: MySQLDisplayProps) {
  // Render markdown (requires a markdown renderer in real use)
  return <div title={meta.COLUMN_COMMENT}>{value}</div>;
}

// Main field component: picks correct input based on meta
export interface MySQLFieldProps {
  value: any;
  onChange?: (value: any) => void;
  meta: ColumnMeta;
  readOnly?: boolean;
  displayOnly?: boolean;
}

export function MySQLField({
  value,
  onChange,
  meta,
  readOnly,
  displayOnly,
}: MySQLFieldProps) {
  // Pick component based on meta.DATA_TYPE
  let input: React.ReactNode = null;
  let label = meta.COLUMN_NAME;
  let hint = meta.COLUMN_COMMENT;
  const type = meta.DATA_TYPE.toLowerCase();

  if (displayOnly) {
    if (["int", "bigint", "float", "double", "decimal"].includes(type)) {
      input = <MySQLNumberDisplay value={value} meta={meta} />;
    } else if (["char", "varchar"].includes(type)) {
      input = <MySQLStringDisplay value={value} meta={meta} />;
    } else if (
      ["date", "datetime", "timestamp", "time", "year"].includes(type)
    ) {
      input = <MySQLDateDisplay value={value} meta={meta} />;
    } else if (["enum", "set"].includes(type)) {
      input = <MySQLEnumDisplay value={value} meta={meta} />;
    } else if (type === "tinyint" && meta.COLUMN_TYPE === "tinyint(1)") {
      input = <MySQLBooleanDisplay value={value} meta={meta} />;
    } else if (["blob", "tinyblob", "mediumblob", "longblob"].includes(type)) {
      input = <MySQLBlobDisplay value={value} meta={meta} />;
    } else if (["text", "tinytext", "mediumtext", "longtext"].includes(type)) {
      input = <MySQLTextDisplay value={value} meta={meta} />;
    } else {
      input = <span>{value}</span>;
    }
  } else {
    if (["int", "bigint", "float", "double", "decimal"].includes(type)) {
      input = (
        <MySQLNumberInput
          value={value}
          onChange={onChange}
          meta={meta}
          readOnly={readOnly}
        />
      );
    } else if (["char", "varchar"].includes(type)) {
      input = (
        <MySQLStringInput
          value={value}
          onChange={onChange}
          meta={meta}
          readOnly={readOnly}
        />
      );
    } else if (
      ["date", "datetime", "timestamp", "time", "year"].includes(type)
    ) {
      input = (
        <MySQLDateInput
          value={value}
          onChange={onChange}
          meta={meta}
          readOnly={readOnly}
        />
      );
    } else if (["enum", "set"].includes(type)) {
      input = (
        <MySQLEnumInput
          value={value}
          onChange={onChange}
          meta={meta}
          readOnly={readOnly}
        />
      );
    } else if (type === "tinyint" && meta.COLUMN_TYPE === "tinyint(1)") {
      input = (
        <MySQLBooleanInput
          value={value}
          onChange={onChange}
          meta={meta}
          readOnly={readOnly}
        />
      );
    } else if (["blob", "tinyblob", "mediumblob", "longblob"].includes(type)) {
      input = (
        <MySQLBlobInput
          value={value}
          onChange={onChange}
          meta={meta}
          readOnly={readOnly}
        />
      );
    } else if (["text", "tinytext", "mediumtext", "longtext"].includes(type)) {
      input = (
        <MySQLTextInput
          value={value}
          onChange={onChange}
          meta={meta}
          readOnly={readOnly}
        />
      );
    } else {
      input = (
        <input
          type="text"
          value={value ?? ""}
          onChange={(e) => onChange?.(e.target.value)}
          readOnly={readOnly}
          placeholder={label}
          title={hint}
        />
      );
    }
  }

  return (
    <div className="mysql-field" style={{ marginBottom: "1rem" }}>
      <label
        style={{
          display: "block",
          fontWeight: "bold",
          marginBottom: "0.25rem",
        }}
      >
        {label}
      </label>
      {input}
      {hint && (
        <div
          style={{ fontSize: "0.85em", color: "#888", marginTop: "0.25rem" }}
        >
          {hint}
        </div>
      )}
    </div>
  );
}
