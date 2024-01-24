"use client";

// next
import { useRouter } from "next/navigation";

// components
import DetailedButton from "@/components/DetailedButton";

// styles
import useClassList, { mapClassesCurried } from "@blocdigital/useclasslist";
import maps from "./Projects.module.scss";
const mc = mapClassesCurried(maps, true) as (a: string) => string;

// types
import type { HTMLProps } from "react";

export default function ProjectsPart({ className }: HTMLProps<HTMLDivElement>) {
  const classList = useClassList({ defaultClass: "projects", className, maps, string: true }) as string;

  const router = useRouter();

  return (
    <div className={classList}>
      <DetailedButton className={mc("projects__button")} onClick={() => router.push("/projects/bills")}>
        <h3>Bills</h3>
        <p>A simple regular expense tracker PWA application.</p>
      </DetailedButton>

      <DetailedButton className={mc("projects__button")}>
        <h3>Title</h3>
        <p>I am a description for the button.</p>
      </DetailedButton>

      <DetailedButton className={mc("projects__button")}>
        <h3>Title</h3>
        <p>I am a description for the button.</p>
      </DetailedButton>
    </div>
  );
}
