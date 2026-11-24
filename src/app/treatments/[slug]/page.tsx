import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { spaData, getTreatmentBySlug } from "@/data/spa";
import TreatmentDetailClient from "./TreatmentDetailClient";

export async function generateStaticParams() {
  return spaData.treatments.map((treatment) => ({
    slug: treatment.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const treatment = getTreatmentBySlug(params.slug);
  if (!treatment) {
    return {
      title: "Treatment Not Found · Nora Spa",
    };
  }

  return {
    title: `${treatment.name} (${treatment.price}) · Nora Spa, Rayfield, Jos`,
    description: `${treatment.tagline} ${treatment.expectation} 6 Nora Courtyard, Rayfield, Jos.`,
  };
}

export default function TreatmentDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const treatment = getTreatmentBySlug(params.slug);

  if (!treatment) {
    notFound();
  }

  return <TreatmentDetailClient treatment={treatment} />;
}
