import React, { useState } from "react";
import { MySQLForm } from "./components/data/MySQLForm";
import type { ColumnMeta } from "./components/data/ColumnMeta";

// Mocked MySQL column metadata for an address book
const addressBookColumns: ColumnMeta[] = [
  {
    TABLE_NAME: "address_book",
    COLUMN_NAME: "id",
    DATA_TYPE: "int",
    COLUMN_TYPE: "int(11)",
    IS_NULLABLE: "NO",
    COLUMN_COMMENT: "Unique identifier",
    COLUMN_DEFAULT: null,
    NUMERIC_PRECISION: 11,
    NUMERIC_SCALE: null,
    CHARACTER_MAXIMUM_LENGTH: null,
  },
  {
    TABLE_NAME: "address_book",
    COLUMN_NAME: "first_name",
    DATA_TYPE: "varchar",
    COLUMN_TYPE: "varchar(50)",
    IS_NULLABLE: "NO",
    COLUMN_COMMENT: "First name of contact",
    COLUMN_DEFAULT: null,
    NUMERIC_PRECISION: null,
    NUMERIC_SCALE: null,
    CHARACTER_MAXIMUM_LENGTH: 50,
  },
  {
    TABLE_NAME: "address_book",
    COLUMN_NAME: "last_name",
    DATA_TYPE: "varchar",
    COLUMN_TYPE: "varchar(50)",
    IS_NULLABLE: "NO",
    COLUMN_COMMENT: "Last name of contact",
    COLUMN_DEFAULT: null,
    NUMERIC_PRECISION: null,
    NUMERIC_SCALE: null,
    CHARACTER_MAXIMUM_LENGTH: 50,
  },
  {
    TABLE_NAME: "address_book",
    COLUMN_NAME: "email",
    DATA_TYPE: "varchar",
    COLUMN_TYPE: "varchar(100)",
    IS_NULLABLE: "YES",
    COLUMN_COMMENT: "Email address",
    COLUMN_DEFAULT: null,
    NUMERIC_PRECISION: null,
    NUMERIC_SCALE: null,
    CHARACTER_MAXIMUM_LENGTH: 100,
  },
  {
    TABLE_NAME: "address_book",
    COLUMN_NAME: "phone",
    DATA_TYPE: "varchar",
    COLUMN_TYPE: "varchar(20)",
    IS_NULLABLE: "YES",
    COLUMN_COMMENT: "Phone number",
    COLUMN_DEFAULT: null,
    NUMERIC_PRECISION: null,
    NUMERIC_SCALE: null,
    CHARACTER_MAXIMUM_LENGTH: 20,
  },
  {
    TABLE_NAME: "address_book",
    COLUMN_NAME: "birthday",
    DATA_TYPE: "date",
    COLUMN_TYPE: "date",
    IS_NULLABLE: "YES",
    COLUMN_COMMENT: "Birthday",
    COLUMN_DEFAULT: null,
    NUMERIC_PRECISION: null,
    NUMERIC_SCALE: null,
    CHARACTER_MAXIMUM_LENGTH: null,
  },
  {
    TABLE_NAME: "address_book",
    COLUMN_NAME: "notes",
    DATA_TYPE: "text",
    COLUMN_TYPE: "text",
    IS_NULLABLE: "YES",
    COLUMN_COMMENT: "Additional notes (markdown supported)",
    COLUMN_DEFAULT: null,
    NUMERIC_PRECISION: null,
    NUMERIC_SCALE: null,
    CHARACTER_MAXIMUM_LENGTH: null,
  },
];

const initialRecord = {
  id: 1,
  first_name: "Jane",
  last_name: "Doe",
  email: "jane.doe@example.com",
  phone: "555-1234",
  birthday: "1990-01-01",
  notes: "Met at the conference. Loves React!",
};

export default function AddressBookDemo() {
  const [record, setRecord] = useState(initialRecord);
  return (
    <div
      style={{
        maxWidth: 500,
        margin: "2rem auto",
        padding: "2rem",
        background: "rgba(255,255,255,0.7)",
        borderRadius: 16,
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        Address Book Entry
      </h2>
      <MySQLForm
        columns={addressBookColumns}
        record={record}
        onChange={(updated) => setRecord(updated as typeof initialRecord)}
      />
      <pre
        style={{
          marginTop: "2rem",
          background: "#f8f8f8",
          padding: "1rem",
          borderRadius: 8,
        }}
      >
        {JSON.stringify(record, null, 2)}
      </pre>
    </div>
  );
}
