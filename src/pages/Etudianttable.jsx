import React from "react";
import Table from "../components/table";
import { FaEdit, FaTrash } from "react-icons/fa"; // import des icônes

const columns = ["Nom", "Prenom", "Niveau", "Specialite", "Opérations"];

export default function EtudTable() {
  const handleEdit = (EtudName) => {
    alert(`Modifier l'etudiant: ${EtudName}`);
  };

  const handleDelete = (EtudName) => {
    alert(`Supprimer l'etudiant: ${EtudName}`);
  };

  return (
    <Table columns={columns}>
      <tr className="border-b border-gray-300  text-black font-semibold text-xl">
        <td>irid</td>
        <td>amira</td>
        <td>M1</td>
        <td>GL</td>
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
        <td>ghomari</td>
        <td>chamimaa</td>
        <td>M1</td>
        <td>GL</td>
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
