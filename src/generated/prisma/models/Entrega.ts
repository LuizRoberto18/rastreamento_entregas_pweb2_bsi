
import type * as runtime from "@prisma/client/runtime/client"
import type * as $Enums from "../enums.ts"
import type * as Prisma from "../internal/prismaNamespace.ts"

/**
 * Model Entrega
 * 
 */
export type EntregaModel = runtime.Types.Result.DefaultSelection<Prisma.$EntregaPayload>

export type AggregateEntrega = {
  _count: EntregaCountAggregateOutputType | null
  _avg: EntregaAvgAggregateOutputType | null
  _sum: EntregaSumAggregateOutputType | null
  _min: EntregaMinAggregateOutputType | null
  _max: EntregaMaxAggregateOutputType | null
}

export type EntregaAvgAggregateOutputType = {
  id: number | null
  motoristaId: number | null
}

export type EntregaSumAggregateOutputType = {
  id: number | null
  motoristaId: number | null
}

export type EntregaMinAggregateOutputType = {
  id: number | null
  descricao: string | null
  origem: string | null
  destino: string | null
  status: $Enums.EntregaStatus | null
  motoristaId: number | null
  createdAt: Date | null
  updatedAt: Date | null
}

export type EntregaMaxAggregateOutputType = {
  id: number | null
  descricao: string | null
  origem: string | null
  destino: string | null
  status: $Enums.EntregaStatus | null
  motoristaId: number | null
  createdAt: Date | null
  updatedAt: Date | null
}

export type EntregaCountAggregateOutputType = {
  id: number
  descricao: number
  origem: number
  destino: number
  status: number
  motoristaId: number
  createdAt: number
  updatedAt: number
  _all: number
}


export type EntregaAvgAggregateInputType = {
  id?: true
  motoristaId?: true
}

export type EntregaSumAggregateInputType = {
  id?: true
  motoristaId?: true
}

export type EntregaMinAggregateInputType = {
  id?: true
  descricao?: true
  origem?: true
  destino?: true
  status?: true
  motoristaId?: true
  createdAt?: true
  updatedAt?: true
}

export type EntregaMaxAggregateInputType = {
  id?: true
  descricao?: true
  origem?: true
  destino?: true
  status?: true
  motoristaId?: true
  createdAt?: true
  updatedAt?: true
}

export type EntregaCountAggregateInputType = {
  id?: true
  descricao?: true
  origem?: true
  destino?: true
  status?: true
  motoristaId?: true
  createdAt?: true
  updatedAt?: true
  _all?: true
}

export type EntregaAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Filter which Entrega to aggregate.
   */
  where?: Prisma.EntregaWhereInput
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
   * 
   * Determine the order of Entregas to fetch.
   */
  orderBy?: Prisma.EntregaOrderByWithRelationInput | Prisma.EntregaOrderByWithRelationInput[]
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
   * 
   * Sets the start position
   */
  cursor?: Prisma.EntregaWhereUniqueInput
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
   * 
   * Take `±n` Entregas from the position of the cursor.
   */
  take?: number
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
   * 
   * Skip the first `n` Entregas.
   */
  skip?: number
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
   * 
   * Count returned Entregas
  **/
  _count?: true | EntregaCountAggregateInputType
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
   * 
   * Select which fields to average
  **/
  _avg?: EntregaAvgAggregateInputType
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
   * 
   * Select which fields to sum
  **/
  _sum?: EntregaSumAggregateInputType
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
   * 
   * Select which fields to find the minimum value
  **/
  _min?: EntregaMinAggregateInputType
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
   * 
   * Select which fields to find the maximum value
  **/
  _max?: EntregaMaxAggregateInputType
}

export type GetEntregaAggregateType<T extends EntregaAggregateArgs> = {
      [P in keyof T & keyof AggregateEntrega]: P extends '_count' | 'count'
    ? T[P] extends true
      ? number
      : Prisma.GetScalarType<T[P], AggregateEntrega[P]>
    : Prisma.GetScalarType<T[P], AggregateEntrega[P]>
}




export type EntregaGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  where?: Prisma.EntregaWhereInput
  orderBy?: Prisma.EntregaOrderByWithAggregationInput | Prisma.EntregaOrderByWithAggregationInput[]
  by: Prisma.EntregaScalarFieldEnum[] | Prisma.EntregaScalarFieldEnum
  having?: Prisma.EntregaScalarWhereWithAggregatesInput
  take?: number
  skip?: number
  _count?: EntregaCountAggregateInputType | true
  _avg?: EntregaAvgAggregateInputType
  _sum?: EntregaSumAggregateInputType
  _min?: EntregaMinAggregateInputType
  _max?: EntregaMaxAggregateInputType
}

export type EntregaGroupByOutputType = {
  id: number
  descricao: string
  origem: string
  destino: string
  status: $Enums.EntregaStatus
  motoristaId: number | null
  createdAt: Date
  updatedAt: Date
  _count: EntregaCountAggregateOutputType | null
  _avg: EntregaAvgAggregateOutputType | null
  _sum: EntregaSumAggregateOutputType | null
  _min: EntregaMinAggregateOutputType | null
  _max: EntregaMaxAggregateOutputType | null
}

export type GetEntregaGroupByPayload<T extends EntregaGroupByArgs> = Prisma.PrismaPromise<
  Array<
    Prisma.PickEnumerable<EntregaGroupByOutputType, T['by']> &
      {
        [P in ((keyof T) & (keyof EntregaGroupByOutputType))]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : Prisma.GetScalarType<T[P], EntregaGroupByOutputType[P]>
          : Prisma.GetScalarType<T[P], EntregaGroupByOutputType[P]>
      }
    >
  >



export type EntregaWhereInput = {
  AND?: Prisma.EntregaWhereInput | Prisma.EntregaWhereInput[]
  OR?: Prisma.EntregaWhereInput[]
  NOT?: Prisma.EntregaWhereInput | Prisma.EntregaWhereInput[]
  id?: Prisma.IntFilter<"Entrega"> | number
  descricao?: Prisma.StringFilter<"Entrega"> | string
  origem?: Prisma.StringFilter<"Entrega"> | string
  destino?: Prisma.StringFilter<"Entrega"> | string
  status?: Prisma.EnumEntregaStatusFilter<"Entrega"> | $Enums.EntregaStatus
  motoristaId?: Prisma.IntNullableFilter<"Entrega"> | number | null
  createdAt?: Prisma.DateTimeFilter<"Entrega"> | Date | string
  updatedAt?: Prisma.DateTimeFilter<"Entrega"> | Date | string
  motorista?: Prisma.XOR<Prisma.MotoristaNullableScalarRelationFilter, Prisma.MotoristaWhereInput> | null
  eventos?: Prisma.EventoEntregaListRelationFilter
}

export type EntregaOrderByWithRelationInput = {
  id?: Prisma.SortOrder
  descricao?: Prisma.SortOrder
  origem?: Prisma.SortOrder
  destino?: Prisma.SortOrder
  status?: Prisma.SortOrder
  motoristaId?: Prisma.SortOrderInput | Prisma.SortOrder
  createdAt?: Prisma.SortOrder
  updatedAt?: Prisma.SortOrder
  motorista?: Prisma.MotoristaOrderByWithRelationInput
  eventos?: Prisma.EventoEntregaOrderByRelationAggregateInput
}

export type EntregaWhereUniqueInput = Prisma.AtLeast<{
  id?: number
  AND?: Prisma.EntregaWhereInput | Prisma.EntregaWhereInput[]
  OR?: Prisma.EntregaWhereInput[]
  NOT?: Prisma.EntregaWhereInput | Prisma.EntregaWhereInput[]
  descricao?: Prisma.StringFilter<"Entrega"> | string
  origem?: Prisma.StringFilter<"Entrega"> | string
  destino?: Prisma.StringFilter<"Entrega"> | string
  status?: Prisma.EnumEntregaStatusFilter<"Entrega"> | $Enums.EntregaStatus
  motoristaId?: Prisma.IntNullableFilter<"Entrega"> | number | null
  createdAt?: Prisma.DateTimeFilter<"Entrega"> | Date | string
  updatedAt?: Prisma.DateTimeFilter<"Entrega"> | Date | string
  motorista?: Prisma.XOR<Prisma.MotoristaNullableScalarRelationFilter, Prisma.MotoristaWhereInput> | null
  eventos?: Prisma.EventoEntregaListRelationFilter
}, "id">

export type EntregaOrderByWithAggregationInput = {
  id?: Prisma.SortOrder
  descricao?: Prisma.SortOrder
  origem?: Prisma.SortOrder
  destino?: Prisma.SortOrder
  status?: Prisma.SortOrder
  motoristaId?: Prisma.SortOrderInput | Prisma.SortOrder
  createdAt?: Prisma.SortOrder
  updatedAt?: Prisma.SortOrder
  _count?: Prisma.EntregaCountOrderByAggregateInput
  _avg?: Prisma.EntregaAvgOrderByAggregateInput
  _max?: Prisma.EntregaMaxOrderByAggregateInput
  _min?: Prisma.EntregaMinOrderByAggregateInput
  _sum?: Prisma.EntregaSumOrderByAggregateInput
}

export type EntregaScalarWhereWithAggregatesInput = {
  AND?: Prisma.EntregaScalarWhereWithAggregatesInput | Prisma.EntregaScalarWhereWithAggregatesInput[]
  OR?: Prisma.EntregaScalarWhereWithAggregatesInput[]
  NOT?: Prisma.EntregaScalarWhereWithAggregatesInput | Prisma.EntregaScalarWhereWithAggregatesInput[]
  id?: Prisma.IntWithAggregatesFilter<"Entrega"> | number
  descricao?: Prisma.StringWithAggregatesFilter<"Entrega"> | string
  origem?: Prisma.StringWithAggregatesFilter<"Entrega"> | string
  destino?: Prisma.StringWithAggregatesFilter<"Entrega"> | string
  status?: Prisma.EnumEntregaStatusWithAggregatesFilter<"Entrega"> | $Enums.EntregaStatus
  motoristaId?: Prisma.IntNullableWithAggregatesFilter<"Entrega"> | number | null
  createdAt?: Prisma.DateTimeWithAggregatesFilter<"Entrega"> | Date | string
  updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Entrega"> | Date | string
}

export type EntregaCreateInput = {
  descricao: string
  origem: string
  destino: string
  status: $Enums.EntregaStatus
  createdAt?: Date | string
  updatedAt?: Date | string
  motorista?: Prisma.MotoristaCreateNestedOneWithoutEntregasInput
  eventos?: Prisma.EventoEntregaCreateNestedManyWithoutEntregaInput
}

export type EntregaUncheckedCreateInput = {
  id?: number
  descricao: string
  origem: string
  destino: string
  status: $Enums.EntregaStatus
  motoristaId?: number | null
  createdAt?: Date | string
  updatedAt?: Date | string
  eventos?: Prisma.EventoEntregaUncheckedCreateNestedManyWithoutEntregaInput
}

export type EntregaUpdateInput = {
  descricao?: Prisma.StringFieldUpdateOperationsInput | string
  origem?: Prisma.StringFieldUpdateOperationsInput | string
  destino?: Prisma.StringFieldUpdateOperationsInput | string
  status?: Prisma.EnumEntregaStatusFieldUpdateOperationsInput | $Enums.EntregaStatus
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  motorista?: Prisma.MotoristaUpdateOneWithoutEntregasNestedInput
  eventos?: Prisma.EventoEntregaUpdateManyWithoutEntregaNestedInput
}

export type EntregaUncheckedUpdateInput = {
  id?: Prisma.IntFieldUpdateOperationsInput | number
  descricao?: Prisma.StringFieldUpdateOperationsInput | string
  origem?: Prisma.StringFieldUpdateOperationsInput | string
  destino?: Prisma.StringFieldUpdateOperationsInput | string
  status?: Prisma.EnumEntregaStatusFieldUpdateOperationsInput | $Enums.EntregaStatus
  motoristaId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  eventos?: Prisma.EventoEntregaUncheckedUpdateManyWithoutEntregaNestedInput
}

export type EntregaCreateManyInput = {
  id?: number
  descricao: string
  origem: string
  destino: string
  status: $Enums.EntregaStatus
  motoristaId?: number | null
  createdAt?: Date | string
  updatedAt?: Date | string
}

export type EntregaUpdateManyMutationInput = {
  descricao?: Prisma.StringFieldUpdateOperationsInput | string
  origem?: Prisma.StringFieldUpdateOperationsInput | string
  destino?: Prisma.StringFieldUpdateOperationsInput | string
  status?: Prisma.EnumEntregaStatusFieldUpdateOperationsInput | $Enums.EntregaStatus
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type EntregaUncheckedUpdateManyInput = {
  id?: Prisma.IntFieldUpdateOperationsInput | number
  descricao?: Prisma.StringFieldUpdateOperationsInput | string
  origem?: Prisma.StringFieldUpdateOperationsInput | string
  destino?: Prisma.StringFieldUpdateOperationsInput | string
  status?: Prisma.EnumEntregaStatusFieldUpdateOperationsInput | $Enums.EntregaStatus
  motoristaId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type EntregaCountOrderByAggregateInput = {
  id?: Prisma.SortOrder
  descricao?: Prisma.SortOrder
  origem?: Prisma.SortOrder
  destino?: Prisma.SortOrder
  status?: Prisma.SortOrder
  motoristaId?: Prisma.SortOrder
  createdAt?: Prisma.SortOrder
  updatedAt?: Prisma.SortOrder
}

export type EntregaAvgOrderByAggregateInput = {
  id?: Prisma.SortOrder
  motoristaId?: Prisma.SortOrder
}

export type EntregaMaxOrderByAggregateInput = {
  id?: Prisma.SortOrder
  descricao?: Prisma.SortOrder
  origem?: Prisma.SortOrder
  destino?: Prisma.SortOrder
  status?: Prisma.SortOrder
  motoristaId?: Prisma.SortOrder
  createdAt?: Prisma.SortOrder
  updatedAt?: Prisma.SortOrder
}

export type EntregaMinOrderByAggregateInput = {
  id?: Prisma.SortOrder
  descricao?: Prisma.SortOrder
  origem?: Prisma.SortOrder
  destino?: Prisma.SortOrder
  status?: Prisma.SortOrder
  motoristaId?: Prisma.SortOrder
  createdAt?: Prisma.SortOrder
  updatedAt?: Prisma.SortOrder
}

export type EntregaSumOrderByAggregateInput = {
  id?: Prisma.SortOrder
  motoristaId?: Prisma.SortOrder
}

export type EntregaScalarRelationFilter = {
  is?: Prisma.EntregaWhereInput
  isNot?: Prisma.EntregaWhereInput
}

export type EntregaListRelationFilter = {
  every?: Prisma.EntregaWhereInput
  some?: Prisma.EntregaWhereInput
  none?: Prisma.EntregaWhereInput
}

export type EntregaOrderByRelationAggregateInput = {
  _count?: Prisma.SortOrder
}

export type StringFieldUpdateOperationsInput = {
  set?: string
}

export type EnumEntregaStatusFieldUpdateOperationsInput = {
  set?: $Enums.EntregaStatus
}

export type DateTimeFieldUpdateOperationsInput = {
  set?: Date | string
}

export type IntFieldUpdateOperationsInput = {
  set?: number
  increment?: number
  decrement?: number
  multiply?: number
  divide?: number
}

export type NullableIntFieldUpdateOperationsInput = {
  set?: number | null
  increment?: number
  decrement?: number
  multiply?: number
  divide?: number
}

export type EntregaCreateNestedOneWithoutEventosInput = {
  create?: Prisma.XOR<Prisma.EntregaCreateWithoutEventosInput, Prisma.EntregaUncheckedCreateWithoutEventosInput>
  connectOrCreate?: Prisma.EntregaCreateOrConnectWithoutEventosInput
  connect?: Prisma.EntregaWhereUniqueInput
}

export type EntregaUpdateOneRequiredWithoutEventosNestedInput = {
  create?: Prisma.XOR<Prisma.EntregaCreateWithoutEventosInput, Prisma.EntregaUncheckedCreateWithoutEventosInput>
  connectOrCreate?: Prisma.EntregaCreateOrConnectWithoutEventosInput
  upsert?: Prisma.EntregaUpsertWithoutEventosInput
  connect?: Prisma.EntregaWhereUniqueInput
  update?: Prisma.XOR<Prisma.XOR<Prisma.EntregaUpdateToOneWithWhereWithoutEventosInput, Prisma.EntregaUpdateWithoutEventosInput>, Prisma.EntregaUncheckedUpdateWithoutEventosInput>
}

export type EntregaCreateNestedManyWithoutMotoristaInput = {
  create?: Prisma.XOR<Prisma.EntregaCreateWithoutMotoristaInput, Prisma.EntregaUncheckedCreateWithoutMotoristaInput> | Prisma.EntregaCreateWithoutMotoristaInput[] | Prisma.EntregaUncheckedCreateWithoutMotoristaInput[]
  connectOrCreate?: Prisma.EntregaCreateOrConnectWithoutMotoristaInput | Prisma.EntregaCreateOrConnectWithoutMotoristaInput[]
  createMany?: Prisma.EntregaCreateManyMotoristaInputEnvelope
  connect?: Prisma.EntregaWhereUniqueInput | Prisma.EntregaWhereUniqueInput[]
}

export type EntregaUncheckedCreateNestedManyWithoutMotoristaInput = {
  create?: Prisma.XOR<Prisma.EntregaCreateWithoutMotoristaInput, Prisma.EntregaUncheckedCreateWithoutMotoristaInput> | Prisma.EntregaCreateWithoutMotoristaInput[] | Prisma.EntregaUncheckedCreateWithoutMotoristaInput[]
  connectOrCreate?: Prisma.EntregaCreateOrConnectWithoutMotoristaInput | Prisma.EntregaCreateOrConnectWithoutMotoristaInput[]
  createMany?: Prisma.EntregaCreateManyMotoristaInputEnvelope
  connect?: Prisma.EntregaWhereUniqueInput | Prisma.EntregaWhereUniqueInput[]
}

export type EntregaUpdateManyWithoutMotoristaNestedInput = {
  create?: Prisma.XOR<Prisma.EntregaCreateWithoutMotoristaInput, Prisma.EntregaUncheckedCreateWithoutMotoristaInput> | Prisma.EntregaCreateWithoutMotoristaInput[] | Prisma.EntregaUncheckedCreateWithoutMotoristaInput[]
  connectOrCreate?: Prisma.EntregaCreateOrConnectWithoutMotoristaInput | Prisma.EntregaCreateOrConnectWithoutMotoristaInput[]
  upsert?: Prisma.EntregaUpsertWithWhereUniqueWithoutMotoristaInput | Prisma.EntregaUpsertWithWhereUniqueWithoutMotoristaInput[]
  createMany?: Prisma.EntregaCreateManyMotoristaInputEnvelope
  set?: Prisma.EntregaWhereUniqueInput | Prisma.EntregaWhereUniqueInput[]
  disconnect?: Prisma.EntregaWhereUniqueInput | Prisma.EntregaWhereUniqueInput[]
  delete?: Prisma.EntregaWhereUniqueInput | Prisma.EntregaWhereUniqueInput[]
  connect?: Prisma.EntregaWhereUniqueInput | Prisma.EntregaWhereUniqueInput[]
  update?: Prisma.EntregaUpdateWithWhereUniqueWithoutMotoristaInput | Prisma.EntregaUpdateWithWhereUniqueWithoutMotoristaInput[]
  updateMany?: Prisma.EntregaUpdateManyWithWhereWithoutMotoristaInput | Prisma.EntregaUpdateManyWithWhereWithoutMotoristaInput[]
  deleteMany?: Prisma.EntregaScalarWhereInput | Prisma.EntregaScalarWhereInput[]
}

export type EntregaUncheckedUpdateManyWithoutMotoristaNestedInput = {
  create?: Prisma.XOR<Prisma.EntregaCreateWithoutMotoristaInput, Prisma.EntregaUncheckedCreateWithoutMotoristaInput> | Prisma.EntregaCreateWithoutMotoristaInput[] | Prisma.EntregaUncheckedCreateWithoutMotoristaInput[]
  connectOrCreate?: Prisma.EntregaCreateOrConnectWithoutMotoristaInput | Prisma.EntregaCreateOrConnectWithoutMotoristaInput[]
  upsert?: Prisma.EntregaUpsertWithWhereUniqueWithoutMotoristaInput | Prisma.EntregaUpsertWithWhereUniqueWithoutMotoristaInput[]
  createMany?: Prisma.EntregaCreateManyMotoristaInputEnvelope
  set?: Prisma.EntregaWhereUniqueInput | Prisma.EntregaWhereUniqueInput[]
  disconnect?: Prisma.EntregaWhereUniqueInput | Prisma.EntregaWhereUniqueInput[]
  delete?: Prisma.EntregaWhereUniqueInput | Prisma.EntregaWhereUniqueInput[]
  connect?: Prisma.EntregaWhereUniqueInput | Prisma.EntregaWhereUniqueInput[]
  update?: Prisma.EntregaUpdateWithWhereUniqueWithoutMotoristaInput | Prisma.EntregaUpdateWithWhereUniqueWithoutMotoristaInput[]
  updateMany?: Prisma.EntregaUpdateManyWithWhereWithoutMotoristaInput | Prisma.EntregaUpdateManyWithWhereWithoutMotoristaInput[]
  deleteMany?: Prisma.EntregaScalarWhereInput | Prisma.EntregaScalarWhereInput[]
}

export type EntregaCreateWithoutEventosInput = {
  descricao: string
  origem: string
  destino: string
  status: $Enums.EntregaStatus
  createdAt?: Date | string
  updatedAt?: Date | string
  motorista?: Prisma.MotoristaCreateNestedOneWithoutEntregasInput
}

export type EntregaUncheckedCreateWithoutEventosInput = {
  id?: number
  descricao: string
  origem: string
  destino: string
  status: $Enums.EntregaStatus
  motoristaId?: number | null
  createdAt?: Date | string
  updatedAt?: Date | string
}

export type EntregaCreateOrConnectWithoutEventosInput = {
  where: Prisma.EntregaWhereUniqueInput
  create: Prisma.XOR<Prisma.EntregaCreateWithoutEventosInput, Prisma.EntregaUncheckedCreateWithoutEventosInput>
}

export type EntregaUpsertWithoutEventosInput = {
  update: Prisma.XOR<Prisma.EntregaUpdateWithoutEventosInput, Prisma.EntregaUncheckedUpdateWithoutEventosInput>
  create: Prisma.XOR<Prisma.EntregaCreateWithoutEventosInput, Prisma.EntregaUncheckedCreateWithoutEventosInput>
  where?: Prisma.EntregaWhereInput
}

export type EntregaUpdateToOneWithWhereWithoutEventosInput = {
  where?: Prisma.EntregaWhereInput
  data: Prisma.XOR<Prisma.EntregaUpdateWithoutEventosInput, Prisma.EntregaUncheckedUpdateWithoutEventosInput>
}

export type EntregaUpdateWithoutEventosInput = {
  descricao?: Prisma.StringFieldUpdateOperationsInput | string
  origem?: Prisma.StringFieldUpdateOperationsInput | string
  destino?: Prisma.StringFieldUpdateOperationsInput | string
  status?: Prisma.EnumEntregaStatusFieldUpdateOperationsInput | $Enums.EntregaStatus
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  motorista?: Prisma.MotoristaUpdateOneWithoutEntregasNestedInput
}

export type EntregaUncheckedUpdateWithoutEventosInput = {
  id?: Prisma.IntFieldUpdateOperationsInput | number
  descricao?: Prisma.StringFieldUpdateOperationsInput | string
  origem?: Prisma.StringFieldUpdateOperationsInput | string
  destino?: Prisma.StringFieldUpdateOperationsInput | string
  status?: Prisma.EnumEntregaStatusFieldUpdateOperationsInput | $Enums.EntregaStatus
  motoristaId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type EntregaCreateWithoutMotoristaInput = {
  descricao: string
  origem: string
  destino: string
  status: $Enums.EntregaStatus
  createdAt?: Date | string
  updatedAt?: Date | string
  eventos?: Prisma.EventoEntregaCreateNestedManyWithoutEntregaInput
}

export type EntregaUncheckedCreateWithoutMotoristaInput = {
  id?: number
  descricao: string
  origem: string
  destino: string
  status: $Enums.EntregaStatus
  createdAt?: Date | string
  updatedAt?: Date | string
  eventos?: Prisma.EventoEntregaUncheckedCreateNestedManyWithoutEntregaInput
}

export type EntregaCreateOrConnectWithoutMotoristaInput = {
  where: Prisma.EntregaWhereUniqueInput
  create: Prisma.XOR<Prisma.EntregaCreateWithoutMotoristaInput, Prisma.EntregaUncheckedCreateWithoutMotoristaInput>
}

export type EntregaCreateManyMotoristaInputEnvelope = {
  data: Prisma.EntregaCreateManyMotoristaInput | Prisma.EntregaCreateManyMotoristaInput[]
}

export type EntregaUpsertWithWhereUniqueWithoutMotoristaInput = {
  where: Prisma.EntregaWhereUniqueInput
  update: Prisma.XOR<Prisma.EntregaUpdateWithoutMotoristaInput, Prisma.EntregaUncheckedUpdateWithoutMotoristaInput>
  create: Prisma.XOR<Prisma.EntregaCreateWithoutMotoristaInput, Prisma.EntregaUncheckedCreateWithoutMotoristaInput>
}

export type EntregaUpdateWithWhereUniqueWithoutMotoristaInput = {
  where: Prisma.EntregaWhereUniqueInput
  data: Prisma.XOR<Prisma.EntregaUpdateWithoutMotoristaInput, Prisma.EntregaUncheckedUpdateWithoutMotoristaInput>
}

export type EntregaUpdateManyWithWhereWithoutMotoristaInput = {
  where: Prisma.EntregaScalarWhereInput
  data: Prisma.XOR<Prisma.EntregaUpdateManyMutationInput, Prisma.EntregaUncheckedUpdateManyWithoutMotoristaInput>
}

export type EntregaScalarWhereInput = {
  AND?: Prisma.EntregaScalarWhereInput | Prisma.EntregaScalarWhereInput[]
  OR?: Prisma.EntregaScalarWhereInput[]
  NOT?: Prisma.EntregaScalarWhereInput | Prisma.EntregaScalarWhereInput[]
  id?: Prisma.IntFilter<"Entrega"> | number
  descricao?: Prisma.StringFilter<"Entrega"> | string
  origem?: Prisma.StringFilter<"Entrega"> | string
  destino?: Prisma.StringFilter<"Entrega"> | string
  status?: Prisma.EnumEntregaStatusFilter<"Entrega"> | $Enums.EntregaStatus
  motoristaId?: Prisma.IntNullableFilter<"Entrega"> | number | null
  createdAt?: Prisma.DateTimeFilter<"Entrega"> | Date | string
  updatedAt?: Prisma.DateTimeFilter<"Entrega"> | Date | string
}

export type EntregaCreateManyMotoristaInput = {
  id?: number
  descricao: string
  origem: string
  destino: string
  status: $Enums.EntregaStatus
  createdAt?: Date | string
  updatedAt?: Date | string
}

export type EntregaUpdateWithoutMotoristaInput = {
  descricao?: Prisma.StringFieldUpdateOperationsInput | string
  origem?: Prisma.StringFieldUpdateOperationsInput | string
  destino?: Prisma.StringFieldUpdateOperationsInput | string
  status?: Prisma.EnumEntregaStatusFieldUpdateOperationsInput | $Enums.EntregaStatus
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  eventos?: Prisma.EventoEntregaUpdateManyWithoutEntregaNestedInput
}

export type EntregaUncheckedUpdateWithoutMotoristaInput = {
  id?: Prisma.IntFieldUpdateOperationsInput | number
  descricao?: Prisma.StringFieldUpdateOperationsInput | string
  origem?: Prisma.StringFieldUpdateOperationsInput | string
  destino?: Prisma.StringFieldUpdateOperationsInput | string
  status?: Prisma.EnumEntregaStatusFieldUpdateOperationsInput | $Enums.EntregaStatus
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  eventos?: Prisma.EventoEntregaUncheckedUpdateManyWithoutEntregaNestedInput
}

export type EntregaUncheckedUpdateManyWithoutMotoristaInput = {
  id?: Prisma.IntFieldUpdateOperationsInput | number
  descricao?: Prisma.StringFieldUpdateOperationsInput | string
  origem?: Prisma.StringFieldUpdateOperationsInput | string
  destino?: Prisma.StringFieldUpdateOperationsInput | string
  status?: Prisma.EnumEntregaStatusFieldUpdateOperationsInput | $Enums.EntregaStatus
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}


/**
 * Count Type EntregaCountOutputType
 */

export type EntregaCountOutputType = {
  eventos: number
}

export type EntregaCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  eventos?: boolean | EntregaCountOutputTypeCountEventosArgs
}

/**
 * EntregaCountOutputType without action
 */
export type EntregaCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Select specific fields to fetch from the EntregaCountOutputType
   */
  select?: Prisma.EntregaCountOutputTypeSelect<ExtArgs> | null
}

/**
 * EntregaCountOutputType without action
 */
export type EntregaCountOutputTypeCountEventosArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  where?: Prisma.EventoEntregaWhereInput
}


export type EntregaSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
  id?: boolean
  descricao?: boolean
  origem?: boolean
  destino?: boolean
  status?: boolean
  motoristaId?: boolean
  createdAt?: boolean
  updatedAt?: boolean
  motorista?: boolean | Prisma.Entrega$motoristaArgs<ExtArgs>
  eventos?: boolean | Prisma.Entrega$eventosArgs<ExtArgs>
  _count?: boolean | Prisma.EntregaCountOutputTypeDefaultArgs<ExtArgs>
}, ExtArgs["result"]["entrega"]>

export type EntregaSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
  id?: boolean
  descricao?: boolean
  origem?: boolean
  destino?: boolean
  status?: boolean
  motoristaId?: boolean
  createdAt?: boolean
  updatedAt?: boolean
  motorista?: boolean | Prisma.Entrega$motoristaArgs<ExtArgs>
}, ExtArgs["result"]["entrega"]>

export type EntregaSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
  id?: boolean
  descricao?: boolean
  origem?: boolean
  destino?: boolean
  status?: boolean
  motoristaId?: boolean
  createdAt?: boolean
  updatedAt?: boolean
  motorista?: boolean | Prisma.Entrega$motoristaArgs<ExtArgs>
}, ExtArgs["result"]["entrega"]>

export type EntregaSelectScalar = {
  id?: boolean
  descricao?: boolean
  origem?: boolean
  destino?: boolean
  status?: boolean
  motoristaId?: boolean
  createdAt?: boolean
  updatedAt?: boolean
}

export type EntregaOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "descricao" | "origem" | "destino" | "status" | "motoristaId" | "createdAt" | "updatedAt", ExtArgs["result"]["entrega"]>
export type EntregaInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  motorista?: boolean | Prisma.Entrega$motoristaArgs<ExtArgs>
  eventos?: boolean | Prisma.Entrega$eventosArgs<ExtArgs>
  _count?: boolean | Prisma.EntregaCountOutputTypeDefaultArgs<ExtArgs>
}
export type EntregaIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  motorista?: boolean | Prisma.Entrega$motoristaArgs<ExtArgs>
}
export type EntregaIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  motorista?: boolean | Prisma.Entrega$motoristaArgs<ExtArgs>
}

export type $EntregaPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  name: "Entrega"
  objects: {
    motorista: Prisma.$MotoristaPayload<ExtArgs> | null
    eventos: Prisma.$EventoEntregaPayload<ExtArgs>[]
  }
  scalars: runtime.Types.Extensions.GetPayloadResult<{
    id: number
    descricao: string
    origem: string
    destino: string
    status: $Enums.EntregaStatus
    motoristaId: number | null
    createdAt: Date
    updatedAt: Date
  }, ExtArgs["result"]["entrega"]>
  composites: {}
}

export type EntregaGetPayload<S extends boolean | null | undefined | EntregaDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$EntregaPayload, S>

export type EntregaCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> =
  Omit<EntregaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: EntregaCountAggregateInputType | true
  }

export interface EntregaDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Entrega'], meta: { name: 'Entrega' } }
  /**
   * Find zero or one Entrega that matches the filter.
   * @param {EntregaFindUniqueArgs} args - Arguments to find a Entrega
   * @example
   * // Get one Entrega
   * const entrega = await prisma.entrega.findUnique({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   */
  findUnique<T extends EntregaFindUniqueArgs>(args: Prisma.SelectSubset<T, EntregaFindUniqueArgs<ExtArgs>>): Prisma.Prisma__EntregaClient<runtime.Types.Result.GetResult<Prisma.$EntregaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

  /**
   * Find one Entrega that matches the filter or throw an error with `error.code='P2025'`
   * if no matches were found.
   * @param {EntregaFindUniqueOrThrowArgs} args - Arguments to find a Entrega
   * @example
   * // Get one Entrega
   * const entrega = await prisma.entrega.findUniqueOrThrow({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   */
  findUniqueOrThrow<T extends EntregaFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, EntregaFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__EntregaClient<runtime.Types.Result.GetResult<Prisma.$EntregaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

  /**
   * Find the first Entrega that matches the filter.
   * Note, that providing `undefined` is treated as the value not being there.
   * Read more here: https://pris.ly/d/null-undefined
   * @param {EntregaFindFirstArgs} args - Arguments to find a Entrega
   * @example
   * // Get one Entrega
   * const entrega = await prisma.entrega.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   */
  findFirst<T extends EntregaFindFirstArgs>(args?: Prisma.SelectSubset<T, EntregaFindFirstArgs<ExtArgs>>): Prisma.Prisma__EntregaClient<runtime.Types.Result.GetResult<Prisma.$EntregaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

  /**
   * Find the first Entrega that matches the filter or
   * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
   * Note, that providing `undefined` is treated as the value not being there.
   * Read more here: https://pris.ly/d/null-undefined
   * @param {EntregaFindFirstOrThrowArgs} args - Arguments to find a Entrega
   * @example
   * // Get one Entrega
   * const entrega = await prisma.entrega.findFirstOrThrow({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   */
  findFirstOrThrow<T extends EntregaFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, EntregaFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__EntregaClient<runtime.Types.Result.GetResult<Prisma.$EntregaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

  /**
   * Find zero or more Entregas that matches the filter.
   * Note, that providing `undefined` is treated as the value not being there.
   * Read more here: https://pris.ly/d/null-undefined
   * @param {EntregaFindManyArgs} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Entregas
   * const entregas = await prisma.entrega.findMany()
   * 
   * // Get first 10 Entregas
   * const entregas = await prisma.entrega.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const entregaWithIdOnly = await prisma.entrega.findMany({ select: { id: true } })
   * 
   */
  findMany<T extends EntregaFindManyArgs>(args?: Prisma.SelectSubset<T, EntregaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EntregaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

  /**
   * Create a Entrega.
   * @param {EntregaCreateArgs} args - Arguments to create a Entrega.
   * @example
   * // Create one Entrega
   * const Entrega = await prisma.entrega.create({
   *   data: {
   *     // ... data to create a Entrega
   *   }
   * })
   * 
   */
  create<T extends EntregaCreateArgs>(args: Prisma.SelectSubset<T, EntregaCreateArgs<ExtArgs>>): Prisma.Prisma__EntregaClient<runtime.Types.Result.GetResult<Prisma.$EntregaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

  /**
   * Create many Entregas.
   * @param {EntregaCreateManyArgs} args - Arguments to create many Entregas.
   * @example
   * // Create many Entregas
   * const entrega = await prisma.entrega.createMany({
   *   data: [
   *     // ... provide data here
   *   ]
   * })
   *     
   */
  createMany<T extends EntregaCreateManyArgs>(args?: Prisma.SelectSubset<T, EntregaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>

  /**
   * Create many Entregas and returns the data saved in the database.
   * @param {EntregaCreateManyAndReturnArgs} args - Arguments to create many Entregas.
   * @example
   * // Create many Entregas
   * const entrega = await prisma.entrega.createManyAndReturn({
   *   data: [
   *     // ... provide data here
   *   ]
   * })
   * 
   * // Create many Entregas and only return the `id`
   * const entregaWithIdOnly = await prisma.entrega.createManyAndReturn({
   *   select: { id: true },
   *   data: [
   *     // ... provide data here
   *   ]
   * })
   * Note, that providing `undefined` is treated as the value not being there.
   * Read more here: https://pris.ly/d/null-undefined
   * 
   */
  createManyAndReturn<T extends EntregaCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, EntregaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EntregaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

  /**
   * Delete a Entrega.
   * @param {EntregaDeleteArgs} args - Arguments to delete one Entrega.
   * @example
   * // Delete one Entrega
   * const Entrega = await prisma.entrega.delete({
   *   where: {
   *     // ... filter to delete one Entrega
   *   }
   * })
   * 
   */
  delete<T extends EntregaDeleteArgs>(args: Prisma.SelectSubset<T, EntregaDeleteArgs<ExtArgs>>): Prisma.Prisma__EntregaClient<runtime.Types.Result.GetResult<Prisma.$EntregaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

  /**
   * Update one Entrega.
   * @param {EntregaUpdateArgs} args - Arguments to update one Entrega.
   * @example
   * // Update one Entrega
   * const entrega = await prisma.entrega.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
   */
  update<T extends EntregaUpdateArgs>(args: Prisma.SelectSubset<T, EntregaUpdateArgs<ExtArgs>>): Prisma.Prisma__EntregaClient<runtime.Types.Result.GetResult<Prisma.$EntregaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

  /**
   * Delete zero or more Entregas.
   * @param {EntregaDeleteManyArgs} args - Arguments to filter Entregas to delete.
   * @example
   * // Delete a few Entregas
   * const { count } = await prisma.entrega.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
   */
  deleteMany<T extends EntregaDeleteManyArgs>(args?: Prisma.SelectSubset<T, EntregaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>

  /**
   * Update zero or more Entregas.
   * Note, that providing `undefined` is treated as the value not being there.
   * Read more here: https://pris.ly/d/null-undefined
   * @param {EntregaUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Entregas
   * const entrega = await prisma.entrega.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
   */
  updateMany<T extends EntregaUpdateManyArgs>(args: Prisma.SelectSubset<T, EntregaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>

  /**
   * Update zero or more Entregas and returns the data updated in the database.
   * @param {EntregaUpdateManyAndReturnArgs} args - Arguments to update many Entregas.
   * @example
   * // Update many Entregas
   * const entrega = await prisma.entrega.updateManyAndReturn({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: [
   *     // ... provide data here
   *   ]
   * })
   * 
   * // Update zero or more Entregas and only return the `id`
   * const entregaWithIdOnly = await prisma.entrega.updateManyAndReturn({
   *   select: { id: true },
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: [
   *     // ... provide data here
   *   ]
   * })
   * Note, that providing `undefined` is treated as the value not being there.
   * Read more here: https://pris.ly/d/null-undefined
   * 
   */
  updateManyAndReturn<T extends EntregaUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, EntregaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EntregaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

  /**
   * Create or update one Entrega.
   * @param {EntregaUpsertArgs} args - Arguments to update or create a Entrega.
   * @example
   * // Update or create a Entrega
   * const entrega = await prisma.entrega.upsert({
   *   create: {
   *     // ... data to create a Entrega
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Entrega we want to update
   *   }
   * })
   */
  upsert<T extends EntregaUpsertArgs>(args: Prisma.SelectSubset<T, EntregaUpsertArgs<ExtArgs>>): Prisma.Prisma__EntregaClient<runtime.Types.Result.GetResult<Prisma.$EntregaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


  /**
   * Count the number of Entregas.
   * Note, that providing `undefined` is treated as the value not being there.
   * Read more here: https://pris.ly/d/null-undefined
   * @param {EntregaCountArgs} args - Arguments to filter Entregas to count.
   * @example
   * // Count the number of Entregas
   * const count = await prisma.entrega.count({
   *   where: {
   *     // ... the filter for the Entregas we want to count
   *   }
   * })
  **/
  count<T extends EntregaCountArgs>(
    args?: Prisma.Subset<T, EntregaCountArgs>,
  ): Prisma.PrismaPromise<
    T extends runtime.Types.Utils.Record<'select', any>
      ? T['select'] extends true
        ? number
        : Prisma.GetScalarType<T['select'], EntregaCountAggregateOutputType>
      : number
  >

  /**
   * Allows you to perform aggregations operations on a Entrega.
   * Note, that providing `undefined` is treated as the value not being there.
   * Read more here: https://pris.ly/d/null-undefined
   * @param {EntregaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
   * @example
   * // Ordered by age ascending
   * // Where email contains prisma.io
   * // Limited to the 10 users
   * const aggregations = await prisma.user.aggregate({
   *   _avg: {
   *     age: true,
   *   },
   *   where: {
   *     email: {
   *       contains: "prisma.io",
   *     },
   *   },
   *   orderBy: {
   *     age: "asc",
   *   },
   *   take: 10,
   * })
  **/
  aggregate<T extends EntregaAggregateArgs>(args: Prisma.Subset<T, EntregaAggregateArgs>): Prisma.PrismaPromise<GetEntregaAggregateType<T>>

  /**
   * Group by Entrega.
   * Note, that providing `undefined` is treated as the value not being there.
   * Read more here: https://pris.ly/d/null-undefined
   * @param {EntregaGroupByArgs} args - Group by arguments.
   * @example
   * // Group by city, order by createdAt, get count
   * const result = await prisma.user.groupBy({
   *   by: ['city', 'createdAt'],
   *   orderBy: {
   *     createdAt: true
   *   },
   *   _count: {
   *     _all: true
   *   },
   * })
   * 
  **/
  groupBy<
    T extends EntregaGroupByArgs,
    HasSelectOrTake extends Prisma.Or<
      Prisma.Extends<'skip', Prisma.Keys<T>>,
      Prisma.Extends<'take', Prisma.Keys<T>>
    >,
    OrderByArg extends Prisma.True extends HasSelectOrTake
      ? { orderBy: EntregaGroupByArgs['orderBy'] }
      : { orderBy?: EntregaGroupByArgs['orderBy'] },
    OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>,
    ByFields extends Prisma.MaybeTupleToUnion<T['by']>,
    ByValid extends Prisma.Has<ByFields, OrderFields>,
    HavingFields extends Prisma.GetHavingFields<T['having']>,
    HavingValid extends Prisma.Has<ByFields, HavingFields>,
    ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False,
    InputErrors extends ByEmpty extends Prisma.True
    ? `Error: "by" must not be empty.`
    : HavingValid extends Prisma.False
    ? {
        [P in HavingFields]: P extends ByFields
          ? never
          : P extends string
          ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
          : [
              Error,
              'Field ',
              P,
              ` in "having" needs to be provided in "by"`,
            ]
      }[HavingFields]
    : 'take' extends Prisma.Keys<T>
    ? 'orderBy' extends Prisma.Keys<T>
      ? ByValid extends Prisma.True
        ? {}
        : {
            [P in OrderFields]: P extends ByFields
              ? never
              : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
          }[OrderFields]
      : 'Error: If you provide "take", you also need to provide "orderBy"'
    : 'skip' extends Prisma.Keys<T>
    ? 'orderBy' extends Prisma.Keys<T>
      ? ByValid extends Prisma.True
        ? {}
        : {
            [P in OrderFields]: P extends ByFields
              ? never
              : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
          }[OrderFields]
      : 'Error: If you provide "skip", you also need to provide "orderBy"'
    : ByValid extends Prisma.True
    ? {}
    : {
        [P in OrderFields]: P extends ByFields
          ? never
          : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
      }[OrderFields]
  >(args: Prisma.SubsetIntersection<T, EntregaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEntregaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
/**
 * Fields of the Entrega model
 */
readonly fields: EntregaFieldRefs;
}

/**
 * The delegate class that acts as a "Promise-like" for Entrega.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__EntregaClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
  readonly [Symbol.toStringTag]: "PrismaPromise"
  motorista<T extends Prisma.Entrega$motoristaArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Entrega$motoristaArgs<ExtArgs>>): Prisma.Prisma__MotoristaClient<runtime.Types.Result.GetResult<Prisma.$MotoristaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
  eventos<T extends Prisma.Entrega$eventosArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Entrega$eventosArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EventoEntregaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>
}




/**
 * Fields of the Entrega model
 */
export interface EntregaFieldRefs {
  readonly id: Prisma.FieldRef<"Entrega", 'Int'>
  readonly descricao: Prisma.FieldRef<"Entrega", 'String'>
  readonly origem: Prisma.FieldRef<"Entrega", 'String'>
  readonly destino: Prisma.FieldRef<"Entrega", 'String'>
  readonly status: Prisma.FieldRef<"Entrega", 'EntregaStatus'>
  readonly motoristaId: Prisma.FieldRef<"Entrega", 'Int'>
  readonly createdAt: Prisma.FieldRef<"Entrega", 'DateTime'>
  readonly updatedAt: Prisma.FieldRef<"Entrega", 'DateTime'>
}
    

// Custom InputTypes
/**
 * Entrega findUnique
 */
export type EntregaFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Select specific fields to fetch from the Entrega
   */
  select?: Prisma.EntregaSelect<ExtArgs> | null
  /**
   * Omit specific fields from the Entrega
   */
  omit?: Prisma.EntregaOmit<ExtArgs> | null
  /**
   * Choose, which related nodes to fetch as well
   */
  include?: Prisma.EntregaInclude<ExtArgs> | null
  /**
   * Filter, which Entrega to fetch.
   */
  where: Prisma.EntregaWhereUniqueInput
}

/**
 * Entrega findUniqueOrThrow
 */
export type EntregaFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Select specific fields to fetch from the Entrega
   */
  select?: Prisma.EntregaSelect<ExtArgs> | null
  /**
   * Omit specific fields from the Entrega
   */
  omit?: Prisma.EntregaOmit<ExtArgs> | null
  /**
   * Choose, which related nodes to fetch as well
   */
  include?: Prisma.EntregaInclude<ExtArgs> | null
  /**
   * Filter, which Entrega to fetch.
   */
  where: Prisma.EntregaWhereUniqueInput
}

/**
 * Entrega findFirst
 */
export type EntregaFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Select specific fields to fetch from the Entrega
   */
  select?: Prisma.EntregaSelect<ExtArgs> | null
  /**
   * Omit specific fields from the Entrega
   */
  omit?: Prisma.EntregaOmit<ExtArgs> | null
  /**
   * Choose, which related nodes to fetch as well
   */
  include?: Prisma.EntregaInclude<ExtArgs> | null
  /**
   * Filter, which Entrega to fetch.
   */
  where?: Prisma.EntregaWhereInput
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
   * 
   * Determine the order of Entregas to fetch.
   */
  orderBy?: Prisma.EntregaOrderByWithRelationInput | Prisma.EntregaOrderByWithRelationInput[]
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
   * 
   * Sets the position for searching for Entregas.
   */
  cursor?: Prisma.EntregaWhereUniqueInput
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
   * 
   * Take `±n` Entregas from the position of the cursor.
   */
  take?: number
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
   * 
   * Skip the first `n` Entregas.
   */
  skip?: number
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
   * 
   * Filter by unique combinations of Entregas.
   */
  distinct?: Prisma.EntregaScalarFieldEnum | Prisma.EntregaScalarFieldEnum[]
}

/**
 * Entrega findFirstOrThrow
 */
export type EntregaFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Select specific fields to fetch from the Entrega
   */
  select?: Prisma.EntregaSelect<ExtArgs> | null
  /**
   * Omit specific fields from the Entrega
   */
  omit?: Prisma.EntregaOmit<ExtArgs> | null
  /**
   * Choose, which related nodes to fetch as well
   */
  include?: Prisma.EntregaInclude<ExtArgs> | null
  /**
   * Filter, which Entrega to fetch.
   */
  where?: Prisma.EntregaWhereInput
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
   * 
   * Determine the order of Entregas to fetch.
   */
  orderBy?: Prisma.EntregaOrderByWithRelationInput | Prisma.EntregaOrderByWithRelationInput[]
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
   * 
   * Sets the position for searching for Entregas.
   */
  cursor?: Prisma.EntregaWhereUniqueInput
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
   * 
   * Take `±n` Entregas from the position of the cursor.
   */
  take?: number
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
   * 
   * Skip the first `n` Entregas.
   */
  skip?: number
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
   * 
   * Filter by unique combinations of Entregas.
   */
  distinct?: Prisma.EntregaScalarFieldEnum | Prisma.EntregaScalarFieldEnum[]
}

/**
 * Entrega findMany
 */
export type EntregaFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Select specific fields to fetch from the Entrega
   */
  select?: Prisma.EntregaSelect<ExtArgs> | null
  /**
   * Omit specific fields from the Entrega
   */
  omit?: Prisma.EntregaOmit<ExtArgs> | null
  /**
   * Choose, which related nodes to fetch as well
   */
  include?: Prisma.EntregaInclude<ExtArgs> | null
  /**
   * Filter, which Entregas to fetch.
   */
  where?: Prisma.EntregaWhereInput
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
   * 
   * Determine the order of Entregas to fetch.
   */
  orderBy?: Prisma.EntregaOrderByWithRelationInput | Prisma.EntregaOrderByWithRelationInput[]
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
   * 
   * Sets the position for listing Entregas.
   */
  cursor?: Prisma.EntregaWhereUniqueInput
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
   * 
   * Take `±n` Entregas from the position of the cursor.
   */
  take?: number
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
   * 
   * Skip the first `n` Entregas.
   */
  skip?: number
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
   * 
   * Filter by unique combinations of Entregas.
   */
  distinct?: Prisma.EntregaScalarFieldEnum | Prisma.EntregaScalarFieldEnum[]
}

/**
 * Entrega create
 */
export type EntregaCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Select specific fields to fetch from the Entrega
   */
  select?: Prisma.EntregaSelect<ExtArgs> | null
  /**
   * Omit specific fields from the Entrega
   */
  omit?: Prisma.EntregaOmit<ExtArgs> | null
  /**
   * Choose, which related nodes to fetch as well
   */
  include?: Prisma.EntregaInclude<ExtArgs> | null
  /**
   * The data needed to create a Entrega.
   */
  data: Prisma.XOR<Prisma.EntregaCreateInput, Prisma.EntregaUncheckedCreateInput>
}

/**
 * Entrega createMany
 */
export type EntregaCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * The data used to create many Entregas.
   */
  data: Prisma.EntregaCreateManyInput | Prisma.EntregaCreateManyInput[]
}

/**
 * Entrega createManyAndReturn
 */
export type EntregaCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Select specific fields to fetch from the Entrega
   */
  select?: Prisma.EntregaSelectCreateManyAndReturn<ExtArgs> | null
  /**
   * Omit specific fields from the Entrega
   */
  omit?: Prisma.EntregaOmit<ExtArgs> | null
  /**
   * The data used to create many Entregas.
   */
  data: Prisma.EntregaCreateManyInput | Prisma.EntregaCreateManyInput[]
  /**
   * Choose, which related nodes to fetch as well
   */
  include?: Prisma.EntregaIncludeCreateManyAndReturn<ExtArgs> | null
}

/**
 * Entrega update
 */
export type EntregaUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Select specific fields to fetch from the Entrega
   */
  select?: Prisma.EntregaSelect<ExtArgs> | null
  /**
   * Omit specific fields from the Entrega
   */
  omit?: Prisma.EntregaOmit<ExtArgs> | null
  /**
   * Choose, which related nodes to fetch as well
   */
  include?: Prisma.EntregaInclude<ExtArgs> | null
  /**
   * The data needed to update a Entrega.
   */
  data: Prisma.XOR<Prisma.EntregaUpdateInput, Prisma.EntregaUncheckedUpdateInput>
  /**
   * Choose, which Entrega to update.
   */
  where: Prisma.EntregaWhereUniqueInput
}

/**
 * Entrega updateMany
 */
export type EntregaUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * The data used to update Entregas.
   */
  data: Prisma.XOR<Prisma.EntregaUpdateManyMutationInput, Prisma.EntregaUncheckedUpdateManyInput>
  /**
   * Filter which Entregas to update
   */
  where?: Prisma.EntregaWhereInput
  /**
   * Limit how many Entregas to update.
   */
  limit?: number
}

/**
 * Entrega updateManyAndReturn
 */
export type EntregaUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Select specific fields to fetch from the Entrega
   */
  select?: Prisma.EntregaSelectUpdateManyAndReturn<ExtArgs> | null
  /**
   * Omit specific fields from the Entrega
   */
  omit?: Prisma.EntregaOmit<ExtArgs> | null
  /**
   * The data used to update Entregas.
   */
  data: Prisma.XOR<Prisma.EntregaUpdateManyMutationInput, Prisma.EntregaUncheckedUpdateManyInput>
  /**
   * Filter which Entregas to update
   */
  where?: Prisma.EntregaWhereInput
  /**
   * Limit how many Entregas to update.
   */
  limit?: number
  /**
   * Choose, which related nodes to fetch as well
   */
  include?: Prisma.EntregaIncludeUpdateManyAndReturn<ExtArgs> | null
}

/**
 * Entrega upsert
 */
export type EntregaUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Select specific fields to fetch from the Entrega
   */
  select?: Prisma.EntregaSelect<ExtArgs> | null
  /**
   * Omit specific fields from the Entrega
   */
  omit?: Prisma.EntregaOmit<ExtArgs> | null
  /**
   * Choose, which related nodes to fetch as well
   */
  include?: Prisma.EntregaInclude<ExtArgs> | null
  /**
   * The filter to search for the Entrega to update in case it exists.
   */
  where: Prisma.EntregaWhereUniqueInput
  /**
   * In case the Entrega found by the `where` argument doesn't exist, create a new Entrega with this data.
   */
  create: Prisma.XOR<Prisma.EntregaCreateInput, Prisma.EntregaUncheckedCreateInput>
  /**
   * In case the Entrega was found with the provided `where` argument, update it with this data.
   */
  update: Prisma.XOR<Prisma.EntregaUpdateInput, Prisma.EntregaUncheckedUpdateInput>
}

/**
 * Entrega delete
 */
export type EntregaDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Select specific fields to fetch from the Entrega
   */
  select?: Prisma.EntregaSelect<ExtArgs> | null
  /**
   * Omit specific fields from the Entrega
   */
  omit?: Prisma.EntregaOmit<ExtArgs> | null
  /**
   * Choose, which related nodes to fetch as well
   */
  include?: Prisma.EntregaInclude<ExtArgs> | null
  /**
   * Filter which Entrega to delete.
   */
  where: Prisma.EntregaWhereUniqueInput
}

/**
 * Entrega deleteMany
 */
export type EntregaDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Filter which Entregas to delete
   */
  where?: Prisma.EntregaWhereInput
  /**
   * Limit how many Entregas to delete.
   */
  limit?: number
}

/**
 * Entrega.motorista
 */
export type Entrega$motoristaArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Select specific fields to fetch from the Motorista
   */
  select?: Prisma.MotoristaSelect<ExtArgs> | null
  /**
   * Omit specific fields from the Motorista
   */
  omit?: Prisma.MotoristaOmit<ExtArgs> | null
  /**
   * Choose, which related nodes to fetch as well
   */
  include?: Prisma.MotoristaInclude<ExtArgs> | null
  where?: Prisma.MotoristaWhereInput
}

/**
 * Entrega.eventos
 */
export type Entrega$eventosArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Select specific fields to fetch from the EventoEntrega
   */
  select?: Prisma.EventoEntregaSelect<ExtArgs> | null
  /**
   * Omit specific fields from the EventoEntrega
   */
  omit?: Prisma.EventoEntregaOmit<ExtArgs> | null
  /**
   * Choose, which related nodes to fetch as well
   */
  include?: Prisma.EventoEntregaInclude<ExtArgs> | null
  where?: Prisma.EventoEntregaWhereInput
  orderBy?: Prisma.EventoEntregaOrderByWithRelationInput | Prisma.EventoEntregaOrderByWithRelationInput[]
  cursor?: Prisma.EventoEntregaWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Prisma.EventoEntregaScalarFieldEnum | Prisma.EventoEntregaScalarFieldEnum[]
}

/**
 * Entrega without action
 */
export type EntregaDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Select specific fields to fetch from the Entrega
   */
  select?: Prisma.EntregaSelect<ExtArgs> | null
  /**
   * Omit specific fields from the Entrega
   */
  omit?: Prisma.EntregaOmit<ExtArgs> | null
  /**
   * Choose, which related nodes to fetch as well
   */
  include?: Prisma.EntregaInclude<ExtArgs> | null
}
