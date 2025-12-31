import React, { useState } from "react";
import Card from '../components/card.jsx'
import StatsDonut from '../components/StateDonuts.jsx'
import Modal from '../components/Model.jsx'

/* صفحات المحتوى */
import Etudajoute from './etudajouter.jsx'
import Engajoute from './engajoute.jsx'
import EnseigTable from './Enseigtable.jsx'
import EtudTable from './Etudianttable.jsx'
import Examjoute from './examajoute.jsx'
import ExamenTable from './examentable.jsx'
import Modulajout from './modulajoute.jsx'
import ModuleTable from './Moduletable.jsx'
import Salleajout from './salleajout.jsx'
import SalleTable from './Salletable.jsx'



const stats = [
  { name: "Etudiant", value: 1700 },
  { name: "Ensignant", value: 100 },
  { name: "Salle", value: 1000 },
  { name: "Module", value: 200 },
];

export default function Responsabledash() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  return (
    <div className="relative">

      {/* Dashboard (يبقى في الخلفية) */}
      <div className={`${isModalOpen ? "blur-sm pointer-events-none" : ""}`}>
        <div className="flex flex-row gap-8">

          {/* Cards */}
          <div className="flex flex-col gap-4 w-2/3">

            <div className="flex flex-row gap-4">
              {/* Etudiant */}
              <Card
                title="Etudiant"
                onAjouter={() => openModal(<Etudajoute />)}
                onModifier={() => openModal(<EtudTable />)}
              />

              {/* Module */}
              <Card
                title="Module"
                onAjouter={() => openModal(<Modulajout />)}
                onModifier={() => openModal(<ModuleTable/>)}
              />
            </div>

            <div className="flex flex-row gap-4">
              <Card
                title="Enseignant"
                onAjouter={() => openModal(<Engajoute/>)}
                onModifier={() => openModal(<EnseigTable />)}
              />

              <Card
                title="Salle"
                onAjouter={() => openModal(<Salleajout/>)}
                onModifier={() => openModal(<SalleTable />)}
              />

              <Card
                title="Examen"
                onAjouter={() => openModal(< Examjoute />)}
                onModifier={() => openModal(<ExamenTable/>)}
              />
            </div>

          </div>

          {/* Stats */}
          <div className="flex justify-center items-start w-1/3">
            <StatsDonut data={stats} />
          </div>

        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {modalContent}
      </Modal>

    </div>
  );
}
