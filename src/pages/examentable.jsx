import React from "react";
import Table from "../components/table";
import { FaEdit, FaTrash } from "react-icons/fa"; // import des icônes

const columns = ["Nom", "Type", "Date-debut", "Date-fin", "Opérations"];

export default function ExamenTable() {
  const handleEdit = (ExamName) => {
    alert(`Modifier l'etudiant: ${ExamName}`);
  };

  const handleDelete = (ExamName) => {
    alert(`Supprimer l'etudiant: ${ExamName}`);
  };

  return (
    <Table columns={columns}>
      <tr className="border-b border-gray-300  text-black font-semibold text-xl">
        <td>web</td>
        <td>remplacement</td>
        <td>8:30</td>
        <td>10:00</td>
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
        <td>englais</td>
        <td>final</td>
        <td>10:00</td>
        <td>11:30</td>
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
