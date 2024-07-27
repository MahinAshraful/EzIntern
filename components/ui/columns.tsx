"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

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
    }
  ]