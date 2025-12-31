import React from "react";
import Table from "../components/table";
import { FaEdit, FaTrash } from "react-icons/fa"; // import des icônes

const columns = ["Nom", "Code", "Semestre", "Enseignant responsable", "Opérations"];

export default function ModuleTable() {
  const handleEdit = (moduleName) => {
    alert(`Modifier le module: ${moduleName}`);
  };

  const handleDelete = (moduleName) => {
    alert(`Supprimer le module: ${moduleName}`);
  };

  return (
    <Table columns={columns}>
      <tr className="border-b border-gray-300  text-black font-semibold text-xl">
        <td>POO</td>
        <td>INF201</td>
        <td>S3</td>
        <td>Mme Sari</td>
        <td className="flex gap-3">
          <FaEdit
            className="text-blue-500 cursor-pointer hover:text-blue-700 text-2xl"
            onClick={() => handleEdit("POO")}
            title="Modifier"
          />
          <FaTrash
            className="text-red-500 cursor-pointer hover:text-red-700 text-2xl"
            onClick={() => handleDelete("POO")}
            title="Supprimer"
          />
        </td>
      </tr>
      <tr className="border-b border-gray-300 text-black font-semibold text-xl">
        <td>ux</td>
        <td>INF200</td>
        <td>S4</td>
        <td>Mme Sari</td>
        <td className="flex gap-3">
          <FaEdit
            className="text-blue-500 cursor-pointer hover:text-blue-700 text-2xl"
            onClick={() => handleEdit("POO")}
            title="Modifier"
          />
          <FaTrash
            className="text-red-500 cursor-pointer hover:text-red-700 text-2xl"
            onClick={() => handleDelete("POO")}
            title="Supprimer"
          />
        </td>
      </tr>
    </Table>
  );
}
