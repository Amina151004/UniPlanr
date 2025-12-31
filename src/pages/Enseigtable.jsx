import React from "react";
import Table from "../components/table";
import { FaEdit, FaTrash } from "react-icons/fa"; // import des icônes

const columns = ["Nom", "Prenom", "Email", "Module", "Opérations"];

export default function EnseigTable() {
  const handleEdit = (EnseigName) => {
    alert(`Modifier l'etudiant: ${EnseigName}`);
  };

  const handleDelete = (EnseigName) => {
    alert(`Supprimer l'etudiant: ${EnseigName}`);
  };

  return (
    <Table columns={columns}>
      <tr className="border-b border-gray-300  text-black font-semibold text-xl">
        <td>amraoui</td>
        <td>nassima</td>
        <td>amraoui@gmail.com</td>
        <td>Ux</td>
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
