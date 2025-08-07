"use client";

import { Select, SelectTrigger, SelectValue } from "@radix-ui/react-select";
import { QueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Plus } from "lucide-react";
import { FunctionComponent, useEffect, useState } from "react";
import { toast } from "sonner";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { SelectContent, SelectItem } from "../ui/select";
import { useGetCustomers } from "./mutations/useGetCustomers";
import { useGetStates } from "./mutations/useGetStates";
import { useMutationsSaveQuote } from "./mutations/useMutationSaveQuote";

interface quotes {
  customer_id: string;
  crop: string;
  state_id: string;
  area: number;
  insured_amount: number;
  validity: string;
  land: {};
}

export default function Quotes() {
  const [quotes, setQuotes] = useState<quotes[]>([]);
  const [LayersPage, setLayersPage] = useState<FunctionComponent>();
  const queryClient = new QueryClient();
  const { data } = useGetStates();

  const { data: dataCustomers } = useGetCustomers();

  console.log("data :>> ", data?.data?.states);

  const [form, setForm] = useState({
    customer_id: "",
    crop: "",
    state_id: "",
    area: "",
    insured_amount: "",
    validity: "",
    land: undefined,
  });

  const [show, setShow] = useState(false);

  const postQuote = useMutationsSaveQuote();

  const [areaDetail, setAreaDetail] = useState<any>();

  const addQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !form.customer_id ||
      !form.crop ||
      !form.state_id ||
      !form.area ||
      !form.insured_amount ||
      !form.validity ||
      !form.land
    ) {
      toast.error("Por favor completa todos los campos");
      return;
    }

    const newQuote: quotes = {
      customer_id: form.customer_id,
      crop: form.crop,
      state_id: form.state_id,
      area: parseFloat(form.area),
      insured_amount: parseFloat(form.insured_amount),
      validity: new Date().toISOString().split("T")[0],
      land: form.land,
    };

    setQuotes([...quotes, newQuote]);

    postQuote.mutate(newQuote as any, {
      onSuccess: (data) => {
        setForm({
          customer_id: "",
          crop: "",
          state_id: "",
          area: "",
          insured_amount: "",
          validity: "",
          land: areaDetail,
        });
        toast.success("Quote has been created");
        handleCloseDialog();
      },
      onError: (error) => {
        console.log("error :>> ", error, error.cause);
        if (error instanceof AxiosError) {
          toast.error(
            "Quote has not been created: " + error.response?.data.error
          );
        } else {
          toast.error("An unexpected error occurred");
        }
      },
    });
  };

  useEffect(() => {
    setForm({
      ...form,
      land: areaDetail,
      area: areaDetail?.area?.area.toString(),
    });
  }, [areaDetail]);

  useEffect(() => {
    (async () => {
      if (typeof window !== "undefined") {
        const module = await import("../map-area-selector/map-area-selector");
        const NewLayersPage = module.default;
        setLayersPage(() => () => (
          <NewLayersPage
            onAreaChange={({ area, mapCenter }) => {
              setAreaDetail({ area, mapCenter });
            }}
          />
        ));
      }
    })();
  }, []);

  const handleCloseDialog = () => {
    setShow(false);
  };

  return (
    <div>
      <Dialog open={show} onOpenChange={setShow}>
        <form>
          <DialogTrigger asChild>
            <div className="flex justify-end mb-4 mt-4 mr-2">
              <div className="flex items-center bg-primary text-primary-foreground px-4 py-2 rounded-md cursor-pointer">
                <Plus className="w-4 h-4 mr-2" />
                Nueva Cotización
              </div>
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[825px]">
            <DialogHeader>
              <DialogTitle>Guardar Cotización</DialogTitle>
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

                <Card>
                  <CardHeader>
                    <CardTitle>Nueva Cotización</CardTitle>
                    <CardDescription>
                      Completa los datos para crear una nueva cotización
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={addQuote} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="nombreCliente">
                            Nombre del Cliente
                          </Label>
                          <Select
                            onValueChange={(e) =>
                              setForm({
                                ...form,
                                customer_id: e,
                              })
                            }
                          >
                            <SelectTrigger className="w-[180px]">
                              <Badge className="bg-white text-black w-[180px] h-[40px]">
                                <SelectValue placeholder="Clientes" />
                              </Badge>
                            </SelectTrigger>
                            <SelectContent>
                              {dataCustomers?.data?.customers.map(
                                (customer: any) => (
                                  <SelectItem
                                    key={customer.id}
                                    value={customer.id}
                                  >
                                    {customer.name}
                                  </SelectItem>
                                )
                              )}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="nombreCliente">Estado</Label>
                          <Select
                            onValueChange={(e) =>
                              setForm({
                                ...form,
                                state_id: e,
                              })
                            }
                          >
                            <SelectTrigger className="w-[180px]">
                              <Badge className="bg-white text-black w-[180px] h-[40px]">
                                <SelectValue placeholder="Estados" />
                              </Badge>
                            </SelectTrigger>
                            <SelectContent>
                              {data?.data?.states.map((states: any) => (
                                <SelectItem key={states.id} value={states.id}>
                                  {states.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="crop">Cultivo</Label>
                          <Input
                            id="crop"
                            type="text"
                            value={form.crop}
                            onChange={(e) =>
                              setForm({
                                ...form,
                                crop: e.target.value,
                              })
                            }
                            placeholder="Maíz,Frijol etc."
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="montoAsegurado">
                            Monto Asegurado ($)
                          </Label>
                          <Input
                            id="montoAsegurado"
                            type="number"
                            step="0.01"
                            value={form.insured_amount}
                            onChange={(e) =>
                              setForm({
                                ...form,
                                insured_amount: e.target.value,
                              })
                            }
                            placeholder="0.00"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="fechaInicio">Fecha de Vigencia</Label>
                          <Input
                            id="fechaVigencia"
                            type="date"
                            value={form.validity}
                            onChange={(e) =>
                              setForm({
                                ...form,
                                validity: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>

                      {LayersPage && <LayersPage />}
                      <div className="flex gap-2">
                        <Button type="submit">Guardar Cotización</Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
}
