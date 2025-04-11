// src/shared/utils/csvSerializers.ts
import { CsvData } from '@/shared/atoms/fileData';
import { selectedIsoAtom } from '@/shared/atoms/iso';
import { selectedProductAtom } from '@/shared/atoms/products';
import { useAtomValue } from 'jotai';

// Import ISO-specific types with aliases to avoid naming collisions
import * as ErcotAPI from '@/shared/api/ercotSubmissionApi';
import * as PjmisoAPI from '@/shared/api/pjmisoSubmissionApi';
import * as NeisoAPI from '@/shared/api/neisoSubmissionApi';
import * as CaisoAPI from '@/shared/api/caisoSubmissionApi';
import * as MisoAPI from '@/shared/api/misoSubmissionApi';
import * as NyisoAPI from '@/shared/api/nyisoSubmissionApi';
import * as SppisoAPI from '@/shared/api/sppisoSubmissionApi';

/**
 * Serializes CSV data into ERCOT Virtual format
 */
export function serializeErcotVirtual(csvData: CsvData[]): ErcotAPI.Virtual[] {
  return csvData.map(row => ({
    node: row.node,
    he: row.he,
    tranche: parseInt(row.tranche),
    mw: parseFloat(row.mw),
    price: parseFloat(row.price),
    is_block: row.is_block === 'true'
  }));
}

/**
 * Serializes CSV data into ERCOT Spread format
 */
export function serializeErcotSpread(csvData: CsvData[]): ErcotAPI.Spread[] {
  return csvData.map(row => ({
    source: row.source,
    sink: row.sink,
    he: row.he,
    tranche: parseInt(row.tranche),
    mw: parseFloat(row.mw),
    price: parseFloat(row.price),
    is_block: row.is_block === 'true'
  }));
}

/**
 * Serializes CSV data into PJMISO Virtual format
 */
export function serializePjmisoVirtual(csvData: CsvData[]): PjmisoAPI.Virtual[] {
  return csvData.map(row => ({
    node: row.node,
    node_id: row.node_id,
    he: row.he,
    tranche: parseInt(row.tranche),
    mw: parseFloat(row.mw),
    price: parseFloat(row.price)
  }));
}

/**
 * Serializes CSV data into PJMISO Spread format
 */
export function serializePjmisoSpread(csvData: CsvData[]): PjmisoAPI.Spread[] {
  return csvData.map(row => ({
    source: row.source,
    source_id: parseInt(row.source_id),
    sink: row.sink,
    sink_id: parseInt(row.sink_id),
    he: row.he,
    tranche: parseInt(row.tranche),
    mw: parseFloat(row.mw),
    price: parseFloat(row.price)
  }));
}

/**
 * Serializes CSV data into NEISO Virtual format
 */
export function serializeNeisoVirtual(csvData: CsvData[]): NeisoAPI.Virtual[] {
  return csvData.map(row => ({
    node: row.node,
    node_id: parseInt(row.node_id),
    he: row.he,
    tranche: parseInt(row.tranche),
    mw: parseFloat(row.mw),
    price: parseFloat(row.price)
  }));
}

/**
 * Serializes CSV data into CAISO Virtual format
 */
export function serializeCaisoVirtual(csvData: CsvData[]): CaisoAPI.Virtual[] {
  return csvData.map(row => ({
    node: row.node,
    he: row.he,
    tranche: parseInt(row.tranche),
    mw: parseFloat(row.mw),
    price: parseFloat(row.price)
  }));
}

/**
 * Serializes CSV data into MISO Virtual format
 */
export function serializeMisoVirtual(csvData: CsvData[]): MisoAPI.MisoVirtual[] {
  return csvData.map(row => ({
    node: row.node,
    he: row.he,
    tranche: parseInt(row.tranche),
    mw: parseFloat(row.mw),
    price: parseFloat(row.price)
  }));
}

/**
 * Serializes CSV data into MISO Virtual Withdraw format
 */
export function serializeMisoVirtualWithdraw(csvData: CsvData[]): MisoAPI.MisoVirtualWithdraw[] {
  return csvData.map(row => ({
    node: row.node
  }));
}

/**
 * Serializes CSV data into NYISO Virtual format
 */
export function serializeNyisoVirtual(csvData: CsvData[]): NyisoAPI.Virtual[] {
  return csvData.map(row => ({
    node: row.node,
    he: row.he,
    tranche: parseInt(row.tranche),
    mw: parseFloat(row.mw),
    price: parseFloat(row.price)
  }));
}

/**
 * Serializes CSV data into NYISO Virtual Delete format
 */
export function serializeNyisoVirtualDelete(csvData: CsvData[]): NyisoAPI.VirtualDelete[] {
  return csvData.map(row => ({
    node: row.node
  }));
}

/**
 * Serializes CSV data into SPPISO Virtual format
 */
export function serializeSppisoVirtual(csvData: CsvData[]): SppisoAPI.SppisoVirtual[] {
  return csvData.map(row => ({
    node: row.node,
    he: row.he,
    tranche: parseInt(row.tranche),
    mw: parseFloat(row.mw),
    price: parseFloat(row.price)
  }));
}

/**
 * Hook that returns the appropriate serializer function based on the selected ISO and product
 */
export function useSerializer() {
  const selectedIso = useAtomValue(selectedIsoAtom);
  const selectedProduct = useAtomValue(selectedProductAtom);

  return (csvData: CsvData[]) => {
    if (!csvData || csvData.length === 0) {
      return [];
    }

    // Select the appropriate serializer based on ISO and product
    switch (selectedIso) {
      case 'ERCOT':
        if (selectedProduct === 'UTC/Spread') {
          return serializeErcotSpread(csvData);
        } else {
          return serializeErcotVirtual(csvData);
        }

      case 'PJMISO':
        if (selectedProduct === 'UTC/Spread') {
          return serializePjmisoSpread(csvData);
        } else {
          return serializePjmisoVirtual(csvData);
        }

      case 'NEISO':
        return serializeNeisoVirtual(csvData);

      case 'CAISO':
        return serializeCaisoVirtual(csvData);

      case 'MISO':
        return serializeMisoVirtual(csvData);

      case 'NYISO':
        return serializeNyisoVirtual(csvData);

      case 'SPPISO':
        return serializeSppisoVirtual(csvData);

      default:
        return [];
    }
  };
}

/**
 * Non-hook version that takes ISO and product as parameters
 */
export function getSerializer(iso: string, product: string) {
  return (csvData: CsvData[]) => {
    if (!csvData || csvData.length === 0) {
      return [];
    }

    // Select the appropriate serializer based on ISO and product
    switch (iso) {
      case 'ERCOT':
        if (product === 'UTC/Spread') {
          return serializeErcotSpread(csvData);
        } else {
          return serializeErcotVirtual(csvData);
        }

      case 'PJMISO':
        if (product === 'UTC/Spread') {
          return serializePjmisoSpread(csvData);
        } else {
          return serializePjmisoVirtual(csvData);
        }

      case 'NEISO':
        return serializeNeisoVirtual(csvData);

      case 'CAISO':
        return serializeCaisoVirtual(csvData);

      case 'MISO':
        return serializeMisoVirtual(csvData);

      case 'NYISO':
        return serializeNyisoVirtual(csvData);

      case 'SPPISO':
        return serializeSppisoVirtual(csvData);

      default:
        return [];
    }
  };
}

/**
 * Get withdrawal serializer based on ISO
 */
export function getWithdrawalSerializer(iso: string) {
  return (csvData: CsvData[]) => {
    if (!csvData || csvData.length === 0) {
      return [];
    }

    switch (iso) {
      case 'MISO':
        return serializeMisoVirtualWithdraw(csvData);

      case 'NYISO':
        return serializeNyisoVirtualDelete(csvData);

      default:
        // For ISOs that don't require node information for withdrawal
        return [];
    }
  };
}

