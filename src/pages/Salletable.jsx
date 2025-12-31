import React from "react";
import Table from "../components/table";
import { FaEdit, FaTrash } from "react-icons/fa"; // import des icônes

const columns = ["Numero", "Type", "Capacite",  "Opérations"];

export default function SalleTable() {
  const handleEdit = (Salle) => {
    alert(`Modifier l'etudiant: ${Salle}`);
  };

  const handleDelete = (Salle) => {
    alert(`Supprimer l'etudiant: ${Salle}`);
  };

  return (
    <Table columns={columns}>
      <tr className="border-b border-gray-300  text-black font-semibold text-xl">
        <td>N101</td>
        <td>Salle td</td>
        <td>60</td>
       
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
