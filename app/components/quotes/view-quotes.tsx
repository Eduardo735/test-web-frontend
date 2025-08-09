"use client";

import { FunctionComponent, useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

interface quotes {
  customer_id: string;
  crop: string;
  state_id: string;
  area: number;
  insured_amount: number;
  validity: string;
  land: {};
}

export default function ViewQuotes({ open, dataInput }: any) {
  const [LayersPage, setLayersPage] = useState<FunctionComponent>();

  useEffect(() => {
    (async () => {
      if (typeof window !== "undefined") {
        const module = await import(
          "../map-area-selector/map-area-selector-viewer"
        );
        const NewLayersPage = module.default;

        setLayersPage(() => () => (
          <NewLayersPage
            area={dataInput?.area}
            mapCentered={dataInput?.mapCenter}
          />
        ));
      }
    })();
  }, []);

  return (
    <div>
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button>Abrir Mapa</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[825px]">
            <DialogHeader>
              <DialogTitle>Vista Mapa</DialogTitle>
            </DialogHeader>
            <div className="overflow-y-auto max-h-[825px]">
              <div className="container mx-auto p-6 space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="text-3xl font-bold">
                      Cotizaciones de Seguros Agrícolas
                    </h1>
                    <p className="text-muted-foreground">
                      Gestiona las cotizaciones de seguros para cultivos
                    </p>
                  </div>
                </div>
                {LayersPage && <LayersPage />}
              </div>
            </div>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
}
