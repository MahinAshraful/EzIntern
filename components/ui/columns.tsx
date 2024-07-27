"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"

export type Internships = {
    id: string
    company: string
    role: string
    location: string
    application: string

}

export const columns: ColumnDef<Internships>[] = [
    {
      accessorKey: "company",
      header: "Company",
    },
    {
      accessorKey: "role",
      header: "Role",
    },
    {
      accessorKey: "location",
      header: "Location",
    },
    {
      accessorKey: "application",
      header: "Application",
      cell: ({ row }) => (
        <Button
          variant="link"
          onClick={() => window.open(row.original.application, "_blank")}
        >
          Apply
        </Button>
      ),
    }
  ]